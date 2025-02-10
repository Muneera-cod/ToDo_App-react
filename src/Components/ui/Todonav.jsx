import React from 'react'
import profilepic from '../../assets/user_profile.jpg'
import { toggleHide } from '../../redux/reducers/Sidebar/SidebarSlice'
import {IconChevronRight, IconChevronLeft,IconMoonFilled,IconSun, IconMenu2 } from '@tabler/icons-react'
import { toggleMode } from '../../redux/reducers/Theme/ThemeSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useGetUserQuery } from '../../redux/reducers/Api/authApi'
function Todonav() {
const dispatch = useDispatch()
const isDarkmode = useSelector((state)=>state.theme.isDarkmode)
const sidebarHide = useSelector((state)=>state.sidebar)

const { data:user , isError:userError} = useGetUserQuery();


  return (
    <header className='flex text-lightmodemainTextclr w-full dark:text-darkmainTextclr top-0  fixed h-20 dark:bg-lightBgclr bg-lightModelightBg sm:z-20 lg:z-10 sm:justify-between lg:justify-end sm:px-4 md:px-6 pt-6 pb-4 items-center '>
        {/* <div className={`gap-4 sm:flex lg:hidden ${sidebarHide ? 'ml-6' : 'ml-0'}`}>
          <>             {user?.user_metadata.photoURL ? <img src={profile} className='rounded-full size-8'></img> : <div className='flex  items-center uppercase justify-center text-md  rounded-full bg-amber-400 size-8'><p className='font-[700]'>{user?.user_metadata.email.split('')[0]}</p></div>}
            <div className='flex flex-col justify-end pb-2 '>
                <p className='text-sm font-bold  font-mono'>Hi, {user?.user_metadata.email ? user.user_metadata.email.split('@')[0]:'username'}</p>
                <p className='text-xs '>Your todo list is here</p>
            </div></>
        </div> */}
            {sidebarHide &&< IconMenu2 onClick={()=>dispatch(toggleHide())} className='sm:-ml-2 md:-ml-4 cursor-pointer sm:block lg:hidden '/>}
            {!sidebarHide && <IconMenu2 onClick={()=>dispatch(toggleHide())} className='sm:-ml-2 md:-ml-4  cursor-pointer sm:block lg:hidden '/>}

        { isDarkmode ?<IconMoonFilled className=' hover:text- text-lightmodemainTextclr dark:text-darkmainTextclr mx-2' onClick={()=>dispatch(toggleMode())}/>:<IconSun className=' hover:text- text-lightmodemainTextclr dark:text-darkmainTextclr mx-2' onClick={()=>dispatch(toggleMode())}/>}

    </header>
  )
}

export default Todonav