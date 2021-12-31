import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import axios from "axios";
import './App.css';
import Home from "./pages/home/Home";
import Choosecountry from "./pages/choosecountry/Choosecountry";
import CountryPage from "./pages/country/CountryPage";
import Navbar from "./components/navbar/navbar";
import DropdownOptions from "./components/navbar/DropdownOptionsNavbar";
import News from "./components/news/News";
import SearchBar from "./components/searchbar/Searchbar";

function App() {
    const [countries, setCountries] = useState([]);
    const [clickedCategory, setClickedCategory] = useState('general')
    const [userInput, setUserInput] = useState('');
    const [submitUserInput, setSubmitUserInput] = useState('');

    const newsToken = 'ct8nK1YSjbQaodqF9QpRKggxZXeRbHzVuWxRS8IY'


    useEffect(() => {
        async function fetchData () {
            try {
                const result = await axios.get(`https://restcountries.com/v2/all`)
                setCountries(result.data);
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [])


    const preventDefault = (e) => {
        e.preventDefault();
    }



  return (
    <Router>

           <Navbar
                dropDownMenu={
                    <DropdownOptions
                        clickGeneral={() => {setClickedCategory('general');}}
                        clickSports={() => { setClickedCategory('sports'); }}
                        clickPolitics={() => { setClickedCategory('politics'); }}
                        clickFood={() => { setClickedCategory('food');}}
                        clickTravel={() => { setClickedCategory('travel'); }}
                        clickTech={() => { setClickedCategory('tech'); }}
                    />}
                news={
                    <Switch>
                        <Route exact path="/news">
                            <News category={clickedCategory}
                                  searchBar={
                                      <SearchBar
                                          value={ userInput.length === 1 ?  userInput[0].toUpperCase() : userInput}
                                          onChange={(e) =>   {

                                              if(e.target.value.charAt(0)) {
                                              if (e.target.value.match(/^[A-Z a-z]+$/)) {
                                              setUserInput(e.target.value)
                                          }}
                                              else {
                                              setUserInput(e.target.value);
                                          }}}
                                          onClick={(e) => {
                                            preventDefault(e);
                                            setSubmitUserInput(userInput);
                                          }}
                                      />}
                                  userInputValue={userInput}
                                  submitUserInput={submitUserInput}
                                  countries={countries}
                           />
                       </Route>
                   </Switch>
                   }

           />
        <Switch>
            <Route exact path='/'>
               <Home />
            </Route>
            <Route exact path='/country'>
               <Choosecountry countries={countries.length > 0 && countries} />
            </Route>
            <Route exact path='/country/:id'>
               <CountryPage countries={countries} />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
