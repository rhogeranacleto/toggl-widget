import React, { useEffect, useState } from 'react';
import { Timer } from './components/timer/Timer';
import './App.css';
import { useWindowFocus } from './contexts/WindowFocus';
import { TextField, Button, Box } from '@material-ui/core';
import { LocalStorageProvider } from './contexts/localStorage';
import axios from 'axios';

const { ipcRenderer } = window.require('electron');

function App() {

  const focus = useWindowFocus();
  const [token, setToken] = useState(window.localStorage.getItem('api:token') || '');
  const [value, setValue] = useState('');

  useEffect(() => {

    window.localStorage.setItem('api:token', token);
  }, [token]);

  useEffect(() => {

    if (focus === false && window.innerHeight > 50) {

      ipcRenderer.send('resize-window', 300, 50);
    }
  }, [focus]);

  return (
    <LocalStorageProvider token={token} setToken={setToken}>
      {token ? <Timer /> :
        <Box display="flex" pl={1} style={{ backgroundColor: '#e6e6e6', borderRadius: 5 }}>
          <TextField
            label="Token"
            value={value}
            onChange={e => setValue(e.target.value)}
            margin="dense"
            style={{ marginTop: 5 }}
            variant="outlined"
          />
          <Box m={1} mt="6px">
            <Button variant="contained" onClick={() => {
              axios.defaults.auth.username = value;
              setToken(value);
            }}>Ok</Button>
          </Box>
        </Box>}
    </LocalStorageProvider>
  );
}

export default App;
