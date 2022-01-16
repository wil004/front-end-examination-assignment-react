import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import axios from "axios";
import './App.css';
import Choosecountry from "./pages/choosecountry/ChooseCountry";
import CountryPage from "./pages/country/CountryPage";
import Navbar from "./components/navbar/navbar";
import OptionsMenu from "./components/navbar/OptionsMenu";
import News from "./pages/news/News";
import Home from "./pages/home/Home";


function App() {
    const [countries, setCountries] = useState([]);

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
               dropDownMenu={<OptionsMenu />}
           />

        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path={`/news/:category`}>
                {countries.length > 0 && <News
                    countries={countries}
                />}
            </Route>
            <Route exact path={`/news/:category/:country`}>
                {countries.length > 0 && <News
                    countries={countries}
                />}
            </Route>

            <Route exact path='/country'>
                {countries.length > 0 && <Choosecountry countries={countries} />}
            </Route>
            <Route exact path='/country/:id'>
                {countries.length > 0 && <CountryPage countries={countries} />}
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
