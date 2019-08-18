import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import { PlayArrowRounded, PlayCircleFilledRounded } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

export function TimerList() {

  const [items, setItems] = useState([
    {
      task: 'Uma task com um nome gigantesco tambem que eu nao sei como vai se sair',
      project: 'Projeto JJ',
      time: '3:00:00'
    },
    {
      task: 'Otra task',
      project: 'Projeto JJ',
      time: '3:00:00'
    },

    {
      task: 'Uma task com um nome gigantesco tambem que eu nao sei como vai se sair',
      project: 'Projeto JJ',
      time: '3:00:00'
    },

    {
      task: 'Uma task com um nome gigantesco tambem que eu nao sei como vai se sair',
      project: 'Projeto JJ',
      time: '3:00:00'
    },

    {
      task: 'Uma task com um nome gigantesco tambem que eu nao sei como vai se sair',
      project: 'Projeto JJ',
      time: '3:00:00'
    }
  ])

  return (
    <List dense={true} style={{ backgroundColor: green[600], maxHeight: 234, overflowY: 'auto' }}>
      {items.map((item, i) =>
        <ListItem dense={true} disableGutters={true} divider={true} key={i}>
          <ListItemIcon style={{ minWidth: 'initial' }}>
            <IconButton size="small">
              <PlayCircleFilledRounded style={{ fontSize: 40 }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary={item.task} secondary={`${item.project} | ${item.time}`} />
        </ListItem>
      )}
    </List>
  );
}