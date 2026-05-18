import Player from './Player.js';
import Ship from './Ship.js';

const player = new Player();
const computer = new Player();
let gameOver = false;

let placingShips = true;

const shipLengths = [5, 4, 3, 3, 2];

let currentShipIndex = 0;

let currentDirection = 'horizontal';

computer.gameboard.randomizeShips();



const restartBtn = document.getElementById('restart-btn');

function restartGame() {
  player.gameboard.ships = [];
  player.gameboard.missedAttacks = [];
  player.gameboard.hitAttacks = [];

  computer.gameboard.ships = [];
  computer.gameboard.missedAttacks = [];
  computer.gameboard.hitAttacks = [];

  player.gameboard.randomizeShips();
  computer.gameboard.randomizeShips();

  gameOver = false;

  renderBoards();
}
restartBtn.addEventListener('click', restartGame);

function renderBoard(
  boardElement,
  gameboard,
  showShips = false,
  clickHandler = null
) {
  boardElement.innerHTML = '';

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');

      cell.classList.add('cell');

      const shipExists = gameboard.ships.some(
  (shipData) =>
    shipData.coordinates.some(
      (coord) =>
        coord.x === x && coord.y === y
    )
);

      const missedAttack = gameboard.missedAttacks.some(
        (attack) =>
          attack.x === x && attack.y === y
      );

      const hitAttack = gameboard.hitAttacks.some(
  (attack) =>
    attack.x === x && attack.y === y
);

      if (shipExists && showShips) {
        cell.classList.add('ship');
      }

      if (missedAttack) {
        cell.classList.add('miss');
      }

      if (clickHandler) {
        cell.addEventListener('click', () => {
          clickHandler(x, y);
        });

        if (hitAttack) {
  const sunkShip = gameboard.ships.find(
    (shipData) =>
      shipData.ship.isSunk() &&
      shipData.coordinates.some(
        (coord) =>
          coord.x === x && coord.y === y
      )
  );

  if (sunkShip) {
    cell.classList.add('sunk');
  } else {
    cell.classList.add('hit');
  }
}
      }

      boardElement.appendChild(cell);
    }
  }
}
function handleShipPlacement(x, y) {
  if (!placingShips) {
    return;
  }

  const length = shipLengths[currentShipIndex];

  const shipsBefore =
    player.gameboard.ships.length;

  player.gameboard.placeShip(
    new Ship(length),
    x,
    y,
    currentDirection
  );

  if (
    player.gameboard.ships.length >
    shipsBefore
  ) {
    currentShipIndex++;

    renderBoards();
  }

  if (currentShipIndex >= shipLengths.length) {
    placingShips = false;

    renderBoards();
  }
}

function handlePlayerAttack(x, y) {
  if (gameOver) {
    return;
  }

  player.attack(computer, x, y);

  renderBoards();

  if (computer.gameboard.allShipsSunk()) {
    gameOver = true;

    alert('Player wins!');
    return;
  }

  computer.randomAttack(player);

  renderBoards();

  if (player.gameboard.allShipsSunk()) {
    gameOver = true;

    alert('Computer wins!');
  }
}

function renderBoards() {
  renderBoard(
    playerBoard,
    player.gameboard,
    true,
    placingShips
      ? handleShipPlacement
      : null
  );

  renderBoard(
    computerBoard,
    computer.gameboard,
    false,
    placingShips
      ? null
      : handlePlayerAttack
  );
}

const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');

const rotateBtn =
  document.getElementById('rotate-btn');
rotateBtn.addEventListener('click', () => {
  currentDirection =
    currentDirection === 'horizontal'
      ? 'vertical'
      : 'horizontal';
});
renderBoards(playerBoard, player.gameboard, true);
renderBoards(computerBoard, computer.gameboard);