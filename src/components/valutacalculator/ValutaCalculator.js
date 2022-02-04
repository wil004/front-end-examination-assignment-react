import React, {useState} from "react";
import './ValutaCalculator.css'
import preventDefault from "../../helpers/preventDefault";
import ValutaCalculatorInputFields from "./ValutaCalculatorInputFields";



function ValutaCalculator ({countries, chosenCountry}) {
    const [userInput, setUserInput] = useState('');
    const [chosenValutaIndex, setChosenValutaIndex] = useState(0);
    const [chosenValutaIndex2, setChosenValutaIndex2] = useState(0);
    const [valutaAmountInput, setValutaAmountInput] = useState('');
    const [valutaAmountOutput, setValutaAmountOutput] = useState('');
    const [sendValutaAmount, setSendValutaAmount] = useState(0);

    const [valutaAmountInput2, setValutaAmountInput2] = useState('');
    const [valutaAmountOutput2, setValutaAmountOutput2] = useState('');
    const [sendValutaAmount2, setSendValutaAmount2] = useState(0);

    const [reverseCalculation, setReverseCalculation] = useState(false);

    const [error, toggleError] = useState(false);




    const numberFormatter = new Intl.NumberFormat("es-ES");
    const findCurrency = countries.find((item) => {
        if (item.currencies) {
            return item.name === userInput;
        }
    })
    countries.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <form>
            <section className="chooseValuta">
                <div className="countryPageValutaHeader">
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
                    <select className="chooseCountryForValutaSelect" onChange={(e) => {setUserInput(e.target.value); setChosenValutaIndex(0);
                        setValutaAmountInput(0); setValutaAmountOutput(0); setSendValutaAmount(0); setValutaAmountInput2(0); setValutaAmountOutput2(0);
                        setSendValutaAmount2(0); toggleError(false)}}>
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
            {reverseCalculation ?
            <ValutaCalculatorInputFields
                findCurrency={chosenCountry}
                chosenCountry={findCurrency}
                valutaAmountInput={valutaAmountInput2}
                valutaAmountOutput={valutaAmountOutput2}
                sendValutaAmount={sendValutaAmount2}
                setValutaAmountInput={setValutaAmountInput2}
                setValutaAmountOutput={setValutaAmountOutput2}
                setSendValutaAmount={setSendValutaAmount2}
                chosenValutaIndex={chosenValutaIndex}
                chosenValutaIndex2={chosenValutaIndex2}
                error={error}
                toggleError={toggleError}
                />
                :
            <ValutaCalculatorInputFields
                findCurrency={findCurrency}
                chosenCountry={chosenCountry}
                valutaAmountInput={valutaAmountInput}
                valutaAmountOutput={valutaAmountOutput}
                sendValutaAmount={sendValutaAmount}
                setValutaAmountInput={setValutaAmountInput}
                setValutaAmountOutput={setValutaAmountOutput}
                setSendValutaAmount={setSendValutaAmount}
                chosenValutaIndex={chosenValutaIndex}
                chosenValutaIndex2={chosenValutaIndex2}
                error={error}
                toggleError={toggleError}
            />}
            <div className="calculatedValutaResult">
                {error && <p className="errorMessageValutaCalculator">These currencies can not yet be calculated towards another. Apologies for the inconvenience.</p>}
                {findCurrency ? !reverseCalculation ?
                    <p>{chosenCountry.currencies[chosenValutaIndex2].symbol && chosenCountry.currencies[chosenValutaIndex2].symbol} {numberFormatter.format(valutaAmountInput)} {chosenCountry.currencies[chosenValutaIndex2].name} = {findCurrency.currencies[chosenValutaIndex].symbol
                    && findCurrency.currencies[chosenValutaIndex].symbol}
                        {numberFormatter.format(Math.round(valutaAmountOutput))} {findCurrency.currencies[chosenValutaIndex].name}</p>
                    :
                        <p>{findCurrency.currencies[chosenValutaIndex].symbol} {numberFormatter.format(Math.round(valutaAmountInput2))} {findCurrency.currencies[chosenValutaIndex].name} = {chosenCountry.currencies[chosenValutaIndex2].symbol} {numberFormatter.format(valutaAmountOutput2)} {chosenCountry.currencies[chosenValutaIndex2].name}
                            </p>
                    :
                    <p>Calculation results will be shown here</p>}
                <button disabled={error} className="reverseValutaButton" onClick={(e) => {setReverseCalculation(!reverseCalculation); preventDefault(e);}}>Reverse valuta calculation</button>
            </div>

        </form> )
}


export default ValutaCalculator