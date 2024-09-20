import React from 'react'
import { IconMenu2,IconLogout } from '@tabler/icons-react'
import { sidebardata } from './DataSidebar'
import profile from '../../../assets/user_profile.jpg'
import { useState } from 'react'
function Sidebar(props) {
                        // const [sidebar,setSidebar]=useState(false)                         ///popUp
//   const popUpsetting=()=>{
//     props.setPopUp(1)
// }
// const popUpProfile=()=>{
//   props.setPopUp(2)
// }
                        // const handleSidebar=()=>{
                        //      setSidebar(!sidebar)
                        // }


  return (
    <div className='h-screen bg-sidebarClr w-fit flex flex-col'>
        {/* <div className='p-4 text-zinc-500'><IconMenu2 onClick={props.handleSidebar}/></div> */}
        <div className=' flex flex-col h-screen'>
        
         <div className=' px-4 pt-8 pb-24 gap-5 sm:hidden lg:flex'>
             <img src={profile} className='rounded-full md:size-20 sm:size-8'></img>
             <div className='flex flex-col justify-end pb-2 '>
                <p className='md:text-xl sm:text-sm font-bold text-mainTextclr font-mono'>Hi, username</p>
                <p className='text-xs text-mainTextclr'>Your todo list is here</p>
            </div>
          </div>
          {sidebardata.map((items ,index)=>{
            return(
            <div className='py-4 sm:px-0 lg:px-10  sm:w-10 lg:w-72 text-mainTextclr  items-center flex hover:bg-gradient-to-r from-mainBgclr to-sidebarClr gap-4'
             key={index}  onClick={()=>{ 
                                      if (items.name === 'Profile') {
                                        props.setPopUp(1);
                                      } else if (items.name === 'Settings') {
                                        props.setPopUp(2);
                                      } else {
                                        props.setPopUp(null); 
                                      }
                                    }}>
                                      {items.icon}{console.log(props.sidebar)}
                   <div className='sm:hidden lg:block'>{items.name}</div>
            </div>)
          })}
          <div  className='h-full items-end justify-center sm:gap-0 lg:gap-4 sm:py-0 lg:py-6 sm:px-0 lg:px-4  flex  text-mainTextclr'>
           <p className='text-mainTextclr font-mono sm:hidden lg:block'>Log out</p> <IconLogout className='hover:text-mainBgclr'/></div>
            {console.log(props.popUp)}
        </div>
        
        
        
    </div>
  )
}

export default Sidebar