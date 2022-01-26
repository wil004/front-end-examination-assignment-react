function emailIsValid(email, setterState) {
    let lengteEmailString = email.length - 1;
    if ( email.charAt(lengteEmailString) !== '.' && email.includes('.')
        && email.includes('@') &&
        email.includes(',') === false) {
        return setterState(true);
    }
    else {
        return setterState(false);
    }

}

export default emailIsValid