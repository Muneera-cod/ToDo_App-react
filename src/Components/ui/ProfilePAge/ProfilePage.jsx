import TopPart from "./TopPart"
import { useGetUserQuery } from "../../../redux/reducers/Api/authApi"
import {  IconCalendarClock, IconCopyCheckFilled, IconMailFilled, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useGetAllTodosQuery } from "../../../redux/reducers/Api/TodoApi";
import LoadingPage from "../../Pages/LoadingPage";
import ErrorFetch from "../../Pages/ErrorFetch";
function ProfilePage() {
  const { data: user, isError,isLoading } = useGetUserQuery();
  const { data:todos , isLoading:todosLoading} = useGetAllTodosQuery()
  const joinedDate = user?.created_at.split('T')
  const joinedTime = joinedDate?.[1].split(':')
  const navigate = useNavigate()
  function getAmPm(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getUTCHours();
    return hours >= 12 ? 'PM' : 'AM';
  }
  if(isLoading){
    return <LoadingPage/>
  }
  if(isError){
    return <ErrorFetch/>
  }
  return (
    <>
    
      { user && todos && <><p onClick={()=>navigate('/')} className="ml-auto font-[700] text-sm opacity-40 hover:opacity-100 text-lightmodemainTextclr dark:text-darkmainTextclr  z-20 ">back</p>
     <TopPart user={user}/>
     <div className="flex w-full px-2 sm:text-xs md:text-md font-[700] justify-between items-center border-b-2 py-2 pt-6 border-lightModelightBg dark:border-lightBgclr">
        <p className="flex gap-2 items-center justify-center "><IconUser className="w-[20px] h-[20px]"/> Name</p> 
        <p>{user?.user_metadata.first_name || 'Not Added'} {user?.user_metadata.last_name}</p>
     </div>
     <div className="flex w-full  px-2 sm:text-xs md:text-md  font-[700] justify-between items-center border-b-2 py-2 pt-6 border-lightModelightBg dark:border-lightBgclr">
        <p className="flex gap-2 items-center justify-center"><IconMailFilled className="w-[20px] h-[20px]"/> Email</p> 
        <p>{user?.user_metadata.email}</p>
     </div>
     <div className="flex w-full px-2 sm:text-xs md:text-md font-[700] justify-between items-center border-b-2 py-2 pt-6 border-lightModelightBg dark:border-lightBgclr">
        <p className="flex gap-2 items-center justify-center"><IconCalendarClock className="w-[20px] h-[20px]"/> Joined at</p> 
        <p>{joinedDate[0]},{joinedTime[0]}:{joinedTime[1]} {getAmPm( user?.created_at)}</p>
     </div>
     <div className="flex w-full px-2 sm:text-xs md:text-md font-[700] justify-between items-center border-b-2 py-2 pt-6 border-lightModelightBg dark:border-lightBgclr">
        <p className="flex gap-2 items-center justify-center"><IconCopyCheckFilled className="w-[20px] h-[20px]"/>Completed Tasks</p> 
        <p>{todosLoading ? 'Loading' : todos?.filter((x)=>x.is_complete === true).length}</p>
     </div></>}
    </>
  )
}

export default ProfilePage