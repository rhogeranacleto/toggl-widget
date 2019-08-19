import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { PlayCircleFilledRounded, FolderOpenRounded, MoreVert, PauseCircleFilledRounded } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { TimerList } from './TimerList';
import { useWindowFocus } from '../../contexts/WindowFocus';
import * as TogglService from '../../services/toggl.service';
import moment from 'moment';

const { ipcRenderer } = window.require('electron');

export function Timer() {

  const [played, isPlayed] = useState(false);
  const [current, setCurrent] = useState({});
  const [project, setProject] = useState(null);
  const [time, setTime] = useState('');
  const [last, setLast] = useState(null);
  const [entries, setEntries] = useState([]);
  const [trans, setTrans] = useState(1);
  const [showList, setShowList] = useState(false);
  const [radius, setRadius] = useState(25);
  const windowFocus = useWindowFocus();

  useEffect(() => {

    if (windowFocus) {
      console.log('caiu no focus')
      setTrans(1);
    } else {
      console.log('caiu no blur');
      setTrans(0.4);
      setShowList(false);
      setRadius(25);
    }
  }, [windowFocus]);

  async function getList() {

    const data = await TogglService.get();

    console.log(data);
    setEntries(data);
  }

  useEffect(() => {

    getList();

    let id = setInterval(() => {
      console.log('vai pegar');
      getList();
    }, 30000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {

    isPlayed(current.duration < 0);

    if (current.pid) {

      TogglService.project(current.pid).then(project => setProject(project));
    }

    setTime(current.duration < 0 ? moment.duration(moment().diff(moment(current.start))).humanize() : '');
  }, [current]);

  useEffect(() => {

    const last = entries[entries.length - 1];

    if (last) {

      setCurrent(last);
    }
  }, [entries]);

  function openList() {

    ipcRenderer.send('resize-window', 300, 300);
    setShowList(true);
    setRadius(10);
  }

  async function playOrStop() {

    if (current) {

      const data = await TogglService.stop(current.id);
      setCurrent(null);
    }
  }

  return (
    <Box style={{ borderRadius: radius, color: '#fff' }} overflow="hidden">
      <Box style={{ backgroundColor: green[800], /* opacity: trans */ }} display="flex" alignItems="center" >
        <IconButton size="small" onClick={playOrStop}>
          {played
            ? <PauseCircleFilledRounded style={{ fontSize: 40 }} />
            : <PlayCircleFilledRounded style={{ fontSize: 40 }} />
          }
        </IconButton>
        <Box flex={1} overflow="hidden" pr={1}>
          <Typography noWrap={true}>{current && current.description}</Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" pr={2}>
            <Typography variant="caption">{time}</Typography>
            <Typography variant="caption" noWrap={true}>{project && project.name}</Typography>
            <IconButton size="small" onClick={openList}>
              <MoreVert style={{ fontSize: 20, color: '#fff' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {showList && <TimerList />}
    </Box>
  );
}