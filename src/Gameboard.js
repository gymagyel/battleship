export default class Gameboard {
  constructor() {
    this.ships = [];
      this.missedAttacks = [];
  }

  placeShip(ship, x, y) {
    this.ships.push(
        {ship,
            x,
            y,
        });
  }

  receiveAttack(x, y) {
    const target = this.ships.find(
      (shipData) => shipData.x === x && shipData.y === y
    );

    if (target) {
      target.ship.hit();
    } else {
        this.missedAttacks.push ({x ,y })
    }
  }

  allShipsSunk() {
  return this.ships.every((shipData) =>
    shipData.ship.isSunk()
  );
}


}