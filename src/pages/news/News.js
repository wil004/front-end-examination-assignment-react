import React, {useEffect, useState} from "react";
import './News.css'
import PreviousNextButton from "../../components/PreviousNextButton/PreviousNextButton";
import HomeNewsDots from "../../components/homeNewsDots/HomeNewsDots";
import SearchBar from "../../components/searchbar/Searchbar";
import axios from "axios";
import CategoryNav from "../../components/navbar/CategoryNav";
import { useParams, useHistory, NavLink } from "react-router-dom";

function News ({countries}) {
    const [newsNumber, setNewsNumber] = useState(0);
    const [news, setNews] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [clickedCategory, setClickedCategory] = useState('General');
    const [error, toggleError] = useState(false);

    const categories = ['general', 'sports', 'politics', 'food', 'travel', 'tech'];
    const {category, country} = useParams();

    const chosenCategory = categories.find((item) => {
        return item === category
    });

    const history = useHistory();

    console.log(chosenCategory)


    const newsToken = 'ct8nK1YSjbQaodqF9QpRKggxZXeRbHzVuWxRS8IY'



    useEffect(() => {
        toggleError(false);
        async function fetchData() {
            setNews([]);
            try {
                const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&language=en&search=${country}&categories=${category.toLowerCase()}`)
                setNews(result.data.data);
            } catch (e) {
                toggleError(true);
                console.error(e);
            }
        }

        fetchData()
    }, [category, country])

    const chosenCountry = countries.filter((item) => {
        return (item.name.charAt(0) === userInput.charAt(0)) && item.name.includes(userInput);
    })
    const countryNames = countries.map((item) => {return item.name})

    return (<>
        {chosenCategory && <main className="newsPage">
           <SearchBar
                userInput={userInput}
                setUserInput={setUserInput}
                countries={countries}
                disabled={!countryNames.includes(userInput)}
                onClick={() => {history.push(`/news/general/${userInput}`); setUserInput(''); setClickedCategory('General')}}
                newsPage={<div className={userInput.length === 0 ?  "noStyleSearchOptions" : "searchOptions"}>
                    {chosenCountry.map((item) => {
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
                clickGeneral={() => {setClickedCategory('General');}}
                clickSports={() => { setClickedCategory('Sports'); }}
                clickPolitics={() => { setClickedCategory('Politics'); }}
                clickFood={() => { setClickedCategory('Food');}}
                clickTravel={() => { setClickedCategory('Travel'); }}
                clickTech={() => { setClickedCategory('Tech'); }}
            />
            <h1>{clickedCategory && clickedCategory}</h1>

            {news.length > 0 ?
            <>
                <section className="newsPageBox">
                     <div className="newsPageDiv" style={{backgroundImage: `url(${news[newsNumber].image_url})`,
                    backgroundSize: `100% 100%`}} >
                    <a href={news[newsNumber].url} target="_blank" className={news[newsNumber].title.length > 50 ? "newsHeader2" : "newsHeader"}><h5>{news[newsNumber].title}</h5></a>
                    <PreviousNextButton
                        onClickPrevious= {() => { setNewsNumber(newsNumber - 1);}}
                        disabledPrevious={newsNumber === 0}
                        onClickNext={() => { setNewsNumber(newsNumber + 1);}}
                        disabledNext={newsNumber === (news.length - 1)}
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

                    </div>
                 </section>

                <section className="newsSnippet">
                        <p>{news[newsNumber].snippet ? news[newsNumber].snippet : 'Go to the newspage for more information'}</p>
                </section>
                <a className="goToNews" href={news[newsNumber].url} target="_blank" >Go to this newspage</a>
                 </>

                     :
                        <section className="newsPageBox">
                            <img className="loading" src="https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif" />
                        </section>}


        </main> }
        </>
    )
}

export default News