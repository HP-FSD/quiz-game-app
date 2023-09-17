import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import GameLevel from './GameLevel'
import QuestionArea from './QuestionArea'
import { getQuestions } from '../slices/questionsSlice'
import ResultScreen from './ResultScreen'

export default function GameScreen() {

  const gameStatus = useSelector((state) => state.gameData.gameStatus)

  const dispatch = useDispatch()

  useEffect(()=>{dispatch(getQuestions())},[])

  return (
    <div className='gameScreen'>
        {gameStatus === 'playing' ? <QuestionArea /> : <ResultScreen />}
        <GameLevel />
    </div>
  )
}
