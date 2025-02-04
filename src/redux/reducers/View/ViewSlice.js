import { createSlice } from "@reduxjs/toolkit";
const initialState = { currView: 0 }
const viewSlice = createSlice({
    name:'view',
    initialState,
    reducers:{
        changeView(state,action){
            state.currView = action.payload
        }
    }
})
export const { changeView } = viewSlice.actions
export const viewReducer = viewSlice.reducer