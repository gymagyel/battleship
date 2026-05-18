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

test('computer can make an attack', () => {
  const computer = new Player(true);
  const enemy = new Player();

  computer.randomAttack(enemy);

  const totalAttacks =
    enemy.gameboard.missedAttacks.length;

  expect(totalAttacks).toBe(1);
});

test('computer stores previous attacks', () => {
  const computer = new Player(true);
  const enemy = new Player();

  computer.randomAttack(enemy);

  expect(computer.previousAttacks.length).toBe(1);
});

test('computer does not attack same coordinate twice', () => {
  const computer = new Player(true);
  const enemy = new Player();

  jest
    .spyOn(Math, 'random')
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(0.5);

  computer.randomAttack(enemy);
  computer.randomAttack(enemy);

expect(computer.previousAttacks).toEqual([
  { x: 1, y: 1 },
  { x: 5, y: 5 },
]);

  Math.random.mockRestore();
});