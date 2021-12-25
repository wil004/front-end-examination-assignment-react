import React from "react";
import './HomeNewsDots.css'

function HomeNewsDots ({first, second, third, fourth, fifth, onClickFirst, onClickSecond,
                       onClickThird, onClickFourth, onClickFifth}) {
    return (
        <div className="homeNewsDots">
            <button className="homeNewsDotButton" id={first} onClick={onClickFirst}> </button>
            <button className="homeNewsDotButton" id={second} onClick={onClickSecond}> </button>
            <button className="homeNewsDotButton" id={third} onClick={onClickThird}> </button>
            <button className="homeNewsDotButton" id={fourth} onClick={onClickFourth}> </button>
            <button className="homeNewsDotButton" id={fifth} onClick={onClickFifth}> </button>
        </div>
    )

}

export default HomeNewsDots