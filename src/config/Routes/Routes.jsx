import { createBrowserRouter } from "react-router-dom";
import Login from "../../Components/Pages/Login";
import SignUp from "../../Components/Pages/SignUp";
import TodoPage from "../../Components/Pages/TodoPage";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<SignUp/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/todopage',
        element:<TodoPage/>

    }
])