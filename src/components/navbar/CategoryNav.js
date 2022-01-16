import React from "react";
import {NavLink} from "react-router-dom";
import sports from "./assets/sports.png"
import politics from "./assets/politics.png"
import food from "./assets/food.png"
import travel from "./assets/travel.png"
import general from "./assets/general.png"
import tech from "./assets/tech.png"
import './CategoryNav.css'
import {useParams} from "react-router-dom";

function CategoryNav ({clickGeneral, clickSports, clickPolitics, clickFood, clickTravel, clickTech}) {

    const {country} = useParams();

    return (
        <div className="navMenu">
            <NavLink className="navMenuOption" to={country ? `/news/general/${country}` : `/news/general`} onClick={clickGeneral} >
                <img src={general} widt="40" height="40" />
                <p>General</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/sports/${country}` : `/news/sports`} onClick={clickSports}>
                <img src={sports} width="25" height="25"/>
                <p>Sports</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/politics/${country}` : `/news/politics`} onClick={clickPolitics}>
                <img src={politics} width="30" height="30"/>
                <p>Politics</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/food/${country}` : `/news/food`} onClick={clickFood}>
                <img src={food} width="30" height="30" />
                <p>Food</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/travel/${country}` : `/news/travel`} onClick={clickTravel}>
               <img src={travel} width="30" height="30" />
                <p>Travel</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/tech/${country}` : `/news/tech`} onClick={clickTech}>
                <img src={tech} width="30" height="30" />
                <p>Tech</p>
            </NavLink>
        </div>
    )
}

export default CategoryNav