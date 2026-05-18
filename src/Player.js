import Gameboard from './Gameboard.js';

export default class Player {
  constructor(isComputer = false) {
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
  }

  attack(enemy, x, y){
    enemy.gameboard.receiveAttack(x, y);
  }
}