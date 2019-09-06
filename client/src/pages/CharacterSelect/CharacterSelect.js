import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"

import "./index.css"
import AuthContext from '../../contexts/AuthContext';
import API from "../../lib/API"
import Knight from "../../img/knight_idle.png"
import Mage from "../../img/mage_idle.png"
import Thief from "../../img/thief_idle.png"

class CharacterSelect extends Component {
  static contextType = AuthContext

  state = {
    heroes: [],
    heroClass: 0,
    redirectToReferrer: false,
    isLoaded: false,
    images: [Knight, Thief, Mage]
  }

  componentDidMount() {
    let id
    if (!this.context.user) {
      this.setState({ redirectToReferrer: true })
    } else {
      id = this.context.user._id

      API.Users.getHeroes(id)
        .then(res => {
          let { knightLevel, thiefLevel, mageLevel } = res.data
          let userHeroes = []

          userHeroes[0] = {
            name: "Knight",
            level: knightLevel
          }
          userHeroes[1] = {
            name: "Thief",
            level: thiefLevel
          }
          userHeroes[2] = {
            name: "Mage",
            level: mageLevel
          }

          API.Characters.getCharacters()
            .then(res => {
              userHeroes[0] = {
                ...userHeroes[0],
                ...res.data[0]
              }
              userHeroes[1] = {
                ...userHeroes[1],
                ...res.data[1]
              }
              userHeroes[2] = {
                ...userHeroes[2],
                ...res.data[2]
              }

              this.setState({
                heroes: [
                  userHeroes[0],
                  userHeroes[1],
                  userHeroes[2]
                ]
              })
            })
            .catch(err => console.log(err))
            .finally(() => this.setState({ isLoaded: true }))
        })
    }
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
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to="/" />
    }

    return (
      <div className="CharacterSelect" id="characterbackground">
        {this.state.isLoaded ? (
          <div>
            <h1>Character Select</h1>

            <div className="row no-gutters">
              <div className="col-6" id="statsbackground">
                <div className="mx-auto" id="characterstats">
                  {/* Scroll image goes here with
                active user's stats displayed */}
                  <h4>HP: {this.state.heroes[this.state.heroClass].maxHp}</h4>
                  <h4>Attack: {this.state.heroes[this.state.heroClass].atk}</h4>
                  <h4>Defense: {this.state.heroes[this.state.heroClass].def}</h4>
                  <h4>Accuracy: {this.state.heroes[this.state.heroClass].acc}</h4>
                  <h4>Evasion: {this.state.heroes[this.state.heroClass].eva}</h4>
                  <h4>Speed: {this.state.heroes[this.state.heroClass].spd}</h4>
                </div>
              </div>
              <div className="col-6">
                {/* Character model goes here */}
                <img src={this.state.images[this.state.heroClass]} alt={this.state.heroes[this.state.heroClass].name} id="heromodel"></img>
                <h1>Hero Class: {this.state.heroes[this.state.heroClass].name}</h1>
              </div>
            </div>
            <div className="row no-gutters w-100" id="bottom-row">
              <div className="col">
                <input onClick={this.changeCharacter} className="btn btn-info mx-3" type="button" value="<" />
                <Link className="btn-choice" to={{
                  pathname: "/enemy",
                  state: this.state.heroes[this.state.heroClass]
                }} ><button className="btn btn-success mx-3" type="button">Choose Hero</button></Link>
                <input onClick={this.changeCharacter} className="btn btn-info mx-3" type="button" value=">" />
              </div>
            </div>

          </div>
        ) : (
            <div></div>
          )
        }
      </div>
    )
  }
}

export default CharacterSelect