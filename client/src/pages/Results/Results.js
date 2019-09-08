import React, { Component } from 'react';
import { Link } from "react-router-dom"

import "./Results.css"
import AuthContext from "../../contexts/AuthContext"
import API from '../../lib/API';

class Results extends Component {
  static contextType = AuthContext

  state = {
    results: this.props.location.state.results
  }

  componentDidMount() {
    console.log(`Knight Exp: ${this.context.user.knightExp}`)
    API.Users.sendResults(this.props.location.state.user, this.props.location.state.results)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
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
                  XP
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