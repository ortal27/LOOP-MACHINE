import React, { useState, useEffect } from 'react';
import './App.css';
import Pad from './components/pad/Pad.js';
import Button from './components/Button/Button';


const pads  = [
  {
      "name": "future funk beats",
      "color": "red", 
      "url": "padsLinks/120_future_funk_beats_25.mp3"
  },
  {
      "name": "stutter breakbeats",
      "color": "green", 
      "url": "padsLinks/120_stutter_breakbeats_16.mp3"
  },
  {
      "name": "Bass Warwick heavy funk groove ",
      "color": "yellow", 
      "url": "padsLinks/Bass Warwick heavy funk groove on E 120 BPM.mp3"
  },
  {
      "name": "electric guitar coutry slide",
      "color": "blue", 
      "url": "padsLinks/electric guitar coutry slide 120bpm - B.mp3"
  },
  {
      "name": "StompySlosh",
      "color": "grey", 
      "url": "padsLinks/FUD_120_StompySlosh.mp3"
  },
  {
      "name": "GrooveB",
      "color": "white", 
      "url": "padsLinks/GrooveB_120bpm_Tanggu.mp3"
  },
  {
      "name": "MazePolitics",
      "color": "purple", 
      "url": "padsLinks/MazePolitics_120_Perc.mp3"
  },
  {
      "name": "PAS3GROOVE",
      "color": "pink", 
      "url": "padsLinks/PAS3GROOVE1.03B.mp3"
  },
  {
      "name": "SilentStar",
      "color": "brown", 
      "url": "padsLinks/SilentStar_120_Em_OrganSynth.mp3"
  }
];

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [loops, setLoops] = useState([]);
   
  
  const OnPadChange = ({ name, isOn }) => {
    for (let i = 0; i < loops.length; i++) {
      if(loops[i].name === name){
        loops[i].isOn = isOn;
        if(!isOn){
          loops[i].audio.pause();
        }
      }
    }
    setLoops(loops);
  }

  useEffect(() => {
    for (let i = 0; i < pads.length; i++) {
      const element = pads[i];
      element.audio = new Audio(element.url);
      element.audio.load();
    }
    setLoops(pads);console.log(pads);
  }, []);

  // play all pads that select
  useEffect(() => {
    if(!isRunning){
      for (const i in loops) {
        if(loops[i].isOn){
          loops[i].audio.pause();
        }
      }
      return;
    }
    for (let i = 0; i < loops.length; i++) {
      const element = loops[i];
      if(element.isOn){
        element.audio.play()
      }
    }
    const interval = setInterval(() => {
      for (let i = 0; i < loops.length; i++) {
        const element = loops[i];
        if(element.isOn){
          element.audio.pause()
          element.audio.currentTime = 0;
          element.audio.play()
        }
      }
    }, 8000);
    return () => {
      clearInterval(interval)
    };
  }, [isRunning, loops])


  return (
    <div className="App">
      <h1 className={"Title"}>LOOP MACHINE</h1>
      <Button clicked={() => setIsRunning(true)}>PLAY</Button><Button clicked={() => setIsRunning(false)}>STOP</Button>
      <div className={"PsdsDisplay"}>
        {loops.map(item => (
              <Pad 
                  key={item.name} 
                  name={item.name} 
                  color={item.color}
                  url={item.url}
                  onChange={OnPadChange}
              />
          ))} 
      </div>
    </div>
  );
}

export default App;
