const Bomber = function(top,left){
  this.top = top;
  this.left = left;
  this.right = this.left + 150;
  this.bottom = this.top + 150;
  this.bomberInterval = null;
  this.isHit = 0;
};

Bomber.prototype.moveLeft = function(){
  if(this.left <= -200){
    this.right = 1200 + 150;
    return this.left = 1200;
  }
  this.right = this.left -= 5;
  return this.left -= 5;
};

Bomber.prototype.moveRight = function(){
  if(this.left >= 1200){
    this.right = -50;
    return this.left = -200;
  }
  this.right = this.left += 8;
  return this.left += 8;
};

Bomber.prototype.isShot = function(index,bullet){
  if(this.didHitAtBottom(bullet.top) && this.isHit == 0){
    return this.isHit = 1 &&
      this.didBulletHit(index,this.left,bullet.left)
      || this.didBulletHit(index,this.right,bullet.right);
  };
};

Bomber.prototype.didHitAtBottom = function(bulletTop){
  return bulletTop <= this.bottom && bulletTop >= this.top;
};

Bomber.prototype.didBulletHit = function(index,side,bulletSide){
  let diff = side - bulletSide;
  if(index == 1){
    return diff >= -100 && diff <= 10;
  }
  return diff >= -10 && diff <= 150;
};

Bomber.prototype.stop = function(){
  clearInterval(this.bomberInterval);
  this.bomberInterval = null;
};
