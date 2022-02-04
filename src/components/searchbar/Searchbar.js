import React, {useState} from "react";
import './Searchbar.css'

function SearchBar ({userInput, setUserInput, onClick, newsPage,
                        disabled, chooseCountryPage, className, id, label}) {





    return (
        <section className="searchbar">
            {label}
            <form className="searchbarForm">
                <input
                        id={id}
                       placeholder="Search Country"
                       className={className}
                       type="text"
                       value={userInput}
                       onChange={(e) =>   {
                           if(e.target.value.charAt(0)) {
                               if (e.target.value.match(/^[A-Z a-z]+$/)) {
                                   if(e.target.value.length === 1) {
                                       setUserInput(e.target.value.toUpperCase())
                                   }
                                   else if(e.target.value.length > 1) {
                                       setUserInput(e.target.value)
                                   }
                               }
                           }
                           else if (e.target.value.length === 0){
                               setUserInput(e.target.value)
                           }
                       }}


                />
                {newsPage && <button className="searchbarSubmit" type="submit" onClick={onClick}
                        disabled={disabled}>Search</button>}
            </form>
            {newsPage}
            {chooseCountryPage}


        </section>
    )


}


export default SearchBar