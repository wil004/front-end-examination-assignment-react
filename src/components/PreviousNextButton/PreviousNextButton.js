import React from "react";
import './PreviousNextButton.css'

function PreviousNextButton ({onClickPrevious, onClickNext, disabledPrevious, disabledNext, classNamePrevious, classNameNext}) {
    return (
        <div className="PreviousNextButtonContainer">
            <button className={classNamePrevious} onClick={onClickPrevious} disabled={disabledPrevious}>{'<'}</button>
            <button className={classNameNext} onClick={onClickNext} disabled={disabledNext}>{'>'}</button>
        </div>
    )
}

export default PreviousNextButton