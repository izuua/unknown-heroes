import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"

import AuthContext from '../../contexts/AuthContext';

class EnemySelect extends Component {
  static contextType = AuthContext

  state = {
    hero: this.props.location.state,
    enemies: [
      { name: "Bat", hp: 100, mp: 100 },
      { name: "Goblin", hp: 150, mp: 100 },
      { name: "Dragon", hp: 300, mp: 150 }
    ],
    enemy: 0,
  }

  changeEnemy = event => {
    let enemy = this.state.enemy

    if (event.target.value === "<") {
      if (enemy === 0) enemy = this.state.enemies.length - 1
      else enemy--
    } else {
      if (enemy === this.state.enemies.length - 1) enemy = 0
      else enemy++
    }

    this.setState({ enemy })
  }

  render() {
    return (
      <div className="EnemySelect">
        {this.props.location.state ? (
          <div>
            <h1>Enemy Select</h1>
            <h2>You chose: {this.state.hero.name}</h2>
            <div id="game-stage">
              <div className="row no-gutters">
                <div className="col-6">
                  {/* Scroll image goes here with
                enemy stats displayed */}
                  <h1>HP: {this.state.enemies[this.state.enemy].hp}</h1>
                  <h1>MP: {this.state.enemies[this.state.enemy].mp}</h1>
                </div>
                <div className="col-6">
                  <h1>Enemy Model</h1>
                  {/* Enemy model goes here */}
                  <h1>Enemy: {this.state.enemies[this.state.enemy].name}</h1>
                </div>
              </div>
              <div className="row no-gutters w-100" id="bottom-row">
                <div className="col">
                  <input onClick={this.changeEnemy} className="btn btn-info mx-3" type="button" value="<" />
                  <button className="btn btn-success mx-3" type="button">
                    <Link className="btn-choice" to={{
                      pathname: "/battle",
                      state: {
                        hero: this.state.hero,
                        enemy: this.state.enemies[this.state.enemy]
                      }
                    }} >Choose Enemy</Link>
                  </button>
                  <input onClick={this.changeEnemy} className="btn btn-info mx-3" type="button" value=">" />
                </div>
              </div>
            </div>
          </div>
        ) : (
            <Redirect to="/character" />
          )}
      </div>
    )
  }
}

export default EnemySelect