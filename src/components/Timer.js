import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateGameStatus } from '../slices/gameDataSlice'

export default function Timer() {

    const dispatch = useDispatch()

    const timerValue = useSelector((state) => state.gameData.secondsRemaining)

    const currentLevel = useSelector((state) => state.gameData.gameLevels.currentLevelId)

    const gameStatus = useSelector((state) => state.gameData.gameLevels.gameStatus)

    const [timer, setTimer] = useState(timerValue);

    useEffect(() => {
        // if the timer elapses, stop the quiz 
        if (timer === 0) return dispatch(updateGameStatus('loose'));
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

       return () => {};
    }, [timer,gameStatus,dispatch]);

    useEffect(() => {
        setTimer(timerValue)
    }, [currentLevel])
    return timer;
}