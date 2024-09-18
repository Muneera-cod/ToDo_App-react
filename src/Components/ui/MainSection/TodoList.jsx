import React from 'react'
import { useRef } from 'react'
import { IconTrashFilled} from '@tabler/icons-react'
import { supabase } from '../../../services/supabaseClient'
import { toast } from 'react-toastify'
function TodoList(props) {

    const refinput=useRef(null)
    const insertdata = async () => {
        const { data, error } = await supabase
          .from('todos')
          .insert([{ text: props.todo ,is_complete:false}])
          .select();
        
        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Data inserted successfully:', data);
          toast.success("One task completed!", {
            position: "top-right",
            autoClose:1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            // progress: undefined,
            className:'bg-amber-100 text-zinc-700  font-mono font-semibold border-2 border-pink-300'
          });     
           props.fetchdata()
           

          props.seTodo('');
          refinput.current.focus(); 
          
        }
      };
      console.log("todos list contain",props.todos)

      const updatestatus=async(id)=>{
        const { data, error } = await supabase
        .from('todos')
        .update({ is_complete: true })
        .eq( 'id', id )
        .select()
    
        if (error) {
            console.error('Error updating data:', error);
          } else {
            console.log('Data updated successfully:', data);
          }
          props.fetchdata()
          toast.success("One task completed!", {
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

      const activeTasks = props.todos.filter((task) => !task.is_complete);
  return (
    <div className='flex flex-col py-5 lg:px-20 md:px-2 w-full min-h-full items-center gap-6'>
              <div className='flex items-center  gap-2  bg-amber-50 w-4/5 justify-center'>
                <input value={props.todo} type='text' className='rounded-lg p-2 border-2 border-zinc-600 sm:w-3/4 md:w-2/3' onChange={(e)=>props.seTodo(e.target.value)} ref={refinput}></input>
                 <button className='font-mono p-2 rounded-lg bg-green-500 border-2 border-zinc-600' onClick={insertdata}>Add</button>
              </div>
              
            
              
              <div className='flex flex-col w-11/12 min-h-2/4  p-5 gap-1 gap-2' >
            
              {activeTasks.map((items)=>{
                return(
                 <div className='w-100 min-h-2/4  md:p-6 sm:p-4 bg-green-200 border-2 border-zinc-600 rounded-full font-mono items-center  flex gap-3' onMouseEnter={()=>{props.setHover(items.id)}} onMouseLeave={()=>{props.setHover(null)}} key={items.id}>
                  <div className='flex-none w-6 h-6 rounded-full bg-green-50 hover:bg-green-900 border-2 border-zinc-600 ' onClick={()=>{updatestatus(items.id)}}></div>
                  <div className='flex-grow break-all ...'>{items.text}</div>
                  {props.hover===items.id && <IconTrashFilled className='flex-none text-green-500' onClick={()=>props.deleteTodo(items.id)}/>}
                 </div>
                )})}
                
                 </div>
                 {activeTasks.length===0?<div className='w-full h-1/2  flex justify-center items-center text-zinc-500 font-mono'>Add your tasks here</div>:null}
                 {/* <ToastContainer/>          */}
          </div>
  )
}

export default TodoList