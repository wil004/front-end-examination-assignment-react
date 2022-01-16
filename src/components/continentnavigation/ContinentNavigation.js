import React, {useEffect, useState} from "react";
import './ContinentNavigation.css'
function ContinentNavigation ({setContinents, countries, setPageNumber, setContinentName}) {
const [continent, setContinent] = useState([]);

useEffect(() => {
    if (countries.length > 0) {
        setContinent([countries,
            countries.filter((item) => {
                return (item.region === "Oceania")
            }),
            countries.filter((item) => {
                return (item.region === "Asia");
            }),
            countries.filter((item) => {
                return (item.region === "Europe");
            }),
            countries.filter((item) => {
                return (item.subregion === "Northern America");
            }),
            countries.filter((item) => {
                return (item.subregion === "South America");
            }),
            countries.filter((item) => {
                return (item.region === "Africa");
            })]
        )
    }
}, [countries] )


    return(
        <div className="continentNavigation">
            <button onClick={() => {setContinents(continent[0]); setPageNumber(1); setContinentName('World')}} className="continentNavButton">World</button>
            <button onClick={() => {setContinents(continent[1]); setPageNumber(1); setContinentName('Oceania')}} className="continentNavButton">Oceania</button>
            <button onClick={() => {setContinents(continent[2]); setPageNumber(1); setContinentName('Asia')}} className="continentNavButton">Asia</button>
            <button onClick={() => {setContinents(continent[3]); setPageNumber(1); setContinentName('Europe')}} className="continentNavButton">Europe</button>
            <button onClick={() => {setContinents(continent[4]); setPageNumber(1); setContinentName('North America')}} className="continentNavButton">North America</button>
            <button onClick={() => {setContinents(continent[5]); setPageNumber(1); setContinentName('South America')}} className="continentNavButton">South America</button>
            <button onClick={() => {setContinents(continent[6]); setPageNumber(1); setContinentName('Africa')}} className="continentNavButton">Africa</button>
        </div>
    )


}

export default ContinentNavigation