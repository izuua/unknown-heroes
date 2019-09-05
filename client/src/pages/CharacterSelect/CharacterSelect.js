import React, { Component } from 'react';
import { Link } from "react-router-dom"

import "./index.css"
import AuthContext from '../../contexts/AuthContext';

class CharacterSelect extends Component {
  static contextType = AuthContext

  state = {
    heroes: [
      { name: "Warrior", hp: 200, mp: 100 },
      { name: "Wizard", hp: 100, mp: 200 },
      { name: "Thief", hp: 150, mp: 150 }
    ],
    heroClass: 0
  }

  componentDidMount() {
    // Load user's hero stats
    // Set hero stats in state.heroes
  }

  changeCharacter = event => {
    let heroClass = this.state.heroClass

    if (event.target.value === "<") {
      if (heroClass === 0) heroClass = this.state.heroes.length - 1
      else heroClass--
    } else {
      if (heroClass === this.state.heroes.length - 1) heroClass = 0
      else heroClass++
    }

    this.setState({ heroClass })
  }

  render() {
    return (
      <div className="CharacterSelect">
        <h1>Character Select</h1>
        <div id="game-stage">
          <div className="row no-gutters">
            <div className="col-6">
              {/* Scroll image goes here with
                active user's stats displayed */}
              <h1>HP: {this.state.heroes[this.state.heroClass].hp}</h1>
              <h1>MP: {this.state.heroes[this.state.heroClass].mp}</h1>
            </div>
            <div className="col-6">
              {/* Character model goes here */}
              <h1>Char Model</h1>
              <h1>Hero Class: {this.state.heroes[this.state.heroClass].name}</h1>
            </div>
          </div>
          <div className="row no-gutters w-100" id="bottom-row">
            <div className="col">
              <input onClick={this.changeCharacter} className="btn btn-info mx-3" type="button" value="<" />
              <button className="btn btn-success mx-3" type="button">
                <Link to={{
                  pathname: "/enemy",
                  state: this.state.heroes[this.state.heroClass]
                }} >Choose Hero</Link>
              </button>
              <input onClick={this.changeCharacter} className="btn btn-info mx-3" type="button" value=">" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSelect