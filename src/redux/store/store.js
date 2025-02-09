import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "../reducers/Theme/ThemeSlice";
import { viewReducer } from "../reducers/View/ViewSlice";
import { todoApi } from "../reducers/Api/TodoApi";
import { authApi } from "../reducers/Api/authApi";
import { sidebarReducer } from "../reducers/Sidebar/SidebarSlice";
export const store = configureStore({
    reducer:{
    theme: themeReducer,
    view: viewReducer,
    sidebar:sidebarReducer,
    todoApi:todoApi.reducer,
    authApi:authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware , authApi.middleware), 
})