import React, {useState} from "react";
import './Searchbar.css'

function SearchBar ({searchCountry, onChange, value, onClick}) {


    return (
        <section className="searchbar">
            <form>
                <input
                       className="searchbarInput"
                       type="text"
                       value={value}
                       onChange={onChange}
                />
                <input type="submit" onClick={onClick} />
            </form>
        </section>
    )


}


export default SearchBar