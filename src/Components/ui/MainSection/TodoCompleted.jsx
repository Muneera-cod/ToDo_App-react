import { useEffect, useState } from "react";
import { useDeleteTodoMutation, useGetAllTodosQuery } from "../../../redux/reducers/Api/TodoApi";
import { useNavigate } from "react-router-dom";
import ErrorFetch from '../../Pages/ErrorFetch'
function TodoCompleted() {
  const navigate = useNavigate()
  const [hover,setHover] = useState('')
  const { data: todos ,isLoading,isError,refetch} = useGetAllTodosQuery();
  const [ deleteTodo ,{ data , isError:deleteTodoErrr , isLoading:deleteTodoLoading ,isSuccess}] = useDeleteTodoMutation()
    const completedTasks = todos?.filter((task) => task.is_complete);
    useEffect(()=>{
      if(isSuccess){
        refetch()
      }
    },[isSuccess])
    if(isLoading){
      return <div>Loading...</div>
    }
    if(isError){
      return <ErrorFetch/>
    }
  return ( 
  <>
      <p onClick={()=>navigate('/')} className="mr-auto font-[700] text-sm opacity-40 hover:opacity-100 text-lightmodemainTextclr dark:text-darkmainTextclr  z-20 ">back</p>

    {/* <button className='ml-auto px-4 bg-opacity-40 hover:bg-opacity-80 py-2 mt-2 bg-lightModelightBg dark:bg-lightBgclr text-lightmodemainTextclr dark:text-darkmainTextclr font-semibold rounded-md'>Clear</button> */}
    <p className='text-xl my-8 font-mono font-semibold'>Your Completed tasks....</p>
    <div className='flex flex-col flex-col-reverse w-full max-h-[90%] py-4  gap-2  overflow-auto'>
                 
                 {completedTasks?.length===0?<div className='w-full h-1/2  flex items-center justify-center mt-32   font-mono'>{todos.length===0?'No tasks added':'No tasks completed'}</div>:null}
          {completedTasks?.map((items)=>{
            return(
              <div onClick={()=>{setHover(items.id)}} onMouseLeave={()=>setHover('')} className='w-full bg-opacity-20  min-h-16 dark:bg-lightBgclr bg-lightModelightBg flex items-center py-4 px-6 rounded-md dark:border-markclr border-lightModelightBg border-2 font-semibold break-all' key={items.id}>
                <p className="flex-1">{items.text}</p>
              {hover === items.id && <button onClick={()=>deleteTodo(items.id)} className="text-lightmodemainTextclr dark:text-darkmainTextclr font-semibold rounded-md">{deleteTodoLoading ? 'clearing' : 'clear'}</button>}

              </div>
             
            )
          })}</div>
          
  </>
  )
}

export default TodoCompleted