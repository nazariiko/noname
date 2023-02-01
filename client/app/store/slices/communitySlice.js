import { createSlice } from "@reduxjs/toolkit";


const communitySlice = createSlice({
    name:'community',
    initialState:{
        discord:'/',
    },
    reducers:{
        setDiscord(state,action){
            state.discord = action.payload
        }
    }
})

export default communitySlice.reducer
export const {setDiscord} = communitySlice.actions