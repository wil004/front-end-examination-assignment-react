import React from "react";
import {NavLink} from "react-router-dom";
import './ChooseCountry.css';
import {useState, useEffect} from "react";
import PreviousNextButton from "../../components/PreviousNextButton/PreviousNextButton";
import ContinentNavigation from "../../components/continentnavigation/ContinentNavigation";
import SearchBar from "../../components/searchbar/Searchbar";
import {useHistory} from "react-router-dom";

function ChooseCountry ({countries}) {
const [userInput, setUserInput] = useState('');

const [page, setPage] = useState(1);
const [imageHover, toggleImageHover] = useState(false);
const [toNewsPageHover, toggleToNewsPageHover] = useState(false);
const [countryNameHover, toggleCountryNameHover] = useState(false);
const [continents, setContinents] = useState(countries);
const [continentName, setContinentName] = useState('World');


const history = useHistory();

if(countries.length > 0) {
    countries.sort((a, b) => {
        return b.population - a.population;
    })
}


    const searchCountry = continents.filter((item) => {
        return (item.name.charAt(0) === userInput.charAt(0)) && item.name.includes(userInput);
    })

    return (
        <div id="countryPage">
            <div className="chooseCountrySearch">
                <p>Page: {page} out of {Math.floor(continents.length / 16) + 1}</p>
                <h1 className="continentName">{continentName}</h1>
                <SearchBar
                    userInput={userInput}
                    setUserInput={setUserInput}
                    onClick={() => {history.push(`/news/general/${userInput}`); setUserInput('')}}
                />
            </div>
              <PreviousNextButton
                  onClickNext={() => {setPage(page + 1)}}
                  onClickPrevious={() => {setPage(page - 1)}}
                  disabledPrevious={page === 1 && "disabled"}
                  disabledNext={continents.length > 0 && page === Math.floor(continents.length / 16) + 1 && "disabled"}
                  className="PreviousNextButtonContainerChooseCountry"
                  classNamePrevious="PreviousButtonChooseCountry"
                  classNameNext="NextButtonChooseCountry"
                  content={
                      <ContinentNavigation
                          setContinents={setContinents}
                          countries={countries}
                          setPageNumber={setPage}
                          setContinentName={setContinentName}
                      />
                  }
              />


            <div id="countryPageGrid">

                {searchCountry.length === 0 ? continents.map((item, index) => {
                if (index < page * 16 && index >= (page - 1) * 16) {
                        return (
                       <div key={item.name + index}>
                       <NavLink className="countryNavContainer" to={`/country/${item.alpha3Code}`}>
                            <div className="chooseCountries" key={item.name}>
                                {index === countryNameHover && item.name.length > 20 && <button disabled="disabled" className="countryNameHover">{item.name}</button>}
                                <button disabled="disabled" className={"chooseCountryNameHeader"}>{item.name.length > 20 ? item.name.split(' ')[0] + ' ' +
                                    item.name.split(' ')[2] + '...' : item.name}</button>



                                    <img onMouseOver={() => {
                                        toggleImageHover(index);
                                        toggleCountryNameHover(index);
                                    }} onMouseOut={() => {
                                        toggleImageHover(false);
                                        toggleCountryNameHover(false);
                                    }}
                                         className={index === toNewsPageHover ? "chooseCountryImageMouse" : "chooseCountryImage"}
                                         src={item.flag}/>
                                    <button onMouseOver={() => {
                                        toggleToNewsPageHover(index)
                                    }} onMouseOut={() => {
                                        toggleToNewsPageHover(false)
                                    }}
                                       className={index === imageHover ? "chooseCountryNavigateMouse" : "chooseCountryNavigate"}>Go
                                        to newspage</button>

                            </div>
                       </NavLink>
                            </div>
                        )
                    }
            }) : searchCountry.map((item, index) => {
        if (index < page * 16 && index >= (page - 1) * 16) {
            return (
                <div key={item.name + index}>
                    <NavLink className="countryNavContainer" to={`/country/${item.alpha3Code}`}>
                        <div className="chooseCountries" key={item.name}>
                            {index === countryNameHover && item.name.length > 20 && <button disabled="disabled" className="countryNameHover">{item.name}</button>}
                            <button disabled="disabled" className={"chooseCountryNameHeader"}>{item.name.length > 20 ? item.name.split(' ')[0] + ' ' +
                                item.name.split(' ')[2] + '...' : item.name}</button>



                            <img onMouseOver={() => {
                                toggleImageHover(index);
                                toggleCountryNameHover(index);
                            }} onMouseOut={() => {
                                toggleImageHover(false);
                                toggleCountryNameHover(false);
                            }}
                                 className={index === toNewsPageHover ? "chooseCountryImageMouse" : "chooseCountryImage"}
                                 src={item.flag}/>
                            <button onMouseOver={() => {
                                toggleToNewsPageHover(index)
                            }} onMouseOut={() => {
                                toggleToNewsPageHover(false)
                            }}
                                    className={index === imageHover ? "chooseCountryNavigateMouse" : "chooseCountryNavigate"}>Go
                                to newspage</button>

                        </div>
                    </NavLink>
                </div>
            )
        }
    })

    }
            </div>
        </div>

    )
}

export default ChooseCountry