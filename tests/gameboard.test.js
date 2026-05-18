import Gameboard from '../src/Gameboard.js';
import Ship from '../src/Ship.js';

test('gameboard stores placed ships', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship);

  expect(gameboard.ships.length).toBe(1);
});


test('placeShip stores single ship coordinate', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(1);

  gameboard.placeShip(ship, 2, 3);

  expect(gameboard.ships[0]).toEqual({
    ship,
    coordinates: [
      { x: 2, y: 3 },
    ],
  });
});

test('receiveAttack hits the correct ship', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, 2, 3);

  gameboard.receiveAttack(2, 3);

  expect(ship.hits).toBe(1);
});

test('receiveAttack stores missed attacks', () => {
  const gameboard = new Gameboard();

  gameboard.receiveAttack(5, 5);

  expect(gameboard.missedAttacks).toContainEqual({
    x: 5,
    y: 5,
  });
});

test('allShipsSunk returns true if all ships are sunk', () => {
  const gameboard = new Gameboard();

  const ship1 = new Ship(1);
  const ship2 = new Ship(2);

  gameboard.placeShip(ship1, 1, 1);
  gameboard.placeShip(ship2, 2, 2);

  ship1.hit();

  ship2.hit();
  ship2.hit();

  expect(gameboard.allShipsSunk()).toBe(true);
});

test('receiveAttack stores successful hits', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(1);

  gameboard.placeShip(ship, 2, 2);

  gameboard.receiveAttack(2, 2);

  expect(gameboard.hitAttacks).toContainEqual({
    x: 2,
    y: 2,
  });
});

test('receiveAttack does not allow duplicate attacks', () => {
  const gameboard = new Gameboard();

  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 1);

  expect(gameboard.missedAttacks.length).toBe(1);
});
test('placeShip stores multiple coordinates horizontally', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, 2, 3, 'horizontal');

  expect(gameboard.ships[0]).toEqual({
    ship,
    coordinates: [
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
    ],
  });
});

test('placeShip stores multiple coordinates vertically', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, 2, 3, 'vertical');

  expect(gameboard.ships[0]).toEqual({
    ship,
    coordinates: [
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 2, y: 5 },
    ],
  });
});

test('placeShip prevents overlapping ships', () => {
  const gameboard = new Gameboard();

  const ship1 = new Ship(3);
  const ship2 = new Ship(2);

  gameboard.placeShip(ship1, 2, 2, 'horizontal');

  gameboard.placeShip(ship2, 3, 2, 'vertical');

  expect(gameboard.ships.length).toBe(1);
});

test('placeShip prevents ships going outside board', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(4);

  gameboard.placeShip(ship, 8, 5, 'horizontal');

  expect(gameboard.ships.length).toBe(0);
});

test('randomizeShips places full fleet', () => {
  const gameboard = new Gameboard();

  gameboard.randomizeShips();

  expect(gameboard.ships.length).toBe(5);
});