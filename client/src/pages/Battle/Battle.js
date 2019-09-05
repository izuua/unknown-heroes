import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

import AuthContext from '../../contexts/AuthContext';

class Battle extends Component {
  static contextType = AuthContext

  state = {
    match: this.props.location.state,
  }

  render() {
    if (!this.context.user) return <Redirect to="/" />

    return (
      <div className="Battle">
        {this.props.location.state ? (
          <div>
            <h1>Battle Mode!</h1>
            <h2>{this.state.match.hero.name} vs. {this.state.match.enemy.name}</h2>
            <div id="game-stage">
              <div className="row no-gutters">
                <div className="col-6">
                  {/* Hero Stats */}
                  <h1>{this.state.match.hero.name}</h1>
                  <h2>HP: {this.state.match.hero.hp}</h2>
                  <h2>MP: {this.state.match.hero.mp}</h2>
                </div>
                <div className="col-6">
                  {/* Enemy Stats */}
                  <h1>{this.state.match.enemy.name}</h1>
                  <h2>HP: {this.state.match.enemy.hp}</h2>
                  <h2>MP: {this.state.match.enemy.mp}</h2>
                </div>
              </div>
              <div className="row no-gutters w-100" id="bottom-row">
                <div className="col">
                  <h6>Attack</h6>
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

export default Battle