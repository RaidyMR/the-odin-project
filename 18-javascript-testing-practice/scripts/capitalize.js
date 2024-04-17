function capitalize(string) {
    let firstLetter = string[0].toUpperCase();
    let restOfString = string.slice(1);
    return firstLetter + restOfString;
}

export default capitalize;