import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { shuffle } from '../utils/shuffleArray'
import { delay } from '../utils/delay'
import { updateGameStatus,updateCurrentLevel } from '../slices/gameDataSlice'
import { setCurrentQuestion } from '../slices/questionsSlice'
import parse from 'html-react-parser';
import { updateEarnedMoney } from '../slices/personalDataSlice'
import useSound from "use-sound";
import wrong from '../assets/sounds_wrong.mp3'
import play from '../assets/sounds_play.mp3'
import correct from '../assets/sounds_correct.mp3'


export default function QuestionArea() {

  const [currentClass, setCurrentClass] = useState("answer")
  const [selectedAnswer, setSelectedAnswer] = useState("")

  const dispatch = useDispatch()

  const gameLevels = useSelector((state) => state.gameData.gameLevels)

  const questionData = useSelector((state) => state.questions)

  console.log(questionData)

  const [letsPlay] = useSound(play);

  const [playCorrect] = useSound(correct);

  const [playWrong] = useSound(wrong);

  const nextQuestion = () => {
    playCorrect()
    let earnedMoney = gameLevels.totalLevels.find((item)=>item.id === gameLevels.currentLevelId).amount;
    dispatch(updateEarnedMoney(earnedMoney))
    setSelectedAnswer('')
    setCurrentClass("answer")
    if(gameLevels.currentLevelId >= gameLevels.totalLevels.length){
        dispatch(updateGameStatus('win'))
        return;
    }
    dispatch(updateCurrentLevel())
    dispatch(setCurrentQuestion(gameLevels.currentLevelId))
  }

  const handleSubmit = (ans) => {
    console.log(ans)
    setSelectedAnswer(ans)
    setCurrentClass("answer active")
    delay(3000,()=>{
        ans === questionData.currentAnswer 
        ? setCurrentClass("answer correct")
        : setCurrentClass("answer wrong")
    })
    if(ans === questionData.currentAnswer) {
        delay(5000,()=>{nextQuestion()})
    } else {
        delay(5000,()=>{ 
            playWrong()
            dispatch(updateGameStatus('loose'))
        })
    }
  }

  useEffect(() => {
    letsPlay()
  }, [letsPlay]);

  return (
    <div className='questionArea'>
        <div className="top">
            {/* <div className="timer">
                <Timer />
            </div> */}
        </div>
        <div className="bottom">
        {questionData.status != 'loading' && <div className='questionBox'>
            <div className="question">{parse(questionData.currentQuestion.question)}</div>
            <div className="answers">
                {
                    questionData.currentQuestion.answers.map((ans,index) => (
                        <div key={index} className={selectedAnswer === ans ? currentClass : 'answer'} onClick={()=>handleSubmit(ans)}>{parse(ans)}</div>
                    ))
                }
            </div>
         </div>}
        </div>
    </div>
  )
}
