import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import Rooms from './pages/Rooms';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element= {<LandingPage/>} />
            <Route path="/rooms" element= {<Rooms/>} />
          </Routes>
        </BrowserRouter>     
    </div>
  );
}

export default App;
