export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        if (this.isSunk()) {
            throw new Error("Can't hit sunken ship");
        }
        this.hits++;
    }

    isSunk() {
        return this.hits === this.length;
    }
}