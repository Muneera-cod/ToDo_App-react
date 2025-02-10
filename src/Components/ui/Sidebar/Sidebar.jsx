import { IconChevronLeft, IconChevronRight, IconLogout } from '@tabler/icons-react'
import { sidebardata } from './DataSidebar'
import profile from '../../../assets/user_profile.jpg'
import { toast } from 'react-toastify';
import { supabase } from '../../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { changeView } from '../../../redux/reducers/View/ViewSlice';
import { useGetUserQuery } from '../../../redux/reducers/Api/authApi';
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { toggleHide } from '../../../redux/reducers/Sidebar/SidebarSlice';
function Sidebar() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [show,setShow] = useState('')
   const sidebarHide = useSelector((state)=>state.sidebar)
   const { data:user,isError:userError} = useGetUserQuery();
   console.log('sidebar',sidebarHide)

    const logOut=async()=>{
      try{
        const { error } = await supabase.auth.signOut();
        toast.success('Logged out successfully!',{
          className:'bg-sidebarClr dark:bg-darksidebarClr text-lightmodemainTextclr dark:text-darkmainTextclr font-mono font-semibold border-2  dark:border-markclr p-3 border-lightModelightBg'
        });
        navigate('/')
      }
     catch(error){
      toast.error('Error logging out. Please try again!',{
        className:'bg-sidebarClr dark:bg-darksidebarClr text-lightmodemainTextclr dark:text-darkmainTextclr font-mono font-semibold border-2  dark:border-markclr p-3 border-lightModelightBg'
      });
     }
      
      
    }
   console.log(sidebarHide)
  return (
    <aside className='h-[100vh] fixed sm:z-20 bg-red-100 lg:top-0  text-lightmodemainTextclr   dark:text-darkmainTextclr  border-r-[0.3px] dark:border-[0px] border-opacity-20 shadow-md  border-sidebarClr  w-fit   bg-sidebarClr dark:bg-darksidebarClr'>
            {sidebarHide &&< IconChevronRight onClick={()=>dispatch(toggleHide())} className='text-lightmodemainTextclr   dark:text-darkmainTextclr cursor-pointer sm:hidden lg:block absolute z-30 mt-6 ml-6 mb-4'/>}
            {!sidebarHide && <IconChevronLeft onClick={()=>dispatch(toggleHide())} className='text-lightmodemainTextclr   dark:text-darkmainTextclr cursor-pointer sm:hidden lg:block w-[285px] relative z-30 mt-4  flex pl-[250px]'/>}


    {!sidebarHide && <div   className='transition delay-150 h-[calc(100vh-25px)]  duration-200 ease-in-out     text-lightmodemainTextclr   dark:text-darkmainTextclr  border-r-[0.3px] dark:border-[0px] border-opacity-20 shadow-md  border-sidebarClr  w-fit   bg-sidebarClr dark:bg-darksidebarClr  flex flex-col  sm:pt-28 lg:pt-0'>
        
         <div className='px-4  pb-10 gap-4 sm:hidden lg:flex'>
             {user?.user_metadata.photoURL ? <div className='border-2'><img src={profile} className=' rounded-full md:size-20 sm:size-8'></img></div> : <div className='border-2 border-opacity-20 border-lightmodemainTextclr dark:border-darkmainTextclr flex  items-center uppercase justify-center text-4xl  rounded-full bg-amber-400 md:size-20 sm:size-8'><p className='font-[700]'>{user?.user_metadata.email.split('')[0]}</p></div>}
            
             <div className='flex flex-col justify-end pb-2 '>
                <p className='md:text-xl sm:text-sm font-bold text-mainTextclr font-mono max-w-[150px]'>Hi, {user?.user_metadata.first_name || 'Username'}</p>
                <p className='text-xs text-mainTextclr'>Your todo list is here</p>
            </div>
          </div>
          <hr  className='sm:hidden md:block mb-10 mx-auto z-30 opacity-20 w-[95%] relative h-[2px] bottom-0  h-[2px] bg-lightmodemainTextclr dark:bg-darkmainTextclr  '/>

          {sidebardata.map((items ,index)=>{
            return(
            <div onMouseEnter={()=>setShow(items.id)} onMouseLeave={()=>setShow('')} className='cursor-pointer py-4 font-[700] sm:px-0 lg:px-10  sm:w-10 lg:w-72 text-mainTextclr  items-center sm:justify-center lg:justify-start flex dark:hover:bg-mainBgclr dark:hover:bg-opacity-40 hover:bg-lightModelightBg hover:bg-opacity-30 gap-4'
             key={items.id}  onClick={()=>{ navigate(items.link);items.link?dispatch(changeView(1)):null;
                                    
                                    }}>
                                      {items.icon}
                   <div className='sm:hidden lg:block'>{items.name}</div>
                   {items.id === show && <div  className='left-12 sm:block lg:hidden absolute rounded-md bg-white border-[0.2px]  py-2 px-4 dark:bg-mainBgclr  dark:border-markclr'><p className='min-w-fit inline'>{items.name}</p></div>}


            </div>
                              )
          })}
          <div  className='sm:mt-40 lg:mt-auto flex sm:py-0 lg:py-10 gap-8 flex-col text-mainTextclr '>

           <div  onMouseEnter={()=>setShow('logOut')} onMouseLeave={()=>setShow('')}
           className=' sm:items-center lg:items-end justify-center sm:gap-0 lg:gap-4 sm:px-0 lg:px-4  flex  text-mainTextclr'><p className='text-mainTextclr font-[700]  sm:hidden lg:block'>Log out</p> <IconLogout className='cursor-pointer hover:text-mainBgclr' onClick={logOut}/></div>
           </div>
           <div  className={`left-12 top-[400px]  absolute rounded-md  dark:border-markclr bg-white border-[0.2px]  py-2 px-4 dark:bg-mainBgclr ${'logOut' === show ? 'sm:block lg:hidden' : 'hidden'}`}><p className='min-w-fit inline'>LogOut</p></div>

        
        
    </div>}
    </aside>
  )
}

export default Sidebar