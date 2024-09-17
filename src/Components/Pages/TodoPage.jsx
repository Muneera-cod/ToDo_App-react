import React from 'react'
import Todonav from '../ui/Todonav'
import Todofooter from '../ui/Todofooter'
import TodoMainSection from '../ui/MainSection/TodoMainSection'
import Sidebar from '../ui/Sidebar/Sidebar'
import { useState } from 'react'
function TodoPage() {
  const [sidebar,setSidebar]=useState(false)
  const handleSidebar=()=>{
       setSidebar(!sidebar)
       console.log(sidebar)
  }

   ///popup sidebar items
   const [popUp,setPopUp]=useState(null)
  
  
  return (
    <div className='min-h-screen w-full bg-amber-50 '>
      <div style={{position:'fixed',zIndex:10,boxShadow: '2px 2px 10px 3px gray'}} className='sm:hidden md:block' > 
        <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} setSidebar={setSidebar} setPopUp={setPopUp} popUp={popUp}/>
      </div>
    
      <div className='flex'>
       <div className={`w-1/6 sm:hidden md:block ${sidebar?'':'w-16 sm:hidden md:block '}`}></div>
        <div className='flex flex-col w-full '>
          <div style={{position:'sticky',top:0}}>
            <Todonav/>
          </div>
          <div className='flex flex-col'>
              <TodoMainSection setPopUp={setPopUp} popUp={popUp}/>
              {/* <Todofooter/> */}
              
          </div>
        </div>
      
        
      </div>
    </div>
    
  )
}

export default TodoPage