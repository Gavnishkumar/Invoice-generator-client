import React from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/signup"  Component={SignUp} ></Route>
        <Route path="/login"  Component={Login} ></Route>
        <Route path="/" Component={Home} ></Route>
        </Routes>
    </div>
    
  );
};

export default App;
