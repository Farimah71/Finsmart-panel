import { createSlice } from "@reduxjs/toolkit";

const initialState={
    reload:""
}


const reloadPageSlice=createSlice({
    initialState,
    name:"reload",
    reducers:{
        setReload:(state , action) => {
            state.reload=!state.reload;
        }
    }
})

const {actions , reducer}=reloadPageSlice;
export const {setReload}=actions;
export default reducer;