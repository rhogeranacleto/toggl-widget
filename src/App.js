import React, { useEffect, useState } from 'react';
import * as TogglService from './services/toggl.service';
import { Timer } from './components/timer/Timer';
import './App.css';
import { useWindowFocus } from './contexts/WindowFocus';
import { TextField } from '@material-ui/core';

const { ipcRenderer } = window.require('electron');

function App() {

  const focus = useWindowFocus();
  const [token, setToken] = useState(window.localStorage.getItem('api:token'))

  useEffect(() => {

    if (focus === false && window.innerHeight > 50) {

      ipcRenderer.send('resize-window', 300, 50);
    }
  }, [focus]);

  if (token) {

    return <Timer />;
  }

  return (
    <div>
      <TextField
        id="outlined-name"
        label="Name"
        // className={classes.textField}
        value={token}
        // onChange={()}
        margin="normal"
        variant="outlined"
      />
    </div>
  );
}

export default App;
