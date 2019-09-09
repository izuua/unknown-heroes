import React, { Component } from 'react';
import { Link } from "react-router-dom"

import "./Results.css"
import AuthContext from "../../contexts/AuthContext"
import API from '../../lib/API';

class Results extends Component {
  static contextType = AuthContext

  state = {
    results: {},
    hero: {},
    levelUp: false
  }

  componentDidMount() {
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
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.results)
    return (
      <div className="bg-scroll">
        <h1>Results Details</h1>
        <div className="container results-bg">
          <div className="row">
            <div className="col-md-4">
              <img src="https://via.placeholder.com/150" alt="Hero model"></img>
              <ul>
                <li>some stats</li>
                <li>some stats</li>
                <li>some stats</li>
                <li>some stats</li>
              </ul>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  XP: {this.state.results.mageExp}
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