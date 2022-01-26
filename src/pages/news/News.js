import React, {useState, useEffect} from "react";
import axios from "axios";
import './News.css'
import SearchBar from "../../components/searchbar/Searchbar";
import {useHistory, useParams} from "react-router-dom";
import timeCalculator from "../../helpers/timeCalculator";
import QuickNavbar from "../../components/quicknavbar/QuickNavbar";
import NewsContainer from "../../components/newscontainer/NewsContainer";
import clock from "../../assets/clock.gif"
import loadingSign from "../../assets/loading.gif"

function News ({countries, setNavData}) {

    const [news, setNews] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [loading2, toggleLoading2] = useState(false);

    const newsToken = 'ct8nK1YSjbQaodqF9QpRKggxZXeRbHzVuWxRS8IY'

    const categories = ['general', 'sports', 'politics', 'food', 'travel', 'tech'];
    const {category, country} = useParams();
    const history = useHistory();

    const chosenCategory = categories.find((item) => {
        return item === category.toLowerCase();
    });
    const countryNames = countries.map((item) => {
        return item.name});
    countryNames.push('world');

    const chosenCountryObject = countries.find((item) => {
        return (item.name.toLowerCase() === country.toLowerCase())
    })

    const chosenCountry = countryNames.find((item) => {
        return item.toLowerCase() === country.toLowerCase();
    })

    const chosenCountryUserInput = countries.filter((item) => {
        return (item.name.charAt(0) === userInput.charAt(0)) && item.name.includes(userInput);
    });



    let allCalculatedTimes;
    if (chosenCountryObject) {
        allCalculatedTimes = timeCalculator(chosenCountryObject.timezones);
    }


    useEffect(() => {
        toggleLoading(true);
        async function fetchData() {
            try {
                const result = await axios.get(`https://api.thenewsapi.com/v1/news/top?language=en&api_token=${newsToken}`);
                setTopNews(result.data.data);
            } catch (e) {
                console.error(e);
                console.log(e.response.data.error)
            }
            toggleLoading(false);
        }
        fetchData();
    }, [])

    {console.log(topNews)}

    useEffect(() => {
        toggleError(false);
        toggleLoading2(true);
        setNavData(chosenCategory.charAt(0).toUpperCase() + chosenCategory.slice(1) + ' ' + chosenCountry.charAt(0).toUpperCase() + chosenCountry.slice(1))
        async function fetchData() {
            try {
                const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&language=en&search=${chosenCountry}&categories=${chosenCategory.toLowerCase()}`)
                setNews(result.data.data);
            } catch (e) {
                toggleError(e.response.data.error.message);
                console.error(e);
                console.log(e.response.data.error)
            }
            toggleLoading2(false);
        }

        fetchData()
    }, [chosenCategory, chosenCountry])


    return <>
        {chosenCountry &&
        <main className="newsPage">
                <article className="newsPageBox">
                    <section className="popularNews" >
                        {!loading && <h1>Top News</h1>}
                        {loading ?
                            <div>
                                <h2>...Loading</h2>
                            </div>
                            :
                            topNews.length > 0 ?
                            <div className="popularNewsItem">
                                {topNews.map((item) => {
                                    return(
                                        <a href={item.url} target="_blank" className="popularNewsItemFlex" key={item.uuid}>
                                                <img src={item.image_url} className="popularNewsImage" />
                                                <p>{item.description}</p>
                                        </a>
                                        )
                                })}
                            </div>
                                :
                                error &&
                                <div>
                                    <h2>Something went wrong!</h2>
                                </div>
                                }
                    </section>
                    {loading2 ? <img className="loadingNews" src={loadingSign} />
                        :
                        news.length > 0 ?
                        <section className="newsPageSection">
                            <SearchBar
                                className="searchbarInputNewsPage"
                                userInput={userInput}
                                setUserInput={setUserInput}
                                countries={countries}
                                disabled={!countryNames.includes(userInput)}
                                onClick={() => {history.push(`/news/general/${userInput}`); setUserInput('');}}
                                newsPage={<div className={userInput.length === 0 ?  "noStyleSearchOptions" : "searchOptions"}>
                                    {chosenCountryUserInput.map((item) => {
                                        if(countryNames.includes(userInput)) {
                                            {console.log('When a valid country name is in the input field the dropdownmenu should dissapear!')}
                                        }
                                        else if (userInput.length > 0) {
                                            return <p key={item.name}>
                                                <button onClick={() => {setUserInput(item.name) }}>
                                                    <img src={item.flag} width="25" height="25" />{item.name}</button></p>
                                        }
                                    })} </div>}
                            />
                            <QuickNavbar
                                setNavData={setNavData}
                                setUserInput={setUserInput}
                                array={categories}
                                url1={"news"}
                                url3={chosenCountry}
                                classNameNavButton="newsNavButton"
                                quickNavClassName={"quickNavigationNews"}
                            />
                        <NewsContainer
                            news={news}
                            classNameNewsContainer="newsPageDiv"
                            classNamePrevious="previousButtonNewsPage"
                            classNameNext="nextButtonNewsPage"
                            newsHeaderClass="newsHeader"
                            newsSnippetClass="newsSnippet"
                            goToButton="goToNews"
                            classNameDots="homeNewsDots"
                        />
                        </section>
                            :
                        error &&
                            <div>
                                <h1>Oops... Something went wrong!</h1>
                                <p>{error}</p>
                            </div>
                            }

                    <section className="timeZone">
                        {allCalculatedTimes ?
                            <div>
                        <h1>Time zone(s): {chosenCountry}</h1>
                        <p>(with colonies)</p>
                        <div className={allCalculatedTimes.length > 1 ? "timeZoneGrid" : "noGrid"}>
                            <img src={chosenCountryObject.flag} className="timeCountry" />
                            <img src={clock} className="timeClock"/>

                            {allCalculatedTimes.map((item) => {
                                    return <h2 key={chosenCountry + item}>{item}</h2>
                                }
                            )}
                        </div>
                            </div> :
                            <div><h1>World Timezones</h1>
                                <p>To see the timezones choose a country.</p>
                            <p>You can easily find countries in the searchbar!</p>
                            <p>By typing in a random letter a list of countries starting with that letter will appear!</p>
                                <img src={clock}
                                     className="timeClock"/>
                            </div>}
                    </section>
                 </article>



        </main> }
        </>
}

export default News