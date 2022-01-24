import React, {useState} from "react";
import PreviousNextButton from "../PreviousNextButton/PreviousNextButton";
import HomeNewsDots from "../homeNewsDots/HomeNewsDots";

function NewsContainer ({news, classNameNewsContainer, classNamePrevious, classNameNext, newsSnippetClass, newsHeaderClass, goToButton, classNameDots}) {
    const [newsNumber, setNewsNumber] = useState(0);

    return (
        <div className={classNameNewsContainer} style={{backgroundImage: `url(${news[newsNumber].image_url})`,
            backgroundSize: `100% 100%`}} >
            <a href={news[newsNumber].url} target="_blank" className={newsHeaderClass}>
                <h5>{news[newsNumber].title}</h5>
            </a>
            <PreviousNextButton
                onClickPrevious= {() => { setNewsNumber(newsNumber - 1);}}
                disabledPrevious={newsNumber === 0}
                onClickNext={() => { setNewsNumber(newsNumber + 1);}}
                disabledNext={newsNumber === news.length - 1}
                classNamePrevious={classNamePrevious}
                classNameNext={classNameNext}
                className={"previousNextButtonContainerNews"}
            />

            <HomeNewsDots
                onClickFirst={() => { setNewsNumber(0);}}
                onClickSecond={() => { setNewsNumber(1);}}
                onClickThird={() => {setNewsNumber(2)}}
                onClickFourth={() => {setNewsNumber(3)}}
                onClickFifth={() => {setNewsNumber(4)}}
                className={classNameDots}
                first={newsNumber === 0 ? 'homeNewsDotButtonClicked' : 'false1'}
                second={newsNumber === 1 ? 'homeNewsDotButtonClicked' : 'false2'}
                third={newsNumber === 2 ? 'homeNewsDotButtonClicked' : 'false3'}
                fourth={newsNumber === 3 ? 'homeNewsDotButtonClicked' : 'false4'}
                fifth={newsNumber === 4 ? 'homeNewsDotButtonClicked' : 'false5'}
            />
            <section className={newsSnippetClass}>
                <p>{news[newsNumber].snippet ? news[newsNumber].snippet : 'Go to the newspage for more information'}</p>
            </section>
                <a className={goToButton} href={news[newsNumber].url} target="_blank" >Go to this newspage</a>
        </div>
    )

}

export default NewsContainer