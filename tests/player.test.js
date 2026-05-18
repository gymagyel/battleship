import Player from '../src/Player.js';

test('player has a gameboard', () => {
  const player = new Player();

  expect(player.gameboard).toBeDefined();
});

test('player can be a computer', () => {
  const computer = new Player(true);

  expect(computer.isComputer).toBe(true);
});

import Ship from '../src/Ship.js';

test('player can attack enemy gameboard', () => {
  const player = new Player();
  const enemy = new Player();

  const ship = new Ship(1);

  enemy.gameboard.placeShip(ship, 2, 2);

  player.attack(enemy, 2, 2);

  expect(ship.hits).toBe(1);
});

