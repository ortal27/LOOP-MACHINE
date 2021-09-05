import React, { useState, useEffect } from 'react';
import './App.css';
import Pad from './components/pad/Pad.js';
import axios from 'axios';
import Button from './components/Button/Button';



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
    axios.get('http://localhost:8080/pads')
        .then(res => {
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
              data[i].url = 'http://localhost:8080/' + data[i].url;
              data[i].audio = new Audio(data[i].url);
              data[i].audio.load();
            }
            setLoops(data);
        });
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
