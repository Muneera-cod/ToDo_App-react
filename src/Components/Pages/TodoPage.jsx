import React, { useEffect } from 'react'
import Todonav from '../ui/Todonav'
import TodoMainSection from '../ui/MainSection/TodoMainSection'
import Sidebar from '../ui/Sidebar/Sidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetAllTodosQuery } from '../../redux/reducers/Api/TodoApi'
import { useGetUserQuery } from '../../redux/reducers/Api/authApi'
import LoadingPage from './LoadingPage'
import { ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { changeView } from '../../redux/reducers/View/ViewSlice'
import { useDispatch } from 'react-redux'
function TodoPage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const currView = useSelector((state) => state.view.currView)
  const [currDate,setCurrDate]=useState('')
 
  useEffect(() => {
    const today = new Date();
    
    const formattedDate = today.toLocaleDateString('en-US', {
      day: '2-digit',        // '02'
      weekday: 'long',       // 'Tuesday'
      year: 'numeric'        // '2024'
    });
  
    setCurrDate(formattedDate);
  }, []);

  
  const { data:todos, isLoading, isError, error,refetch } = useGetAllTodosQuery();
  const { data: user, error: userError,isLoading:userLoading } = useGetUserQuery();
  useEffect(() => {
    if(user){refetch()}}, [user])

  console.log('Fetched Data:', todos);

  useEffect(()=>{
    if(location.pathname === '/'){
      dispatch(changeView(0))
    }
    else{
      dispatch(changeView(1))
    }},[location.pathname])

if(isLoading || userLoading) {
  return <LoadingPage/>
}
if(isError){
  console.log(isError,error.message)
  return <div>Error{error?.message}</div> 
}

    
  return (
    <>
            <Sidebar />
          
    <div className='min-h-screen dark:bg-mainBgclr bg-lightModeMainBg  w-full text-lightmodemainTextclr dark:text-darkmainTextclr  flex sm:flex-col-reverse lg:flex-row '>
    
        <div className='flex flex-col w-full min-h-full'>
          
            {(currView === 0 || location.pathname === '/') && <Todonav />}
         
          <div className={`flex flex-col gap-8  dark:bg-mainBgclr bg-lightModeMainBg  absolute  items-center justify-center sm:left-[40px] lg:left-[285px] right-0 sm:py-6   lg:py-6 sm:px-2   lg:px-6  ${(currView === 0 || location.pathname === '/') ? 'top-20' : 'top-0'}`}>
          {(currView === 0 || location.pathname === '/') && <p className='w-fit ml-auto sm:text-lg lg:text-2xl   font-bold flex gap-2 items-center justify-end '>{currDate}</p>}
       
              { (currView === 0 || location.pathname === '/') && <TodoMainSection />}
              {/* <Todofooter/> */}
              { (currView === 1 ) && <Outlet
               
               />}
               
              
          </div>
        </div>
      
        
    </div>  
    </>
    
  )
}

export default TodoPage