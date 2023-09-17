import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { shuffle } from "../utils/shuffleArray";

const initialState = {
    questions: [],
    status: 'loading',
    currentQuestion: {},
    currentAnswer: ''
}

export const getQuestions = createAsyncThunk('questions/getQuestions', async ()=>{
    try{
        const resp = await fetch(`https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple`)
        return resp.json()
    }catch(err){
        console.log(err);
    }
})

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers:{
        setCurrentQuestion: (state, {payload}) => {
            state.currentQuestion = {
                question: state.questions[payload].question,
                answers: shuffle([...state.questions[payload].incorrect_answers,state.questions[payload].correct_answer])
            }
            state.currentAnswer = state.questions[payload].correct_answer
        },
        resetQuestions: ()=> initialState
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getQuestions.pending, (state)=>{
            state.status = 'loading'
        }).addCase(getQuestions.fulfilled,(state,{payload})=>{
            state.status = 'ready'
            console.log('Here are questions',payload )
            state.questions = [...payload.results]
            state.currentQuestion = {
                question: payload.results[0].question,
                answers: shuffle([...payload.results[0].incorrect_answers,payload.results[0].correct_answer])
            }
            state.currentAnswer = payload.results[0].correct_answer
        }).addCase(getQuestions.rejected, (state)=>{
            state.status = 'error'
        })
    }
})

export const {resetQuestions,setCurrentQuestion} = questionsSlice.actions
export default questionsSlice.reducer