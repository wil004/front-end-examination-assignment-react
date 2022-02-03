import {Redirect, Route} from "react-router-dom";
import News from "../../pages/news/News";
import ChooseCountry from "../../pages/choosecountry/ChooseCountry";
import CountryPage from "../../pages/country/CountryPage";
import UserPage from "../../pages/userpage/UserPage";
import {useState, useEffect} from "react";
import axios from "axios";


function PrivateRoute({setNavData, navData}) {
    const [countries, setCountries] = useState([]);


    useEffect(() => {async function fetchData () {
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


    return (<>

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
                navData={navData}
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
            <UserPage
                setNavData={setNavData}
            />
        </Route>
        <Route exact path="/userPage/:setAccount">
            <UserPage
                setNavData={setNavData}
            />
        </Route>
    </>)
}

export default PrivateRoute