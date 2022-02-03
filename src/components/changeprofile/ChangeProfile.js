import {NavLink, Redirect, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './ChangeProfile.css'
import emailIsValid from "../../helpers/emailIsValid";
import defaultProfilePicture from "./../../assets/profilePicture.jpg"


function ChangeProfile({title, description, urlText, url, inputFieldDescription, currentDetails, currentDetailsTitle,}){
    const [inputSetter, setInputSetter] = useState('');

    const [image, setImage] = useState('');

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [changedEmail, setChangedEmail] = useState('');

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [changedPasswordMessage, setChangePasswordMessage] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [token, setToken] = useState('');

    const [errorConfirm, toggleErrorConfirm] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const {auth} = useContext(AuthContext);
    const {setAccount} = useParams();


    async function currentProfile() {
        toggleErrorConfirm(false);
        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                "username": auth.user.username,
                "password": currentPassword,
            })
            setToken(result.data.accessToken);
        } catch (e) {
            console.error(e.response);
            toggleErrorConfirm(true);
        }
    }

    useEffect(() => {
        emailIsValid(inputSetter, setIsEmailValid);
    }, [inputSetter]);

    useEffect(() => {
        async function fetchData() {
            toggleLoading(true);
            toggleError(false);
            try {
                if (token) {
                    if (image) {
                        const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/user/image',
                            {
                                "base64Image": image,
                            }
                            , {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                        window.location.reload();
                    } else if (email) {
                        const result = await axios.put('https://frontend-educational-backend.herokuapp.com/api/user',
                            {
                                email: email,
                            }
                            , {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                        setChangedEmail(result.data.email)
                    } else if (password) {
                        const result = await axios.put('https://frontend-educational-backend.herokuapp.com/api/user',
                            {
                                "password": password,
                                "repeatedPassword": password,
                            }
                            , {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                        setPassword2('');
                        setChangePasswordMessage(true);
                    }
                }
            } catch (e) {
                console.error(e.response);
                toggleError(true);
            }
            setCurrentPassword('');
            setInputSetter('');
            toggleLoading(false);
        }

        fetchData();
    }, [token, image, email, password])


    return (
        <section className="personalPageSetImage">
            <div>
                <h1 id="personalPageTitle">{title}</h1>
                <p>{description}</p>
                <a className="personalPageSetImageNav" href={url}
                   target="_blank">
                    {urlText}
                </a>
                <h1 className="profileCurrentTitle">{currentDetailsTitle}</h1>
                <img src={auth.user.profilePicture ? auth.user.profilePicture : defaultProfilePicture}
                     className="personalPageProfile"/>
                {currentDetails}
            </div>

            <section className="setImageInput">
                <div>
                    {changedEmail && <p>Your email address is changed to: {changedEmail}</p>}
                    {changedPasswordMessage && <p>Your password has been successfully changed!</p>}
                    <h1>{inputFieldDescription}</h1>
                    <input
                        type={setAccount === "changePassword" ? "password" : "text"}
                        value={inputSetter}
                        onChange={(e) => {
                            setInputSetter(e.target.value)
                        }}
                        id="imageSetter"
                    />
                    {setAccount === "changePassword" &&
                    <div>
                        <p>verify your new password</p>
                        <input
                            type="password"
                            value={password2}
                            onChange={(e) => {
                                setPassword2(e.target.value)
                            }}
                        />
                        {inputSetter !== password2 && password2.length > 0 &&
                        <p className="changeProfileValidity">Passwords must be equal</p>}
                        {inputSetter.length < 6 && inputSetter.length !== 0 &&
                        <p className="changeProfileValidity">Password should contain at least 6 characters</p>}
                    </div>}
                    {setAccount === "changeEmail" && !isEmailValid && inputSetter.length > 0 &&
                    <p className="changeProfileValidity">Email-address must contain an @ and dot</p>}
                </div>
                <div className="setNewPersonalData">
                    {error && <h1 className="personalPageErrorMessage">Something went wrong please try again!</h1>}
                    {setAccount !== "changePassword" && <button className="personalPageButtonImage" onClick={() => {
                        setInputSetter('');
                    }}>Make field empty
                    </button>}
                    <p>Username: {auth.user.username}</p>
                    <label className="personalInputLabel" htmlFor="currentPassword">Fill in current password</label>
                    <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => {
                        setCurrentPassword(e.target.value)
                    }}/>
                    {loading && <p>...Loading</p>}
                    <button className="personalPageButtonImage" onClick={() => {
                        currentProfile();
                        setAccount === "setImage" ?
                            setImage(inputSetter) : setAccount === "changeEmail" ? setEmail(inputSetter) :
                                setAccount === "changePassword" && setPassword(inputSetter);
                    }} disabled={setAccount === "changePassword" ? inputSetter !== password2 || inputSetter.length === 0
                        || password2.length === 0 : setAccount === "changeEmail" ? !isEmailValid : inputSetter.length === 0}>Confirm
                    </button>
                    {errorConfirm && <p id="personalError">Login details are invalid</p>}
                </div>
            </section>
            <NavLink to="/userPage" className="goBackButtonUserPage">Back to UserPage</NavLink>
        </section>
    )
}

export default ChangeProfile