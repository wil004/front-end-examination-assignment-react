import React from "react";
import './navbar.css';
import {useState} from "react";
import DropdownOptions from "./DropdownOptionsNavbar";
import menuIcon from "./assets/menuicon.png"
import {NavLink} from "react-router-dom";

function Navbar () {
    const [unfolded, toggleUnfolded] = useState(false);

    return (
        <nav id="mainNav">
            {unfolded ? <>
                <div className="navContent">
                <button className="unfoldButton" onClick={() => {toggleUnfolded(!unfolded)}} >
                    <img src={menuIcon} widt="50" height="50"/>
                </button>
                    <NavLink to="/"><p>Home</p></NavLink>
                    <NavLink to="/country"><p>Choose news Country</p></NavLink>
                    <p>Content</p>
                    <p>Nog een link</p>
                    <p>Meer</p>
                </div>
                    <DropdownOptions  click={() => { toggleUnfolded(!unfolded) }}/>
                </>
            : <div className="navContent">
                <button className="unfoldButton" onClick={() => {toggleUnfolded(!unfolded)}}>
                    <img src={menuIcon} width="50" height="50"/>
                </button>
                    <NavLink to="/"><p>Home</p></NavLink>
                    <NavLink to="/country"><p>Choose news Country</p></NavLink>
                    <p>Content</p>
                    <p>Nog een link</p>
                    <p>Meer</p>
                </div>}
        </nav>
    )

}


export default Navbar