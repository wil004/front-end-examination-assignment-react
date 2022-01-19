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

function CategoryNav () {

    const {country} = useParams();


    return (
        <div className="navMenu">
            <NavLink className="navMenuOption" to={country ? `/news/general/${country}` : `/news/general`}>
                <img src={general} className="categoryImage" />
                <p>General</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/sports/${country}` : `/news/sports`}>
                <img src={sports} className="categoryImage2"/>
                <p>Sports</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/politics/${country}` : `/news/politics`}>
                <img src={politics} className="categoryImage3"/>
                <p>Politics</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/food/${country}` : `/news/food`} >
                <img src={food} className="categoryImage3" />
                <p>Food</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/travel/${country}` : `/news/travel`}>
               <img src={travel} className="categoryImage2" />
                <p>Travel</p>
            </NavLink>
            <NavLink className="navMenuOption" to={country ? `/news/tech/${country}` : `/news/tech`}>
                <img src={tech} className="categoryImage2" />
                <p>Tech</p>
            </NavLink>
        </div>
    )
}

export default CategoryNav