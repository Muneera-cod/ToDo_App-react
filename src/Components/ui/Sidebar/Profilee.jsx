import React from 'react'
import profilepic from '../../../assets/user_profile.jpg'
import { IconUserCircle,IconCalendarFilled,IconMailFilled} from '@tabler/icons-react'
function Profilee() {
  return (
    <div className="center w-2/3 max-h-2/3 border-2 border-markclr bg-lightBgclr  rounded-lg flex sm:p-4 lg:p-10 flex-col gap-5 " style={{position:'fixed',top:'50%',left:'50%', transform: 'translate(-50%, -50%)',background:'#1b1a17'}}>
      <div className='flex gap-4 items-center w-full'> 
        <img src={profilepic} className='rounded-full size-20'></img>
        <p className='font-bold  text-mainTextclr font-mono text-xl'> Username</p>
      </div>
      <hr className='border-markclr'></hr>
      <div className='py-5 sm:px-5 lg:px-20 flex flex-col gap-4 text-mainTextclr'>
        <div className='flex justify-between items-center sm:text-xs lg:text-lg'>
         <div  className='flex  sm:gap-4 lg:gap-10 '><IconMailFilled className='sm:size-8 lg:size-10'/><p className='font-semibold  font-mono text-md'>Email</p></div>
         <div>email@gmail.com</div>
        </div>
        <div className='flex justify-between items-center sm:text-xs lg:text-lg'>
          <div className='flex  sm:gap-4 lg:gap-10'><IconCalendarFilled className='sm:size-8 lg:size-10'/><p className='font-semibold font-mono text-md'>Date joined</p></div>
          <div>mm/dd/yyyy</div>
        </div>  
        
      </div>
   


  </div>
  )  
}

export default Profilee