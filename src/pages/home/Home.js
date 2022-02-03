import React, {useEffect, useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import './Home.css'
import newsPage from '../../assets/newspage.png'
import chooseCountryPage from '../../assets/choosecountrypage.png'
import countryPage from '../../assets/countrypage.png'
import profilePage from '../../assets/profilepage.png'
import profilePicture from '../../assets/profilePicture.jpg'

function Home({setNavData}) {
    const {auth} = useContext(AuthContext);


    useEffect(() => {
        if (auth.isAuth) {
            setNavData('Home')
        }
    }, [])


    return (
        <main className="homePage">
            <div className="headerHomePage">
                <h1>News Application William Meester</h1>
                <p className="pHome">Welcome to the news application for all countries of the world!</p>
                {auth.isAuth ? <p className="pHome">Welcome user {auth.user.username}</p>
                    : <p className="pHome">Please <NavLink className="pHome" to="/login">Login</NavLink> or <NavLink
                        className="pHome" to="/register">Register</NavLink> here</p>}
            </div>
            <section className="homePageSection1">
                <NavLink className="homePageDiv" to={auth.isAuth ? '/userPage' : '/login'}>
                    <img className="homePageInfoPictures" src={profilePage}/>
                    {auth.isAuth  ? <p>The profile page</p> : <p>To Login page</p>}
                </NavLink>
                {auth.isAuth ? <article className="homeArticle">
                        <p>User {auth.user.username} {auth.user.email}</p>
                        <img className="profilePictureHomePage"
                             src={auth.user.profilePicture ? auth.user.profilePicture : profilePicture}/>
                        <p>We appreciate it that you are a member of our community.</p>
                        <p>Click on the images to navigate to the page you like to see.</p>
                        <p>Or ofcourse simply use the navigation bar.</p>


                    </article>
                    :
                    <article className="homeArticle">
                        <p>This website was created to make it easier for you to find world news!</p>
                        <p>You can go to the news page and filter news on category and country by simply typing it down
                            in the searchbar.</p>
                        <p>You can also choose a country on the countries page.</p>
                        <p>The difference is that on the news page you'll find basic categories like sports, politics,
                            technology and more,
                            while on the country page you can look up more detailed news from that particular
                            country, like the capital or the currency.</p>
                        <p>You can also check currencies and holidays of the chosen country page.
                            While on the newsPage you can see all timezones available of the chosen country.</p>
                    </article>}
                <NavLink className="homePageDiv" to={auth.isAuth ? '/countrypage/DEU' : '/login'}>
                    <img className="homePageInfoPictures" src={countryPage}/>
                    {auth.isAuth  ? <p>The country page</p> : <p>To Login page</p>}
                </NavLink>
            </section>
            <section className="homePageSection2">
                <NavLink className="homePageDiv2" to={auth.isAuth ? '/news/general/world' : '/register'}>
                    <img className="homePageInfoPictures2" src={newsPage}/>
                    {auth.isAuth  ? <p>The NewsPage</p> : <p>To Register page</p>}
                </NavLink>
                <NavLink className="homePageDiv2" to={auth.isAuth ? '/countries/world/pageNumber=1' : '/register'}>
                    <img className="homePageInfoPictures2" src={chooseCountryPage}/>
                    {auth.isAuth  ? <p>The choose country page</p> : <p>To Register page</p>}
                </NavLink>
            </section>
        </main>
    )
}

export default Home