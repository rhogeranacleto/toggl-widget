import React from 'react';
import * as TogglService from './services/toggl.service';
import { Timer } from './components/timer/Timer';
import './App.css';

const { ipcRenderer } = window.require('electron');

function App() {

  TogglService.me();

  window.addEventListener('focus', () => {
    // console.log('focus')
  });
  window.addEventListener('blur', () => {
    // console.log('blur', window.innerHeight);
    ipcRenderer.send('resize-window', 300, 50);
  });

  return (
    <React.Fragment>
      <Timer></Timer>
    </React.Fragment>
  );
}

export default App;
