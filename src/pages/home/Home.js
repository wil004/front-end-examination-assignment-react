import React, {useEffect, useState} from "react";
import './Home.css'


function Home () {



    return (
        <main className="homePage">
        <section>
            <h1>Welkom op de homepagine van Williams niews</h1>
            <h3>Land kiezen via land pagina</h3>
            <p>
                Dit is een nieuwspagina waarop je nieuws kan sorteren op land.
            </p>
            <p>
                Nadat de gebruiker een land heeft gekozen krijgt hij 5 nieuwsberichten te zien
            </p>
            <p>
                De gebruiker kan op deze pagina een categorie kiezen.
            </p>
            <p>
                De gebruiker krijgt dan 5 berichten van de gekozen categorie van het desbetreffende land te zien.
            </p>
        </section>
        <section>
            <h3>Menu icoon</h3>
            <p>
                Ook is het mogelijk om eerst via het menu icoon een categorie te kiezen.
            </p>
                   <p>
                       Er worden dan 5 (internationale) nieuwsberichten van deze categorie op de pagina weergeven.
                   </p>
                       <p>
                        Op de pagina van de gekozen categorie kan er vervolgens weer een land gekozen worden.
                       </p>
                   <p>
                       De gebruiker krijgt dan 5 berichten van de categorie over het gekozen land te zien.
                </p>
        </section>
        <section>
            <h3>Extra uitleg</h3>
                <p>Stel je wilt dus sport volgen van meerdere landen dan kan dit.</p>
                <p>Stel je wilt alleen het nederlandse nieuws volgen dan kan dat ook!</p>
                <p>Dat maakt deze site dus superhandig!</p>

        </section>
        </main>
    )
}

export default Home