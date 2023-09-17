import logo from './logo.svg';
import './App.css';
import StartPage from './components/StartPage';
import { useSelector,useDispatch } from 'react-redux'
import GameScreen from './components/GameScreen';

function App() {
  const gameStatus = useSelector((state) => state.gameData.gameStatus)
  return (
    <div className="App">
      {gameStatus === 'start' ? <StartPage /> : <GameScreen />}
      
    </div>
  );
}

export default App;
