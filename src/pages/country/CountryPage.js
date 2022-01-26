import React, {useState, useEffect} from "react";
import {useParams, Redirect} from "react-router-dom";
import axios from "axios";
import './CountryPage.css';
import NewsContainer from "../../components/newscontainer/NewsContainer";
import PreviousNextButton from "../../components/PreviousNextButton/PreviousNextButton";
import QuickNavbar from "../../components/quicknavbar/QuickNavbar";
import ValutaCalculator from "../../components/valutacalculator/ValutaCalculator";
import loadingSign from "../../assets/loading.gif"


function CountryPage ({countries, setNavData}) {
    const [countryNews, setCountryNews] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [countryCategory, setCountryCategory] = useState('');
    const [page, setPage] = useState(1);
    const [userInput, setUserInput] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false)


    const {id, category} = useParams();
    const newsToken = 'ct8nK1YSjbQaodqF9QpRKggxZXeRbHzVuWxRS8IY'
    const exchangeToken = '66a1b29650a24c66afc00175a8bceae9'

    const chosenCountry = countries.find((item) => {
        return item.alpha3Code === id
    })
    const countryCategories = [chosenCountry.name, chosenCountry.capital, chosenCountry.topLevelDomain[0], chosenCountry.region]
    chosenCountry.currencies.map((item) => {
        return countryCategories.push(item.code);
    })
    chosenCountry.languages.map((item) => {
        return countryCategories.push(item.name)
    })


    const numberFormatter = new Intl.NumberFormat("es-ES");




    useEffect(() => {
        {category ? setCountryCategory(category) : setCountryCategory(id)}
        setNavData(id);
    }, [category, id])



    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const result = await axios.get(`https://holidays.abstractapi.com/v1/?api_key=c27eb5f02c6d45648992fecd03cf9209&country=${chosenCountry.alpha2Code}&year=2020`)
    //             setHolidays(result.data);
    //         } catch (e) {
    //             console.error(e)
    //         }
    //     }
    //     fetchData()
    // }, [])


    useEffect(() => {
        toggleLoading(true);
        toggleError(false);
        async function fetchData() {
            try {
                if(countryCategory) {
                    const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&language=en&search=${countryCategory}`)
                    setCountryNews(result.data.data);
                }
            } catch (e) {
                console.error(e);
                console.log(e.response.data)
                toggleError(e.response.data.error.message)
            }
            toggleLoading(false);
        }
        fetchData()
    }, [countryCategory])



    return (
        <main className="chosenCountry">
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
                        setUserInput={setUserInput}
                        array={countryCategories}
                        quickNavClassName="quickNavCountryPage"
                        classNameNavButton="countryNavButton"
                        setNavData={setNavData}
                        url1={`countrypage/${id}`}
                        url3={''}
                        redirect={category === chosenCountry.name && <Redirect to={`/countrypage/${id}`} />}
                    />
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
                    /> : error &&
                            <div>
                                <h1>Oops... Something went wrong!</h1>
                                <p>{error}</p>
                            </div>
                    }
                </div>


            </section>

            <section className="countryHolidaysAndValutaCalculator">
                <div className="countryHolidays">
                    <PreviousNextButton
                        className="countryHolidaysHeader"
                        classNameNext="holidayNext"
                        classNamePrevious="holidayPrevious"
                        disabledPrevious={page === 1 && "disabled"}
                        disabledNext={page === Math.floor(holidays.length / 8) + 1 && "disabled"}
                        content={<p>{page} of {Math.floor(holidays.length / 8) + 1}</p>}
                        content2={<h1>Holidays of {chosenCountry.name}</h1>}
                        onClickPrevious={() => {setPage(page - 1)}}
                        onClickNext={() => {setPage(page + 1)}}
                    />

                    {holidays.length > 0 && holidays.map((item, index) => {
                        if (index < page * 8 && index >= (page - 1) * 8)
                            return (
                                <div key={item.name + index} className="countryHolidaysDates">
                                    <p>{item.name}</p>
                                    <p>{item.date}</p>
                                </div>)
                    })}
                </div>

                <div className="valutaCalculator">
                    <ValutaCalculator
                    chosenCountry={chosenCountry}
                    countries={countries}
                    />
                </div>
            </section>
        </main>

    )

}
export default CountryPage