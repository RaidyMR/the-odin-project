import Gameboard from './gameboard.js';

export default class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard(name);
        this.moves = new Set();
    }

    makeMove(move) {
        const moveString = JSON.stringify(move);
        if (this.moves.has(moveString)) {
            throw new Error("Can't play the same move twice");
        }
        this.moves.add(moveString);

        return move;
    }

    randomMove() {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        while (this.moves.has(JSON.stringify(`[${x}, ${y}]`)) === true) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }

        const move = [x, y];

        return this.makeMove(move);
    }
}