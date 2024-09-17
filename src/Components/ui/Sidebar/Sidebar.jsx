import React from 'react'
import { IconMenu2,IconLogout2 } from '@tabler/icons-react'
import { sidebardata } from './DataSidebar'
import { useState } from 'react'
function Sidebar(props) {
                        // const [sidebar,setSidebar]=useState(false)
                        // const handleSidebar=()=>{
                        //      setSidebar(!sidebar)
                        // }

  ///popUp
//   const popUpsetting=()=>{
//     props.setPopUp(1)
// }
// const popUpProfile=()=>{
//   props.setPopUp(2)
// }
  return (
    <div className='h-screen  bg-amber-50  gap-28 flex flex-col'>
        <div className='p-4 text-zinc-500'><IconMenu2 onClick={props.handleSidebar}/></div>
        <div className=' flex flex-col h-screen'>
          {sidebardata.map((items ,index)=>{
            return(
            <div className={`p-4 text-zinc-500 hover:text-green-600 items-center flex hover:bg-gradient-to-r from-pink-200 to-amber-50 hoverborder gap-3 ${!props.sidebar?'':' pr-20 pl-8  py-4  text-zinc-500 hover:text-green-600 items-center flex hover:bg-gradient-to-r from-pink-200 to-amber-50 hoverborder gap-3'}`}  key={index} >{items.icon}
                   <div className={`block ${props.sidebar?'':'hidden'}`}>{items.name}</div>
            </div>)
          })}
          <div  className={`h-full items-end justify-center flex p-4 text-zinc-500${!props.sidebar?'':'h-full items-end  gap-10 p-8 flex  text-zinc-500'}`}>
            <IconLogout2 /><p className={`block ${props.sidebar?'':'hidden'}`}>Log out</p></div>
            {console.log(props.popUp)}
        </div>
        
        
        
    </div>
  )
}

export default Sidebar