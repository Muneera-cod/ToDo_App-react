import {useState,useCallback, useEffect} from 'react'
import { useRef } from 'react'
import { IconCheck, IconTrashFilled} from '@tabler/icons-react'
import { useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '../../../redux/reducers/Api/TodoApi'
import { useGetUserQuery } from '../../../redux/reducers/Api/authApi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function TodoList({ todos,todosLoading,refetch ,todosError}) {
    const refinput=useRef(null)
    const[hover,setHover]=useState(false)
      const [todo,setTodo]=useState('')
      const [addTodo ,{isLoading,isError,isSuccess}] = useAddTodoMutation();
      const [updatestatus ,{isLoading:statusLoading,isSuccess:updated}] = useUpdateTodoMutation();
      const [deleteTodo ,{isLoading:deleteLoading ,isSuccess:deleted}] = useDeleteTodoMutation();
      const {data:user,error,isLoading:userLoading} = useGetUserQuery()
      const insertTodo=()=>{
        if(todo.trim() === '') return;
        try{
        addTodo({
          text:todo,
          is_complete:false,
          user_id:user.id
        }).unwrap()
        setTodo('')
        refinput.current.focus()
      }
      catch(err){
        console.log('Error',err)
      }
    }
   useEffect(()=>{
    if(isSuccess){
      toast.success('Task added successfully')
      refetch()
    }},[isSuccess])
    useEffect(()=>{if(isError) toast.error('Error adding task')},[isError])
  useEffect(()=>{
    if(updated){
      toast.success('Task completed successfully')
      refetch()
    }},[updated])
    useEffect(()=>{if(isError) toast.error('Error updating task status')},[isError])
    useEffect(()=>{
      if(deleted){
        toast.success('Task deleted successfully')
        refetch()
      } },[deleted])
    useEffect(()=>{
        if(isError) toast.error('Error deleting task') },[isError])
    console.log('todo',todo)
    const handleMouseEnter = useCallback((id) => {
      setHover(id);
    }, [setHover]);
    const handleMouseLeave = useCallback(() => {
      setHover(false);
    }, [setHover]);
      console.log(String(new Date()))
      const activeTasks = [...todos]?.filter((task) => !task.is_complete).sort((a,b)=>{
        const dateA = new Date(a.created_at);console.log('hh',dateA); 
        const dateB = new Date(b.created_at);
        return dateB - dateA}).map((todo)=>{ 
          const createdAtDate = new Date(todo.created_at);
          const today = new Date();
          
          // Compare year, month, and day
          const isToday =
            createdAtDate.getFullYear() === today.getFullYear() &&
            createdAtDate.getMonth() === today.getMonth() &&
            createdAtDate.getDate() === today.getDate();
          
          // Return updated todo object
          return isToday ? { ...todo, created_at: `Today at ${createdAtDate.toLocaleTimeString()}` } : todo;
        });
      if(todosLoading || userLoading || statusLoading || deleteLoading){
        return <div>Loading...</div>
      }
  return (
    <div className='h-full flex flex-col relative  md:px-2  w-full items-center gap-4'>
              <div className='flex items-center absolute   mx-auto bottom-0  gap-2 w-full justify-center'>
                <input 
                value={todo} 
                type='text' className=' rounded-lg p-2 border-[0.5px] dark:border-markclr  border-lightModelightBg w-full dark:bg-lightBgclr  focus:border-lightBgclr' 
                onChange={(e)=> setTodo(e.target.value)} 
                ref={refinput}></input>
                 <button disabled={isLoading} className='font-mono font-semibold p-2 rounded-lg dark:bg-lightBgclr bg-lightModelightBg border-2 dark:border-markclr  border-lightModelightBg   hover:bg-mainTextclr hover:text-lightBgclr  dark:hover:text-lightModelightBg  dark:hover:border-opacity-60  hover:bg-opacity-60 focus:border-lightBgclr' 
                 onClick={insertTodo}
                 >{isLoading ? 'Adding' : 'Add'}</button>
              </div>
              <div className='flex flex-col w-full sm:mb-16    overflow-y-scroll
                gap-2' >
              { activeTasks?.length===0 ? <div className='w-full  flex flex-col justify-start items-start    font-[700]'>
                  {/* <p className='text-2xl tracking-wide'>Welcome...🤗</p> */}
                  <p className='absolute top-[50%] left-[50%]  -translate-y-1/2 -translate-x-1/2  sm:text-3xl lg:text-3xl xl:text-5xl  uppercase opacity-40 dark:opacity-80  min-w-full dark:text-darksidebarClr text-lightModelightBg'>Add your To-Dos...</p>

                   </div> 
                   : activeTasks.sort((a,b)=>a.created_at - b.created_at)?.map((items)=>{
                return(
                  <div key={items.id}>
                                     { <p className='ml-auto flex-none opacity-50 sm:text-xs md:text-sm text-mainTextclr mb-1'>{items.created_at.includes("Today") ? items.created_at : items.created_at.split('T')[0]}</p>}

                                      {console.log('createdAt',items.created_at,typeof(items.created_at))}

                 <div className='w-full min-h-2/4 bg-opacity-60   md:p-6 sm:p-4 dark:bg-lightBgclr bg-lightModelightBg border-2 dark:border-markclr border-lightModelightBg rounded-md font-mono items-center  flex gap-5' onMouseEnter={()=>{handleMouseEnter(items.id)}} onMouseLeave={()=>{handleMouseLeave(false)}} >
                  <div className='flex-none flex items-center justify-center   w-6 h-6 rounded hover:bg-mainTextclr border-2 dark:border-markclr border-lightmodemainTextclr'
                   onClick={()=>{updatestatus({...items,is_complete:true})}}
                   ><IconCheck className={`${hover === items.id ? 'block' : 'hidden' }`}/></div>
                  <div className='flex-grow  text-mainTextclr break-all ...'>{items.text}</div>
                  {hover===items.id && <IconTrashFilled className='flex-none  text-mainTextclr '
                    onClick={()=>{deleteTodo(items.id)}}
                   />}
                 </div>

                 </div>
                )})}
                
                 </div>
                 
                 {todosError && <div className='w-full h-1/2  flex justify-center items-center  text-mainTextclr  font-mono'>An error occured while fetching</div>}
          </div>
  )
}
export default TodoList