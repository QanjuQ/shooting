const Shooter = function(top,left){
  this.top = top;
  this.left = left;
  this.right = left + 150;
  this.noOfBombersShot = 0;
  this.noOfBombsShot = 0;
  this.bullets = {};
  this.bulletIndex = -1;
};

Shooter.prototype.moveRight = function(){
  if(this.left == 1200){
    this.right = this.left + 150;
    return this.left;
  }
  this.right -= 40;
  return this.left += 40;
};

Shooter.prototype.moveLeft = function(){
  if(this.left == 0){
    this.right = this.left + 150;
    return this.left;
  }
  this.right -= 40;
  return this.left -= 40;
};

Shooter.prototype.shoot = function(){
  this.bullets[++this.bulletIndex] = new Bullet(this.top,this.left);
};

Shooter.prototype.isBombed = function(bomb){
  return this.didBombHitFromTop(bomb) && this.didHitLeft(bomb) ||
      this.didHitRight(bomb);
};

Shooter.prototype.didHitLeft = function(bomb){
  let diff = this.left - bomb.left;
  return diff >= -5 && diff <= 100;
};

Shooter.prototype.didHitRight = function(bomb){
  let diff = this.right - bomb.right;
  return diff <= 100 && diff >= -5;
};

Shooter.prototype.didBombHitFromTop = function(bomb){
  return bomb.bottom >= this.top;
};

Shooter.prototype.areBulletsOver = function(){
  return this.bulletIndex - this.noOfBombersShot == 11;
};

Shooter.prototype.getBullet = function(){
  return this.bullets[this.bulletIndex];
};
