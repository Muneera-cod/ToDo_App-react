import React, { useEffect, useRef } from 'react'
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import { IconTrashFilled} from '@tabler/icons-react'
import { ToastContainer,toast } from 'react-toastify'
import { useState } from 'react'
import Setting from '../Sidebar/Setting'
function TodoMainSection(props) {
              ///todo 
              const [todo,seTodo]=useState('')
              const [todos,setTodos]=useState([])
              const [comtodos,setcomTodos]=useState([])
              console.log(todos)
              const deleteTodo=(value)=>{
                    const afterdelete=todos.filter((element,i)=> i !== value)
                    setTodos(afterdelete)
                    toast.success("Todo deleted successfully!", {
                      position: "center",
                      autoClose:4899,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
              }
              const addTodo=()=>{
                todo.trim() !== ""?setTodos([...todos,todo]):null
              
                seTodo('')
              }

              //complted todo
              const completed=(index)=>{
                const notCompleted=todos.filter((element,i)=> i !== index)
                setTodos(notCompleted)
                const completedTindex=todos.filter((element,i)=> i === index)
                setcomTodos([...comtodos,completedTindex])     
              }
            
            ///hover deletebutton
              const[hover,setHover]=useState(null)

              ///focus
              const refinput=useRef(null)

              useEffect(()=>{
                    refinput.current.focus()
              },[])
              
  

  return (
    <div  className='bg-amber-50 min-h-screen w-full p-6 flex  md:gap-5 sm:p-4'>
        {props.popUp === 1 && <Setting/>}
        {props.popUp === 2 && <Profile/>}
        <div className='md:basis-1/2 border-2 flex p-6 sm:basis-full'>
          <div className='flex flex-col py-5 lg:px-20 md:px-2 w-full min-h-full items-center gap-6'>
              <div className='flex items-center  gap-2  bg-amber-50 w-4/5 justify-center'>
                <input value={todo} type='text' className='rounded-lg p-2 border-2 border-zinc-600 sm:w-3/4 md:w-2/3' onChange={(e)=>seTodo(e.target.value)} ref={refinput}></input>
                 <button className='font-mono p-2 rounded-lg bg-green-500 border-2 border-zinc-600' onClick={addTodo}>Add</button>
              </div>
              
            
              
              <div className='flex flex-col w-11/12 min-h-2/4  p-5 gap-1 gap-2' >
            
              {todos.map((items,index)=>{
                return(
                 <div className='w-100 min-h-2/4  md:p-6 sm:p-4 bg-green-200 border-2 border-zinc-600 rounded-full font-mono items-center  flex gap-3' onMouseEnter={()=>{setHover(index)}} onMouseLeave={()=>{setHover(null)}} key={index}>
                  <div className='flex-none w-6 h-6 rounded-full bg-green-50 hover:bg-green-900 border-2 border-zinc-600 ' onClick={()=>{completed(index)}}></div>
                  <div className='flex-grow break-all ...'>{items }</div>
                  {hover===index && <IconTrashFilled className='flex-none text-green-500' onClick={()=>deleteTodo(index)}/>}
                 </div>
                )})}
                
                 </div>
                 {todos.length===0?<div className='w-full h-1/2  flex justify-center items-center text-zinc-500 font-mono'>Add your tasks here</div>:null}
          </div><ToastContainer/>
          
        </div>
        <div className='basis-1/2 border-2 p-10 flex flex-col gap-4'>
          <p className='text-xl text-zinc-700 font-mono font-semibold'>Your Completed tasks....</p>
                 {comtodos.length===0?<div className='w-full h-1/2  flex items-center justify-center text-zinc-500 font-mono'>{todos.length===0?'No tasks added':'No tasks completed'}</div>:null}
          {comtodos.map((items)=>{
            return(
              <div className='w-2/5 min-h-16 bg-green-600 flex items-center py-4 px-6 rounded-full font-semibold break-all'>{items}</div>
            )
          })}
        </div>
    </div>
  )
}

export default TodoMainSection