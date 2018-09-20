const Bomb = function(top,left){
  this.top = top;
  this.left = left;
  this.bottom = top + 80;
  this.right = left + 80;
  this.bombInterval = null;
  this.isHit = 0;
};

Bomb.prototype.moveBomb = function(){
  if(!this.explode()){
    this.top += 50;
    this.bottom += 50;
    return true;
  }
};

Bomb.prototype.isShot = function(bullet){
  if(this.didHitAtBottom(bullet.top) && this.isHit == 0){
    return this.isHit = 1 &&
      this.didBulletHit(this.left,bullet.left)
      || this.didBulletHit(this.right,bullet.right);
  };
};

Bomb.prototype.didBulletHit = function(side,bulletSide){
  let diff = side - bulletSide;
  return diff >= -50 && diff <= 10;
};

Bomb.prototype.explode = function(){
  if(this.top > 600){
    this.diffuse();
    return true;
  }
  return false;
};

Bomb.prototype.diffuse = function(){
  clearInterval(this.bombInterval);
};
