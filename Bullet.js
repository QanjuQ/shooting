const Bullet = function(top,left){
  this.top = top;
  this.left = left;
  this.right = this.left + 100;
  this.bulletInterval = null;
};

Bullet.prototype.move = function(){
  if(this.stop()){
    return false;
  }
  return this.top -= 15;
};

Bullet.prototype.stop = function(){
  if(this.top <= 0){
    clearInterval(this.bulletInterval);
    return true;
  }
};

Bullet.prototype.stopBullet = function(){
  clearInterval(this.bulletInterval);
  this.bulletInterval = null;
};
