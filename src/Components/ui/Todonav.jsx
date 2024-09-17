import React from 'react'
import { IconSettingsFilled} from '@tabler/icons-react'
import profilepic from '../../assets/user_profile.jpg'
import { useState,useEffect } from 'react'
function Todonav() {
const [currDate,setCurrDate]=useState('')

useEffect(() => {
  const today = new Date();
  
  // Formatting the date: '02, Tuesday, 2024'
  const formattedDate = today.toLocaleDateString('en-US', {
    day: '2-digit',        // '02'
    weekday: 'long',       // 'Tuesday'
    year: 'numeric'        // '2024'
  });

  setCurrDate(formattedDate);
}, []);

  return (
    <div className='flex  justify-between px-6 pt-6 pb-4 items-center bg-amber-50'>
        <div className='flex gap-5'>
            <img src={profilepic} className='rounded-full lg:size-20 md:size-8'></img>
            <div className='flex flex-col justify-end pb-2'>
                <p className='lg:text-2xl md:text-sm font-bold text-zinc-700 font-mono'>Hi, username</p>
                <p className='lg:text-sm md:text-xs text-zinc-500'>Your todo list is here</p>
            </div>
        </div>
        <div className='text-zinc-600 font-bold'><p className='lg:text-2xl md:text-sm font-mono'>{currDate}</p></div>
    </div>
  )
}

export default Todonav