import React, { Component } from 'react';
// import { Redirect } from "react-router-dom"

import "./battle.css"
import AuthContext from '../../contexts/AuthContext';
import API from '../../lib/API';
import Knight from "../../img/knight_idle.png"
import Mage from "../../img/mage_idle.png"
import Thief from "../../img/thief_sm.png"
import Bat from "../../img/bat1.png"
import Goblin from "../../img/goblin1.png"
import Dragon from "../../img/dragon1.png"
import Dungeon from "../../img/dungeonbackground.png"

class Battle extends Component {
  static contextType = AuthContext

  state = {
    match: this.props.location.state,
    roundActive: false,
    combatText: "",
    textCounter: 0,
    gameOver: false,
    heroHp: 0,
    enemyHp: 0,
    heroImages: [Knight, Thief, Mage],
    enemyImages: [Bat, Goblin, Dragon],
    heroImage: undefined,
    enemyImage: undefined
  }

  componentDidMount() {
    let heroImage
    let enemyImage
    switch (this.state.match.hero.name) {
      case "Knight":
        heroImage = this.state.heroImages[0]
        break;
      case "Thief":
        heroImage = this.state.heroImages[1]
        break;
      case "Mage":
        heroImage = this.state.heroImages[2]
        break;
    }
    switch (this.state.match.enemy.name) {
      case "Bat":
        enemyImage = this.state.enemyImages[0]
        break;
      case "Goblin":
        enemyImage = this.state.enemyImages[1]
        break;
      case "Dragon":
        enemyImage = this.state.enemyImages[2]
        break;
    }
    this.setState ({
      heroImage, 
      enemyImage
    })
    console.log(this.context.user);
    API.Battle.battleStart(this.state.match.hero, this.state.match.enemy, this.props.location.state.herolv);
    this.setState({
      heroHp: this.state.match.hero.maxHp,
      enemyHp: this.state.match.enemy.maxHp
    })
  }


  attack = () => {
    if (this.state.roundActive) return

    this.setState({
      roundActive: true,
      textCounter: 0
    })

    API.Battle.attack().then((res) => {
      console.log(res.data)
      this.typeWriter(` ${res.data.playerMessage} ${res.data.enemyMessage}`);
      this.setState({
        heroHp: res.data.playerHp,
        enemyHp: res.data.enemyHp
      })
      if (res.data.gameOver === true) {
        this.setState({
          gameOver: true
        })
      }
    });
  }

  typeWriter = newText => {
    let i = this.state.textCounter;
    let speed = 50;

    if (i < newText.length) {
      let text = this.state.combatText
      this.setState({
        combatText: text + newText.charAt(i),
        textCounter: i + 1,
      })
      setTimeout(() => this.typeWriter(newText), speed);
    } else {
      this.setState({ roundActive: false })
    }

  }

  render() {
    // if (!this.context.user) return <Redirect to="/" />
    const { hero, enemy } = this.state.match
    const { combatText } = this.state

    return (
      <div className="Battle">
        <img src={Dungeon} id="battlebackground"></img>
        {/* {this.props.location.state ? ( */}
        <div>
          <h1>Battle Mode!</h1>
          <div className="container" id="game-stage">
            <div className="row h-100">
              <div className="col position-relative">
                <div id="battle-hero"><img src={this.state.heroImage} alt="heromodel"></img></div>
                <div id="battle-enemy"><img src={this.state.enemyImage} alt="enemymodel"></img></div>
                <div className="border border-dark bg-tan rounded" id="hero-stats">
                  <div className="pt-3">
                    <div className="h4">{hero.name}</div>
                    <div className="lead">HP: {this.state.heroHp}/{this.state.match.hero.maxHp}</div>
                  </div>
                </div>
                <div className="border border-dark bg-tan rounded" id="enemy-stats">
                  <div className="pt-3">
                    <div className="h4">{enemy.name}</div>
                    <div className="lead">HP: {this.state.enemyHp}/{this.state.match.enemy.maxHp}</div>
                  </div>
                </div>
                <div className="border border-dark bg-tan rounded" id="action-menu">
                  <div id="action-btns">
                    <button title="Attack the enemy" onClick={this.attack} className="btn btn-success mr-3" id="attack-btn">Attack</button>
                    <button title="Reduce damage taken and heal your hp by 10%" className="btn btn-info ml-3" id="attack-btn">Defend</button>
                  </div>
                </div>
                <div className="border border-dark bg-tan rounded" id="action-text">
                  <div id="text-box">
                    <div className="container">
                      <p className="text-left lead" id="typewriter">{combatText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ) : (
            <Redirect to="/character" />
          )} */}
      </div>
    )
  }
}

export default Battle;