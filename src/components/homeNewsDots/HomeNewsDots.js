import React from "react";
import './HomeNewsDots.css'

function HomeNewsDots ({first, second, third, fourth, fifth, onClickFirst, onClickSecond,
                       onClickThird, onClickFourth, onClickFifth, className
,disabled, disabled2, disabled3, disabled4, disabled5}) {
    return (
        <div className={className}>
            <button className="homeNewsDotButton" id={first} onClick={onClickFirst} disabled={disabled}> </button>
            <button className="homeNewsDotButton" id={second} onClick={onClickSecond} disabled={disabled2}> </button>
            <button className="homeNewsDotButton" id={third} onClick={onClickThird} disabled={disabled3}> </button>
            <button className="homeNewsDotButton" id={fourth} onClick={onClickFourth} disabled={disabled4}> </button>
            <button className="homeNewsDotButton" id={fifth} onClick={onClickFifth} disabled={disabled5}> </button>
        </div>
    )

}

export default HomeNewsDots