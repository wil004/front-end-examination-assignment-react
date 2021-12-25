import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import axios from "axios";
import './App.css';
import Home from "./pages/home/Home";
import Choosecountry from "./pages/choosecountry/Choosecountry";
import CountryPage from "./pages/country/CountryPage";
import Navbar from "./components/navbar/navbar";

function App() {
    const [countries, setCountries] = useState([]);
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


console.log(countries)


  return (
    <Router>
        <Navbar />
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
