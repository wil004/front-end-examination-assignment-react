import React, {useEffect, useState, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";
import './App.css';
import Navbar from "./components/navbar/navbar";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login-register/Login";
import {AuthContext} from "./context/AuthContext";
import Register from "./pages/login-register/Register";


function App() {
    const [countries, setCountries] = useState([]);
    const [navData, setNavData] = useState([]);
    const newsToken = 'ct8nK1YSjbQaodqF9QpRKggxZXeRbHzVuWxRS8IY'
    const { auth } = useContext(AuthContext);


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
            <Route exact path='/login'>
                <Login />
            </Route>
            <Route exact path='/register'>
                <Register />
            </Route>
            {auth.isAuth && <PrivateRoute
                countries={countries}
                navData={navData}
                setNavData={setNavData}
            />}
        </Switch>
    </Router>
  );
}

export default App;
