import React from 'react'
import profilepic from '../../../assets/user_profile.jpg'
import { IconUserCircle } from '@tabler/icons-react'
function Profilee() {
  return (
    <div className="center w-1/3 min-h-1/2 border-2 border-zinc-700  rounded-lg flex p-10 flex-col gap-5">
      <div className='flex gap-4 items-center w-full'> 
        <img src={profilepic} className='rounded-full lg:size-20 md:size-20'></img>
        <p className='font-bold text-zinc-700 font-mono text-xl'> Username</p>
      </div>
      <hr></hr>
      <div className='py-5 flex flex-col gap-4 '>
          <div className='flex  gap-20 '><p className='font-semibold text-zinc-700 font-mono text-md'>Update photo</p></div>
          <div><p className='font-semibold text-zinc-700 font-mono text-md'>Update password</p></div>
        
      </div>
   


  </div>
  )  
}

export default Profilee