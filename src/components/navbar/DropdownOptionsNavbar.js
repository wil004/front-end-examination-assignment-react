import React from "react";
import {NavLink} from "react-router-dom";
import sports from "./assets/sports.png"
import politics from "./assets/politics.png"
import food from "./assets/food.png"
import travel from "./assets/travel.png"
import general from "./assets/general.png"
import tech from "./assets/tech.png"

function DropdownOptions ({click}) {
    return (
        <div className="navMenu">
            <NavLink className="navMenuOption" to="/" onClick={click}>
                <img src={general} widt="40" height="40" />
                <p>General</p>
            </NavLink>
            <NavLink className="navMenuOption" to="/sports" onClick={click}>
                <img src={sports} width="25" height="25"/>
                <p>Sports</p>
            </NavLink>
            <NavLink className="navMenuOption" to="/politics" onClick={click}>
                <img src={politics} width="30" height="30"/>
                <p>Politics</p>
            </NavLink>
            <NavLink className="navMenuOption" to="/food" onClick={click}>
                <img src={food} width="30" height="30" />
                <p>Food</p>
            </NavLink>
            <NavLink className="navMenuOption" to="/travel" onClick={click}>
               <img src={travel} width="30" height="30" />
                <p>Travel</p>
            </NavLink>
            <NavLink className="navMenuOption" to="/tech" onClick={click}>
                <img src={tech} width="30" height="30" />
                <p>Tech</p>
            </NavLink>
        </div>
    )
}

export default DropdownOptions