import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    playername: '',
    earnedMoney: '0'
}

const personalDataSlice = createSlice({
    name:  'personalData',
    initialState,
    reducers:{
        addPlayerName: (state,{payload})=>{
            state.playername = payload
        },
        updateEarnedMoney: (state,{payload})=>{
            state.earnedMoney = payload
        },
        resetPersonalData: () => initialState
    }
})

export const {addPlayerName,resetPersonalData,updateEarnedMoney} = personalDataSlice.actions
export default personalDataSlice.reducer