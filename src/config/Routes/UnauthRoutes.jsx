
import { lazy,Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ForgetPwdForm from "../../Components/ui/ForgetPwdForm";
import LoadingPage from "../../Components/Pages/LoadingPage";
const Login = lazy(() => import("../../Components/Pages/Login"));
const SignUp = lazy(() => import("../../Components/Pages/SignUp"));
export const unauthRouter=createBrowserRouter([
{
    path:'/',
    element:<Suspense fallback={<LoadingPage/>}
    ><Login/></Suspense>,
    children:[
        {
            path:'Forgotpassword',
            element:<ForgetPwdForm/>
        }
    ]
},
{
    path:'/signUP',
    element:<Suspense  fallback={<LoadingPage/>}
        ><SignUp/></Suspense>
},])