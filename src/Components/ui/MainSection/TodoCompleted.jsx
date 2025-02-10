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
  <section className="w-full h-[100%]   flex flex-col justify-between">
      <p onClick={()=>navigate('/')} className="mr-auto font-[700] text-sm opacity-40 hover:opacity-100 text-lightmodemainTextclr dark:text-darkmainTextclr  z-20 ">back</p>

    {/* <button className='ml-auto px-4 bg-opacity-40 hover:bg-opacity-80 py-2 mt-2 bg-lightModelightBg dark:bg-lightBgclr text-lightmodemainTextclr dark:text-darkmainTextclr font-semibold rounded-md'>Clear</button> */}
    <fieldset className='flex flex-col flex-col-reverse w-full h-full  mt-4 py-4 px-4  dark:border-markclr border-lightModelightBg  gap-2 border-2  rounded-md   overflow-auto'>
    <legend className='text-xl my-8 font-mono font-semibold'>Completed tasks</legend>

                 {completedTasks?.length===0?<div className='w-full min-h-full  flex items-center justify-center   sm:text-2xl lg:text-3xl xl:text-4xl  uppercase opacity-40 dark:opacity-80 font-[700]  my-auto dark:text-darksidebarClr text-lightModelightBg '>{todos.length===0?'No tasks added':'No tasks completed'}</div>:null}
          {completedTasks?.map((items)=>{
            return(
              <div onClick={()=>{setHover(items.id)}} onMouseLeave={()=>setHover('')} className='w-full bg-opacity-20  min-h-16 dark:bg-lightBgclr bg-lightModelightBg flex items-center py-4 px-6 rounded-md dark:border-markclr border-lightModelightBg border-2 font-semibold break-all' key={items.id}>
                <p className="flex-1">{items.text}</p>
              {hover === items.id && <button onClick={()=>deleteTodo(items.id)} className="text-lightmodemainTextclr dark:text-darkmainTextclr font-semibold rounded-md">{deleteTodoLoading ? 'clearing' : 'clear'}</button>}

              </div>
             
            )
          })}</fieldset>
          
  </section>
  )
}

export default TodoCompleted