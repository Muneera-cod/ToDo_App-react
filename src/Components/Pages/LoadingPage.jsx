import { Grid } from "react-loader-spinner"
function LoadingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen font-[700] text-lg dark:bg-mainBgclr bg-lightModeMainBg  text-lightmodemainTextclr dark:text-darkmainTextclr  ">
<Grid
  visible={true}
  height="80"
  width="80"
  color="rgb(255, 131, 3,0.5)"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />    </div>
  )
}

export default LoadingPage