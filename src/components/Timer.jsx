import React, { useContext, useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Play from './Play';
import Pause from './Pause';
import Settings from './Settings';
import SettingsContext from './SettingsContext';

const red = '#f54e4e';
const green = '#4aec8c';


function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    let interval;

    function tick() {
      secondsLeftRef.current--;
      setSecondsLeft(secondsLeftRef.current);
    }

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds =
        (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    interval = setInterval(() => {
      if (!isPausedRef.current && secondsLeftRef.current > 0) {
        tick();
      } else if (secondsLeftRef.current === 0) {
        switchMode();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const totalSeconds =
    mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((totalSeconds - secondsLeft) / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return (
    <div className="main bg-cyan-600 mx-[250px] py-10 mt-10 rounded-3xl mb-10">

      <p className='text-6xl font-bold text-center '>Pomodoro Timer</p>
    <div className="timer mt-[60px] mx-[320px]  ">
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        className="h-[350px] w-[350px]"
        styles={buildStyles({
          textColor: '#fff',
          pathColor: mode === 'work' ? 'red' : 'green', // Assuming red and green are defined somewhere
          tailColor: 'rgba(255,255,255,.2)',
        })}
      />
      <div className="butt flex flex-row">
      {isPaused ? (
        <Play onClick={() => setIsPaused(false)} />
      ) : (
        <Pause onClick={() => setIsPaused(true)} />
      )}
      <button onClick={() => settingsInfo.setShowSettings(true)}>
        <Settings />
      </button>
      </div>
    
    </div>
    </div>
  );
}



export default Timer;
