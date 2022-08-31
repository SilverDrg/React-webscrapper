import React from 'react';
import './App.css';

import { CssBaseline } from '@mui/material';
import TitleAppBar from './components/appbar';
import ItemCards from './components/itemCards';

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <TitleAppBar/>
      <ItemCards/>
    </div>
  );
}

export default App;
