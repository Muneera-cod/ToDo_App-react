
import { useGetAllTodosQuery } from '../../../redux/reducers/Api/TodoApi'
import TodoCompleted from './TodoCompleted';
import TodoList from './TodoList'
import photoplaceholder from '../../../assets/images/todoApp (2).svg'
import { useEffect,useState } from 'react';
function TodoMainSection() {
          
            const { data:todos,isLoading:todosLoading,isError:todosError,refetch} = useGetAllTodosQuery()
            const completedTasks = todos?.filter((task) => task.is_complete).splice(0,10);
            const [currDate,setCurrDate]=useState('')

  console.log('Fetched Data:', todos);     
  useEffect(() => {
      const today = new Date();
      
      const formattedDate = today.toLocaleDateString('en-US', {
        day: '2-digit',        // '02'
        weekday: 'long',       // 'Tuesday'
        year: 'numeric'        // '2024'
      });
    
      setCurrDate(formattedDate);
    }, []);
    
  return (
    <section  className='h-[100%]  pt-20  w-full md:p-2  flex sm:flex-col md:flex-row  xl:gap-6'>
       <p className='w-full pt-4 pl-6 sm:text-lg lg:text-xl tracking-wide   font-bold flex gap-2 items-center justify-start '>{currDate}</p>
         <TodoList  todos={todos} refetch={refetch} todosLoading={todosLoading} todosError={todosError} />
       
          
        <div className='flex h-full  flex-col md:py-6 sm:hidden md:block   basis-full  dark:md:border-[0]  dark:border-markclr  ' >
           {todos.length!==0 && completedTasks.length !== 0 && <p className='text-lg mb-6 mx-6  font-mono font-semibold'>Completed tasks....</p>}
           <div className='flex flex-col gap-2 flex-col-reverse w-full px-6 max-h-[500px] overflow-y-scroll'>
                 
                 {completedTasks?.length===0?
                 <div className='w-full   h-full flex items-center justify-start  overflow-hidden font-mono'>
                  <div className='w-full  flex justify-center   items-center  text-mainTextclr  font-mono'>
                    {/* {todos.length===0? */}
                    <div className=' dark:opacity-10 opacity-50 dark:bg-black  rounded-full h-fit'><img className='relative z-[-1] w-full h-full' src={photoplaceholder}/></div>
                    {/* // :<p className='mt-32 font-[700]'>No tasks completed</p>} */}
                    </div></div>:null}
                 {completedTasks?.map((items)=>{
              return(
                <div className='line-through w-full bg-opacity-20  min-h-16 dark:bg-lightBgclr bg-lightModelightBg flex items-center py-4 px-6 rounded-md dark:border-markclr border-lightModelightBg border-2 font-semibold break-all' key={items.id}>{items.text}</div>
              )
            })}
            </div>
        </div>

       
    </section>
  )
}

export default TodoMainSection