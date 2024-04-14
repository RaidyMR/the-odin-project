class HashMap {
    constructor() {
        this.buckets = new Array(16);
        this.PRIMENUMBER = 17;
        this.LOADFACTOR = 0.75;
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        key = key.toString();
        for (let i = 0; i < key.length; i++) {
            hashCode = (key.charCodeAt(i) * i * this.PRIMENUMBER + hashCode) % this.buckets.length;
        }
        return hashCode;
    }

    set(key, value) {

        if (this.findMatchingIndex(key) === -1) {
            this.size++
        }
        let index = this.findEmptyOrMatchingIndex(key);
        this.buckets[index] = { key, value };

        // Check if resizing is needed
        if (this.length() > this.buckets.length * this.LOADFACTOR) {
            // Create a new array with double the size
            const newSize = this.buckets.length * 2;
            const newBuckets = new Array(newSize);
            const tempBuckets = this.buckets;
            this.buckets = newBuckets;

            // Rehash and reinsert each key-value pair
            for (let i = 0; i < tempBuckets.length; i++) {
                if (tempBuckets[i] !== undefined) {
                    let { key, value } = tempBuckets[i];
                    let newIndex = this.hash(key);
                    while (this.buckets[newIndex] !== undefined) {
                        if (newIndex == this.buckets.length-1) {
                            newIndex = 0
                        }
                        else { newIndex = newIndex + 1 }; // Handle collisions
                    }
                    this.buckets[newIndex] = { key, value };
                }
            }
        }
    }

    get(key) {

        // takes one argument as a key and returns the value that
        // is assigned to this key. 
        // If a key is not found, return null.

        let index = this.findMatchingIndex(key);
        return this.buckets[index] ? this.buckets[index].value : null;
    }

    has(key) {

        // takes a key as an argument and returns true 
        // or false based on whether or not the key is in the hash map.

        return this.findMatchingIndex(key) !== -1;
    }

    remove(key) {

        // takes a key as an argument. If the given key is in the hash map, 
        // it should remove the entry with that key and return true. 
        // If the key isn’t in the hash map, it should return false.

        let index = this.findMatchingIndex(key);
        if (index !== -1) {
            this.buckets[index] = undefined;
            this.size--;
            return true;
        }
        return false;
    }

    findEmptyOrMatchingIndex(key) {
        let startIndex = this.hash(key);
        let index = startIndex;
        do {
            if (this.buckets[index] === undefined || this.buckets[index].key === key) {
                return index;
            }
            index = (index + 1) % this.buckets.length;
        } while (index !== startIndex);
    }

    findMatchingIndex(key) {
        const startIndex = this.hash(key);
        let index = startIndex;
        do {
            if (this.buckets[index] && this.buckets[index].key === key) {
                return index;
            }
            index = (index + 1) % this.buckets.length;
        } while (index !== startIndex);
        return -1;
    }

    length() {
        // returns the number of stored keys in the hash map. 

        return this.size;
    }

    clear() {

        //removes all entries in the hash map.

        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = undefined;
        }
    }

    keys() {
        // returns an array containing all the keys inside the hash map.
        let keysArray = []
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                keysArray.push(this.buckets[i].key)
            }
        }
        return keysArray;
    }

    values() {
        // returns an array containing all the keys inside the hash map.
        let valuesArray = []
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                valuesArray.push(this.buckets[i].value)
            }
        }
        return valuesArray;
    }

    entries() {
        let entriesArray = []
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                entriesArray.push(this.buckets[i])
            }
        }
        return entriesArray;
    }

    get getBuckets() {
        return this.buckets;
    }
}

let firstHash = new HashMap;

firstHash.set(14, 11);
firstHash.set(15, 12);
firstHash.set(16, 13);
firstHash.set(17, 14);
firstHash.set(18, 15);
firstHash.set(19, 16);
firstHash.set(20, 17);
firstHash.set(21, 18);
firstHash.set(44, 19);
firstHash.set(45, 20);
firstHash.set(46, 21);
firstHash.set(47, 22);
firstHash.set(48, 23);
firstHash.set(49, 24);
firstHash.set(50, 25);  
firstHash.set(51, 26);
firstHash.set(52, 27);
firstHash.set(53, 28);
firstHash.set(54, 29);

console.log(firstHash.getBuckets);
console.log(firstHash.get(14));
console.log(firstHash.get(15));
console.log(firstHash.get(16));
console.log(firstHash.get(17));
console.log(firstHash.get(18));
console.log(firstHash.get(44));
console.log(firstHash.get(45));
console.log(firstHash.get(46));
console.log(firstHash.get(47));
console.log(firstHash.get(48));
console.log(firstHash.get(49));

