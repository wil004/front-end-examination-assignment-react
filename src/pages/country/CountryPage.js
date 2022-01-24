import React, {useState, useEffect} from "react";
import {useParams, useHistory, Redirect} from "react-router-dom";
import axios from "axios";
import './CountryPage.css';
import NewsContainer from "../../components/newscontainer/NewsContainer";
import PreviousNextButton from "../../components/PreviousNextButton/PreviousNextButton";
import QuickNavbar from "../../components/quicknavbar/QuickNavbar";
import exchangeImage from "../../assets/exchangeImage.png"


function CountryPage ({countries, setNavData}) {
    const [countryNews, setCountryNews] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [countryCategory, setCountryCategory] = useState('');
    const [page, setPage] = useState(1);
    const [newsNumber, setNewsNumber] = useState(0);
    const [userInput, setUserInput] = useState('');

    const [chosenValutaIndex, setChosenValutaIndex] = useState(0);
    const [chosenValutaIndex2, setChosenValutaIndex2] = useState(0);

    const [valutaAmountInput, setValutaAmountInput] = useState('');
    const [valutaAmountOutput, setValutaAmountOutput] = useState('');



    const [sendValutaAmount, setSendValutaAmount] = useState(0);

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



       const findCurrency = countries.find((item) => {
        if (item.currencies) {
            return item.name === userInput;
        }
    })

if (findCurrency) {
    {
        console.log(findCurrency.currencies[chosenValutaIndex].code)
    }
}


    useEffect(() => {
        {category ? setCountryCategory(category) : setCountryCategory(id)}
        setNavData(id);
    }, [category, id])


    useEffect(() => {
        async function fetchData () {
            try {
            if (findCurrency && sendValutaAmount > 0) {
                const result = await axios.get(`https://exchange-rates.abstractapi.com/v1/convert/?api_key=66a1b29650a24c66afc00175a8bceae9&base=${chosenCountry.currencies[chosenValutaIndex2].code}&target=${findCurrency.currencies[chosenValutaIndex].code}&base_amount=${sendValutaAmount}`);
                setValutaAmountOutput(result.data.converted_amount)
            }
        } catch (e) {
            console.error(e);
            }
        }
        fetchData()
    }, [findCurrency, sendValutaAmount])

    {console.log(valutaAmountOutput)}



    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://holidays.abstractapi.com/v1/?api_key=c27eb5f02c6d45648992fecd03cf9209&country=${chosenCountry.alpha2Code}&year=2020`)
                setHolidays(result.data);
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        async function fetchData() {
            try {
                if(countryCategory) {
                    const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&language=en&search=${countryCategory}`)
                    setCountryNews(result.data.data);
                }
            } catch (e) {
                console.error(e);
                console.log(e.response.data.error)
            }
        }
        fetchData()
    }, [countryCategory])



function preventDefault (e) {
    e.preventDefault(e);
}


    return (
    <main className="chosenCountry">
        <section className="countryInformation">
            <div className="countryDetails">
                <h1>{chosenCountry.name}</h1>
                <img src={chosenCountry.flag} className="countryFlagImage" />
                <p>Capital: {chosenCountry.capital}</p>
                <p>Continent: {chosenCountry.region}</p>
                <p>Subregion: {chosenCountry.subregion}</p>
                <p>Population: {chosenCountry.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1.")}</p>
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
                {countryNews.length > 0 &&
                <NewsContainer
                    news={countryNews}
                    classNameNewsContainer="countryNewsContainer"
                    classNamePrevious="previousButtonCountryNews"
                    classNameNext="nextButtonCountryNews"
                    newsHeaderClass="countryNewsHeader"
                    newsSnippetClass="countryNewsSnippet"
                    goToButton="goToCountryNews"
                    classNameDots="homeCountryDots"
                />}
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
                <form>
                  <section className="chooseValuta">
                    <div className="countryPageValuta">
                        <p>{chosenCountry.name}</p>
                        {chosenCountry.currencies && chosenCountry.currencies.length === 1  ?
                            <p>{chosenCountry.currencies[0].code} = {chosenCountry.currencies[0].name}</p>
                            : <div>
                                {chosenCountry.currencies.map((item,index) => {
                                        return <button disabled={index === chosenValutaIndex2} onClick={(e) => {setChosenValutaIndex2(index); preventDefault(e)}} className="chooseValutaButton" key={item.code}>{item.code} = {item.name}</button>
                                }
                                )}
                            </div>
                            }
                    </div>
                    <div className="userChoiceValuta">
                        <select className="chooseCountryForValutaSelect" onChange={(e) => {setUserInput(e.target.value); setChosenValutaIndex(0); setValutaAmountInput(0); setValutaAmountOutput(0); setSendValutaAmount(0);}}>
                            <option disabled={userInput}>Choose country</option>
                            {countries.map((item, index) => {
                                if (item.name.length > 30) {
                                return <option className="chooseCountryForValutaOption" key={item.numericCode + index}>{item.alpha3Code}</option>
                                } else {
                                return <option className="chooseCountryForValutaOption"
                                               key={item.numericCode}>{item.name}</option>
                            }
                        })}
                        </select>
                        {findCurrency && findCurrency.currencies.length > 1 ?
                       <div className="userChoiceValutaButtons">
                            {findCurrency.currencies && findCurrency.currencies.map((item, index) => {
                                return <button disabled={index === chosenValutaIndex} onClick={(e) => {setChosenValutaIndex(index); preventDefault(e)}} className="chooseValutaButton" key={item.code}>{item.code} = {item.name}</button>
                            })}
                       </div> : findCurrency && <p className="userChoiceValutaName">{findCurrency.currencies[0].code} = {findCurrency.currencies[0].name}</p>
                        }
                    </div>
                  </section>
                  <section className="calculateValuta">
                      <div className="valutaInput">
                      {chosenCountry && <label className="inOutputLabel" htmlFor="valutaAmountInput">{chosenCountry.currencies[chosenValutaIndex2].symbol} {chosenCountry.currencies[chosenValutaIndex2].code}</label>}
                      <input type="text"
                             value={valutaAmountInput}
                             onChange={(e) =>   {
                                 if (e.target.value.match(/^[0-9]+$/)) {
                                     setValutaAmountInput(e.target.value);
                                 }
                                 else if (e.target.value.length === 0){
                                     setValutaAmountInput(e.target.value)
                                 }
                             }}
                             id="valutaAmountInput"
                             placeholder="0 Numbers (Integers) Only"
                      />
                      </div>
                      <div className="valutaExchangeButtonDiv">
                          <button className="valutaExchangeButton" onClick={(e) => {preventDefault(e); setSendValutaAmount(valutaAmountInput)}}>
                          <img src={exchangeImage} className="exchangeImage" />
                          </button>
                      </div>
                      <div className="valutaOutput">
                          <input type="text"
                                 value={Math.round(valutaAmountOutput)}
                                 id="valutaAmountOutput"
                                 placeholder="< press icon to exchange"
                          readOnly/>
                          {findCurrency ? <label className="inOutputLabel" htmlFor="valutaAmountOutput">{findCurrency.currencies[chosenValutaIndex].symbol} {findCurrency.currencies[chosenValutaIndex].code}</label>
                              : <label className="inOutputLabel" htmlFor="valutaAmountOutput">choose valuta</label>}
                      </div>
                  </section>
                  <div className="calculatedValutaResult">
                      {sendValutaAmount > 0 && findCurrency ?
                          <p>{chosenCountry.currencies[chosenValutaIndex2].symbol} {valutaAmountInput.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1.")} {chosenCountry.currencies[chosenValutaIndex2].name} = {findCurrency.currencies[chosenValutaIndex].symbol} {Math.round(valutaAmountOutput).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1.")} {findCurrency.currencies[chosenValutaIndex].name}</p>
                          :
                      <p>Calculation results will be shown here</p>}
                  </div>
                  </form>
            </div>
        </section>
    </main>

)

}
export default CountryPage