import React, {useEffect, useState, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login-register/Login";
import {AuthContext} from "./context/AuthContext";
import Register from "./pages/login-register/Register";


function App() {
    const [navData, setNavData] = useState([]);
    const { auth } = useContext(AuthContext);


        useEffect( () => {if (!auth.isAuth) {
            setNavData(`William's News Application`)
        }}, [])

  return (
    <Router>
           <Navbar
               navData={navData}
           />

        <Switch>
            <Route exact path='/'>
                <Home
                    setNavData={setNavData}
                    auth={auth.isAuth}
                />
            </Route>
            <Route exact path='/login'>
                <Login
                />
            </Route>
            <Route exact path='/register'>
                <Register
                />
            </Route>
            {auth.isAuth && <PrivateRoute
                navData={navData}
                setNavData={setNavData}
            />}
        </Switch>
    </Router>
  );
}

export default App;
