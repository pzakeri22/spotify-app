import './Login.css';
import React from 'react';
import {authorise} from '../util/Spotify.js';

class Login extends React.Component {     
 
  render() {
    return (
      <div className="login">
        <div className="container">
          <section className="header">
             <h1>Playlist App</h1>
          </section>
          <section className="main">
            <h2>Login Instructions</h2>
            <div className="instructions">
                <p>Please login using the account below.
                </p>
                <p className="large-screen">
                  Email : &ensp;&ensp;&ensp;&ensp; 
                  <span className="pop">developertesting101@outlook.com</span>
                  <br/>Password : &nbsp; 
                  <span className="pop">developer101</span> 
                </p>
                <p className="small-screen">
                  Email :
                  <br/>developertesting101@outlook.com
                  <br/>Password :
                  <br/>developer101
                </p>
                <p>
                  On the new window, if prompted, you must log out of your current Spotify account first;</p>
                <img className="login-example"src={require("../../images/log-in.png")} alt="example"></img>
            </div>
            <a 
                href={authorise} 
                target="_blank" 
                rel="noopener noreferrer">
                LOGIN TO SPOTIFY
                <img className="resize" src={require("../../images/resize.png")} alt=""/>
            </a>
          </section>
        </div>
      </div>
    );  
  }
}

export default Login;
