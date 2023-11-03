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
      <div className='settings-container d-flex flex-row justify-content-center align-items-center'>
        <div className='break-length-container'>
          <button
            className='btn btn-danger'
            id='break-decrement'
            onClick={decrementBreakLength}
          >
            <i className='bi bi-dash-lg'></i>
          </button>
          <button
            className='btn btn-success'
            id='break-increment'
            onClick={incrementBreakLength}
          >
            <i className='bi bi-plus'></i>
          </button>
          <p id='break-label'>Break Length</p>
          <p id='break-length'>
            {breakLength}
          </p>
        </div>
        <div className='d-flex' style={{ height: '200px' }}>
          <div className='vr'></div>
        </div>
        <div className='session-length-container'>
          <button
            className='btn btn-danger'
            id='session-decrement'
            onClick={decrementSessionLength}
          >
            <i className='bi bi-dash-lg'></i>
          </button>
          <button
            className='btn btn-success'
            id='session-increment'
            onClick={incrementSessionLength}
          >
            <i className='bi bi-plus'></i>
          </button>
          <p id='session-label'>Session Length</p>
          <p id='session-length'>
            {sessionLength}
          </p>
        </div>
      </div>
      <div className='timer-container'>
        <p id='timer-label'>
          {timerLabel}
        </p>
        <p id='time-left'>
          {timeLeftDisplay}
        </p>
        <div className='mt-4'>
          <button
            className='btn btn-warning'
            id='start_stop'
            onClick={startStop}
          >
            Start/Stop
          </button>
          <button className='btn btn-secondary' id='reset' onClick={reset}>
            Reset
          </button>
        </div>
      </div>
      <audio id='beep' preload='auto' crossOrigin='anonymous'>
        <source src='assets/beep.mp3' type='audio/mpeg' />
      </audio>
    </div>
  );
}

export default App;
