import Gameboard from './Gameboard.js';

export default class Player {
  constructor(isComputer = false) {
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
      this.previousAttacks = [];
  }

  attack(enemy, x, y){
    enemy.gameboard.receiveAttack(x, y);
  }

  randomAttack(enemy) {
  let x;
  let y;
  let alreadyAttacked = true;

  while (alreadyAttacked) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);

    alreadyAttacked = this.previousAttacks.some(
      (attack) => attack.x === x && attack.y === y
    );
  }

  this.previousAttacks.push({ x, y });

  this.attack(enemy, x, y);
}
}