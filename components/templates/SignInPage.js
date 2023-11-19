import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {AiFillEye} from 'react-icons/ai';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signIn, useSession} from 'next-auth/react'
import notify from '@/function/toaster';

const SignInPage = () => {
    const [data , setData] = useState({
        email: "" , password : ""  
      })

      const router = useRouter()
      const [show , setShow] = useState(false)
      const {status} = useSession()
      
      useEffect(()=>{
        if (status === "authenticated"){
          router.replace("/")
        }
      }, [status])


      const changeHandler = (event) => { 
       setData({
          ...data,  [event.target.name] : event.target.value
        })
    }

    const loginHandler = async () => {
        const {email , password} = data
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
    
        if (!res.error) { 
          notify("Welcome Back" , "success")

          setTimeout(() => {
             router.push("/")
          }, 2000);
         
          
        } else{
          notify(`${res.error}`) 
         }
        
      };

    
    return (
        <div>
        <div className='signin-form'>
            <h3>Login form </h3>
        
            <input className="mainInput" type = "text" name="email" placeholder='Enter Your Email' value = {data.email} onChange={changeHandler} />
                     
            <div className={show? "icon" : "fade"}  onClick={()=> setShow(!show)}> <AiFillEye/></div>

            <input className="mainInput" name="password" type ={show ? "text" : "password"} placeholder='Enter Your Password' value={data.password} onChange={changeHandler} />    
           
            <button className="register" onClick={loginHandler}>Login</button>
           
            
            <div>
                <p>Don't have an accoutn?  </p>
                <Link href='/SignUp'>Sign Up</Link>

            </div>
           
        </div>
        <ToastContainer/>
        </div>
    );
};

export default SignInPage;