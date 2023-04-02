// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import React from 'react';
import Summary from './components/summary';
import Schedule from './components/Schedule';
import TableSelection from './components/tabelSelect';
import AppProvider from './Context';
import Saveimage from './components/Saveimage';

function App() {
  return (
    <AppProvider>
        <div className="App">
          <Header></Header>
          <Summary ></Summary>
          <Saveimage></Saveimage>
          <Schedule></Schedule>
          <TableSelection></TableSelection>
        </div>
    </AppProvider>
  );
}

export default App;
