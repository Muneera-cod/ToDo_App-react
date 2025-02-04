import { IconLogout } from '@tabler/icons-react'
import { sidebardata } from './DataSidebar'
import profile from '../../../assets/user_profile.jpg'
import { ToastContainer,toast } from 'react-toastify';
import { supabase } from '../../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeView } from '../../../redux/reducers/View/ViewSlice';
import { useGetUserQuery } from '../../../redux/reducers/Api/authApi';
function Sidebar() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { data:user,isError:userError} = useGetUserQuery();
    const logOut=async()=>{
      try{
        const { error } = await supabase.auth.signOut();
        toast.success('Logged out successfully!',{
          className:'bg-sidebarClr dark:bg-darksidebarClr text-lightmodemainTextclr dark:text-darkmainTextclr font-mono font-semibold border-2 border-markclr'
        });
        navigate('/')
      }
     catch(error){
      toast.error('Error logging out. Please try again!',{
        className:'bg-sidebarClr dark:bg-darksidebarClr text-lightmodemainTextclr dark:text-darkmainTextclr font-mono font-semibold border-2 border-markclr'
      });
     }
      
      
    }
   
  return (
    <div className='min-h-screen  text-lightmodemainTextclr   dark:text-darkmainTextclr  lg:top-0  w-fit fixed lg:z-20 bg-sidebarClr dark:bg-darksidebarClr w-fit flex flex-col  '>
      <ToastContainer/>
        <div className=' flex flex-col md:min-h-screen  sm:pt-[80px] lg:pt-0'>
        
         <div className='px-4 pt-8 pb-24 gap-4 sm:hidden lg:flex'>
             {user?.user_metadata.photoURL ? <img src={profile} className='rounded-full md:size-20 sm:size-8'></img> : <div className='flex  items-center uppercase justify-center text-4xl  rounded-full bg-amber-400 md:size-20 sm:size-8'><p className='font-[700]'>{user?.user_metadata.email.split('')[0]}</p></div>}
            
             <div className='flex flex-col justify-end pb-2 '>
                <p className='md:text-xl sm:text-sm font-bold text-mainTextclr font-mono max-w-[150px]'>Hi, {user?.user_metadata.first_name || 'Username'}</p>
                <p className='text-xs text-mainTextclr'>Your todo list is here</p>
            </div>
          </div>
          {sidebardata.map((items ,index)=>{
            return(
            <div className='cursor-pointer py-4 font-[700] sm:px-0 lg:px-10  sm:w-10 lg:w-72 text-mainTextclr  items-center sm:justify-center lg:justify-start flex dark:hover:bg-mainBgclr dark:hover:bg-opacity-40 hover:bg-lightModeMainBg hover:bg-opacity-20 gap-4'
             key={items.id}  onClick={()=>{ navigate(items.link);items.link?dispatch(changeView(1)):null;
                                    
                                    }}>
                                      {items.icon}
                   <div className='sm:hidden lg:block'>{items.name}</div>
            </div>)
          })}
          <div  className='sm:mt-40 lg:mt-auto flex sm:py-0 lg:py-6 gap-8 flex-col text-mainTextclr '>

           <div className=' sm:items-center lg:items-end justify-center sm:gap-0 lg:gap-4 sm:px-0 lg:px-4  flex  text-mainTextclr'><p className='text-mainTextclr font-[700]  sm:hidden lg:block'>Log out</p> <IconLogout className='cursor-pointer hover:text-mainBgclr' onClick={logOut}/></div>
           </div>
        </div>
        
        
        
    </div>
  )
}

export default Sidebar