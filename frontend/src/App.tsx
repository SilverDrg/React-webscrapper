import React from 'react';
import './App.css';

import TitleAppBar from './components/appbar';
import ItemCards from './components/itemCards';

function App() {
  return (
    <div className="App">
      <TitleAppBar/>
      <ItemCards/>
    </div>
  );
}

export default App;
