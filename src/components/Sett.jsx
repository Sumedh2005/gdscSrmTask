import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import SettingsContext from './SettingsContext';
import Back from './Back';

function Sett() {

  const settingsInfo = useContext(SettingsContext);
  return (
    <div className='bg-slate-700 mt-20 mx-[300px] p-10 rounded-3xl'>
    <label className='text-4xl font-bold text-white '>Work : {settingsInfo.workMinutes}:  00</label>
    <Box sx={{ width: 500}} className='mt-10 ' >
      <Slider
        value={settingsInfo.workMinutes}
        onChange={(event, newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
    </Box>
  
    <label  className='text-4xl font-bold text-white '>break: {settingsInfo.breakMinutes}:00</label>
    <Box sx={{ width: 500 }} className='mt-10 '>
      <Slider
        value={settingsInfo.breakMinutes}
        onChange={(event, newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
    </Box>
  <button onClick={() => settingsInfo.setShowSettings(false)} className='flex flex-row'>
  <Back /> <p className='font-bold text-white text-2xl mt-12 ml-6'> Back To Timer</p>

  </button>  
  </div>
  
  )
}

export default Sett





