import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { PlayCircleFilledRounded } from '@material-ui/icons';
import moment from 'moment';

export function TimerList({ entries, play }) {

  let entriesCopy = [...entries];

  entriesCopy.shift();

  const [items, setItems] = useState(entriesCopy);

  useEffect(() => {

    entriesCopy = [...entries];

    entriesCopy.shift();

    setItems(entriesCopy);
  }, [entries]);

  return (
    <List dense={true} style={{ backgroundColor: 'rgba(255, 255, 255, 0.09)', maxHeight: 234, overflowY: 'auto' }}>
      {items.map((item, i) =>
        <ListItem dense={true} disableGutters={true} divider={true} key={i}>
          <ListItemIcon style={{ minWidth: 'initial' }}>
            <IconButton size="small" onClick={() => play(item)}>
              <PlayCircleFilledRounded style={{ fontSize: 40 }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary={item.description} secondary={moment(moment(item.stop).diff(item.start)).utc().format('HH:mm:ss')} />
        </ListItem>
      )}
    </List>
  );
}