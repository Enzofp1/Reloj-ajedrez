import React, { useState, useEffect, useRef } from 'react';
import './ChessClock.css';

const ChessClock = ({ initialTime, incrementTime,setIsFinished }) => {
  const [player1Time, setPlayer1Time] = useState(initialTime);
  const [player2Time, setPlayer2Time] = useState(initialTime);
  const [activePlayer, setActivePlayer] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [alertingPlayer1, setAlertingPlayer1] = useState(false);
  const [alertingPlayer2, setAlertingPlayer2] = useState(false);
  const [winner, setWinner] = useState(null);
  
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);

  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (activePlayer === 1) {
          if (player1Time > 0) {
            setPlayer1Time(prevTime =>Number (prevTime) - 1);
            if (player1Time <= incrementTime && incrementTime > 0 && !alertingPlayer1) {
              setAlertingPlayer1(true);
              audioRef1.current.currentTime = 0;
              audioRef1.current.play();
            }
          } else {
            clearInterval(timer);
            setWinner(2);
            setIsFinished (true);
          }
        } else {
          if (player2Time > 0) {
            setPlayer2Time(prevTime => prevTime - 1);
            if (player2Time <= incrementTime && incrementTime > 0 && !alertingPlayer2) {
              setAlertingPlayer2(true);
              audioRef2.current.currentTime = 0;
              audioRef2.current.play();
            }
          } else {
            clearInterval(timer);
            setWinner(1);
            setIsFinished (true);
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
    const currentTime = new Date().getTime();
    if (
      (isRunning || (!isRunning && player1Time > 0 && player2Time > 0)) &&
      !winner &&
      currentTime - lastClickTime > 300
    ) {
      setActivePlayer(activePlayer === 1 ? 2 : 1);
      setAlertingPlayer1(false);
      setAlertingPlayer2(false);
      setLastClickTime(currentTime);

      
      if (isRunning && incrementTime > 0) {
        if (activePlayer === 1) {
          setPlayer1Time(prevTime => Number (prevTime) +Number (incrementTime));
        } else {
          setPlayer2Time(prevTime => Number (prevTime) +Number (incrementTime));
        }
      }
    }
  };

  const onClickPlayer = () => {

    const currentTime = new Date().getTime();
    if (
      (isRunning || (!isRunning && player1Time > 0 && player2Time > 0)) &&
      !winner &&
      currentTime - lastClickTime > 300
    ) {
      setActivePlayer(activePlayer === 1 ? 2 : 1);
      setAlertingPlayer1(false);
      setAlertingPlayer2(false);
      setLastClickTime(currentTime);

      
      if (isRunning && incrementTime > 0) {
        if (activePlayer === 1) {
          setPlayer1Time(prevTime => Number (prevTime) +Number (incrementTime));
        } else {
          setPlayer2Time(prevTime => Number (prevTime) +Number (incrementTime));
        }
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
          Jugador {winner} gana!
         
        </div>
      ) : (
        <div className="time-display">
          <div
            className={`player-time ${activePlayer === 1 ? 'active' : ''}`}
            onClick={() => activePlayer !== 1 && onClickPlayer()}
          >
            Jugador 1: {player1Time} segundos
          </div>
          <div
            className={`player-time ${activePlayer === 2 ? 'active' : ''}`}
            onClick={() => activePlayer !== 2 && onClickPlayer()}
          >
            Jugador 2: {player2Time} segundos
          </div>
        </div>
      )}
      {!winner&&  <button onClick={toggleClock}>{isRunning ? 'Pausar' : 'Iniciar'}</button>} 
    </div>
  );
};

export default ChessClock;










