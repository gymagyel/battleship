export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.hitAttacks = [];
  }

  placeShip(ship, x, y) {
    this.ships.push({
      ship,
      x,
      y,
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

  const target = this.ships.find(
    (shipData) => shipData.x === x && shipData.y === y
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
}

