import React from 'react'

function TodoCompleted(props) {

    const completedTasks = props.todos.filter((task) => task.is_complete);
  return ( <>
    <p className='text-xl text-mainTextclr font-mono font-semibold'>Your Completed tasks....</p>
    <div className='flex flex-col flex-col-reverse w-full max-h-[90%]   gap-3  overflow-auto'>
  
                 {completedTasks.length===0?<div className='w-full h-1/2  flex items-center justify-center mt-32 text-mainTextclr  font-mono'>{props.todos.length===0?'No tasks added':'No tasks completed'}</div>:null}
          {completedTasks.map((items)=>{
            return(
              <div className='w-full text-mainTextclr min-h-16 bg-lightBgclr flex items-center py-4 px-6 rounded-md border-markclr border-2 font-semibold break-all'>{items.text}</div>
            )
          })}</div></>
  )
}

export default TodoCompleted