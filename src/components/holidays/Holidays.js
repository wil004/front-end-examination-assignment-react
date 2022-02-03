import React, {useEffect, useState} from "react";
import PreviousNextButton from "../PreviousNextButton/PreviousNextButton";
import axios from "axios";
import './Holidays.css'

function Holidays ({chosenCountry}) {
    const [page, setPage] = useState(1);
    const [holidays, setHolidays] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const holidayToken = process.env.REACT_APP_API_KEY_HOLIDAYS

    useEffect(() => {
        async function fetchData() {
            toggleLoading(true)
            toggleError(false)
            try {
                const result = await axios.get(`https://holidays.abstractapi.com/v1/?api_key=${holidayToken}&country=${chosenCountry.alpha2Code}&year=2020`)
                setHolidays(result.data);
            } catch (e) {
                console.error(e)
                toggleError(true)
            }
            toggleLoading(false)
        }
        fetchData()
    }, [])

    return (
        <>
            {loading ? <div className="countryHolidays"><p>Loading...</p></div> : <div className="countryHolidays">
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
            {error && <p>An error occurred our excuses for the inconvenience</p>}
            {holidays.length > 0 && holidays.map((item, index) => {
                if (index < page * 8 && index >= (page - 1) * 8)
                    return (
                        <div key={item.name + index} className="countryHolidaysDates">
                            <p>{item.name}</p>
                            <p>{item.date}</p>
                        </div>)
            })}
        </div>}
        </>
)
}

export default Holidays