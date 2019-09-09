import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import AuthContext from '../../contexts/AuthContext';

class HomePage extends Component {
  static contextType = AuthContext

  render() {
    return (
      <div id="homepage">
        <h1 id="gametitle"><strong>Unknown Heroes</strong></h1>

        {this.context.user ? (
          <Link to="/character"><button id="login">Start Game</button></Link >
        ) : (
            <div>
              <Link to="/login"><button id="login">Log In</button></Link>
              <Link to="/register"><button id="createaccount">Create Account</button></Link>
            </div>
          )
        }
        {/* text fade */}
        <div className="fade"></div>

        {/* text plus animation */}
        <section className="starwars-affect">
          <div className="crawl">
            <p>Welcome, to Unknown Heroes!!!!</p>
            <p>You have been choosen to walk down this path as a Hero. Help conquer this Dungeon that is filled with Bats, Goblins, and Dragons.</p>
            <p>If you accept this challenge press start; but if not, leave and be ashamed you call youself a Hero!!!!</p>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
