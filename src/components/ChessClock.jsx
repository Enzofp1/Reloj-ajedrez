import React, { useState, useEffect, useRef } from 'react';
import './ChessClock.css';

const ChessClock = ({ initialTime, incrementTime }) => {
  const [player1Time, setPlayer1Time] = useState(initialTime);
  const [player2Time, setPlayer2Time] = useState(initialTime);
  const [activePlayer, setActivePlayer] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [alertingPlayer1, setAlertingPlayer1] = useState(false);
  const [alertingPlayer2, setAlertingPlayer2] = useState(false);
  const [winner, setWinner] = useState(null);

  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (activePlayer === 1) {
          if (player1Time > 0) {
            setPlayer1Time(player1Time - 1);
            if (player1Time <= incrementTime && !alertingPlayer1) {
              setAlertingPlayer1(true);
              audioRef1.current.currentTime = 0;
              audioRef1.current.play();
            }
          } else {
            clearInterval(timer);
            setWinner(2);
          }
        } else {
          if (player2Time > 0) {
            setPlayer2Time(player2Time - 1);
            if (player2Time <= incrementTime && !alertingPlayer2) {
              setAlertingPlayer2(true);
              audioRef2.current.currentTime = 0;
              audioRef2.current.play();
            }
          } else {
            clearInterval(timer);
            setWinner(1);
          }
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, activePlayer, player1Time, player2Time, incrementTime, alertingPlayer1, alertingPlayer2]);

  const toggleClock = () => {
    if (!isRunning && player1Time > 0 && player2Time > 0) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const switchPlayer = () => {
    setActivePlayer(activePlayer === 1 ? 2 : 1);
    setAlertingPlayer1(false);
    setAlertingPlayer2(false);

    
    if (isRunning) {
      if (activePlayer === 1) {
        setPlayer1Time(player1Time + incrementTime);
      } else {
        setPlayer2Time(player2Time + incrementTime);
      }
    }
  };

  return (
    <div className={`chess-clock ${alertingPlayer1 || alertingPlayer2 ? 'alerting' : ''}`}>
      <audio ref={audioRef1}>
        <source src="/alert.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={audioRef2}>
        <source src="/alert.mp3" type="audio/mpeg" />
      </audio>
      {winner ? (
        <div className="winner-message">
          Jugador {winner} gana
        </div>
      ) : (
        <div className="time-display">
          <div className={`player-time ${activePlayer === 1 ? 'active' : ''}`}>
            Jugador 1: {player1Time} segundos
          </div>
          <div className={`player-time ${activePlayer === 2 ? 'active' : ''}`}>
            Jugador 2: {player2Time} segundos
          </div>
        </div>
      )}
      <button onClick={toggleClock}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
      <button onClick={switchPlayer}>Cambiar jugador</button>
    </div>
  );
};

export default ChessClock;









