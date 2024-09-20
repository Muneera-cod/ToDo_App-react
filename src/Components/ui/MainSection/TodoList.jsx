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
          toast.success("One task Added!", {
            position: "top-right",
            autoClose:1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            // progress: undefined,
           className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
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
           className:'bg-lightBgclr text-mainTextclr  font-mono font-semibold border-2 border-markclr'
          });     
        }

      const activeTasks = props.todos.filter((task) => !task.is_complete);
  return (
    <div className='flex flex-col py-5  md:px-2 w-full min-h-full items-center gap-6 '>
              <div className='flex items-center  gap-2 w-4/5 justify-center'>
                <input value={props.todo} type='text' className='rounded-lg p-2 border-2 border-markclr w-full bg-lightBgclr text-mainTextclr focus:border-lightBgclr' onChange={(e)=>props.seTodo(e.target.value)} ref={refinput}></input>
                 <button className='font-mono font-semibold p-2 rounded-lg bg-lightBgclr border-2 border-markclr  text-mainTextclr hover:bg-mainTextclr hover:text-lightBgclr hover:border-lightBgclr focus:border-lightBgclr' onClick={insertdata}>Add</button>
              </div>
              
            
              
              <div className='flex flex-col w-full min-h-2/4  gap-1 gap-2' >
            
              {activeTasks.map((items)=>{
                return(
                 <div className='w-full min-h-2/4  md:p-6 sm:p-4 bg-lightBgclr border-2 border-markclr rounded-md font-mono items-center  flex gap-5' onMouseEnter={()=>{props.setHover(items.id)}} onMouseLeave={()=>{props.setHover(null)}} key={items.id}>
                  <div className='flex-none   w-6 h-6 rounded bg-lightBgclr hover:bg-mainTextclr border-2 border-markclr' onClick={()=>{updatestatus(items.id)}}></div>
                  <div className='flex-grow  text-mainTextclr break-all ...'>{items.text}</div>
                  {props.hover===items.id && <IconTrashFilled className='flex-none  text-mainTextclr ' onClick={()=>props.deleteTodo(items.id)}/>}
                 </div>
                )})}
                
                 </div>
                 {activeTasks.length===0?<div className='w-full h-1/2  flex justify-center items-center  text-mainTextclr  font-mono'>Add your tasks here</div>:null}
                 {/* <ToastContainer/>          */}
          </div>
  )
}

export default TodoList