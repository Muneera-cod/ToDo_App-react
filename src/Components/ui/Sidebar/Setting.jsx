import React from "react";
import { IconUserCircle,IconPasswordUser,IconMailFilled, IconPassword} from '@tabler/icons-react'
function Setting() {
  return (
    <div className="center w-2/3 max-h-2/3 border-2 border-markclr bg-lightBgclr  rounded-lg flex  sm:p-2 lg:p-10 flex-col gap-5 " style={{position:'fixed',top:'50%',left:'50%', transform: 'translate(-50%, -50%)',background:'#1b1a17'}}>
    <hr className="border-markclr"></hr>
    <div className='py-5 sm:px-5 lg:px-20 flex flex-col gap-4 text-mainTextclr'>
        <div className='flex justify-between items-center sm:text-xs lg:text-lg'>
         <div  className='flex  sm:gap-3 lg:gap-10 items-center'><IconUserCircle className="sm:size-8 lg:size-10"/><p className='font-semibold  font-mono text-md'>Update username</p></div>
         <div>Firstname lastname</div>
        </div>
        <div className='flex justify-between items-center sm:text-xs lg:text-lg'>
          <div className='flex sm:gap-3 lg:gap-10 items-center'><IconPasswordUser  className="sm:size-8 lg:size-10"/><p className='font-semibold font-mono text-md'>Password</p></div>
          <div className="flex"><IconPassword/><IconPassword/></div>
        </div> 
        <div className='flex justify-between items-center sm:text-xs lg:text-lg'>
         <div  className='flex sm:gap-3 lg:gap-10 items-center'><IconMailFilled  className="sm:size-8 lg:size-10"/><p className='font-semibold  font-mono text-md'>Update email</p></div>
         <div>email@gmail.com</div>
        </div> 
        
      </div>
 


</div>
  );
}
export default Setting 