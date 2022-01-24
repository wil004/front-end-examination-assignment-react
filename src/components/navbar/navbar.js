import React from "react";
import './navbar.css';
import {NavLink} from "react-router-dom";


function Navbar ({navData}) {


    return (
        <>
            <nav id="nav">

                <div className="nav left">
                    <NavLink exact to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/news" className="nav-link">News</NavLink>
                    <NavLink to="/countries/" className="nav-link">Countries</NavLink>
                    <NavLink to="/personal" className="nav-link">Userpage</NavLink>
                </div>
                <div>
                    <h1 className="navData">{navData}</h1>
                </div>
                <div className="nav right">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                </div>
            </nav>
        </>

    )

}


export default Navbar