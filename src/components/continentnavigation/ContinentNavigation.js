import React from "react";
import {useHistory} from "react-router-dom";
import './ContinentNavigation.css'
function ContinentNavigation ({setNavData, setUserInput}) {

const history = useHistory();





    return(
        <div className="continentNavigation">
            <button onClick={() => {setNavData('World'); history.push('/countries/World/pageNumber=1'); setUserInput('');}} className="continentNavButton">World</button>
            <button onClick={() => {setNavData('Oceania'); history.push('/countries/Oceania/pageNumber=1'); setUserInput('');}} className="continentNavButton">Oceania</button>
            <button onClick={() => {setNavData('Asia'); history.push('/countries/Asia/pageNumber=1'); setUserInput('');}} className="continentNavButton">Asia</button>
            <button onClick={() => {setNavData('Europe'); history.push('/countries/Europe/pageNumber=1'); setUserInput('');}} className="continentNavButton">Europe</button>
            <button onClick={() => {setNavData('North America'); history.push('/countries/North-America/pageNumber=1'); setUserInput('');}} className="continentNavButton">North America</button>
            <button onClick={() => {setNavData('South America'); history.push('/countries/South-America/pageNumber=1'); setUserInput('');}} className="continentNavButton">South America</button>
            <button onClick={() => {setNavData('Africa'); history.push('/countries/Africa/pageNumber=1'); setUserInput('');}} className="continentNavButton">Africa</button>
        </div>
    )


}

export default ContinentNavigation