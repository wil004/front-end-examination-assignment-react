import React, {useEffect, useState} from "react";
import exchangeImage from "../../assets/exchangeImage.png";
import './ValutaCalculator.css'
import axios from "axios";



function ValutaCalculator ({countries, chosenCountry}) {
    const [userInput, setUserInput] = useState('');
    const [chosenValutaIndex, setChosenValutaIndex] = useState(0);
    const [chosenValutaIndex2, setChosenValutaIndex2] = useState(0);
    const [valutaAmountInput, setValutaAmountInput] = useState('');
    const [valutaAmountOutput, setValutaAmountOutput] = useState('');
    const [sendValutaAmount, setSendValutaAmount] = useState(0);

    const findCurrency = countries.find((item) => {
        if (item.currencies) {
            return item.name === userInput;
        }
    })

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

    function preventDefault (e) {
        e.preventDefault(e);
    }
    const numberFormatter = new Intl.NumberFormat("es-ES");

    {console.log(valutaAmountOutput)}


    return (
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
                               }; setSendValutaAmount(0); setValutaAmountOutput(0);
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
                    <p>{chosenCountry.currencies[chosenValutaIndex2].symbol} {numberFormatter.format(valutaAmountInput)} {chosenCountry.currencies[chosenValutaIndex2].name} = {findCurrency.currencies[chosenValutaIndex].symbol} {numberFormatter.format(Math.round(valutaAmountOutput))} {findCurrency.currencies[chosenValutaIndex].name}</p>
                    :
                    <p>Calculation results will be shown here</p>}
            </div>
        </form> )
}


export default ValutaCalculator