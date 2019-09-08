import React, { Component } from 'react';
import { Link } from "react-router-dom"

import "./Gameover.css"

class Gameover extends Component {

    render() {

        return (
            <div className="bg-scroll">
                <h1>End of The Game</h1>
                <div className="container gameover-bg">
                    <div className="row">
                        <div className="col-md">
                            <h3>You died Game over!</h3>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Gameover;