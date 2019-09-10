import React, { Component } from 'react';
import { Link } from "react-router-dom"

import "./Gameover.css"
import Lost from '../../music/serge-narcissoff-dark-knight.mp3'

class Gameover extends Component {

    constructor(props) {
        super(props);
        this.sound = new Audio(Lost);
      }
    
      componentDidMount() {
        this.sound.play();
      }
    
      componentWillUnmount() {
        this.sound.pause();
      }

    render() {

        return (
            <div className="bg-scroll">
                <div className="container gameover-bg">
                    <div className="row">
                        <div className="col-md">
                            <h1>You died! Game over!</h1>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Gameover;