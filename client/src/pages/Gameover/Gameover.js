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
                {/* <h1>End of The Game</h1> */}
                <div className="container gameover-bg">
                    <div className="row">
                        <div className="col-md">
                            <h3>You died! Game over!</h3>
                            <div className="col">
                        <Link className="btn-choice" to={{
                            pathname: "/character",
                        }} ><button className="btn btn-success mx-3 gameover-btn" type="button">Play again</button></Link>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gameover;