import React, {useEffect, useState} from "react";
import exchangeImage from "../../assets/exchangeImage.png";
import axios from "axios";
import preventDefault from "../../helpers/preventDefault";
import './ValutaCalculatorInputFields.css';

function ValutaCalculatorInputFields({
                                         findCurrency,
                                         chosenCountry,
                                         valutaAmountInput,
                                         valutaAmountOutput,
                                         sendValutaAmount,
                                         setValutaAmountInput,
                                         setValutaAmountOutput,
                                         setSendValutaAmount,
                                         chosenValutaIndex,
                                         chosenValutaIndex2,
                                         error,
                                         toggleError
                                     }) {
    const [loading, toggleLoading] = useState(false);

    const exchangeToken = process.env.REACT_APP_API_KEY_CURRENCIES


    useEffect(() => {
        async function fetchData() {
            toggleLoading(true);
            toggleError(false);
            try {
                if (findCurrency && sendValutaAmount > 0) {
                    const result = await axios.get(`https://exchange-rates.abstractapi.com/v1/convert/?api_key=${exchangeToken}&base=${chosenCountry.currencies[chosenValutaIndex2].code}&target=${findCurrency.currencies[chosenValutaIndex].code}&base_amount=${sendValutaAmount}`);
                    setValutaAmountOutput(result.data.converted_amount)
                }
            } catch (e) {
                toggleError(true);
                console.error(e);
            }
            toggleLoading(false);
        }

        fetchData()
    }, [findCurrency, sendValutaAmount])

    return (
        <>
            <section className="calculateValuta">
                <div className="valutaInput">
                    {chosenCountry ? <label className="inOutputLabel"
                                            htmlFor="valutaAmountInput">{chosenCountry.currencies[chosenValutaIndex2].symbol} {chosenCountry.currencies[chosenValutaIndex2].code}</label>
                        : <label className="inOutputLabel" htmlFor="valutaAmountInput">choose valuta</label>
                    }
                    <input type="text"
                           value={valutaAmountInput}
                           onChange={(e) => {
                               if (e.target.value.match(/^[0-9]+$/) || e.target.value.length === 0) {
                                   setValutaAmountInput(e.target.value);
                               }
                               ;setSendValutaAmount(0);
                               setValutaAmountOutput(0);
                           }}
                           id="valutaAmountInput"
                    />
                </div>
                <div className="valutaExchangeButtonDiv">
                    {loading ? <p>...Loading</p> :
                        <button className="valutaExchangeButton" onClick={(e) => {
                            preventDefault(e);
                            setSendValutaAmount(valutaAmountInput)
                        }}>
                            <img src={exchangeImage} className="exchangeImage"/>
                            <p className="exchangeButtonP" >click to calculate</p>
                        </button>}
                </div>
                <div className="valutaOutput">
                    <input type="text"
                           value={valutaAmountOutput}
                           id="valutaAmountOutput"
                           readOnly/>
                    {findCurrency ? <label className="inOutputLabel"
                                           htmlFor="valutaAmountOutput">{findCurrency.currencies[chosenValutaIndex].symbol && findCurrency.currencies[chosenValutaIndex].symbol} {findCurrency.currencies[chosenValutaIndex].code}</label>
                        : <label className="inOutputLabel" htmlFor="valutaAmountOutput">choose valuta</label>}
                </div>
            </section>
        </>
    )


}

export default ValutaCalculatorInputFields