import { useNavigate } from "react-router-dom"
import Todonav from "../ui/Todonav"
import { useSelector,useDispatch } from "react-redux"
import { toggleMode } from "../../redux/reducers/Theme/ThemeSlice"
import { IconMoonFilled,IconSun } from "@tabler/icons-react"
function LandinPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isDarkmode = useSelector((state)=>state.theme.isDarkmode)

  return (
    <>
  <header className='gap-6 flex text-lightmodemainTextclr w-full dark:text-darkmainTextclr top-0  fixed h-20 dark:bg-mainBgclr bg-lightModeMainBg sm:z-20 lg:z-10 sm:justify-between lg:justify-end sm:px-4 md:px-6 pt-6 pb-4 items-center '>
       
        { isDarkmode ?<IconMoonFilled className=' hover:text- text-lightmodemainTextclr dark:text-darkmainTextclr mx-2' onClick={()=>dispatch(toggleMode())}/>:<IconSun className=' hover:text- text-lightmodemainTextclr dark:text-darkmainTextclr mx-2' onClick={()=>dispatch(toggleMode())}/>}
        <button className="px-4 py-1 font-[700] text-lg  rounded-md " onClick={()=>navigate('login')}>Sign In</button>

  </header>    
  <main className="min-h-screen gap-6 flex flex-col justify-center items-center sm:p-2  md:p-14 lg:p-20">
    <div className="pt-12 justify-end items-center  flex flex-col gap-6 w-fit dark:bg-mainBgclr gap-4 bg-lightModeMainBg  text-lightmodemainTextclr dark:text-darkmainTextclr ">
        <p className="sm:text-2xl md:text-4xl lg:text-5xl  font-[700] uppercase text-lightmodemainTextclr dark:text-darkmainTextclr">Your Tasks, Your Way</p>
        <hr className="my-4 w-full h-2 rounded-full w-3/4 dark:opacity-20 border-0  dark:bg-markclr bg-lightModelightBg"/>
        <p className="sm:text-lg md:text-2xl lg:text-3xl font-[700] uppercase opacity-60 mt-4">Simplify | Organize | Achieve</p>
    <button className="min-w-fit my-6 px-8 py-2 text-lg w-1/4 text-lightModelightBg font-[700] rounded-lg bg-lightmodemainTextclr dark:bg-darksidebarClr dark:hover:bg-markclr dark:hover:bg-opacity-40 bg-opacity-90 hover:bg-opacity-100" onClick={()=>navigate('login')}>Try Now</button>
    </div>

  </main>
    
    </>
  )
}

export default LandinPage