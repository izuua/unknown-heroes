import React, { Component } from 'react';
import { Link} from "react-router-dom"

import "./Results.css"

class Results extends React.Component {

    render() {

        return (
            <div className="bg-scroll">
                <h1>Results Details</h1>
                <div className="container results-bg">
                    <div className="row">
                        <div className="col-md-4">
                            <img src="https://via.placeholder.com/150"></img>
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