import './App.css';
import React, { useCallback } from "react";
import StartPage from './components/startPage.js';
import * as constants from './util/constants.js';

function App() {
  const [gameState, setGameState] = React.useState(constants.START_STATE);
  const setGameStateWrapper = useCallback(val => {
    setGameState(val);
  }, [setGameState]);
  return (
    <div className="App" id="chatarea">
      Welcome to Cards Uniting Humanity! Click the start button when ready.
      {gameState === constants.START_STATE ? <StartPage callback={setGameStateWrapper}/> : null}
      {gameState === constants.PLAY_STATE ? <div> Game Started! </div>: null}
    </div>
  );
}

export default App;
