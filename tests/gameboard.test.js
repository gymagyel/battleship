import Gameboard from '../src/Gameboard.js';
import Ship from '../src/Ship.js';

test('gameboard stores placed ships', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship);

  expect(gameboard.ships.length).toBe(1);
});


test('placeShip stores ship coordinates', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, 2, 3);

  expect(gameboard.ships[0]).toEqual({
    ship,
    x: 2,
    y: 3,
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