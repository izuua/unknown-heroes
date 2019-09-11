import React, { Component } from "react"
import { Bar } from "react-chartjs-2"

import "./stats.css"
import AuthContext from "../../contexts/AuthContext"
import API from "../../lib/API"
import TokenStore from "../../lib/TokenStore"

class Stats extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    let colors = ["rgb(170, 12, 12)", "rgb(18, 168, 31)", "rgb(31, 18, 168)"]

    this.state = {
      colors: colors,
      isLoading: true,
      heroes: [],
      chartData: []
    }
  }

  componentDidMount() {
    const authToken = TokenStore.getToken()
    let id
    API.Users.getMe(authToken)
      .then(res => {
        id = res.data._id

        API.Users.getHeroes(id)
          .then(res => {
            let { knightLevel, knightExp, thiefLevel, thiefExp, mageLevel, mageExp } = res.data
            let heroes = []

            heroes[0] = {
              name: "Knight",
              level: knightLevel,
              exp: knightExp
            }
            heroes[1] = {
              name: "Thief",
              level: thiefLevel,
              exp: thiefExp
            }
            heroes[2] = {
              name: "Mage",
              level: mageLevel,
              exp: mageExp
            }

            API.Characters.getCharacters([knightLevel, thiefLevel, mageLevel])
              .then(res => {
                for (let i = 0; i < heroes.length; i++) {
                  heroes[i] = {
                    ...heroes[i],
                    ...res.data[i]
                  }
                }

                let chartData = []

                for (let i = 0; i < heroes.length; i++) {
                  chartData[i] = {
                    labels: ["Attack", "Defense", "Accuracy", "Evasion", "Speed"],
                    datasets: [
                      {
                        label: heroes[i].name,
                        data: [heroes[i].atk, heroes[i].def, heroes[i].acc, heroes[i].eva, heroes[i].spd],
                        backgroundColor: this.state.colors[i]
                      }
                    ]
                  }
                }

                this.setState({
                  heroes,
                  chartData
                })
                console.log(this.state.chartData)
              })
              .catch(err => console.log(err))
              .finally(() => {
                this.setState({
                  isLoading: false
                })
              })
          })
      })
  }

  render() {
    const options = {
      maintainAspectRatio: false,
      responsive: false,
      legend: {
        labels: {
          fontColor: "white"
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "white",
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "white",
            beginAtZero: true
          }
        }]
      }
    }

    return (
      <div className="Stats bg-scroll indie-flower" >
        {this.state.isLoading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
            <div className="container">
              <div className="display-4">Character Stats</div>
              <div className="row" id="stats-row">
                <div className="col-4">
                  <div className="h2">Knight</div>
                  <div className="h5">Level: {this.state.heroes[0].level}</div>
                  <Bar
                    data={this.state.chartData[0]}
                    width={200}
                    height={300}
                    options={options}
                  />
                </div>
                <div className="col-4">
                  <div className="h2">Thief</div>
                  <div className="h5">Level: {this.state.heroes[1].level}</div>
                  <Bar
                    data={this.state.chartData[1]}
                    width={200}
                    height={300}
                    options={options}
                  />
                </div>
                <div className="col-4">
                  <div className="h2">Mage</div>
                  <div className="h5">Level: {this.state.heroes[2].level}</div>
                  <Bar
                    data={this.state.chartData[2]}
                    width={200}
                    height={300}
                    options={options}
                  />
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default Stats