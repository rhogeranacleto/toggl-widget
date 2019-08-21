import React from 'react';
import { Box, IconButton } from "@material-ui/core";
import { PowerSettingsNewRounded } from "@material-ui/icons";
import { useStateValue } from '../../contexts/localStorage';

export function Bottom() {

  const { setToken } = useStateValue();

  return (
    <Box display="flex" justifyContent="center">
      <IconButton size="small" onClick={() => setToken('')}>
        <PowerSettingsNewRounded />
      </IconButton>
    </Box>
  );
}