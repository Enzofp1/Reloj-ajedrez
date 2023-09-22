import React, { useState, useEffect } from 'react';

const ChessClock = () => {
  const [player1Time, setPlayer1Time] = useState(600); // Tiempo en segundos
  const [player2Time, setPlayer2Time] = useState(600);
  const [activePlayer, setActivePlayer] = useState(1); // Jugador activo (1 o 2)
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (activePlayer === 1) {
          if (player1Time > 0) {
            setPlayer1Time(player1Time - 1);
          } else {
            // El jugador 1 se queda sin tiempo, puedes manejar esto como desees
            clearInterval(timer);
          }
        } else {
          if (player2Time > 0) {
            setPlayer2Time(player2Time - 1);
          } else {
            // El jugador 2 se queda sin tiempo, puedes manejar esto como desees
            clearInterval(timer);
          }
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, activePlayer, player1Time, player2Time]);

  const toggleClock = () => {
    setIsRunning(!isRunning);
  };

  const switchPlayer = () => {
    setActivePlayer(activePlayer === 1 ? 2 : 1);
  };

  return (
    <div className="chess-clock">
      <div className="time-display">
        <div className={`player-time ${activePlayer === 1 ? 'active' : ''}`}>
          Jugador 1: {player1Time} segundos
        </div>
        <div className={`player-time ${activePlayer === 2 ? 'active' : ''}`}>
          Jugador 2: {player2Time} segundos
        </div>
      </div>
      <button onClick={toggleClock}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
      <button onClick={switchPlayer}>Cambiar jugador</button>
    </div>
  );
};

export default ChessClock;
