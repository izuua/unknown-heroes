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
    textCounter: 0
  }

  componentDidMount() {
    console.log(this.context.user);
    const heroClass = (this.state.match.hero.name).toLowerCase();
    API.Battle.battleStart(this.state.match.hero, this.state.match.enemy, this.context.user[`${heroClass}Level`]);
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
    let attackText = 'You attacked for 10 damage! ';
    this.typeWriter(attackText);
  }
  
  typeWriter = newText => {
    let i = this.state.textCounter;
    let speed = 50;
    
    if (i < newText.length) {
      let text = this.state.combatText
      this.setState({ 
        combatText: text + newText.charAt(i),
        textCounter: i + 1
      })
    } else {
      this.setState({ roundActive: false })
    }

    setTimeout(() => this.typeWriter(newText), speed);
  }

  render() {
    // if (!this.context.user) return <Redirect to="/" />
    const { hero, enemy } = this.state.match
    const { combatText } = this.state
    console.log(this.context.user);

    return (
      <div className="Battle bg-scroll">
        {/* {this.props.location.state ? ( */}
        <div>
          <h1>Battle Mode!</h1>
          <h2>{hero.name} vs. {enemy.name}</h2>
          <div className="container bg-dark" id="game-stage">
            <div className="row h-100">
              <div className="col position-relative">
                <div className="border border-dark bg-tan rounded" id="hero-stats">
                  <div className="h4">{hero.name}</div>
                  <div className="lead">HP: {hero.maxHp}</div>
                </div>
                <div className="border border-dark bg-tan rounded" id="enemy-stats">
                  <div className="h4">{enemy.name}</div>
                  <div className="lead">HP: {enemy.maxHp}</div>
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