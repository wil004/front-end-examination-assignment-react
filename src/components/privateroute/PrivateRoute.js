import {Redirect, Route} from "react-router-dom";
import News from "../../pages/news/News";
import ChooseCountry from "../../pages/choosecountry/ChooseCountry";
import CountryPage from "../../pages/country/CountryPage";
import UserPage from "../../pages/userpage/UserPage";


function PrivateRoute ({countries, setNavData, navData}) {
 return(   <>

        <Route exact path={`/news`}>
            <Redirect to="/news/general/world"/>
        </Route>
        <Route exact path={`/news/:category/:country`}>
            {countries.length > 0 &&
            <News
            countries={countries}
            setNavData={setNavData}
            navData={navData}
        />}
        </Route>
        <Route exact path='/countries'>
            <Redirect to='/countries/world/pageNumber=1'/>
        </Route>
        <Route exact path='/countries/:continent/pageNumber=:pageId'>
            {countries.length > 0 &&
            <ChooseCountry
                countries={countries}
                setNavData={setNavData}
            />
            }
        </Route>
        <Route exact path='/countrypage/:id/'>
            {countries.length > 0 &&
            <CountryPage
            countries={countries}
            setNavData={setNavData}
            />}
        </Route>
        <Route exact path='/countrypage/:id/:category'>
            {countries.length > 0 &&
            <CountryPage
            countries={countries}
            setNavData={setNavData}
            />}
        </Route>
        <Route exact path="/userPage">
            <UserPage />
        </Route>
        <Route exact path="/userPage/:setAccount">
            <UserPage />
        </Route>
    </> )
}

export default PrivateRoute