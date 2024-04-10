function fibs(n){
    const array = [0, 1];

    for (let i = 2; i < n; i++) {
        array.push(array[i - 1] + array[i - 2]);
    }

    return array;
}

function fibsRec(n, array = [0, 1]){
    if (n <= 0){
        return [];
    }
    else if (n <= 2){
        return array.slice(0, n);
    }
    else{
        if (array.length < n){
            array.push(array[array.length - 1] + array[array.length - 2]);
            return fibsRec(n, array);
        }
        else{
            return array;
        }
    }
}

console.log("fibs: ", fibs(8));
console.log("fibsRec: ", fibsRec(8));