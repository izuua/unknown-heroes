import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

import "./battle.css"
import AuthContext from '../../contexts/AuthContext';
import API from '../../lib/API';

class Battle extends Component {
  static contextType = AuthContext

  state = {
    match: this.props.location.state,
    roundActive: false,
    combatText: "",
    textCounter: 0,
    gameOver: false,
    heroHp: 0,
    enemyHp: 0
  }

  componentDidMount() {
    console.log(this.context.user);
    API.Battle.battleStart(this.state.match.hero, this.state.match.enemy, this.props.location.state.herolv);
    this.setState({
      heroHp: this.state.match.hero.maxHp,
      enemyHp: this.state.match.enemy.maxHp
    })
  }


  attack = () => {
    // Return if round is active
    if (this.state.roundActive) return
    
    // Reset text counter and set round as active
    this.setState({ 
      roundActive: true,
      textCounter: 0
    })

    // Attack logic goes here 

    // Sample response text for typewriter
    API.Battle.attack().then((res)=>{
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
      <div className="Battle" id="battlebackground">
        {/* {this.props.location.state ? ( */}
        <div>
          <h1>Battle Mode!</h1>
          <h2>{hero.name} vs. {enemy.name}</h2>
          <div className="container" id="game-stage">
            <div className="row h-100">
              <div className="col position-relative">
                <div className="border border-dark bg-tan rounded" id="hero-stats">
                  <div className="h4">{hero.name}</div>
                  <div className="lead">HP: {this.state.heroHp}/{this.state.match.hero.maxHp}</div>
                </div>
                <div className="border border-dark bg-tan rounded" id="enemy-stats">
                  <div className="h4">{enemy.name}</div>
                  <div className="lead">HP: {this.state.enemyHp}/{this.state.match.enemy.maxHp}</div>
                </div>
                <div className="border border-dark bg-tan rounded" id="action-menu">
                  <div id="action-btns">
                    <button onClick={this.attack} className="btn btn-success mr-3" id="attack-btn">Attack</button>
                    <button className="btn btn-info ml-3" id="attack-btn">Defend</button>
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