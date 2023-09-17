import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPlayerName } from '../slices/personalDataSlice';
import { updateGameStatus } from '../slices/gameDataSlice';
import useSound from "use-sound";
import main from '../assets/main.mp3'

export default function StartPage() {

  const [playerName, setPlayername] = useState('');

  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch()

  const [letsPlay,{ stop }] = useSound(main);

  const handleSubmit = () => {
    if(playerName.length === 0){
      setHasError(true);
      return;
    }
    dispatch(addPlayerName(playerName))
    dispatch(updateGameStatus('playing'))
    stop()
  }

  useEffect(() => {
    //letsPlay()
}, [letsPlay]);

  return (
    <div className='startPage'>
      <div className="wrapper">
        <label>Enter Your Username To Start </label>
        <input type="text" placeholder='Enter Your Username' className='startInput' onChange={(e)=>setPlayername(e.target.value)} />
        {
            hasError && <code className='errorText'>Enter username!</code>
        }
        <div className="btn">
            <button className='startButton' onClick={handleSubmit}>Start Quiz</button>
        </div>
      </div>
    </div>
  )
}
