import React, { useEffect, useState } from 'react';
import Task from '../module/Task';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Homepage = () => {

    
  const [ todos , setTodos] = useState([])

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status === "success") setTodos(data.data);
  };

  
  const session = useSession()
  const router = useRouter()
   
  
  useEffect(()=>{
    fetchTodos()
    session.status === "unauthenticated" && router.push("/SignUp")
    
  }, [])
    return (
        <div className='home-page'>

            <div className='home-page--todo'> 
            <p>Todo</p>
             <Task data ={todos.todo} fetchtodos = {fetchTodos} next="inProgress" />
            </div>

            <div className='home-page--inprogress'> 
            <p>in Progress</p>
            <Task data ={todos.inProgress} fetchtodos = {fetchTodos} next="review" back="todo"  />
            </div>

            <div className='home-page--review'> 
            <p>Review</p>
            <Task data ={todos.review} fetchtodos = {fetchTodos} next="done" back="inProgress"  />
            </div>

            <div className='home-page--done'> 
            <p>Done</p>
            <Task data ={todos.done} fetchtodos = {fetchTodos} back="review" />
            </div>
             
        </div>

    );
};

export default Homepage;