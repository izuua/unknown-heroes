import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import AuthContext from '../../contexts/AuthContext';

class HomePage extends Component {
  static contextType = AuthContext

  render() {
    return (
      <div id="homepage">
        <h1 id="gametitle"><strong>Unknown Heros</strong></h1>

        {this.context.user ? (
          <Link to="/character"><button id="login">Start Game</button></Link >
        ) : (
            <div>
              <Link to="/login"><button id="login">Log In</button></Link>
              <Link to="/register"><button id="createaccount">Create Account</button></Link>
            </div>
          )
        }
      </div>
    );
  }
}

export default HomePage;
