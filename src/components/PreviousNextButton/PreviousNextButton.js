import React from "react";
import './PreviousNextButton.css'

function PreviousNextButton ({onClickPrevious, onClickNext, disabledPrevious, disabledNext, classNamePrevious, classNameNext,
                             content, className}) {
    return (
        <div className={className}>
            <button className={classNamePrevious} onClick={onClickPrevious} disabled={disabledPrevious}>{'<'}</button>
            {content}
            <button className={classNameNext} onClick={onClickNext} disabled={disabledNext}>{'>'}</button>
        </div>
    )
}

export default PreviousNextButton