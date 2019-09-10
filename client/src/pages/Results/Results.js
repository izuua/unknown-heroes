import React, { Component } from 'react';
import { Link } from "react-router-dom"

import "./Results.css"
import AuthContext from "../../contexts/AuthContext"
import API from '../../lib/API';
import Knight from "../../img/knight_idle.png"
import Mage from "../../img/mage_idle.png"
import Thief from "../../img/thief_sm.png"
import Victory from '../../music/2017-06-02_-_Happy_Streams_-_David_Fesliyan.mp3'

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
    heroImage: undefined
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
    console.log(this.state.results)
    return (
      <div className="bg-scroll">
        <h1>Results Details</h1>
        <div className="container results-bg">
          <div className="row">
            <div className="col-md-4">
              <div id="battle-hero"><img src={this.state.heroImage} ></img></div>
              {/* <ul>
                <li>some stats</li>
                <li>some stats</li>
                <li>some stats</li>
                <li>some stats</li>
              </ul> */}
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  XP:
                            </div>
                <div className="col-md-6">
                  Gold
                            </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  Levels
                            </div>
              </div>
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
    );
  }
}

export default Results;