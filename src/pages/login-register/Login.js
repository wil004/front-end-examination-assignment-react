import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './Login.css'
import preventDefault from "../../helpers/preventDefault";
import {NavLink} from "react-router-dom";
import {useHistory} from "react-router-dom";

function Login() {
    const {login} = useContext(AuthContext);

    const [userName, setUserName] = useState('');
    const [password1, setPassword1] = useState('');

    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    const history = useHistory();

    async function handleClick() {
        toggleLoading(true);
        toggleError(false);
        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                "username": userName.toLowerCase(),
                "password": password1,
            })
            login(result.data.accessToken);
            history.push('/userPage');
        } catch (e) {
            console.error(e.response);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <main className="login">
            <h1>Login</h1>
            <form className="loginForm">
                <p className="loginInfo">Login to your account to see the news-pages!
                    Don't have an account yet? <NavLink to="/register" className="loginInfo">register here</NavLink></p>
                <label htmlFor="userName">Username</label>
                <input type="text" id="userName" value={userName} onChange={(e) => {
                    setUserName(e.target.value)
                }}/>
                <label htmlFor="password1">password</label>
                <input type="password" id="password1" value={password1} onChange={(e) => {
                    setPassword1(e.target.value)
                }}/>
                {loading ? <h2>Loading please wait...</h2> : <button
                    className="loginRegisterButton"
                    disabled={!userName || !password1} onClick={(e) => {
                    handleClick();
                    preventDefault(e);
                }}>Login
                </button>}
                {error && <p>Username or password is invalid</p>}
            </form>
        </main>
    )
}

export default Login