import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from "axios";
import {useHistory} from "react-router-dom";
import preventDefault from "../../helpers/preventDefault";
import {NavLink} from "react-router-dom";
import './Register.css'
import emailIsValid from "../../helpers/emailIsValid";
import redirecting from "../../assets/redirecting.gif";

function Register() {
    const [emailAdress, setEmailAdress] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [userName, setUserName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [registerButton, toggleRegisterButton] = useState(true);
    const [registerSucces, toggleRegisterSucces] = useState(false);
    const [info , setInfo] = useState('');
    const [admin, toggleAdmin] = useState(false);

    const [loading , toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [errorCode, setErrorCode] = useState('');

    const [count, setCount] = useState(5);

    const history = useHistory();

    async function handleClick() {
        toggleLoading(true);
        toggleError(false);
        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": userName.toLowerCase(),
                "email": emailAdress,
                "password": password1,
                "role": ["user"],
            });
            console.log(result.data.message)
            if (result.data.message === 'User registered successfully!') {
                toggleRegisterSucces(true);
            }

        }
        catch(e) {
            console.error(e.response.data);
            if (e.response.data.error === 'Bad Request') {
                setErrorCode("fill in valid email adres");
            } else {
                setErrorCode(e.response.data)
            }
            toggleError(true);
        }
        toggleLoading(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
           if (count >= 0 && registerSucces) {
               setCount(count - 1)
               {
                   console.log(count)
               }
           }
        }, 1000);
        return () => {clearTimeout(timer);
        }
    }, [count, registerSucces])

    useEffect(() => { emailIsValid(emailAdress, setIsEmailValid);
        if (isEmailValid && userName.length >= 6 && password1 === password2) {
            toggleRegisterButton(false);
        } else {
            toggleRegisterButton(true);
        }
        }, [emailAdress, userName, password1, password2])




    return (
        <main className="register">
            {loading ? <p>Loading please wait...</p> : registerSucces ?
            <div>
            <h2 className="registerSucces">Registration succesfull! Redirecting in {count}</h2>
            <img src={redirecting} className="registerRedirect" />
            {count === 0 && <Redirect to="/login" />}
            </div>
                :
            <section>
                <h1>Register</h1>
            <form className="registerForm">
                {error ? <p className="registerInfo">{errorCode}</p> : <p className="registerInfo">Create an account here!</p>}
                        <label htmlFor="email">Fill in your email-adress</label>
                        <input type="text" id="email" value={emailAdress} onChange={(e) => {setEmailAdress(e.target.value)}}/>
                {emailAdress.length > 0 && !isEmailValid && <p className="validity">Email-adress must contain an @ and dot</p>}
                            <label htmlFor="userName">Choose a username</label>
                            <input type="text" id="userName" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                {userName.length > 0 && userName.length < 6 && <p className="validity">Username requires at least 6 characters.</p>}
                        <label htmlFor="password1">kies wachtwoord</label>
                        <input type="password" id="password1" value={password1} onChange={(e) => {setPassword1(e.target.value)}}/>
                {password1.length > 0 && password1.length < 6 && <p className="validity">Password should contain at least 6 characters</p>}
                            <label htmlFor="password2">Herhaal wachtwoord</label>
                            <input type="password" id="password2" value={password2} onChange={(e) => {setPassword2(e.target.value)}}/>
                {password1 !== password2 && password1.length > 0 && password2.length > 0 && <p className="validity">Passwords must be equal!</p>}
                    <button onClick={(e) => {handleClick(); preventDefault(e)}}
                        disabled={registerButton}>register</button>
            </form>
                <p>If you already have an account you can sign in <NavLink to="/signin">here</NavLink>.</p>
            </section>}
            </main>
    );
}

export default Register;