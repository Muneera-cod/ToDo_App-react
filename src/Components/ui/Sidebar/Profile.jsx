import React from 'react'
import profilepic from '../../../assets/user_profile.jpg'
function Profile() {
  return (
    <div className="center w-2/4 min-h-1/2 border-2 border-zinc-700  rounded-lg flex py-14 px-10 flex-col gap-5">
    <div className='flex gap-4'> <img src={profilepic} className='rounded-full lg:size-20 md:size-8'></img><p>Change username</p></div>
    <p>Change photo</p>
    <p>Change password</p>


  </div>
  )
}

export default Profile