import Ship from './ship.js';

const BOARD_SIZE = 10;
const SHIPS_DATA = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
};

export default class Gameboard {
    constructor(player) {
        this.board = this.initializeBoard();
        this.ships = this.initializeShips(player);
        this.shipsSunk = 0;
        this.isReady = false;
    }

    initializeBoard() {
        return Array(BOARD_SIZE).fill(null)
        .map(() => new Array(BOARD_SIZE).fill(null));;
    }

    initializeShips(player) {
        const ships = {};

        for (const ship in SHIPS_DATA) {
            ships[ship] = new Ship(SHIPS_DATA[ship]);

            if (player === 'computer') {
                let x, y, direction;
                do {
                    x = Math.floor(Math.random() * BOARD_SIZE);
                    y = Math.floor(Math.random() * BOARD_SIZE);
                    direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                } while (!this.placeShip(ship, [x, y], direction));
            }
        }

        
        
        return ships;
    }

    placeShip(ship, move, direction) {
        const shipCoordinates = [];
        const x = move[0], y = move[1];      

        for (let i = 0; i < SHIPS_DATA[ship]; i++) {
            const newX = direction === 'vertical' ? x + i : x;
            const newY = direction === 'horizontal' ? y + i : y;

            if (newX >= BOARD_SIZE || newY >= BOARD_SIZE || newX < 0 || newY < 0 || this.board[newX][newY] !== null) {
                return false;
            }

            shipCoordinates.push([newX, newY]);
        }

        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (this.board[i][j] === ship) {
                    this.board[i][j] = null;
                }
            }
        }  

        shipCoordinates.forEach(([x, y]) => {
            this.board[x][y] = ship;
        });

        return true;
    }

    receiveAttack(coords) {
        const x = coords[0], y = coords[1];
        if (this.board[x][y] === 'miss' || this.board[x][y] === 'hit') {
            return;
        }

        if (this.board[x][y] === null) {
            this.board[x][y] = 'miss';
            return 'miss';
        }

        const ship = this.board[x][y];
        this.ships[ship].hit();
        this.board[x][y] = 'hit';

        if (this.ships[ship].isSunk()) {
            this.shipsSunk++;
            return `${ship} sunk`;
        }

        return 'hit';
    }

    allShipsPlaced() {
        return this.board.flat().filter(cell => cell !== null).length === 17;
    }

    allShipsSunk() {
        return this.shipsSunk === Object.keys(SHIPS_DATA).length;
    }

    isReadyToPlay() {
        if (this.allShipsPlaced()) {
            this.isReady = true;
            return this.isReady;
        }
    }
}