import React, { useEffect, useRef } from 'react'
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import { IconTrashFilled} from '@tabler/icons-react'
import { ToastContainer,toast } from 'react-toastify'
import { useState } from 'react'
import Setting from '../Sidebar/Setting'
import Profilee from '../Sidebar/Profilee'
import { supabase } from '../../../services/supabaseClient'
import TodoCompleted from './TodoCompleted'
import TodoList from './TodoList'
import { useNavigate } from 'react-router-dom'
function TodoMainSection(props) {
            const navigate=useNavigate()
              const [todo,seTodo]=useState('')
              const [todos,setTodos]=useState([])
            
              console.log(todos)

              const deleteTodo=async(index)=>{
                              const { error } = await supabase
                              .from('todos')
                              .delete()
                              .eq('id', index)
                              toast("Task deleted successfully!", {
                                        position: "top-right",
                                        autoClose:1000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        // progress: undefined,
                                      
                                        className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
                                      });
              }   
 
         
              const[hover,setHover]=useState(null)

              
   

    const fetchdata = async () => {
      // Get the session
      const { data: {session}, error: sessionError } = await supabase.auth.getSession();
      
     console.log(session)
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        return;
      }
    console.log('dcxc',)
      if (session && session.user.id) {
        const userId = session.user.id; // Get the user ID from session
    // Get the user ID of the logged-in user
         
        // Query the todos where the user_id matches the logged-in user's ID
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .eq('user_id', userId); // Filter todos by user_id
          console.log('No error')
  
        if (error) {
          console.error('Error fetching todos:', error);
        } else {
          setTodos(data); // Set the fetched todos in the state
        }
      } else {
        console.error('No active session, user not logged in');
        navigate('/login')
      }
    };

  useEffect(()=>{
                   
                    fetchdata()
                    // fetchuserdata()
              },[])
              useEffect(()=>{
                   
                fetchdata()
                // fetchuserdata()
          },[deleteTodo])
  return (
    <div  className=' min-h-screen w-full sm:px-20 lg:p-6 flex lg:flex-row sm:flex-col md:gap-5 sm:p-4 '>
        {props.popUp === 2 && <Setting curSession={props.curSession}/>}
        {props.popUp === 1 && <Profilee curSession={props.curSession}/>}
        <div className='md:basis-1/2  flex p-6 sm:basis-full  border-2 border-markclr ' onClick={()=>{props.setPopUp(null)}}>
         <TodoList todos={todos} setTodos={setTodos}  fetchdata={fetchdata} hover={hover} setHover={setHover} seTodo={seTodo} todo={todo}  deleteTodo={deleteTodo} />
         <ToastContainer/>
          
        </div>
        <div className='basis-1/2  border-2 border-markclr p-10 flex flex-col gap-4' onClick={()=>{props.setPopUp(null)}}>
         <TodoCompleted  todos={todos} fetchdata={fetchdata}/>
        </div>
    </div>
  )
}

export default TodoMainSection