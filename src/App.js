import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Login from './Components/LoginRoute/Login';
import Home from "./Home";
import HomepageTest from './HomepageTest';

class App extends React.Component {     
  render() {
    return (
      // <BrowserRouter>
      <HashRouter basename="/spotify-app">
        <Routes>
           {/* <Login/> */}
           {/* <Route path="/" element={<Login/>}/> */}
          <Route path="/" element={<Login/>}/>
          {/* <Route path="/home" element={<Home/>}/> */}
          <Route path="/home" element={<Home/>}/>
        </Routes>
      {/* </BrowserRouter> */}
      </HashRouter>
    );  
  }
}

export default App;
