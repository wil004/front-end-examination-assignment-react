import React from "react";
import {NavLink} from "react-router-dom";
import './ChooseCountry.css';

function Choosecountry ({countries}) {



const popularCountries = ['Netherlands',"Russian Federation", 'Thailand', 'United States of America', 'France', 'Belgium','Germany','Poland','Indonesia','China','Italy','Spain','Portugal','Canada', 'Norway'];

    return (
        <div id="countryPage">
            <h1 >Welkom op de homepage</h1>
            <div id="countryPageGrid">

            {countries.length > 0 && countries.map((item) => {
                if (popularCountries.includes(item.name)) {
                    return (

                      <div className="chooseCountries">
                          <p className="chooseCountryNameHeader">{item.name}</p>
                          <NavLink to={`/country/${item.alpha3Code}`} key={item.name}>

                        <img className="chooseCountryImage" src={item.flag} />
                              <p className="chooseCountryNavigate">Go to newspage</p>
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