import React, {createContext, useState, useEffect} from "react";
import {Redirect, useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode"
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({ children} ) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');

        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);


            /* The expiry token expires in 24 hours, but the server refreshes every 30 minutes...
            * that's why I reduced the expiry time in the variable below!
            * A day has 86400 seconds, half an hour has 1800 seconds I have to reduce the expiry time with 84600 seconds*/
            const expiry = decodedToken.exp - 84600;
            const now = new Date();

            {console.log(decodedToken)}


            if (now.getTime() < (expiry * 1000)) {
               console.log(expiry * 1000)
                console.log(now.getTime())
                async function fetchUserInfo() {
                    try {
                        const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${jwtToken}`
                            }
                        });
                        toggleAuth({
                            ...auth,
                            isAuth: true,
                            status: 'done',
                                user: {
                                    email: result.data.email,
                                    username: result.data.username,
                                    id: result.data.id,
                                    role: result.data.roles,
                                    info: "dit is informatie",
                                    token: jwtToken,
                                    profilePicture: result.data.profilePicture,
                                },
                            }
                        )
                    } catch (e) {
                        console.error(e);
                        {console.log('Something went wrong check error message!')}
                        toggleAuth({
                            ...auth,
                            status: 'done',
                        })
                    }
                }
                fetchUserInfo()
            } else {
                {console.log('Token expired')}
                localStorage.clear()
                toggleAuth({
                    ...auth,
                    status: 'done',
                })
            }
        } else {
            toggleAuth({
                ...auth,
                status: 'done',
            })
        }


    }, []);



    function login(jwtToken) {
        localStorage.setItem('token', jwtToken);
        toggleAuth({
            ...auth,
            status: 'pending'
            }
        )
        async function fetchUserInfo() {
            try {
                const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                toggleAuth({
                        ...auth,
                        isAuth: true,
                        status: 'done',
                        user: {
                            email: result.data.email,
                            username: result.data.username,
                            id: result.data.id,
                            role: result.data.roles,
                            info: "dit is informatie",
                            token: jwtToken,
                            profilePicture: result.data.profilePicture,
                        },
                    }
                )
            } catch (e) {
            console.error(e)
                toggleAuth({
                    ...auth,
                    status: 'done',
                })
            }
        }
        fetchUserInfo();
    }

    function logout() {

        localStorage.clear();

        toggleAuth({
            ...auth,
            user: {
                email: 'hoi',
            },
            isAuth: false
        });
    }


    const contextData = {
        auth: auth,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'pending'
                ? <p>Loading... Please wait!</p>
                : children
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider