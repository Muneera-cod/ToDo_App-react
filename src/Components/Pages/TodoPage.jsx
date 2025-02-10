import React, { useEffect } from 'react'
import Todonav from '../ui/Todonav'
import TodoMainSection from '../ui/MainSection/TodoMainSection'
import Sidebar from '../ui/Sidebar/Sidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useGetAllTodosQuery } from '../../redux/reducers/Api/TodoApi'
import { useGetUserQuery } from '../../redux/reducers/Api/authApi'
import LoadingPage from './LoadingPage'
import { ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { changeView } from '../../redux/reducers/View/ViewSlice'
import { useDispatch,useSelector } from 'react-redux'
function TodoPage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const currView = useSelector((state) => state.view.currView)
  const sidebarHide = useSelector((state)=>state.sidebar)

  

  
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
            {(currView === 0 || location.pathname === '/') && <Todonav />}
            {location.pathname !== '/reset-password' && location.pathname === '/' && <Sidebar />}


    
          
         
          <main className={`flex flex-col h-full overflow-hidden dark:bg-mainBgclr bg-lightModeMainBg  absolute  items-center justify-between ${(sidebarHide || location.pathname !== '/') ? 'sm:left-[0px] lg:left-[0px] w-[100%]' : 'sm:left-[40px] lg:left-[285px]'} right-0 sm:py-2   lg:py-4 sm:px-2   lg:px-6  top-0`}>
          
       
              { (currView === 0 || location.pathname === '/') && <TodoMainSection />}
              {/* <Todofooter/> */}
              { (currView === 1 ) && <Outlet/>}
               
              
          </main>
      
        
    </>
    
  )
}

export default TodoPage