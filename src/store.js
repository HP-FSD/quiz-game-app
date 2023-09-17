import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./slices/questionsSlice";
import gameDataReducer from "./slices/gameDataSlice";
import personalDataReducer from "./slices/personalDataSlice";

export const store = configureStore({
    reducer: {
        gameData: gameDataReducer,
        questions: questionsReducer,
        personalData: personalDataReducer
    }
})