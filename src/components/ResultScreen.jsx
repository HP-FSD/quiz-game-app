import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { resetQuestions } from '../slices/questionsSlice'
import { resetGameData } from '../slices/gameDataSlice'
import { resetPersonalData } from '../slices/personalDataSlice'

export default function ResultScreen() {

  const dispatch = useDispatch()

  const gameStatus = useSelector((state) => state.gameData.gameStatus)
  const personalData = useSelector((state) => state.personalData)

  const restartGame = () => {
    console.log('Restart Gane')
    dispatch(resetQuestions());
    dispatch(resetGameData());
    dispatch(resetPersonalData());
  }

  return (
    <div className='earnedContent congrats'>
        <div className="content">
            {gameStatus === 'win'
            ? <h1>Congatulations {personalData.playername}</h1> 
            : <h1>Better luck next time {personalData.playername}</h1>
            }
            <h3 className="endText">You Earned: ₹ {personalData.earnedMoney}</h3>
            <button onClick={restartGame} className='tryAgain'>{gameStatus === 'win' ? 'Restart' : 'Try Again'}</button>
        </div>
    </div>
  )
}
