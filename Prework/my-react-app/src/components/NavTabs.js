import React from "react";
import {Link} from "react-router-dom";

function NavTabs() {
    return (
        <ul className= "nav nav-tabs">
            <li className= "nav-item">
                <Link to= "/" className= {window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
                    Home
                </Link>
            </li>
            <li className= "nav-item">
                <Link to= "/login" className= {window.location.pathname === "/login" ? "nav-link active" : "nav-link"}>
                    Log In
                </Link>
            </li>
            <li className= "nav-item">
                <Link to= "/createaccount" className= {window.location.pathname === "/createaccount" ? "nav-link active" : "nav-link"}>
                    Create Account
                </Link>
            </li>
        </ul>
    );
}

export default NavTabs;