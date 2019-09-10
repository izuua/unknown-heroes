import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"
import "./charactermodel.css"
import "./index.css"
import AuthContext from '../../contexts/AuthContext';
import API from "../../lib/API"
import Knight from "../../img/knight_idle.png"
import Mage from "../../img/mage_idle.png"
// import Thief from "../../img/thief_idle.png"
import ThiefSm from "../../img/thief_sm.png"
import Scroll from "../../img/stats-scroll.png"
import TokenStore from "../../lib/TokenStore"
import CharacterMusic from '../../music/2012-10-09_Preparation_-_David_Feslyan.mp3'

class CharacterSelect extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props);
    this.sound = new Audio(CharacterMusic);
  }

  state = {
    heroes: [],
    heroClass: 0,
    redirectToReferrer: false,
    isLoaded: false,
    images: [Knight, ThiefSm, Mage]
  }

  componentDidMount() {
    this.sound.play();
    if (!this.context.user) {
      this.setState({ redirectToReferrer: true })
    } else {
      const authToken = TokenStore.getToken()
      let id

      API.Users.getMe(authToken)
        .then(res => {
          id = res.data._id

          API.Users.getHeroes(id)
            .then(res => {
              console.log(res.data)
              let { knightLevel, knightExp, thiefLevel, thiefExp, mageLevel, mageExp } = res.data
              let userHeroes = []

              userHeroes[0] = {
                name: "Knight",
                level: knightLevel,
                exp: knightExp
              }
              userHeroes[1] = {
                name: "Thief",
                level: thiefLevel,
                exp: thiefExp
              }
              userHeroes[2] = {
                name: "Mage",
                level: mageLevel,
                exp: mageExp
              }

              API.Characters.getCharacters([knightLevel, thiefLevel, mageLevel])
                .then(res => {
                  for (let i = 0; i < userHeroes.length; i++) {
                    userHeroes[i] = {
                      ...userHeroes[i],
                      ...res.data[i]
                    }
                  }

                  this.setState({
                    heroes: userHeroes
                  })
                })
                .catch(err => console.log(err))
                .finally(() => this.setState({ isLoaded: true }))
            })
        })
    }
  }

  componentWillUnmount() {
    this.sound.pause();
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
            <div className="display-4">Character Select</div>
            <div className="row vh-75 no-gutters">
              <div className="col-6">
                <div className="scroll-container">
                  <img src={Scroll} alt="Scroll with stats" />
                  <div id="stats-text">
                    <div className="h2">Hero: <strong>{this.state.heroes[this.state.heroClass].name}</strong></div>
                    <div>HP: {this.state.heroes[this.state.heroClass].maxHp}</div>
                    <div>Attack: {this.state.heroes[this.state.heroClass].atk}</div>
                    <div>Defense: {this.state.heroes[this.state.heroClass].def}</div>
                    <div>Accuracy: {this.state.heroes[this.state.heroClass].acc}</div>
                    <div>Evasion: {this.state.heroes[this.state.heroClass].eva}</div>
                    <div>Speed: {this.state.heroes[this.state.heroClass].spd}</div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="model-container">
                  <img src={this.state.images[this.state.heroClass]} alt={this.state.heroes[this.state.heroClass].name} id="heromodel" />
                </div>
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