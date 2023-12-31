import React, { useEffect, useState } from 'react';
import ChessClock from './components/ChessClock';
import './App.css'; 

function App() {
  const [initialTime, setInitialTime] = useState(600);
  const [incrementTime, setIncrementTime] = useState(5);
  const [key, setKey] = useState(0); 
  const [isFinished, setIsFinished] = useState(false);
  const startNewGame = () => {
    
    setKey(key + 1); 
  };
  useEffect(() => {
    setIsFinished(false);
  }, [key]);
  return (
    
    <div className="App">
      
      <ChessClock setIsFinished={setIsFinished} key={key} initialTime={initialTime} incrementTime={incrementTime} />
      <div className="config-panel">
        
        {!isFinished && <> <label className='label1'>
          Tiempo a finish (segundos):
          <input
            type="number"
            value={initialTime}
            onChange={(e) => setInitialTime(e.target.value)}
          />
        </label>
        <label className='label2'>
          Tiempo con incremento (segundos):
          <input
            type="number"
            value={incrementTime}
            onChange={(e) => setIncrementTime(e.target.value)}
          />
        </label></>} 
        <button onClick={startNewGame}>Nueva Partida</button>
      </div>
    </div>
    
  );
}

export default App;

