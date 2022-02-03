import React, {useContext} from "react";
import './navbar.css';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import defaultProfilePicture from "./../../assets/profilePicture.jpg"

function Navbar ({navData, setNavData}) {
const { auth, logout } = useContext(AuthContext);

    return (
        <>
            <nav id="nav">
                <div className="nav left">
                    <NavLink exact to="/" className="nav-link">Home</NavLink>
                    { auth.isAuth &&
                    <>
                    <NavLink to="/news" className="nav-link">News</NavLink>
                    <NavLink to="/countries/" className="nav-link">Countries</NavLink>
                    </>}
                </div>
                <div>
                    <h1 className="navData">{navData}</h1>
                </div>
                <div className="nav right">
                    { auth.isAuth ?
                    <>
                            <NavLink to="/userPage" className="nav-link"><p className={"navbarUserDetails"}>
                                {auth.user.username}</p>
                                <img className="navbarProfilePicture" src={auth.user.profilePicture ? auth.user.profilePicture : defaultProfilePicture}/></NavLink>
                            <NavLink to="/userPage" className="nav-link">Profile</NavLink>
                        <NavLink to="/"  onClick={logout} className="nav-link-logout">Logout</NavLink>
                        </>
                        :
                    <>
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                        <NavLink to="/register" className="nav-link">Register</NavLink>
                    </>
                        }
                </div>
            </nav>
        </>

    )

}


export default Navbar