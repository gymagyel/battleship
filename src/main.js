import Player from './Player.js';
import Ship from './Ship.js';

const player = new Player();
const computer = new Player();
player.gameboard.randomizeShips();
computer.gameboard.randomizeShips();

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
  cell.classList.add('hit');
}
      }

      boardElement.appendChild(cell);
    }
  }
}
function handlePlayerAttack(x, y) {
  player.attack(computer, x, y);

  renderBoards();

  if (computer.gameboard.allShipsSunk()) {
    alert('Player wins!');
    return;
  }

  computer.randomAttack(player);

  renderBoards();

  if (player.gameboard.allShipsSunk()) {
    alert('Computer wins!');
  }
}

function renderBoards() {
  renderBoard(playerBoard, player.gameboard, true);

  renderBoard(
    computerBoard,
    computer.gameboard,
    false,
    handlePlayerAttack
  );
}

const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');

renderBoards(playerBoard, player.gameboard, true);
renderBoards(computerBoard, computer.gameboard);