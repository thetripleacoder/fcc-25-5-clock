import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timeLeftDisplay, setTimeLeftDisplay] = useState('25:00');
  const [isStart, setIsStart] = useState(false);
  const [timerLabel, setTimerLabel] = useState('Session');

  useEffect(() => {
    if (isStart) {
      let timer = setInterval(() => {
        if (timeLeft >= 1) {
          // let timeLeftToStart = timerLabel === 'Session' ? sessionLength * 60 : breakLength * 60;
          let updatedTimeLeft = timeLeft - 1;
          setTimeLeft(updatedTimeLeft);
          let updatedTimeLeftDisplay = formatTime(updatedTimeLeft);
          setTimeLeftDisplay(updatedTimeLeftDisplay);
          console.log(updatedTimeLeft, updatedTimeLeftDisplay);
        }

        if (timeLeft === 0) {
          playAudio();
          let updatedTimeLeft = timeLeft - 1;
          setTimeLeft(updatedTimeLeft);
          let updatedTimeLeftDisplay = formatTime(0);
          console.log('time left is 0, new display', updatedTimeLeftDisplay);
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
          console.log('time left is 0, new display', updatedTimeLeftDisplay);
          setTimeLeftDisplay(updatedTimeLeftDisplay);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStart, timeLeft, timerLabel, sessionLength, breakLength]);

  function reset() {
    resetAudio();
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

  function playAudio() {
    var audio = document.getElementById('beep');
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started!
          // Show playing UI.
          audio.pause();
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
        });
    }

  }

  function resetAudio() {
    var audio = document.getElementById('beep');
    var playPromise = audio.pause();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started!
          // Show playing UI.
          audio.play();
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
        });
    }
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
      <audio id='beep'>
        <source src='../public/beep.wav' type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
