import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"
import "./enemymodel.css"
import AuthContext from '../../contexts/AuthContext';
import API from '../../lib/API';
import Bat from "../../img/bat1.png"
import Goblin from "../../img/goblin1.png"
import Dragon from "../../img/dragon2.png"

class EnemySelect extends Component {
  static contextType = AuthContext

  state = {
    hero: this.props.location.state,
    enemies: [],
    enemy: 0,
    redirectToReferrer: false,
    isLoaded: false,
    images: [Bat, Goblin, Dragon]
  }

  componentDidMount() {
    if (!this.context.user || !this.props.location.state) {
      this.setState({ redirectToReferrer: true })
    } else {
      API.Characters.getEnemies()
        .then(res => {
          let enemies = []
          res.data.forEach(enemy => {
            enemies.push(enemy)
          });

          this.setState({ enemies })
        })
        .catch(err => console.log(err))
        .finally(() => this.setState({ isLoaded: true }))
    }
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
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) return <Redirect to="/" />

    return (
      <div className="EnemySelect" id="enemybackground">
        {this.state.isLoaded ? (
          <div>
            <h1>Enemy Select</h1>
            <h2>You chose: {this.state.hero.name}</h2>
            <div id="game-stage">
              <div className="row no-gutters">
                <div className="col-6" id="enemystatsbackground">
                  <div className="mx-auto" id="enemystats">
                    {/* Scroll image goes here with
                  enemy stats displayed */}
                    <h4>HP: {this.state.enemies[this.state.enemy].maxHp}</h4>
                    <h4>Attack: {this.state.enemies[this.state.enemy].atk}</h4>
                    <h4>Defense: {this.state.enemies[this.state.enemy].def}</h4>
                    <h4>Accuracy: {this.state.enemies[this.state.enemy].acc}</h4>
                    <h4>Evasion: {this.state.enemies[this.state.enemy].eva}</h4>
                    <h4>Speed: {this.state.enemies[this.state.enemy].spd}</h4>
                  </div>
                </div>
                <div className="col-6">
                  <h1>Enemy: {this.state.enemies[this.state.enemy].name}</h1>
                  {/* Enemy model goes here */}
                  <img src={this.state.images[this.state.enemy]} alt={this.state.enemies[this.state.enemy].name} id="enemymodel"></img>
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
            <div></div>
          )}
      </div>
    )
  }
}

export default EnemySelect