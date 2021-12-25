import React, {useState, useEffect} from "react";
import {useParams , useHistory} from "react-router-dom";
import axios from "axios";
import './CountryPage.css';


function CountryPage ({countries}) {
    const history = useHistory();

    function navigateToCountryList() {
        history.push("/country");
    }

    const {id} = useParams();

        const chosenCountry = countries.find((item) => {
            return item.alpha3Code === id;
        })



    const [news, setNews] = useState([]);
        const [category, setCategory] = useState('general');
    const newsToken = 'ct8nK1YSjbQaodqF9QpRKggxZXeRbHzVuWxRS8IY'

  useEffect(() => {
 async function fetchData () {
          try {
              if (chosenCountry) {
                  const result = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${newsToken}&language=en&search=${chosenCountry.name}&categories=${category}`)
                  setNews(result.data.data);
              }
          }
          catch (e) {
              console.error(e);
          }
      }
      fetchData()
  }, [chosenCountry])

    if(news) {
        console.log(news)
    }
    return (
        <>
        <button className="goBackButton" onClick={navigateToCountryList}> Go back to choose country page > </button>
        <div id="mainNews">

            {chosenCountry && <h1 className="chosenCountryName">{chosenCountry.name}</h1>}
            {news.length > 0 ? news.map((item) => {
                return (
                    <div className="news" key={item.uuid}>
                        <a href={item.url} target="_blank" >
                            <h2>{item.title}</h2>
                        </a>
                        <img className="newsImage" src={item.image_url} />
                        <p>{item.snippet}</p>
                        {console.log(news)}
                    </div>
                )
            }) : <img src="https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif" />}
        </div>
            </>
    )
}

export default CountryPage