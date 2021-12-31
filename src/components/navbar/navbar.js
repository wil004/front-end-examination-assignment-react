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
                    <img src={menuIcon} widt="50" height="50"/>
                </button>
                    <NavLink to="/" className="navbarButton"><p>Home</p></NavLink>
                    <NavLink to="/country" className="navbarButton"><p>Popular Countries</p></NavLink>
                    <NavLink to="/allCountries" className="navbarButton"><p>All Countries</p></NavLink>
                    <div className="loginRegisterNav">
                        <NavLink to="/login"><p className="navbarButtonLogin">Login</p></NavLink>
                        <NavLink to="/register" className="navbarButtonLogin"><p>Register</p></NavLink>
                    </div>
                </div>
                {dropDownMenu}

            </>
            : <div className="navContent">
                <button className="unfoldButton" onClick={() => {toggleUnfolded(!unfolded)}}>
                    <img src={menuIcon} width="50" height="50"/>
                </button>
                    <NavLink to="/" className="navbarButton"><p>Home</p></NavLink>
                    <NavLink to="/country" className="navbarButton"><p>Popular Countries</p></NavLink>
                    <NavLink to="/allCountries" className="navbarButton"><p>All Countries</p></NavLink>
                    <div className="loginRegisterNav">
                        <NavLink to="/login"><p className="navbarButtonLogin">Login</p></NavLink>
                        <NavLink to="/register" className="navbarButtonLogin"><p>Register</p></NavLink>
                    </div>
                </div>}
        </nav>
            {news}
    </>
    )

}


export default Navbar