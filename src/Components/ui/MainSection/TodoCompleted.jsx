import { useGetAllTodosQuery } from "../../../redux/reducers/Api/TodoApi";
import { useNavigate } from "react-router-dom";
function TodoCompleted() {
  const navigate = useNavigate()
  const { data: todos ,isLoading,isError} = useGetAllTodosQuery();
    const completedTasks = todos?.filter((task) => task.is_complete);
    if(isLoading){
      return <div>Loading...</div>
    }
    if(isError){
      return <div>Error</div>
    }
  return ( 
  <>
      <p onClick={()=>navigate('/')} className="mr-auto font-[700] text-sm opacity-40 hover:opacity-100 text-lightmodemainTextclr dark:text-darkmainTextclr  z-20 ">back</p>

    <button className='ml-auto px-4 bg-opacity-40 hover:bg-opacity-80 py-2 mt-2 bg-lightModelightBg dark:bg-lightBgclr text-lightmodemainTextclr dark:text-darkmainTextclr font-semibold rounded-md'>Clear</button>
    <p className='text-xl  font-mono font-semibold'>Your Completed tasks....</p>
    <div className='flex flex-col flex-col-reverse w-full max-h-[90%] py-4  gap-3  overflow-auto'>
                 
                 {completedTasks?.length===0?<div className='w-full h-1/2  flex items-center justify-center mt-32   font-mono'>{todos.length===0?'No tasks added':'No tasks completed'}</div>:null}
          {completedTasks?.map((items)=>{
            return(
              <div className='w-full bg-opacity-20  min-h-16 dark:bg-lightBgclr bg-lightModelightBg flex items-center py-4 px-6 rounded-md dark:border-markclr border-lightModelightBg border-2 font-semibold break-all' key={items.id}>{items.text}</div>
            )
          })}</div>
          
  </>
  )
}

export default TodoCompleted