import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timeLeftDisplay, setTimeLeftDisplay] = useState('25:00');
  const [isStart, setIsStart] = useState(false);
  const [timerLabel, setTimerLabel] = useState('Session');


  // useEffect hook for updating timer label, countdown value and display
  useEffect(() => {
    if (isStart) {
      let timer = setInterval(() => {
        if (timeLeft >= 1) {
          // let timeLeftToStart = timerLabel === 'Session' ? sessionLength * 60 : breakLength * 60;
          let updatedTimeLeft = timeLeft - 1;
          setTimeLeft(updatedTimeLeft);
          let updatedTimeLeftDisplay = formatTime(updatedTimeLeft);
          setTimeLeftDisplay(updatedTimeLeftDisplay);
        }

        if (timeLeft === 0) {
          playMusic();
          let updatedTimeLeft = timeLeft - 1;
          setTimeLeft(updatedTimeLeft);
          let updatedTimeLeftDisplay = formatTime(0);
          setTimeLeftDisplay(updatedTimeLeftDisplay);
        }
        if (timeLeft === -1) {
          let updatedTimeLeft;

          switch (timerLabel) {
            case 'Session':
              setTimerLabel('Break');
              updatedTimeLeft = breakLength * 60;
              setTimeLeft(updatedTimeLeft);
              break;
            case 'Break':
              setTimerLabel('Session');
              updatedTimeLeft = sessionLength * 60;
              setTimeLeft(updatedTimeLeft);
              break;
            default:
              //  do nothing
              break;
          }
          let updatedTimeLeftDisplay = formatTime(updatedTimeLeft);
          setTimeLeftDisplay(updatedTimeLeftDisplay);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStart, timeLeft, timerLabel, sessionLength, breakLength]);

  
  function playMusic() {
    let audio = document.getElementById('beep');
    audio.play();
  }
  
  function resetMusic() {
    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }

  function reset() {
    resetMusic();
    setBreakLength(5);
    setSessionLength(25);
    let updatedTimeLeft = 25 * 60;
    setTimeLeft(updatedTimeLeft);
    let updatedTimeLeftDisplay = formatTime(updatedTimeLeft);
    setTimeLeftDisplay(updatedTimeLeftDisplay);
    setTimerLabel('Session');
    setIsStart(false);
  }

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${minutes}:${seconds}`;
  }

  function decrementBreakLength() {
    if (breakLength > 1) {
      let updatedBreakLength = breakLength - 1;
      setBreakLength(updatedBreakLength);
      updateTimeLeftDisplay(updatedBreakLength, 'Break');
    }
  }

  function incrementBreakLength() {
    if (breakLength < 60) {
      let updatedBreakLength = breakLength + 1;
      setBreakLength(updatedBreakLength);
      updateTimeLeftDisplay(updatedBreakLength, 'Break');
    }
  }

  function decrementSessionLength() {
    if (sessionLength > 1) {
      let updatedSessionLength = sessionLength - 1;
      setSessionLength(updatedSessionLength);
      updateTimeLeftDisplay(updatedSessionLength, 'Session');
    }
  }

  function incrementSessionLength() {
    if (sessionLength < 60) {
      let updatedSessionLength = sessionLength + 1;
      setSessionLength(updatedSessionLength);
      updateTimeLeftDisplay(updatedSessionLength, 'Session');
    }
  }

  function updateTimeLeftDisplay(updatedTimeLength, updateType) {
    let updatedTimeLeftDisplay = '';
    if (updateType === timerLabel) {
      let updatedTimeLeft = updatedTimeLength * 60;
      setTimeLeft(updatedTimeLeft);
      updatedTimeLeftDisplay = formatTime(updatedTimeLeft);
      setTimeLeftDisplay(updatedTimeLeftDisplay);
    }
  }

  function startStop() {
    let updatedIsStart = !isStart;
    setIsStart(updatedIsStart);
  }

  return (
    <div className='App'>
      <p id='break-label'>Break Length</p>
      <p id='session-label'>Session Length</p>
      <button id='break-decrement' onClick={decrementBreakLength}>
        dec break
      </button>
      <button id='session-decrement' onClick={decrementSessionLength}>
        dec session
      </button>
      <button id='break-increment' onClick={incrementBreakLength}>
        inc break
      </button>
      <button id='session-increment' onClick={incrementSessionLength}>
        inc session
      </button>
      <p id='break-length'>{breakLength}</p>
      <p id='session-length'>{sessionLength}</p>
      <p id='timer-label'>{timerLabel}</p>
      <p id='time-left'>{timeLeftDisplay}</p>
      <button id='start_stop' onClick={startStop}>
        Start/Stop
      </button>
      <button id='reset' onClick={reset}>
        reset
      </button>
      <audio id='beep' preload="auto" crossOrigin="anonymous">
        <source src='assets/beep.mp3' type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
