import { createBrowserRouter } from "react-router-dom";

import TodoCompleted from "../../Components/ui/MainSection/TodoCompleted";
import LoadingPage from "../../Components/Pages/LoadingPage";
import ResetPasswordFrom from "../../Components/ui/ResetPasswordFrom";
import { lazy,Suspense } from "react";
import ProfilePage from "../../Components/ui/ProfilePAge/ProfilePage";
import Setting from "../../Components/ui/SettingPage/Setting";
const TodoPage=lazy(()=>import('../../Components/Pages/TodoPage'));

export const mainrouter=createBrowserRouter([
   
   
    {
        path:'/',
        element:<Suspense fallback={<LoadingPage/>}><TodoPage/></Suspense>,
        children:[
            {
                path:'completedTasks',
                element:<TodoCompleted/>
            },
            {
                path:'profile',
                element:<ProfilePage/>
            },
            {
                path:'settings',
                element:<Setting/>
            }
           
        ]

    },
    {
        path:'/reset-password',
        element:<ResetPasswordFrom/>
    }
])