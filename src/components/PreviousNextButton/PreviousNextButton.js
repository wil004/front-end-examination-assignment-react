import React from "react";
import './PreviousNextButton.css'

function PreviousNextButton ({onClickPrevious, onClickNext, disabledPrevious, disabledNext, classNamePrevious, classNameNext,
                             content,content2, className}) {
    return (
        <div className={className}>
            <button className={classNamePrevious} onClick={onClickPrevious} disabled={disabledPrevious}>{'<'}</button>
            {content}
            {content2}
            <button className={classNameNext} onClick={onClickNext} disabled={disabledNext}>{'>'}</button>
        </div>
    )
}

export default PreviousNextButton