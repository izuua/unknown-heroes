import React, { Component } from "react"
import { Bar } from "react-chartjs-2"

import "./stats.css"
import AuthContext from "../../contexts/AuthContext"

class Stats extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    let colors = []

    for (let i = 0; i < 5; i++) {
      colors.push(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
    }

    this.state = {
      chartData: [
        {
          labels: ["Attack", "Defense", "Accuracy", "Evasion", "Speed"],
          datasets: [
            {
              label: "Stats",
              data: [
                3,
                3,
                1,
                1,
                1
              ],
              backgroundColor: colors,
            }
          ]
        },
        {
          labels: ["Attack", "Defense", "Accuracy", "Evasion", "Speed"],
          datasets: [
            {
              label: "Stats",
              data: [
                3,
                3,
                1,
                1,
                1
              ],
              backgroundColor: colors,
            }
          ]
        },
        {
          labels: ["Attack", "Defense", "Accuracy", "Evasion", "Speed"],
          datasets: [
            {
              label: "Stats",
              data: [
                3,
                3,
                1,
                1,
                1
              ],
              backgroundColor: colors,
            }
          ]
        }
      ]
    }
  }

  componentDidMount() {
    // Get stats
  }

  render() {
    return (
      <div className="Stats bg-scroll indie-flower">
        <div className="container">
          <div className="display-4">Character Stats</div>
          <div className="row" id="stats-row">
            <div className="col-4">
              <div className="h4">Knight</div>
              <div className="h6">Level: 1</div>
              <Bar
                data={this.state.chartData[0]}
                width={100}
                height={100}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  // scales: {
                  //   yAxes: [{
                  //     ticks: {
                  //       beginAtZero: true
                  //     }
                  //   }]
                  // }
                }}
              />
            </div>
            <div className="col-4">
              <Bar
                data={{ nums: [10, 20, 30, 40, 50] }}
                width={100}
                height={100}
                options={{ maintainAspectRatio: false }}
              />
            </div>
            <div className="col-4">
              <Bar
                data={{ nums: [10, 20, 30, 40, 50] }}
                width={100}
                height={100}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stats