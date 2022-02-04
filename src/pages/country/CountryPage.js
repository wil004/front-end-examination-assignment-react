import React, {useState, useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import './CountryPage.css';
import NewsContainer from "../../components/newscontainer/NewsContainer";
import QuickNavbar from "../../components/quicknavbar/QuickNavbar";
import ValutaCalculator from "../../components/valutacalculator/ValutaCalculator";
import loadingSign from "../../assets/loading.gif"
import Holidays from "../../components/holidays/Holidays";


function CountryPage ({countries, setNavData, navData}) {
    const [language, setLanguage] = useState('en');
    const [otherLanguage ,setOtherLanguage] = useState(false);
    const [countryNews, setCountryNews] = useState([]);

    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [wrongPageError, toggleWrongPageError] = useState(false);
    const {id, category} = useParams();

    const newsToken = process.env.REACT_APP_API_KEY_NEWS

    const availableLanguages = ['ar', 'bg', 'bn', 'cs', 'da', 'de','el','en','es','fa','fi','fr', 'he', 'hi',
        'hr', 'hu','id', 'it', 'ja', 'ko', 'lt', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sv', 'ta','th', 'tr',
        'uk', 'zh']


    const chosenCountry = countries.find((item) => {
        return item.alpha3Code === id
    })

    let countryCategories = [];
    if (chosenCountry) {
        countryCategories = [chosenCountry.capital, chosenCountry.name, chosenCountry.topLevelDomain[0], chosenCountry.region]
        chosenCountry.currencies.map((item) => {
            return countryCategories.push(item.code);
        })
        chosenCountry.languages.map((item) => {
            return countryCategories.push(item.name)
        })
    }

    const numberFormatter = new Intl.NumberFormat("es-ES");


    useEffect(() => {
        toggleLoading(true);
        toggleError(false);
        if (!chosenCountry) {
            toggleWrongPageError(true);
        } else {
            if (availableLanguages.includes(chosenCountry.alpha2Code.toLowerCase())) {
                setOtherLanguage(true);
            }
            toggleWrongPageError(false);
        }
        if (!navData) {
            setNavData(id);
        }
        async function fetchData() {
            if (chosenCountry) {
                try {
                    if (category) {
                        const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&search=${category}&language=${language}`)
                        setCountryNews(result.data.data);
                    } else {
                        const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&search=${chosenCountry.name}&language=${language}`)
                        setCountryNews(result.data.data);
                    }

                } catch (e) {
                    console.error(e);
                    toggleError(e.response.data.error.message)
                }
                toggleLoading(false);
            }
        }
        if (chosenCountry) {
            fetchData()
        }
    }, [category, language])


    return (
        <>
        {!chosenCountry && wrongPageError ? <h1 className="wrongPageNewsError">This page doesn't exist please go back to the <NavLink to='/countries/world/pageNumber=1'>choose country
            page to pick a country.
        </NavLink></h1> : <main className="chosenCountry">
              <section className="countryInformation">
                <div className="countryDetails">
                    <h1>{chosenCountry.name}</h1>
                    <img src={chosenCountry.flag} className="countryFlagImage" />
                    <p>Capital: {chosenCountry.capital}</p>
                    <p>Continent: {chosenCountry.region}</p>
                    <p>Subregion: {chosenCountry.subregion}</p>
                    <p>Population: {numberFormatter.format(chosenCountry.population)}</p>
                    <p>Currencies: ({chosenCountry.currencies.length})</p> {chosenCountry.currencies.map((item) => {
                    return (
                        <p key={item.name}>
                            {item.symbol}  {item.code}: {item.name}
                        </p>
                    )
                })}
                </div>
                <div className="countryNews">
                    <QuickNavbar
                        setUserInput={toggleError}
                        array={countryCategories}
                        quickNavClassName="quickNavCountryPage"
                        classNameNavButton="countryNavButton"
                        setNavData={setNavData}
                        url1={`countrypage/${id}`}
                        url3={''}
                    />
                    {otherLanguage && <div className="languageSetupCountry">
                        <p>Language:</p>
                        <button onClick={() => {setLanguage('en')}}><img src={countries[235].flag}  /></button>
                        <button onClick={() => {setLanguage(chosenCountry.alpha2Code.toLowerCase())}}><img src={chosenCountry.flag} /></button>
                    </div>}
                        {loading ? <img src={loadingSign} className="countryPageLoading" /> :
                        countryNews.length > 0 ?
                        <NewsContainer
                        news={countryNews}
                        classNameNewsContainer="countryNewsContainer"
                        classNamePrevious="previousButtonCountryNews"
                        classNameNext="nextButtonCountryNews"
                        newsHeaderClass="countryNewsHeader"
                        newsSnippetClass="countryNewsSnippet"
                        goToButton="goToCountryNews"
                        classNameDots="homeCountryDots"
                            /> : countryNews.length === 0 ?
                                <div style={{backgroundImage: `url(${chosenCountry.flag})`,
                                    backgroundSize: `100% 100%`,
                                    width: `40vw`,
                                    height: `25vh`,
                                    borderRadius: `1em`,
                                }
                                }>
                                <h1 style={{color: `red`, backgroundColor: `rgba(0,0,0,0.8)`}}>
                                    Unfortunately the combination of this country and category don't have any news articles.
                                </h1>
                               </div>
                                :
                            error &&
                            <div>
                                <h1>Oops... Something went wrong!</h1>
                                <p>{error}</p>
                            </div>
                    }
                </div>


            </section>

            <section className="countryHolidaysAndValutaCalculator">
                <Holidays
                chosenCountry={chosenCountry}
                />

                <div className="valutaCalculator">
                    <ValutaCalculator
                    chosenCountry={chosenCountry}
                    countries={countries}
                    />
                </div>
            </section>
        </main>}
         </>
    )

}
export default CountryPage