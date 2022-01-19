import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import axios from "axios";
import './App.css';
import ChooseCountry from "./pages/choosecountry/ChooseCountry";
import CountryPage from "./pages/country/CountryPage";
import Navbar from "./components/navbar/navbar";
import News from "./pages/news/News";
import Home from "./pages/home/Home";


function App() {
    const [countries, setCountries] = useState([]);
    const [navData, setNavData] = useState([]);
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







  return (
    <Router>
           <Navbar
               navData={navData}
           />

        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path={`/news`}>
                <Redirect to="/news/general/world"/>
            </Route>
            <Route exact path={`/news/:category/:country`}>
                {countries.length > 0 &&
                <News
                    countries={countries}
                    setNavData={setNavData}
                    navData={navData}
                />}
            </Route>
            <Route exact path='/countries'>
                <Redirect to='/countries/world/pageNumber=1' />
            </Route>
            <Route exact path='/countries/:continent/pageNumber=:pageId'>
                {countries.length > 0 && <ChooseCountry countries={countries}
                                                        setNavData={setNavData}
                />}

            </Route>

            <Route exact path='/countrypage/:id'>
                {countries.length > 0 && <CountryPage countries={countries}

                />}
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
