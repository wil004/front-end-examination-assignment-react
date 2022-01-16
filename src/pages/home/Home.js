import React, {useEffect, useState} from "react";
import './Home.css'


function Home ({news, nav}) {



    return (
        <main className="homePage">
            <section>
            {nav}
            </section>
            <section>
            {news}
            </section>
        </main>
    )
}

export default Home