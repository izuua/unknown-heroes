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
    heroImages: [Knight, Thief, Mage]
  }

  componentDidMount() {
    this.sound.play();
    let heroImage
    console.log(this.state.hero.name);

    if (!this.props.location.state) return
    API.Users.sendResults(this.props.location.state.results, this.props.location.state.id)
      .then(res => {
        let levelUp = false
        if (res.data.levelUp) levelUp = true

        API.Users.getHeroes(this.props.location.state.id)
          .then(stats => {
            let results = stats.data
            console.log(results)
            if (levelUp) {
              this.setState({
                results,
                hero: this.props.location.state.results.hero,
                enemy: this.props.location.state.results.enemy,
                levelUp: true
              })
            } else {
              this.setState({
                results,
                hero: this.props.location.state.results.hero,
                enemy: this.props.location.state.results.enemy
              })
            }
            console.log(this.state.hero.name)
            switch (this.state.hero.name) {
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
              <div id="battle-hero"><img src={this.state.heroImage} alt="heromodel"></img></div>
              {/* <ul>
                <li>some stats</li>
                <li>some stats</li>
                <li>some stats</li>
                <li>some stats</li>
              </ul> */}
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 results">
                  XP:
                            </div>
                <div className="col-md-6 results">
                  Gold: 
                            </div>
              </div>
              <div className="row">
                <div className="col-md-12 results">
                  Level: {this.state.results.knightLevel}
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