
import { lazy,Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ForgetPwdForm from "../../Components/ui/ForgetPwdForm";
import LoadingPage from "../../Components/Pages/LoadingPage";
import ResetPasswordFrom from "../../Components/ui/ResetPasswordFrom";
const LandinPage = lazy(()=> import("../../Components/Pages/LandinPage"))
const Login = lazy(() => import("../../Components/Pages/Login"));
const SignUp = lazy(() => import("../../Components/Pages/SignUp"));
export const unauthRouter=createBrowserRouter([
{
    path:'/',
    element:<Suspense fallback={<LoadingPage/>}
    ><LandinPage/></Suspense>
},
    {
        path:'/login',
        element:<Suspense fallback={<LoadingPage/>}><Login/></Suspense>,
        children:[
      
            {
                path:'forgot-password',
                element:<ForgetPwdForm/>
            },
            {
                path:'reset-password',
                element:<ResetPasswordFrom/>
            }
        ]
   
},
{
    path:'/signUP',
    element:<Suspense  fallback={<LoadingPage/>}
        ><SignUp/></Suspense>
},
])