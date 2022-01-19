import React, {useState, useEffect} from "react";
import axios from "axios";
import './News.css'
import PreviousNextButton from "../../components/PreviousNextButton/PreviousNextButton";
import HomeNewsDots from "../../components/homeNewsDots/HomeNewsDots";
import SearchBar from "../../components/searchbar/Searchbar";
import CategoryNav from "../../components/navbar/CategoryNav";
import {useHistory, useParams} from "react-router-dom";

function News ({countries, setNavData}) {
    const [newsNumber, setNewsNumber] = useState(0);
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



    function timeCalculator (timeZonesArray) {
        return timeZonesArray.map((item) => {
            const d = new Date();
            let utcTimeHours = d.getUTCHours();
            let utcTimeMinutes = d.getUTCMinutes();
            let timeZone = item.substring(item.indexOf('C') + 1);
            let timeZoneHours = +(timeZone.charAt(1) + timeZone.charAt(2));
                if (utcTimeMinutes < 10) {
                    utcTimeMinutes = '0' + utcTimeMinutes
                }
            if (timeZone.charAt(0) === '+') {
                if (utcTimeHours + timeZoneHours >= 24) {
                    if ((utcTimeHours + timeZoneHours - 24) < 10) {
                        return '0' + (utcTimeHours + timeZoneHours - 24) + ':' + utcTimeMinutes;
                    } else {
                        return (utcTimeHours + timeZoneHours - 24) + ':' + utcTimeMinutes;
                    }
                } else { if (utcTimeHours + timeZoneHours < 10) {
                    return '0' + (utcTimeHours + timeZoneHours) + ':' + utcTimeMinutes;
                } else {
                    return (utcTimeHours + timeZoneHours) + ':' + utcTimeMinutes;
                }
                }
            } else if (timeZone.charAt(0) === '-') {
                if (utcTimeHours - timeZoneHours < 0) {
                    if ((utcTimeHours - timeZoneHours + 24) < 10) {
                        return '0' + (utcTimeHours - timeZoneHours + 24) + ':' + utcTimeMinutes;
                    } else {
                        return (utcTimeHours - timeZoneHours + 24) + ':' + utcTimeMinutes;
                    }}
                } else {
                    if (utcTimeHours - timeZoneHours < 10) {
                        return '0' + (utcTimeHours - timeZoneHours) + ':' + utcTimeMinutes;
                    } else {
                        return (utcTimeHours - timeZoneHours) + ':' + utcTimeMinutes;
                    }
                }
        })
    }
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
        {chosenCountry && <main className="newsPage">
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

            <CategoryNav
            />


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
                                        <a href={item.url} target="_blank" className="popularNewsItemFlex">
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
                    {loading2 ? <img className="loading" src="https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif" />
                        :
                        news.length > 0 ?
                        <div className="newsPageDiv" style={{backgroundImage: `url(${news[newsNumber].image_url})`,
                    backgroundSize: `100% 100%`}} >
                    <a href={news[newsNumber].url} target="_blank" className={news[newsNumber].title.length > 50 ? "newsHeader2" : "newsHeader"}><h5>{news[newsNumber].title}</h5></a>
                    <PreviousNextButton
                        onClickPrevious= {() => { setNewsNumber(newsNumber - 1);}}
                        disabledPrevious={newsNumber === 0}
                        onClickNext={() => { setNewsNumber(newsNumber + 1);}}
                        disabledNext={newsNumber === news.length - 1}
                        classNamePrevious={newsNumber === 0 ? 'PreviousButtonDisabled' : 'PreviousButton'}
                        classNameNext={newsNumber === news.length - 1 ? 'NextButtonDisabled' : 'NextButton'}
                        className="PreviousNextButtonContainerNews"
                    />

                    <HomeNewsDots
                        onClickFirst={() => { setNewsNumber(0);}}
                        onClickSecond={() => { setNewsNumber(1);}}
                        onClickThird={() => {setNewsNumber(2)}}
                        onClickFourth={() => {setNewsNumber(3)}}
                        onClickFifth={() => {setNewsNumber(4)}}
                        first={newsNumber === 0 ? 'homeNewsDotButtonClicked' : 'false1'}
                        second={newsNumber === 1 ? 'homeNewsDotButtonClicked' : 'false2'}
                        third={newsNumber === 2 ? 'homeNewsDotButtonClicked' : 'false3'}
                        fourth={newsNumber === 3 ? 'homeNewsDotButtonClicked' : 'false4'}
                        fifth={newsNumber === 4 ? 'homeNewsDotButtonClicked' : 'false5'}
                    />
                            <section className="newsSnippet">
                                <p>{news[newsNumber].snippet ? news[newsNumber].snippet : 'Go to the newspage for more information'}</p>
                            </section>
                            <a className="goToNews" href={news[newsNumber].url} target="_blank" >Go to this newspage</a>
                    </div>
                        :
                        error &&
                            <div>
                                <h1>Oops... Something went wrong!</h1>
                                <p>{error}</p>
                            </div>
                            }

                    <div className="timeZone">
                        {allCalculatedTimes ?
                            <section>
                        <h1>Time zone(s): {chosenCountry}</h1>
                        <p>(with colonies)</p>
                        <div className={allCalculatedTimes.length > 1 ? "timeZoneGrid" : "noGrid"}>
                            <img src={chosenCountryObject.flag}
                                 className="timeCountry" />
                            <img src="https://th.bing.com/th/id/R.bd8057bf81c583e0eca3d60e8c976efc?rik=jAcJKGbuBB9G0w&riu=http%3a%2f%2fwww.posternazakaz.com.ua%2fimages%2fclock%2fclock_2%2fclock_000000.gif&ehk=9yK%2fpg5qS%2fd1DldTuJpdxEyPi%2bhzeyJA%2f1L0QV3FgrA%3d&risl=&pid=ImgRaw&r=0"
                                 className="timeClock"/>
                            {allCalculatedTimes.map((item) => {
                                    return <h2 key={chosenCountry + item}>{item}</h2>
                                }
                            )}
                        </div>
                            </section> :
                            <div><h1>World Timezones</h1>
                                <p>To see the timezones choose a country.</p>
                            <p>You can easily find countries in the searchbar!</p>
                            <p>By typing in a random letter a list of countries starting with that letter will appear!</p>
                                <img src="https://th.bing.com/th/id/R.bd8057bf81c583e0eca3d60e8c976efc?rik=jAcJKGbuBB9G0w&riu=http%3a%2f%2fwww.posternazakaz.com.ua%2fimages%2fclock%2fclock_2%2fclock_000000.gif&ehk=9yK%2fpg5qS%2fd1DldTuJpdxEyPi%2bhzeyJA%2f1L0QV3FgrA%3d&risl=&pid=ImgRaw&r=0"
                                     className="timeClock"/>
                            </div>}
                    </div>
                 </article>



        </main> }
        </>
}

export default News