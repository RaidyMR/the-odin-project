import Gameboard from "../assets/scripts/gameboard";

test('initializeBoard returns a 10x10 board', () => {
    const gameboard = new Gameboard('human');
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
});

test('initializeShip returns an object with ships for human', () => {
    const gameboard = new Gameboard('human');
    expect(Object.keys(gameboard.ships).length).toBe(5);
});

test('initializeShip  placed carrier horizontally', () => {
    const gameboard = new Gameboard('human');
    gameboard.placeShip('carrier', [0, 0], 'horizontal');
    
    for (let i = 0; i < 5; i++) {
        expect(gameboard.board[0][i]).toBe('carrier');
    }
});

test('initializeShip placed battleship vertically', () => {
    const gameboard = new Gameboard('human');
    expect(gameboard.placeShip('battleship', [6, 0], 'vertical')).toBe(true);


    for (let i = 6; i < 9; i++) {
        expect(gameboard.board[i][0]).toBe('battleship');
    }
});

test('initializeShip placed constraint', () => {
    const gameboard = new Gameboard('human');
    expect(gameboard.placeShip('carrier', [0, 0], 'horizontal')).toBe(true);
    expect(gameboard.placeShip('battleship', [0, 0], 'horizontal')).toBe(false);
    expect(gameboard.placeShip('battleship', [-1, 10], 'vertical')).toBe(false);

});

test('initializeShip returns an object with ships for computer with placed ships randomly', () => {
    const gameboard = new Gameboard('computer');
    expect(gameboard.board.flat().filter(cell => cell !== null).length).toBe(17);
});

test('receiveAttack returns "miss" when attack missed and remembers it', () => {
    const gameboard = new Gameboard('human');
    gameboard.placeShip('carrier', [0, 0], 'horizontal');
    expect(gameboard.receiveAttack([1, 0])).toBe('miss');
    expect(gameboard.receiveAttack([1, 1])).toBe('miss');
    expect(gameboard.board.flat().filter(cell => cell === 'miss').length).toBe(2);
});

test('receiveAttack returns "hit" when attack hit', () => {
    const gameboard = new Gameboard('human');
    gameboard.placeShip('carrier', [0, 0], 'horizontal');
    expect(gameboard.receiveAttack([0, 1])).toBe('hit');
});

test('receiveAttack returns true when attack sunk the ship', () => {
    const shipName = 'destroyer';
    const gameboard = new Gameboard('human');
    gameboard.placeShip(shipName, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);    
    expect(gameboard.receiveAttack([0, 1])).toBe(`${shipName} sunk`);
});

test('allShipsPlaced returns false when not all ships are placed', () => {
    const gameboard = new Gameboard('human');
    expect(gameboard.allShipsPlaced()).toBe(false);
});

test('allShipsPlaced returns true when all ships are placed', () => {
    const gameboard = new Gameboard('human');
    gameboard.placeShip('carrier', [0, 0], 'horizontal');
    gameboard.placeShip('battleship', [1, 0], 'horizontal');
    gameboard.placeShip('cruiser', [2, 0], 'horizontal');
    gameboard.placeShip('submarine', [3, 0], 'horizontal');
    gameboard.placeShip('destroyer', [4, 0], 'horizontal');

    
    expect(gameboard.allShipsPlaced()).toBe(true);
});

test('allShipsSunk returns false when not all ships are sunk', () => {
    const gameboard = new Gameboard('human');
    gameboard.placeShip('carrier', [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);

    expect(gameboard.allShipsSunk()).toBe(false);
});

test('allShipsSunk returns true when all ships are sunk', () => {
    const ships = [
        {
            name: 'carrier',
            length: 5
        },
        {
            name: 'battleship',
            length: 4
        },
        {
            name: 'cruiser',
            length: 3
        },
        {
            name: 'submarine',
            length: 3
        },
        {
            name: 'destroyer',
            length: 2
        }
    ];

    const gameboard = new Gameboard('human');
    for (let i = 0 ; i < ships.length; ++i) {
        gameboard.placeShip(ships[i].name, [i, 0], 'horizontal');
        for (let j = 0; j < ships[i].length; ++j) {
            gameboard.receiveAttack([i, j]);
        }
    }

    expect(gameboard.allShipsSunk()).toBe(true);
});

