import React from 'react'
import Timer from './components/Timer'
import Sett from './components/Sett'
import { useState } from 'react'
import SettingsContext from './components/SettingsContext'

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(1);
  const [breakMinutes, setBreakMinutes] = useState(1);


  return (
  <>
  <div  >
  <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Sett /> : <Timer />}
      </SettingsContext.Provider>
 
 
  </div>

  </>
  )
}

export default App