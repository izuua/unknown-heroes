import React, { Component } from 'react';
import { Link } from "react-router-dom"

import "./Results.css"
import AuthContext from "../../contexts/AuthContext"
import API from '../../lib/API';
import Knight from "../../img/knight_idle.png"
import Mage from "../../img/mage_idle.png"
import Thief from "../../img/thief_sm.png"
import Victory from '../../music/2018-06-06_-_Dreams_of_a_Child_-_David_Fesliyan.mp3'
import Loading from '../../img/loading.gif'

class Results extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props);
    this.sound = new Audio(Victory);
  }

  state = {
    results: {},
    hero: {},
    levelUp: false,
    heroImages: [Knight, Thief, Mage],
    heroImage: undefined,
    KnightLv: 0,
    ThiefLv: 0,
    MageLv: 0
  }

  componentDidMount() {
    this.sound.play();
    let heroImage
    console.log(this.state.hero.name);

    if (!this.props.location.state) return
    API.Users.sendResults(this.props.location.state.results, this.props.location.state.id)
      .then(res => {
        let levelUp = res.data.levelUp

        this.setState({ levelUp })

        API.Users.getHeroes(this.props.location.state.id)
          .then(stats => {
            const { knightLevel, thiefLevel, mageLevel } = stats.data
            let levels = [knightLevel, thiefLevel, mageLevel]
            let userStats = stats.data
            this.setState({
              KnightLv: levels[0],
              ThiefLv: levels[1],
              MageLv: levels[2]
            })
            console.log(userStats)

            API.Characters.getCharacters(levels)
              .then(res => {
                let currentHero = res.data.filter(hero => hero.name === this.props.location.state.results.hero.name)
                console.log(currentHero)

                this.setState({
                  results: this.props.location.state.results,
                  hero: currentHero
                })
              })
              .catch(err => console.log(err))
              .finally(res => {
                console.log(this.state.hero.name)
                switch (this.props.location.state.results.hero.name) {
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
                this.setState({
                  heroImage
                })
              })

          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  componentWillUnmount() {
    this.sound.pause();
  }

  render() {
   
    return this.state.results.hero ? (
      
      <div className="bg-scroll">
        <h1>Results Details</h1>
        <div className="container results-bg">
          <div className="row">
            <div className="col-md-4 stats">
              <ul>
                <li>Name: {this.state.hero[0].name}</li>
                <li>Level: {this.state[`${this.state.hero[0].name}Lv`]}</li>
                <li>HP: {this.state.hero[0].maxHp}</li>
                <li>Atk: {this.state.hero[0].atk}</li>
                <li>Def: {this.state.hero[0].def}</li>
                <li>Acc: {this.state.hero[0].acc}</li>
                <li>Eva: {this.state.hero[0].eva}</li>
                <li>Spd: {this.state.hero[0].spd}</li>
              </ul>
              <div id="battle-hero"><img src={this.state.heroImage}></img></div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 results">
                  XP: {this.state.results.xpGain}
                            </div>
                <div className="col-md-6 results">
                  Gold: {this.state.results.goldGain}
                            </div>
              </div>
              {this.state.levelUp && <div className="row">
                <div className="col-md-12 results">
                  Level up!
                </div>
              </div>}
              <div className="row">
                <div className="col-md-12">

                  <div className="col">

                    <Link className="btn-choice" to={{
                      pathname: "/character",

                    }} ><button className="btn btn-success mx-3" type="button">Play again</button></Link>


                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : ( <div id="loading"><img src={Loading}></img></div>)
  }
}

export default Results;