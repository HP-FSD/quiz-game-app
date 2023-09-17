import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

export default function GameLevel() {

  let gameLevels = useSelector(state => state.gameData.gameLevels)

  return (
    <div className='gameLevel'>
        <ul className='moneyList'>
            {gameLevels.totalLevels.map(
                item => {
                    return <li key={item.id} className={ gameLevels.currentLevelId === item.id? "moneyListItem active" : "moneyListItem"}>
                    <span className="moneyListItemNumber">{item.id}</span>
                    <span className="moneyListItemAmount">₹ {item.amount}</span>
                </li>
                }
            )}
        </ul>
    </div>
  )
}
