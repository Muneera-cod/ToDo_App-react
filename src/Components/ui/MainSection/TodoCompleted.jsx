import React from 'react'

function TodoCompleted(props) {

    const completedTasks = props.todos.filter((task) => task.is_complete);
  return (
    <>
    <p className='text-xl text-zinc-700 font-mono font-semibold'>Your Completed tasks....</p>
                 {completedTasks.length===0?<div className='w-full h-1/2  flex items-center justify-center text-zinc-500 font-mono'>{props.todos.length===0?'No tasks added':'No tasks completed'}</div>:null}
          {completedTasks.map((items)=>{
            return(
              <div className='w-2/5 min-h-16 bg-green-600 flex items-center py-4 px-6 rounded-full font-semibold break-all'>{items.text}</div>
            )
          })}</>
  )
}

export default TodoCompleted