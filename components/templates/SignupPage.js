import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {AiFillEye} from 'react-icons/ai'
import notify from "@/function/toaster";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validation from "@/function/validation";
import { useSession } from "next-auth/react";

const SignupPage = () => {

    const {status} = useSession()

    const [data , setData] = useState({
      email: "" , password : "" , confirm : ""  , checkbox :false
    })
    const router = useRouter()
    const [show , setShow] = useState(false)

    useEffect(()=>{
       status === "authenticated" && router.replace("/")
    }, [status])

    const signUpHandler = async (e) => {

      const error = validation(data)
      const {email , password} = data

        if(!Object.keys(error).length){ 

          const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (data.status === "successful") {
          
           setTimeout(() => {
            router.push("/SignIn")
           }, 3000);
           
            notify("you signed up successuly" , "success")
            notify("login to confirm" ,'success' )
          
          }

            else{
                notify(`${data.message}` , "error")
              }} else{
               error.email && notify(`${error.email}`)
               error.password && notify(`${error.password}`)
               error.confirm && notify (`${error.confirm}`)
               error.checkbox && notify(`${error.checkbox}`)
             
              }
      } 

      

      const changeHandler = (event) => { 
        event.target.name === "checkbox" ? setData({
           ...data , checkbox : event.target.checked
        }) : setData({
          ...data,  [event.target.name] : event.target.value
        })
    }


     
   
    return (
    <div className="wholeSignUpContainer">
        <div className='signUp-form'>
            <h3>Registeration form </h3>
        
            <input className="mainInput" type = "text" name="email" placeholder='Enter Your Email' value = {data.email} onChange={changeHandler} />
            <div className={show? "icon" : "fade"}  onClick={()=> setShow(!show)}> <AiFillEye/></div>

            <input className="mainInput" name="password" type ={show ? "text" : "password"} placeholder='Enter Your Password' value={data.password} onChange={changeHandler} />
            <input className="mainInput" name="confirm" type ="password" placeholder="confirm you password" value={data.confirm} onChange={changeHandler} />
            <div>
            <label> <Link href="/terms">Accept our term and conditions </Link></label>
            <input name="checkbox" className="check" type="checkbox"  value={data.checkbox} onChange={changeHandler}/>
             </div>
           
            <button className="register" onClick={signUpHandler}>Register</button>
           
            
            <div>
                <p>Already have an account? </p>
                <Link href='/SignIn'>Sign In</Link>

            </div>
           
        </div>
        <ToastContainer/>
        </div>
    );
};

export default SignupPage;