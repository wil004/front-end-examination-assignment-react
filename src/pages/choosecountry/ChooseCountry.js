import React from "react";
import {NavLink} from "react-router-dom";
import './ChooseCountry.css';
import {useState, useEffect} from "react";
import PreviousNextButton from "../../components/PreviousNextButton/PreviousNextButton";
import QuickNavbar from "../../components/quicknavbar/QuickNavbar";
import SearchBar from "../../components/searchbar/Searchbar";
import {useHistory, useParams} from "react-router-dom";

function ChooseCountry ({countries, setNavData, navData}) {
    const [userInput, setUserInput] = useState('');
    const [imageHover, toggleImageHover] = useState(false);
    const [toNewsPageHover, toggleToNewsPageHover] = useState(false);
    const [countryNameHover, toggleCountryNameHover] = useState(false);
    const [continents, setContinents] = useState('');
    const [searchCountry, setSearchCountry] = useState([]);

    const continentType = ['world', 'oceania', 'asia', 'europe', 'north-america', 'south-america','africa', 'language-option'];
    const availableLanguages = ['ar', 'bg', 'bn', 'cs', 'da', 'de','el','en','es','fa','fi','fr', 'he', 'hi',
        'hr', 'hu','id', 'it', 'ja', 'ko', 'lt', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sv', 'ta', 'th', 'tr',
        'uk', 'zh']

    const {continent, pageId} = useParams();
    const history = useHistory();
    const chosenContinent = continentType.find((item) => {
        return item === continent.toLowerCase();
    });


    let page = + pageId;
    function pageAdd () {
        return page = page + 1;
    }

    function pageSubtract () {
        return page = page - 1;
    }


        const sortedCountries = countries.sort((a, b) => {
            return b.population - a.population;
        })


    {console.log(countries)}

    useEffect(() => {
        if (continents === false) {
            setContinents(sortedCountries)
        }
        setNavData(chosenContinent.charAt(0).toUpperCase() + chosenContinent.slice(1))
        setContinents(countries.filter((item) => {
            if (chosenContinent === 'world') {
                return item
            }
            else if (chosenContinent === 'north-america') {
                return (item.subregion === 'Northern America')
             } else if (chosenContinent === 'south-america') {
                return (item.subregion === 'South America')
            } else if (chosenContinent === 'language-option') {
                return availableLanguages.includes(item.alpha2Code.toLowerCase())
            }
            else {
                return (item.region === chosenContinent.charAt(0).toUpperCase() + chosenContinent.slice(1))
            }
            }))
    }, [chosenContinent])

    useEffect(() => {
        if (continents.length > 0) {
            setSearchCountry(continents.filter((item) => {
                return (item.name.charAt(0) === userInput.charAt(0)) && item.name.includes(userInput);
            }));
        }
    }, [userInput]);



    return (
        <>
            {chosenContinent &&
            <div id="countryPage">
              <PreviousNextButton
                  onClickNext={() => {setUserInput(''); pageAdd(); history.push(`/countries/${chosenContinent}/pageNumber=${page}`)}}
                  onClickPrevious={() => {setUserInput(''); pageSubtract(); history.push(`/countries/${chosenContinent}/pageNumber=${page}`);}}
                  disabledPrevious={page === 1 && "disabled"}
                  disabledNext={continents.length > 0 && page === Math.floor(continents.length / 16) + 1 && "disabled"}
                  className="PreviousNextButtonContainerChooseCountry"
                  classNamePrevious="PreviousButtonChooseCountry"
                  classNameNext="NextButtonChooseCountry"
                  content={
                      <QuickNavbar
                          setNavData={setNavData}
                          setUserInput={setUserInput}
                          array={continentType}
                          url1={"countries"}
                          url3={`pageNumber=1`}
                          classNameNavButton="continentNavButton"
                          quickNavClassName={"quickNavigationContinents"}
                      />
                  }
                  content2={<div>
                      <SearchBar
                          label={<label htmlFor="searchbarChooseCountry">{chosenContinent.charAt(0).toUpperCase() + chosenContinent.slice(1) + ': ' + page} out of {Math.floor(continents.length / 16) + 1}</label>}
                          id="searchbarChooseCountry"
                          className="searchbarInputChooseCountry"
                          userInput={userInput}
                          setUserInput={setUserInput}
                          onClick={() => {setUserInput('')}}
                      />

                  </div>}
              />

            <div id="countryPageGrid">

                {searchCountry.length === 0 ? userInput ?
                    <div className="noCountriesFound">
                        <h1>No Countries Found!</h1>
                        <p>Please empty the searchbar and look for an existing country</p>
                        </div>
                    :
                    continents.length > 0 && continents.map((item, index) => {
                if (index < page * 16 && index >= (page - 1) * 16) {
                        return (
                       <div key={item.name + index}>
                       <NavLink className="countryNavContainer" to={`/countrypage/${item.alpha3Code}/${item.capital}`}>
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
            return (
                <div key={item.name + index}>
                    <NavLink className="countryNavContainer" to={`/countrypage/${item.alpha3Code}/${item.continent}`}>
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
    })

    }
            </div>
        </div>}
</>
    )
}

export default ChooseCountry