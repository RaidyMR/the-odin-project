function caesarCipher(string, key) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let stringArray = string.toLowerCase().split("");

    for (let i = 0; i < stringArray.length; i++) {
        let character = stringArray[i];
        let alphabetIndex = alphabet.indexOf(character);

        if (alphabetIndex === -1) {
        continue;
        }

    let newIndex = (alphabetIndex + key) % 26;
    stringArray[i] = alphabet[newIndex];
}

return stringArray.join("").toUpperCase();
}

export default caesarCipher;