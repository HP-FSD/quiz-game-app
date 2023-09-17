import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    secondsRemaining: 4,
    gameLevels: {
        currentLevelId: 1,
        totalLevels: [
            { id: 15, amount: '1000000' },
            { id: 14, amount: '500000' },
            { id: 13, amount: '250000' },
            { id: 12, amount: '125000' },
            { id: 11, amount: '64000' },
            { id: 10, amount: '32000' },
            { id: 9, amount: '16000' },
            { id: 8, amount: '8000' },
            { id: 7, amount: '4000' },
            { id: 6, amount: '2000' },
            { id: 5, amount: '1000' },
            { id: 4, amount: '500' },
            { id: 3, amount: '300' },
            { id: 2, amount: '200' },
            { id: 1, amount: '100' }
        ],
    },
    gameStatus: "start"
}

const gameDataSlice = createSlice({
    name:  'gameData',
    initialState,
    reducers:{
        lessSeconds: (state)=>{
            state.secondsRemaining -= 1
        },
        restartTimer: (state)=>{
            state.secondsRemaining = 210
        },
        updateCurrentLevel: (state)=>{
            state.gameLevels = {...state.gameLevels, currentLevelId: state.gameLevels.currentLevelId + 1}
        },
        updateGameStatus: (state,action)=>{
            state.gameStatus = action.payload
        },
        resetGameData: () => initialState,
    }
})

export const {lessSeconds, restartTimer,updateCurrentLevel,updateGameStatus,resetGameData} = gameDataSlice.actions
export default gameDataSlice.reducer