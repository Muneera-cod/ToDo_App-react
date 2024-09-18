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
function TodoMainSection(props) {
              ///todo 
              const [todo,seTodo]=useState('')
              const [todos,setTodos]=useState([])
              const [comtodos,setcomTodos]=useState([])
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
                                      
                                        className:'bg-amber-100 text-zinc-700  font-mono font-semibold border-2 border-pink-300'
                                      });
              }   

           
            
            ///hover deletebutton
              const[hover,setHover]=useState(null)

              
    ///fecth data 
    
        const fetchdata=async()=>{
          let { data: tasks, error } = await supabase
          .from('todos')
          .select('*')
          if (error) {
            console.error("Error fetching todos:", error);
          } else {
            console.log("Tasks:", tasks);
            setTodos(tasks)
          }      }

              useEffect(()=>{
                   
                    fetchdata()
              },[])
     

  return (
    <div  className='bg-amber-50 min-h-screen w-full p-6 flex  md:gap-5 sm:p-4'>
        {props.popUp === 2 && <Setting/>}
        {props.popUp === 1 && <Profilee/>}
        <div className='md:basis-1/2  flex p-6 sm:basis-full bodyBorder' onClick={()=>{props.setPopUp(null)}}>
         <TodoList todos={todos} setTodos={setTodos}  fetchdata={fetchdata} hover={hover} setHover={setHover} seTodo={seTodo} todo={todo}  deleteTodo={deleteTodo} />
         <ToastContainer/>
          
        </div>
        <div className='basis-1/2 bodyBorder p-10 flex flex-col gap-4' onClick={()=>{props.setPopUp(null)}}>
         <TodoCompleted  todos={todos} fetchdata={fetchdata}/>
        </div>
    </div>
  )
}

export default TodoMainSection