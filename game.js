class Game {
  constructor(top,left) {
    this.shooter=new Shooter(top,left);
    this.bombers=[];
    this.bombs=[];
    this.bombsIndex=0;
  }
  createBomb(top,left){
    this.bombs.push(new Bomb(top,left))
  }
  getBomber(index){
    return this.bombers[index];
  }
  moveBomber(index){
    if(index == 1) {
      return this.bombers[index].moveLeft();
    }
    return this.bombers[index].moveRight();
  }
}
