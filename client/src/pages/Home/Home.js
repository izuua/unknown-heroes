import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import AuthContext from '../../contexts/AuthContext';
import StartSound from '../../music/2013-03-31_Reborn_-_David_Fesliyan.mp3'

class HomePage extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props);
    this.sound = new Audio(StartSound);
  }

  componentDidMount() {
    this.sound.play();
  }

  componentWillUnmount() {
    this.sound.pause();
  }

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
            <p>You have been chosen to walk down this path as a Hero. The Guild you are in has told us that you are the right Hero for this job. Please help us!!!! We need your help to conquer this Dungeon that the Dragon King has taken over. If we don't end him quickly then he is going to take over this city!!!</p>
            <p>If you accept this challenge press start; but if not, leave and be ashamed you call youself a Hero!!!!</p>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
