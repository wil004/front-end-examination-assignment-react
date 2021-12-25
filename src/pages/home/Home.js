import React, {useEffect, useState} from "react";
import axios from "axios";
import './Home.css'
import PreviousNextButton from "../../components/PreviousNextButton/PreviousNextButton";
import HomeNewsDots from "../../components/homeNewsDots/HomeNewsDots";

function Home () {
    const newsToken = 'ct8nK1YSjbQaodqF9QpRKggxZXeRbHzVuWxRS8IY'
    const [news, setNews] = useState([]);
    const [newsNumber, setNewsNumber] = useState(0);

    useEffect(() => {
        async function fetchData () {
            try {
                    const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&language=en`)
                    setNews(result.data.data);
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [])

if(news.length > 0) {
    console.log(news[newsNumber])
}
    return (
        <main className="homePage">
            {news.length > 0 && <section className="homePageNews">
                <div className="homePageNewsDiv" style={{backgroundImage: `url(${news[newsNumber].image_url})`,
                backgroundSize: `100% 100%`}} >
                    <a href={news[newsNumber].url} target="_blank"><h5>{news[newsNumber].title}</h5></a>

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
                <div className="homePageNews2">
                    <form>
                        <label htmlFor="radioBox">Dit is een radio</label>
                        <input type="radio" value="hoihoihoi" id="radioBox"/>
                    </form>
                </div>
            </section>}
        </main>
    )
}

export default Home