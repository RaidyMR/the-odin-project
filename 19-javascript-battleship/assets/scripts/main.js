import Player from './player.js';
import * as Interface from './interface.js';

const human = new Player('human');
const computer = new Player('computer');

let shipName;
let isGameStarted = false;
let isGameOver = false;
let direction = 'vertical';

const displayHumanBoard = document.getElementsByClassName('board')[0];
const displayComputerBoard = document.getElementsByClassName('board')[1];
const messages = document.querySelector('.messages');

const carrier = document.querySelector('.carrier');
const battleship = document.querySelector('.battleship');
const cruiser = document.querySelector('.cruiser');
const submarine = document.querySelector('.submarine');
const destroyer = document.querySelector('.destroyer');

const begin = document.querySelector('#begin');
const reset = document.querySelector('#reset');

const logMessage = Interface.createMessageLogger(messages);

document.addEventListener('DOMContentLoaded', () => {
    Interface.createBoard(human.gameboard.board, displayHumanBoard, 'human');
    Interface.createBoard(computer.gameboard.board, displayComputerBoard, 'computer');

    carrier.addEventListener('mousedown', Interface.dragAndDrop);
    battleship.addEventListener('mousedown', Interface.dragAndDrop);
    cruiser.addEventListener('mousedown', Interface.dragAndDrop);
    submarine.addEventListener('mousedown', Interface.dragAndDrop);
    destroyer.addEventListener('mousedown', Interface.dragAndDrop);

    carrier.addEventListener('mousedown', () => {
        shipName = 'carrier';
    });
    
    battleship.addEventListener('mousedown', () => {
        shipName = 'battleship';
    });
    
    cruiser.addEventListener('mousedown', () => {
        shipName = 'cruiser';
    });
    
    submarine.addEventListener('mousedown', () => {
        shipName = 'submarine';
    });
    
    destroyer.addEventListener('mousedown', () => {
        shipName = 'destroyer';
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'r') {
            switch (direction) {
                case 'vertical':
                    direction = 'horizontal';
                    break;
                case 'horizontal':
                    direction = 'vertical';
                    break;
            }
        }
    });

    displayHumanBoard.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isGameOver) return;
        const startingPoint = Interface.readCoords(e.target);
        if (human.gameboard.placeShip(shipName, startingPoint, direction)) {
            Interface.createBoard(human.gameboard.board, displayHumanBoard, 'human');
            if (shipName === 'carrier' && human.gameboard.board.flat().filter(cell => cell === 'carrier').length === 5) {
                carrier.classList.add('placed');
            } else if (shipName === 'battleship' && human.gameboard.board.flat().filter(cell => cell === 'battleship').length === 4) {
                battleship.classList.add('placed');
            } else if (shipName === 'cruiser' && human.gameboard.board.flat().filter(cell => cell === 'cruiser').length === 3) {
                cruiser.classList.add('placed');
            } else if (shipName === 'submarine' && human.gameboard.board.flat().filter(cell => cell === 'submarine').length === 3) {
                submarine.classList.add('placed');
            } else if (shipName === 'destroyer' && human.gameboard.board.flat().filter(cell => cell === 'destroyer').length === 2) {
                destroyer.classList.add('placed');
            }
        } else {
            logMessage('Invalid move');
        }

        shipName = undefined;
        direction = 'vertical';
    });

    displayComputerBoard.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isGameStarted) return;
        if (e.target instanceof HTMLDivElement) {
            const coords = Interface.readCoords(e.target);
            try {
                human.makeMove(coords);
            } catch (error) {
                logMessage(error.message);
                return;
            }

            let attackResult = computer.gameboard.receiveAttack(coords);
            Interface.createBoard(computer.gameboard.board, displayComputerBoard, 'computer');
            if (attackResult === 'hit' || attackResult === 'miss') {
                logMessage(
                    `<span>
                    Player:
                    </span>
                    ${attackResult}`,
                );
            } else {
                logMessage(
                    `<span>
                    Bot's ${attackResult}
                    </span>`,
                );
            }

            if (computer.gameboard.allShipsSunk()) {
                logMessage(
                    `<span>
                    Player WINS!
                    </span>`,
                );
                isGameStarted = false;
                isGameOver = true;
                return;
            }

            const botCoords = computer.randomMove();
            attackResult = human.gameboard.receiveAttack(botCoords);
            Interface.createBoard(human.gameboard.board, displayHumanBoard, 'human');
            if (attackResult === 'hit' || attackResult === 'miss') {
                logMessage(
                    `<span>
                    Bot:
                    </span>
                    ${attackResult}`,
                );
            } else {
                logMessage(
                    `<span>
                    Player's ${attackResult}
                    </span>`,
                );
            }
            
            if (human.gameboard.allShipsSunk()) {
                logMessage(
                    `<span>
                    Bot WINS!
                    </span>`,
                );
                isGameStarted = false;
                isGameOver = true;
            }
        }   
    });

    begin.addEventListener('click', () => {
        if (isGameOver) return;
        if (human.gameboard.isReadyToPlay()) {
            isGameStarted = true;            
            begin.toggleAttribute('disabled');
            carrier.removeEventListener('mousedown', Interface.dragAndDrop);
            battleship.removeEventListener('mousedown', Interface.dragAndDrop);
            cruiser.removeEventListener('mousedown', Interface.dragAndDrop);
            submarine.removeEventListener('mousedown', Interface.dragAndDrop);
            destroyer.removeEventListener('mousedown', Interface.dragAndDrop);

            logMessage('Game started');
        } else {
            logMessage('Place all ships on the board');
        }
    });

    reset.addEventListener('click', () => {
        location.reload();
    });
    
}); 