import {BiLoaderCircle} from 'react-icons/bi'
import {MdOutlineDoneAll} from 'react-icons/md'
import {TiArrowBack} from 'react-icons/ti'
import {TiArrowForward} from 'react-icons/ti'
import {TiDelete} from 'react-icons/ti'
import {AiFillEdit} from 'react-icons/ai'


import { useEffect, useState } from 'react'
import patchTodos from '@/utils/patchTodos'
import notify from '@/function/toaster'
import { ToastContainer } from 'react-toastify'
 

const Task = ({data , next , back , fetchtodos , currentStatus}) => {

  const [edit , setEdit] = useState("")
  const [title , setTitle] = useState("")
  
 
    const changeStatus = async (id, status ) => {
        await patchTodos(id , status ,  "" , fetchtodos)
      };


    const editHandler = async (id , title )=> {
      setEdit(id)
      setTitle(title)
      
    }

    const updateHandler = async(id , status)=>{
       const result=  await patchTodos(id , status , title, fetchtodos)
       result && setEdit(false)
    }


    const changeHandler = (e)=>{ 
      setTitle(e.target.value)
     }

    
    const deleteHandler = async(id , status)=>{
      
      const res = await fetch("/api/todos" , {
        method:"PATCH" , body:JSON.stringify({id , status , action:"DELETE"}) , headers:{"Content-Type":"application/json"}
      })
      const data = await res.json()
      if(data.status == 200) {
        fetchtodos()
      }
    }

   
    useEffect(()=>{
       function handleClick(e){
        if(!e.target.closest('.task')){
          setEdit(false)
        }
       }
        window.addEventListener('click' , handleClick) 

     
    },[])
    
    const dragStartHandler = (e , ID , status)=>{
       e.dataTransfer.setData('task' ,ID )
    }

   
   
    return (
        <div className='task'>
        
        {data?.map((item , index)=> (
          <div 
          onDragStart={(e)=> dragStartHandler(e ,item._id , item.status)} 
          className='innertask' key={item._id}
          draggable 
        
          >
                <span  className={item.status}> </span>
                <h4 >
                  {item.status ==="done" ? <MdOutlineDoneAll/> :<BiLoaderCircle/>} 
                  
                   
                   { edit == item._id   ?
                      <textarea value={title}  onChange={changeHandler}></textarea> 
                      : <span >{item.title} </span>

                     }
                     <span onClick={()=> editHandler(item._id ,item.title )} className='edit-icon'><AiFillEdit/></span> 
                  </h4>



                <div className='back-and-next-button'>
                    {back? (<button onClick={()=>changeStatus(item._id , back)} className='backbutton'><TiArrowBack/> Back</button>) :null}
                    {next? (<button onClick={()=>changeStatus(item._id , next)} className='nextbutton' id="firstnext">next<TiArrowForward/> </button>) :null}
                    <button className='deleteTask' onClick={()=> deleteHandler(item._id , item.status)}> <span className='remove-span'>Remove to do</span> <TiDelete/></button>
                    {edit == item._id && <button onClick={()=>updateHandler(item._id , item.status)} className='updateButton' disabled = {!title}>Submit Change</button>}
                </div>
        </div>))}
        
        </div>
       
        
    );
};

export default Task;