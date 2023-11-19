import React, { useEffect, useState } from 'react';
import { validateProfile } from '@/function/profileValidation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '@/function/toaster';
import { useRouter } from 'next/router';
import {FiLogOut} from 'react-icons/fi'
import { signOut } from 'next-auth/react';


const ProfileForm = () => {

    const router = useRouter()
   
    
    const [data , setData] = useState({
        email :"" , name:"" , lastName:"" , password :""
    })

    


         useEffect(  ()=> {  

            const fetchData = async ()=> {
        
                const res = await fetch('api/profile')
                const {data} = await res.json()
                             
                setData({
                 ...data , email : data.email ,
                  name:data.name , lastName : data.lastName , 
                  password :""
                });
                
               
             }

             fetchData()
             
        } ,[])
      

    
    const [show , setShow] = useState(false)
    const [transfer , setTransfer] = useState(false)

    const changeHandler = (e)=> { 
        
        setShow(true)
        setData({
          ...data , [e.target.name] : e.target.value
        })
    }

    

     const submitHandler = async()=>{
           
          const res = await fetch(`api/profile`,{
          method :"PATCH" , body :JSON.stringify({data}) , headers :{"Content-Type" : "application/json"}
        })
        
        const result = await res.json()

        if(result.status === "success"){
            notify(`${result.message}` , "success")
             setTransfer(false)
        } else { 
            notify(`${result.message}`)
        }

       
    }
    

   const patchHandler = () => { 

        
    const error = validateProfile(data)

    if(!Object.keys(error).length){ 

         setTransfer(true) 
       
    } else {
        error.email && notify(`${error.email}`)
        error.name && notify(`${error.name}`)
        error.lastName && notify(`${error.lastName}`)
    }
     
   }


const signOutHandler= ()=>{
    signOut({ callbackUrl: 'http://localhost:3000/SignUp' })
}
   

    return (
      <> 
        
        <div className={!transfer ? 'profile-form__input' : "ghost-div"}>
            
        <button className="signOutButton" onClick={signOutHandler}> Sign Out<FiLogOut/> </button>
        <h4 style={{color:"orange"}}>Add or change your information here!</h4>
    
                <div>
                    <label htmlFor ="name">
                        email : 
                    </label>
                    <input id="name" name='email' type='text' value={data.email}  onChange={changeHandler} />
                </div>

                <div>
                    <label htmlFor ="name">
                        name : 
                    </label>
                    <input id="name" name='name' type='text' value={data.name} onChange={changeHandler} />
                </div>

                <div>
                    <label htmlFor = "lastName">
                        lastName : 
                    </label>
                    <input id="lastName" name='lastName' type='text' value={data.lastName} onChange={changeHandler} />
                </div>
               
        <button className={show && data.email && data.name && data.lastName ? 'profile-form-button' : "fadechange"} disabled ={!show || !data.email || !data.name || !data.lastName} onClick={patchHandler}>change</button>
        </div>
                <ToastContainer/>
        
        <div className={transfer ? "pass-confirm-container": "ghost-div"}>
         <h1>Please Enter Your password to confirm!</h1>
       
            <div className='passlabel'>
              <label>password :</label>
            <input placeholder='Enter Password' name='password' value={data.password}  onChange={changeHandler}/>
            </div>
      
           <div className='confirm-buttons'>      

                <button className='go-back-profile' onClick={()=>setTransfer(false)}> go back</button>
                <button  onClick={submitHandler} className={!data.password ?"fadechange" : "submitChange-button"} disabled ={!data.password}>Submit Change</button>
            </div>                                                 

        </div>

      </>
    );
};

export default ProfileForm;