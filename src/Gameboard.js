import Ship from './Ship.js';

export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.hitAttacks = [];
  }

  placeShip(ship, x, y, direction = 'horizontal') {
  const coordinates = [];

  for (let i = 0; i < ship.length; i++) {
    if (direction === 'horizontal') {
      coordinates.push({
        x: x + i,
        y,
      });
    } else {
      coordinates.push({
        x,
        y: y + i,
      });
    }
  }
const outsideBoard = coordinates.some(
  (coord) =>
    coord.x < 0 ||
    coord.x > 9 ||
    coord.y < 0 ||
    coord.y > 9
);

if (outsideBoard) {
  return;
}
  const overlapExists = coordinates.some((newCoord) =>
  this.ships.some((existingShip) =>
    existingShip.coordinates.some(
      (existingCoord) =>
        existingCoord.x === newCoord.x &&
        existingCoord.y === newCoord.y
    )
  )
);

if (overlapExists) {
  return;
}

  this.ships.push({
    ship,
    coordinates,
  });
}

receiveAttack(x, y) {
  const alreadyMissed = this.missedAttacks.some(
    (attack) => attack.x === x && attack.y === y
  );

  const alreadyHit = this.hitAttacks.some(
    (attack) => attack.x === x && attack.y === y
  );

  if (alreadyMissed || alreadyHit) {
    return;
  }

const target = this.ships.find((shipData) =>
  shipData.coordinates.some(
    (coord) => coord.x === x && coord.y === y
  )
);

  if (target) {
    target.ship.hit();

    this.hitAttacks.push({ x, y });
  } else {
    this.missedAttacks.push({ x, y });
  }
}
  allShipsSunk() {
    return this.ships.every((shipData) =>
      shipData.ship.isSunk()
    );
  }

  randomizeShips() {
  const shipLengths = [5, 4, 3, 3, 2];

  shipLengths.forEach((length) => {
    let placed = false;

    while (!placed) {
      const ship = new Ship(length);

      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      const direction =
        Math.random() < 0.5
          ? 'horizontal'
          : 'vertical';

      const shipsBefore = this.ships.length;

      this.placeShip(ship, x, y, direction);

      if (this.ships.length > shipsBefore) {
        placed = true;
      }
    }
  });
}


}

