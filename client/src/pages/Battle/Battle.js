import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"

import "./battle.css"
import AuthContext from '../../contexts/AuthContext';
import API from '../../lib/API';
import Knight from "../../img/knight_idle.png"
import Mage from "../../img/mage_idle.png"
import Thief from "../../img/thief_sm.png"
import Bat from "../../img/bat1.png"
import Goblin from "../../img/goblin1.png"
import Dragon from "../../img/dragon1.png"
import Dungeon from "../../img/dungeonbackground.png"
import Slash from '../../music/464500__elynch0901__attack-kick-2.wav'
import Dead from '../../music/483653__spacejoe__falling-object-6.wav'
import battleMusic from '../../music/2019-01-22_-_Ready_to_Fight_-_David_Fesliyan.mp3'

// import Sound from 'react-sound';


class Battle extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props);
    this.sound = new Audio(battleMusic);
    this.slash = new Audio(Slash);
    this.dead = new Audio(Dead);
  }

  state = {
    match: this.props.location.state,
    roundActive: false,
    combatText: "",
    textCounter: 0,
    gameOver: false,
    // playerDead: false,
    heroHp: 0,
    enemyHp: 0,
    heroImages: [Knight, Thief, Mage],
    enemyImages: [Bat, Goblin, Dragon],
    heroImage: undefined,
    enemyImage: undefined,
    results: {},
    resultsLink: "/results"
  }

  componentDidMount() {
    this.sound.play();
    let heroImage
    let enemyImage
    switch (this.state.match.hero.name) {
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
    switch (this.state.match.enemy.name) {
      case "Bat":
        enemyImage = this.state.enemyImages[0]
        break;
      case "Goblin":
        enemyImage = this.state.enemyImages[1]
        break;
      case "Dragon":
        enemyImage = this.state.enemyImages[2]
        break;
    }
    this.setState({
      heroImage,
      enemyImage
    })
    API.Battle.battleStart(this.state.match.hero, this.state.match.enemy, this.props.location.state.herolv)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    this.setState({
      heroHp: this.state.match.hero.maxHp,
      enemyHp: this.state.match.enemy.maxHp
    })
  }

  componentWillUnmount() {
    this.sound.pause();
  }

  attack = () => {
    if (this.state.roundActive) return

    this.setState({
      roundActive: true,
      textCounter: 0
    })

    API.Battle.attack().then((res) => {
      // console.log(res.data)
      this.typeWriter(` ${res.data.playerMessage} ${res.data.enemyMessage} ${res.data.playerDead}`);

      //sets the hero to move forward
      let hele = document.getElementById("battle-hero");
      hele.style.left = "12%"
      setTimeout(() => {
        hele.style.left = "2%";
      }, 200);

      //sets the enemy to flash if attacked
      setTimeout(() => {
        if (res.data.playerMessage.includes('damage')) {
          // console.log("enemy was attacked");
          this.slash.play();
          let eele = document.getElementById("battle-enemy");
          eele.style.opacity = 0;
          setTimeout(() => {
            let flash = setInterval(function () {
              if (eele.style.opacity === "0") {
                eele.style.opacity = 1;
                // console.log("set to 1");
              }
              else {
                eele.style.opacity = 0;
                // console.log("set to 0");
              }
            }, 100)
            setTimeout(() => {
              clearInterval(flash)
              // console.log("flash reset")
            }, 300)
          }, 100)
        }
      }, 300)


      //sets the enemy to move forward
      setTimeout(() => {
        let eele = document.getElementById("battle-enemy");
        if (this.state.enemyHp > 0) {
          eele.style.opacity = 1;
          eele.style.right = "10%";
          setTimeout(() => {
            eele.style.right = "0%";
          }, 300);
        } else { //if enemy is dead, play this animation instead
          this.dead.play();
          eele.style.opacity = 0;
        }


        //sets the hero to flash if attacked
        setTimeout(() => {
          if (res.data.enemyMessage.includes('damage')) {
            // console.log("character was attacked");
            this.slash.play();
            let hele = document.getElementById("battle-hero");
            hele.style.opacity = 0;
            setTimeout(() => {
              let flash = setInterval(function () {
                if (hele.style.opacity === "0") {
                  hele.style.opacity = 1;
                  // console.log("set to 1");
                }
                else {
                  hele.style.opacity = 0;
                  // console.log("set to 0");
                }
              }, 100)
              setTimeout(() => {
                clearInterval(flash)
                // console.log("flash reset")
              }, 300)
            }, 100);
          }
        }, 400)

      }, (res.data.playerMessage.length * 50))


      this.setState({
        heroHp: res.data.playerHp,
        enemyHp: res.data.enemyHp
      })
      if (res.data.gameOver === true) {
        if (res.data.enemyHp <= 0) {
          this.setState({
            results: {
              hero: this.state.match.hero,
              roundWon: true,
              xpGain: this.state.match.enemy.exp,
              goldGain: this.state.match.enemy.gold
            },
            resultsLink: "/results"
          })
        } else {
          // console.log("Gameover!")
          this.setState({
            results: {
              hero: this.state.match.hero,
              roundWon: false,
              xpGain: 0,
              goldGain: 0
            },
            resultsLink: "/gameover"
          })
        }
        setTimeout(() => {
          this.setState({
            gameOver: true
          })
        }, 4000)
      }
    });

    //sets the hero back to visible if the flash messes up
    setTimeout(() => {
      let hele = document.getElementById("battle-hero");
      hele.style.opacity = 1;
    }, 1000)
  }

  defend = () => {
    if (this.state.roundActive) return

    this.setState({
      roundActive: true,
      textCounter: 0
    })

    API.Battle.defend().then((res) => {
      console.log(res.data)
      this.typeWriter(` ${res.data.playerMessage} ${res.data.enemyMessage} ${res.data.playerDead}`);

      //sets the enemy to move forward
      setTimeout(() => {
        let eele = document.getElementById("battle-enemy");
        if (this.state.enemyHp > 0) {
          eele.style.opacity = 1;
          eele.style.right = "10%";
          setTimeout(() => {
            eele.style.right = "0%";
          }, 300);
        } else {
          eele.style.opacity = 0;
        }


        //sets the hero to flash if attacked
        setTimeout(() => {
          if (res.data.enemyMessage.includes('damage')) {
            // console.log("character was attacked");
            this.slash.play();
            let hele = document.getElementById("battle-hero");
            hele.style.opacity = 0;
            setTimeout(() => {
              let flash = setInterval(function () {
                if (hele.style.opacity === "0") {
                  hele.style.opacity = 1;
                  console.log("set to 1");
                }
                else {
                  hele.style.opacity = 0;
                  console.log("set to 0");
                }
              }, 100)
              setTimeout(() => {
                clearInterval(flash)
                console.log("flash reset")
              }, 300)
            }, 100);
          }
        }, 300)

      }, (res.data.playerMessage.length * 50))

      this.setState({
        heroHp: res.data.playerHp,
        enemyHp: res.data.enemyHp
      })
      if (res.data.gameOver === true) {
        if (res.data.enemyHp <= 0) {
          this.setState({
            results: {
              hero: this.state.match.hero,
              roundWon: true,
              xpGain: this.state.match.enemy.exp,
              goldGain: this.state.match.enemy.gold
            },
            resultsLink: "/results"
          })
        } else {
          // console.log("Gameover!")
          this.setState({
            results: {
              hero: this.state.match.hero,
              roundWon: false,
              xpGain: 0,
              goldGain: 0
            },
            resultsLink: "/gameover"
          })
        }
        setTimeout(() => {
          this.setState({
            gameOver: true
          })
        }, 4000)
      }
    });
    //sets the hero back to visible if the flash messes up
    setTimeout(() => {
      let hele = document.getElementById("battle-hero");
      hele.style.opacity = 1;
    }, 1000)
  }

  typeWriter = newText => {
    let i = this.state.textCounter;
    let speed = 50;
    if (i < newText.length) {
      let text = this.state.combatText
      this.setState({
        combatText: text + newText.charAt(i),
        textCounter: i + 1,
      })
      setTimeout(() => this.typeWriter(newText), speed);
    } else {
      this.setState({ roundActive: false })
    }

  }

  // toResults = () => {
  //   console.log("button clicked");
  //   if (this.state.gameOver && this.state.heroHp <= 0) {
  //     return <Redirect to={{
  //       pathname: "/gameover",
//   state: {
//     results: this.state.results,
//   id: this.context.user._id
// }
//     }}
//     />
//   } else if (this.state.gameOver && this.state.enemyHp === 0) {
//     return <Redirect to={{
//       pathname: "/results",
//       state: {
//         results: this.state.results,
//         id: this.context.user._id
//       }
//     }}
//     />
//   }
// }

render() {
  // if (!this.context.user) return <Redirect to="/" />
  const { hero, enemy } = this.state.match
  const { combatText } = this.state


  return (
    <div className="Battle">
      <img src={Dungeon} id="battlebackground"></img>
      {/* {this.props.location.state ? ( */}
      <div>
        <h1>Battle Mode!</h1>
        <div className="container" id="game-stage">
          <div className="row h-100">
            <div className="col position-relative">
              <div id="battle-hero"><img src={this.state.heroImage} alt="heromodel"></img></div>
              <div id="battle-enemy"><img src={this.state.enemyImage} alt="enemymodel"></img></div>
              <div className="border border-dark bg-tan rounded" id="hero-stats">
                <div className="pt-2">
                  <div className="h4">{hero.name}</div>
                  <div className="lead">HP: {this.state.heroHp}/{this.state.match.hero.maxHp}</div>
                </div>
              </div>
              <div className="border border-dark bg-tan rounded" id="enemy-stats">
                <div className="pt-2">
                  <div className="h4">{enemy.name}</div>
                  <div className="lead">HP: {this.state.enemyHp}/{this.state.match.enemy.maxHp}</div>
                </div>
              </div>
              <div className="border border-dark bg-tan rounded" id="action-menu">
                {this.state.gameOver ? (
                  <div id="action-btns">
                    <Link to={{
                      pathname: this.state.resultsLink, state: {
                        results: this.state.results,
                        id: this.context.user._id
                      }
                    }}><button id="continue" className="btn btn-success mr-3">Continue</button></Link>
                  </div>
                ) : (
                    <div id="action-btns">
                      <button title="Attack the enemy" onClick={this.attack} className="btn btn-success mr-3" id="attack-btn">Attack</button>
                      <button title="Reduce damage taken and heal your hp by 10%" onClick={this.defend} className="btn btn-info ml-3" id="defend-btn">Defend</button>
                    </div>
                  )}
              </div>
              <div className="border border-dark bg-tan rounded" id="action-text">
                <div id="text-box">
                  <div className="container">
                    <p className="text-left lead" id="typewriter">{combatText.split('.').map(text => <p> {text}</p>)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
            <Redirect to="/character" />
          )} */}
    </div >
  )
}
}

export default Battle;