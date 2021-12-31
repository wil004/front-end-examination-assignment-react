import React, {useEffect, useState} from "react";
import './News.css'
import PreviousNextButton from "../../components/PreviousNextButton/PreviousNextButton";
import HomeNewsDots from "../../components/homeNewsDots/HomeNewsDots";
import SearchBar from "../searchbar/Searchbar";
import axios from "axios";

function News ({searchBar, category, countries, submitUserInput, userInputValue}) {
    const [newsNumber, setNewsNumber] = useState(0);
    const [news, setNews] = useState([]);



    const newsToken = 'ct8nK1YSjbQaodqF9QpRKggxZXeRbHzVuWxRS8IY'




    useEffect(() => {
        async function fetchData() {
            setNews([]);
            try {
                const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&language=en&search="germany"&categories=${category}`)
                setNews(result.data.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData()
    }, [category])

   const chosenCountry = countries.filter((item) => {

       return item.name.includes(userInputValue);
    })
console.log(chosenCountry)


    return (
        <main className="newsPage">
            {searchBar}
            <div className={userInputValue.length === 0 ? "noStyleSearchOptions" : "searchOptions"}>
            {chosenCountry.map((item) => {
               if (userInputValue.length > 0) {
                   return <p>{item.name}</p>
               }
            })}
            </div>
            <h1>{category && category}</h1>

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
                 </>

                     :
                        <section className="newsPageBox">
                            <img className="loading" src="https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif" />
                        </section>}


            <button className="goToNews">Go to</button>
        </main>
    )
}

export default News