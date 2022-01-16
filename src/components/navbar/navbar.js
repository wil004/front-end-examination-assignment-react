import React from "react";
import './navbar.css';
import {useState} from "react";
import menuIcon from "./assets/menuicon.png"
import {NavLink} from "react-router-dom";

function Navbar ({dropDownMenu, news}) {
    const [unfolded, toggleUnfolded] = useState(false);
    return (
        <>
        <nav id="mainNav">
            {unfolded ?
            <>
                <div className="navContent">
                <button className="unfoldButton" onClick={() => {toggleUnfolded(!unfolded);}} >
                    <img src={menuIcon} width="40" height="40"/>
                </button>
                    <NavLink to="/" className="navbarButton">Home</NavLink>
                    <NavLink to="/news/general" className="navbarButton">News</NavLink>
                    <NavLink to="/country" className="navbarButton">Countries</NavLink>

                    <div className="loginRegisterNav">
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register" className="navbarButtonLogin">Register</NavLink>
                    </div>
                </div>
                {dropDownMenu}

            </>
            : <div className="navContent">
                <button className="unfoldButton" onClick={() => {toggleUnfolded(!unfolded)}}>
                    <img src={menuIcon} width="40" height="40"/>
                </button>
                    <NavLink to="/" className="navbarButton">Home</NavLink>
                    <NavLink to="/news/general" className="navbarButton">News</NavLink>
                    <NavLink to="/country" className="navbarButton">Countries</NavLink>
                    <div className="loginRegisterNav">
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register" className="navbarButtonLogin">Register</NavLink>
                    </div>
                </div>}
        </nav>
            {news}
    </>
    )

}


export default Navbar