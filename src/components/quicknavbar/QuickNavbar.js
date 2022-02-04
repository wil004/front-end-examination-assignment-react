import React from "react";
import {useHistory} from "react-router-dom";
import './QuickNavbar.css'

function QuickNavbar ({setNavData, setUserInput, array, url1, url3, classNameNavButton, quickNavClassName}) {

const history = useHistory();

       for (let i = 0; i < array.length; i++) {
           if (array[i].length > 15) {
                 array[i] = array[i].split(' ')[0] + ' ' + array[i].split(' ')[1];
                 if (array[i].length > 15) {
                     array[i] = array[i].split(' ')[0];
                 }
         }
       }

    return(
        <div className={quickNavClassName}>
            {array.length > 0 && <button onClick={() => {setNavData(array[0]); history.push(`/${url1}/${array[0]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[0].charAt(0).toUpperCase() + array[0].slice(1)}</button>}
            {array.length > 1 && <button onClick={() => {setNavData(array[1]); history.push(`/${url1}/${array[1]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[1].charAt(0).toUpperCase() + array[1].slice(1)}</button>}
            {array.length > 2 && <button onClick={() => {setNavData(array[2]); history.push(`/${url1}/${array[2]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[2].charAt(0).toUpperCase() + array[2].slice(1)}</button>}
            {array.length > 3 && <button onClick={() => {setNavData(array[3]); history.push(`/${url1}/${array[3]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[3].charAt(0).toUpperCase() + array[3].slice(1)}</button>}
            {array.length > 4 && <button onClick={() => {setNavData(array[4]); history.push(`/${url1}/${array[4]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[4].charAt(0).toUpperCase() + array[4].slice(1)}</button>}
            {array.length > 5 && <button onClick={() => {setNavData(array[5]); history.push(`/${url1}/${array[5]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[5].charAt(0).toUpperCase() + array[5].slice(1)}</button>}
            {array.length > 6 && <button onClick={() => {setNavData(array[6]); history.push(`/${url1}/${array[6]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[6].charAt(0).toUpperCase() + array[6].slice(1)}</button>}
            {array.length > 7 && <button onClick={() => {setNavData(array[7]); history.push(`/${url1}/${array[7]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[7].charAt(0).toUpperCase() + array[7].slice(1)}</button>}
            {array.length > 8 && <button onClick={() => {setNavData(array[8]); history.push(`/${url1}/${array[8]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[8].charAt(0).toUpperCase() + array[8].slice(1)}</button>}
            {array.length > 9 && <button onClick={() => {setNavData(array[9]); history.push(`/${url1}/${array[9]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[9].charAt(0).toUpperCase() + array[9].slice(1)}</button>}
            {array.length > 10 && <button onClick={() => {setNavData(array[10]); history.push(`/${url1}/${array[10]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[10].charAt(0).toUpperCase() + array[10].slice(1)}</button>}
            {array.length > 11 && <button onClick={() => {setNavData(array[11]); history.push(`/${url1}/${array[11]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[11].charAt(0).toUpperCase() + array[11].slice(1)}</button>}
            {array.length > 12 && <button onClick={() => {setNavData(array[12]); history.push(`/${url1}/${array[12]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[12].charAt(0).toUpperCase() + array[12].slice(1)}</button>}
            {array.length > 13 && <button onClick={() => {setNavData(array[13]); history.push(`/${url1}/${array[13]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[13].charAt(0).toUpperCase() + array[13].slice(1)}</button>}
            {array.length > 14 && <button onClick={() => {setNavData(array[14]); history.push(`/${url1}/${array[14]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[14].charAt(0).toUpperCase() + array[14].slice(1)}</button>}
            {array.length > 15 && <button onClick={() => {setNavData(array[15]); history.push(`/${url1}/${array[15]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[15].charAt(0).toUpperCase() + array[15].slice(1)}</button>}
            {array.length > 16 && <button onClick={() => {setNavData(array[16]); history.push(`/${url1}/${array[16]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[16].charAt(0).toUpperCase() + array[16].slice(1)}</button>}
            {array.length > 17 && <button onClick={() => {setNavData(array[17]); history.push(`/${url1}/${array[17]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[17].charAt(0).toUpperCase() + array[17].slice(1)}</button>}
            {array.length > 18 && <button onClick={() => {setNavData(array[18]); history.push(`/${url1}/${array[18]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[18].charAt(0).toUpperCase() + array[18].slice(1)}</button>}
            {array.length > 19 && <button onClick={() => {setNavData(array[19]); history.push(`/${url1}/${array[19]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[19].charAt(0).toUpperCase() + array[19].slice(1)}</button>}
            {array.length > 20 && <button onClick={() => {setNavData(array[20]); history.push(`/${url1}/${array[20]}/${url3}`); setUserInput('');}} className={classNameNavButton}>{array[20].charAt(0).toUpperCase() + array[20].slice(1)}</button>}
        </div>
    )


}

export default QuickNavbar