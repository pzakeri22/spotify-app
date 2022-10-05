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
        {/* <Route path="/" element={<Login/>}></Route> */}
        <Route path="/" element={<HomepageTest/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
    );  
  }
}

export default App;
