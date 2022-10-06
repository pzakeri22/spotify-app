import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/LoginRoute/Login';
import Home from "./Home";
import HomepageTest from './HomepageTest';

class App extends React.Component {     
  render() {
    return (
      <BrowserRouter>
        <Routes>
           {/* <Login/> */}
           {/* <Route path="/" element={<Login/>}/> */}
          <Route path="/spotify-app" element={<Login/>}/>
          {/* <Route path="/home" element={<Home/>}/> */}
          <Route path="/spotify-app/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    );  
  }
}

export default App;
