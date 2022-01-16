import React from "react";
import './OptionsMenu.css';

function OptionsMenu () {
    return (
        <div className="optionsMenu">
            <div className="setLanguage">
                <p>Languages</p>
                <button>Nederlands</button>
                <button>English</button>
                <button>Bahasa Indonesia</button>
            </div>
        </div>
    )
}

export default OptionsMenu