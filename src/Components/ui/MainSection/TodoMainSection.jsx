
import { useGetAllTodosQuery } from '../../../redux/reducers/Api/TodoApi'
import TodoCompleted from './TodoCompleted';
import TodoList from './TodoList'
function TodoMainSection() {
          
            const { data:todos,isLoading:todosLoading,isError:todosError,refetch} = useGetAllTodosQuery()
            const completedTasks = todos?.filter((task) => task.is_complete).splice(0,10);

  console.log('Fetched Data:', todos);     
    
  return (
    <div  className=' min-h-screen w-full md:p-2  flex sm:flex-col xl:flex-row  sm:gap-20 xl:gap-8'>
       
        <div className='  flex sm:p-0 md:p-6 sm:basis-full    dark:md:border-2 dark:border-markclr  ' >
         <TodoList  todos={todos} refetch={refetch} todosLoading={todosLoading} todosError={todosError}
       
         />
       
          
        </div>
        <div className='  flex  flex-col  md:p-6 sm:basis-full    dark:md:border-2 dark:border-markclr  ' >
           <p className='text-lg  font-mono font-semibold'>Your Completed tasks....</p>
           <div className='flex flex-col flex-col-reverse w-full py-4  gap-3  overflow-auto'>
                 
                 {completedTasks?.length===0?<div className='w-full h-1/2  flex items-center justify-center mt-32   font-mono'>{todos.length===0?'No tasks added':'No tasks completed'}</div>:null}
                 {completedTasks?.map((items)=>{
              return(
                <div className='w-full bg-opacity-20  min-h-16 dark:bg-lightBgclr bg-lightModelightBg flex items-center py-4 px-6 rounded-md dark:border-markclr border-lightModelightBg border-2 font-semibold break-all' key={items.id}>{items.text}</div>
              )
            })}
            </div>
        </div>

       
    </div>
  )
}

export default TodoMainSection