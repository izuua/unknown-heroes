import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./home.css";
// import logo from './logo.svg';

class HomePage extends Component {
  render() {
    return (
      <div id="homepage">
            <h1 id="gametitle"><strong>Unknown Heros</strong></h1>
            
            <button id="login"><Link to="/login">Log In</Link></button>
    
            <button id="createaccount"><Link to="/register">Create Account</Link></button>
        </div>
    );
  }
}

export default HomePage;
