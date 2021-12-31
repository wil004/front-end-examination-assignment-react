import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import './ChooseCountry.css';
import {useState} from "react";

function Choosecountry ({countries}) {



const popularCountries = ['Netherlands',"Russian Federation", 'Thailand', 'United States of America', 'France', 'Belgium','Germany','Poland','Indonesia','China','Italy','Spain','Portugal','Canada', 'Norway'];
const [imageHover, toggleImageHover] = useState(false);
const [toNewsPageHover, toggleToNewsPageHover] = useState(false);

    return (
        <div id="countryPage">
            <h1 >Welkom op de homepage</h1>
            <div id="countryPageGrid">

            {countries.length > 0 && countries.map((item, index) => {
                if (popularCountries.includes(item.name)) {
                    return (

                      <div className="chooseCountries">
                          <p className="chooseCountryNameHeader">{item.name}</p>
                          <NavLink to={`/country/${item.alpha3Code}`} key={item.name}>

                              <img onMouseOver={() => {toggleImageHover(index)}} onMouseOut={() => {toggleImageHover(false)}}
                                   className={index === toNewsPageHover ? "chooseCountryImageMouse" : "chooseCountryImage" } src={item.flag} />
                              <p  onMouseOver={() => {toggleToNewsPageHover(index)}} onMouseOut={() => {toggleToNewsPageHover(false)}}
                                  className={index === imageHover ? "chooseCountryNavigateMouse" : "chooseCountryNavigate"}>Go to newspage</p>
                    </NavLink>
                      </div>

                    )
                }
            })}
            </div>
        </div>
    )
}

export default Choosecountry