import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function TitleAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" component="div" align="left" sx={{ flexGrow: 1 }}>
            React Webscrapper
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}