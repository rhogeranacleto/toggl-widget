import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { PlayCircleFilledRounded, MoreVert, PauseCircleFilledRounded } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import { TimerList } from './TimerList';
import { useWindowFocus } from '../../contexts/WindowFocus';
import * as TogglService from '../../services/toggl.service';
import moment from 'moment';
import { Bottom } from './Bottom';
import { useStateValue } from '../../contexts/localStorage';

const { ipcRenderer } = window.require('electron');

export function Timer() {

  const [played, isPlayed] = useState(false);
  const [current, setCurrent] = useState({});
  const [project, setProject] = useState(null);
  const [time, setTime] = useState('');
  const [entries, setEntries] = useState([]);
  const [trans, setTrans] = useState(1);
  const [showList, setShowList] = useState(false);
  const [radius, setRadius] = useState(25);
  const { token } = useStateValue();
  const windowFocus = useWindowFocus();

  useEffect(() => {

    if (windowFocus) {

      update();
      setTrans(1);
    } else {

      setTrans(0.4);
      setShowList(false);
      setRadius(25);
    }
  }, [windowFocus]);

  async function update() {

    const data = await TogglService.get();

    setEntries(data);
  }

  useEffect(() => {

    update();

    let id = setInterval(() => {

      update();
    }, 60000);

    return () => clearInterval(id);
  }, [token]);

  useEffect(() => {

    isPlayed(current.duration < 0);

    if (current.pid) {

      TogglService.project(current.pid).then(project => setProject(project));
    } else {

      setProject(null);
    }

    setTime(current.duration < 0 ? moment.duration(moment().diff(moment(current.start))).humanize() : 'Pausado');
  }, [current]);

  useEffect(() => {

    const last = entries[0];

    if (last) {

      setCurrent(last);
    }
  }, [entries]);

  function openList() {

    ipcRenderer.send('resize-window', 300, 300);
    setShowList(true);
    setRadius(10);
  }

  async function play(item) {

    await TogglService.start(item);

    update();
  }

  async function playOrStop() {

    if (played) {

      await TogglService.stop(current.id);
      update();
    } else {

      play(current);
    }
  }

  return (
    <Box style={{ borderRadius: radius, color: '#fff', backgroundColor: played ? green[800] : red[800], opacity: trans }} overflow="hidden">
      <Box style={{ /* opacity: trans */ }} display="flex" alignItems="center" >
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
      {showList &&
        <React.Fragment>
          <TimerList entries={entries} play={play} />
          <Bottom />
        </React.Fragment>
      }
    </Box>
  );
}