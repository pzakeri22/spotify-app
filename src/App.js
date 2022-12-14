import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/LoginRoute/Login';
import Home from "./Home";

class App extends React.Component {     
  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    );  
  }
}

export default App;
