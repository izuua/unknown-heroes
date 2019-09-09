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
    let colors = []

    for (let i = 0; i < 5; i++) {
      colors.push(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
    }

    this.state = {
      heroes: [],
      chartData: [
        {
          labels: ["Attack", "Defense", "Accuracy", "Evasion", "Speed"],
          datasets: [
            {
              label: "Stats",
              data: [],
              backgroundColor: colors,
            }
          ]
        },
        {
          labels: ["Attack", "Defense", "Accuracy", "Evasion", "Speed"],
          datasets: [
            {
              label: "Stats",
              data: [],
              backgroundColor: colors,
            }
          ]
        },
        {
          labels: ["Attack", "Defense", "Accuracy", "Evasion", "Speed"],
          datasets: [
            {
              label: "Stats",
              data: [],
              backgroundColor: colors,
            }
          ]
        }
      ]
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
                console.log(userHeroes)

                let chartData = this.state.chartData
                let newData = [{ datasets: [] }, { datasets: [] }, { datasets: [] }]
                for (let i = 0; i < userHeroes.length; i++) {
                  newData[i].datasets[0].data = [userHeroes[i].atk, userHeroes[i].def, userHeroes[i].acc, userHeroes[i].eva, userHeroes[i].spd]
                }

                this.setState({
                  heroes: userHeroes,
                  chartData: [
                    chartData[0] = {
                      ...chartData[0],
                      ...newData[0]
                    },
                    chartData[1] = {
                      ...chartData[1],
                      ...newData[1]
                    },
                    chartData[2] = {
                      ...chartData[2],
                      ...newData[2]
                    }
                  ]
                })
              })
              .catch(err => console.log(err))
              .finally(() => this.setState({ isLoaded: true }))
          })
      })
  }

  render() {
    return (
      <div className="Stats bg-scroll indie-flower" >
        <div className="container">
          <div className="display-4">Character Stats</div>
          <div className="row" id="stats-row">
            <div className="col-4">
              <div className="h4">Knight</div>
              <div className="h6">Level: 1</div>
              <Bar
                data={this.state.chartData[0]}
                width={200}
                height={300}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }}
              />
            </div>
            <div className="col-4">
              <div className="h4">Thief</div>
              <div className="h6">Level: 1</div>
              <Bar
                data={this.state.chartData[0]}
                width={200}
                height={300}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }}
              />
            </div>
            <div className="col-4">
              <div className="h4">Mage</div>
              <div className="h6">Level: 1</div>
              <Bar
                data={this.state.chartData[0]}
                width={200}
                height={300}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stats