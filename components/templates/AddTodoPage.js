import React, { useState } from 'react';
import RadioButton from '../element/RadioButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '@/function/toaster';
import { useEffect } from 'react';

//icons
import {GrAddCircle} from 'react-icons/gr'
import {BsAlignStart} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import { AiOutlineSearch} from 'react-icons/ai'
import {MdDoneAll} from 'react-icons/md'

const AddTodoPage = () => {

    const [title ,setTitle] = useState("")
    const [status ,setStatus] = useState("todo")

    

    const addHandler = async()=> {

        const res = await fetch('/api/todos', {
            method :"POST" , body :JSON.stringify({title , status}) , headers:{"Content-Type" :"application/json"}
        })
        const data = await res.json()
      
        if(data.status === "success") {
            setTitle("")
            setStatus("todo")
            notify("Todo Added" , "success")
        } else {
            notify(`${data.message}`)
        }
    }

      
    return (
        <div  className='add-form'>
            <h2> <GrAddCircle/> Add New todo</h2>

            <div className='add-form-input__first'>
                <label htmlFor="title">Title:</label>
                <input type='text' id="title" value={title} onChange={e=> setTitle(e.target.value)} />
           </div>

            <div className='add-form-input__second'>

               <RadioButton status ={status} setStatus={setStatus} value="todo"  title="todo">
                <BsAlignStart/>
               </RadioButton>

               <RadioButton status ={status} setStatus={setStatus} value="inProgress"  title="in progress">
                <FiSettings/>
               </RadioButton>

               <RadioButton status ={status} setStatus={setStatus} value="review"  title="Review">
                <AiOutlineSearch/>
               </RadioButton>

               <RadioButton status ={status} setStatus={setStatus} value="done"  title="Done">
                <MdDoneAll/>
               </RadioButton>
               
            </div> 
            <button onClick={addHandler}>Add</button>
            
            <ToastContainer/>
        </div>

    );
};

export default AddTodoPage;