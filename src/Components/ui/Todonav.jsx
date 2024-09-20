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
    <div className='flex  sm:justify-between lg:justify-end px-6 pt-6 pb-4 items-center  bg-lightBgclr'>
        <div className=' gap-5 sm:flex lg:hidden'>
          <><img src={profilepic} className='rounded-full size-8'></img>
            <div className='flex flex-col justify-end pb-2'>
                <p className='text-sm font-bold text-mainTextclr font-mono'>Hi, username</p>
                <p className='text-xs  text-mainTextclr'>Your todo list is here</p>
            </div></>
        </div>
        <div className='text-mainTextclr font-bold'><p className='lg:text-2xl sm:text-sm font-mono'>{currDate}</p></div>
    </div>
  )
}

export default Todonav