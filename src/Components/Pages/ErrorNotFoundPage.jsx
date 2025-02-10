import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function ErrorNotFoundPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => navigate(-1), 2000);
    return () => clearTimeout(timer); 
  }, [navigate]);
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen font-[700] text-md dark:bg-mainBgclr bg-lightModeMainBg  text-red-800 dark:text-red-400 ">
    <div className="px-10 py-6 bg-red-300 bg-opacity-10 border-[0.5px] border-red-200 rounded-md">
    <p className="text-lg">404</p>

        <p>Not Found</p>
        </div>     
</div>
  )
}

export default ErrorNotFoundPage