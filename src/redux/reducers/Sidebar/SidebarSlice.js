import { createSlice } from "@reduxjs/toolkit";
const initialState = false
const sidebarSlice = createSlice({
    name:'sidebar',
    initialState,
    reducers:{
        toggleHide(state){
         return !state
        }
    }
})
export const  { toggleHide } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer