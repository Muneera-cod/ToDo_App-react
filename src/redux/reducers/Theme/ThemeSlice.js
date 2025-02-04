import { createSlice } from "@reduxjs/toolkit";
const initialState = { isDarkmode : localStorage.getItem('isDarkmode') === 'true' ? true : false }
const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleMode(state){
            state.isDarkmode = !state.isDarkmode 
            localStorage.setItem('isDarkmode', state.isDarkmode)
        }
    }
})
export const { toggleMode } = themeSlice.actions
export const themeReducer = themeSlice.reducer