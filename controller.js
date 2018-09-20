let game,player,bomber1,bomber2;
const shooterTop = 730;
const shooterLeft = 600;

const generateDropPos = function(max,min){
  let number = Math.random()*(max - min) + min;
  return Math.floor(number)*10;
};

const removeElements = function(elements){
  for(let index = 0; index < elements.length; index++){
    elements[index].remove();
  }
};

const createPlayer = function(top,left){
  player = createElement("shooter");
  // player.style = `position:absolute;top:${top}px;left:${left}px;
  //     height:100px;width:100px;`;
};

const createElement = function(className){
  let element = document.createElement('img');
  element.className = className;
  document.body.appendChild(element);
  return element;
};

const createBombDiv = function() {
  let bombEle = document.createElement('button');
  bombEle.className = 'bomb';
  document.body.appendChild(bombEle);
  return bombEle
};

const createBomb = function(top,left){
  let bomb = createElement('bomb');
  game.createBomb(top+150,left);
  bomb.style.position = "absolute";
  bomb.style.top = `${top+150}px`;
  bomb.style.left = `${left+150}px`;
  dropBomb(bomb);
};

const dropBomb = function(bomb){
  let bombDropped = game.bombs[game.bombsIndex];
  bombDropped.bombInterval = setInterval(function(){
    if(game.shooter.isBombed(bombDropped)){
      return handlePlayerDeath(bomb,bombDropped);
    }
    if(bombDropped.moveBomb()){
      return bomb.style.top = bombDropped.top + "px";
    }
    bomb.src = "bombBlast.png";
    // bomb.setTimeout(function(){
    //   bomb.remove();
    // },500);
    setTimeout(bomb.remove,500);
  },100);
};

const handlePlayerDeath = function(bomb,bombDropped){
  removeElements([bomb]);
  player.src = "playerDied.jpg";
  game.bombers[0].stop();
  game.bombers[1].stop();
  window.onkeydown = "";
  setTimeout(function(){
    player.remove();
    bomber1.remove();
    bomber2.remove();
    document.getElementById('p').innerHTML = `Score:${game.score}
    <br>Bombers:${game.shooter.noOfBombersShot}`;
    game.diffuseBombs();
  },200);
};

const bomberShot = function(index,bomber,bullet,bulletShot){
  bomber.src = "bombBlast.png";
  game.bombers[index].stop();
  game.score += 10;
  game.shooter.noOfBombersShot++;
  setTimeout(function(){bomber.remove()},300);
  setTimeout(function(){
    if(index == 0){
      return bomber1 = createBomber(index,150,-150);
    }
    bomber2 = createBomber(index,0,1200);
  },1000);
  bullet.remove();
};

const shootBullet = function(bullet){
  let bulletShot = game.shooter.getBullet();
  bulletShot.bulletInterval = setInterval(function(){
    if(game.bombers[0].isShot(0,bulletShot)){
      bulletShot.stopBullet();
      bomberShot(0,bomber1,bullet,bulletShot);
    }
    if(game.bombers[1].isShot(1,bulletShot)){
      bulletShot.stopBullet();
      bomberShot(1,bomber2,bullet,bulletShot);
    }
    if(!bulletShot.move()){
      return bullet.remove();
    }
    bullet.style.top = bulletShot.top + "px";
  },50);
};

const createBullet = function(){
  let bullet = createElement("bullet");
  game.shooter.shoot();
  bullet.style.left = `${game.shooter.left}px`;
  shootBullet(bullet);
};

const createBomber = function(index,top,left){
  game.bombers[index] = new Bomber(top,left);
  let bomber = createElement("bomber");
  bomber.id = `bomber${index + 1}`;
  moveBomber(index,bomber);
  return bomber;
};

const moveBomber = function(index,bomber){
  let bomberObj = game.getBomber(index);
  bomberObj.bomberInterval = setInterval(function(){
    game.moveBomber(index);
    let dropBombPos = generateDropPos(10,100);
    bomber.style.left = bomberObj.left + "px";
    if(dropBombPos == bomberObj.left){
      createBomb(bomberObj.top, bomberObj.left);
    }
  },70);
};


//####################################################
//####################################################
let playerActions = {
  ArrowUp: function(){
    if(game.shooter.areBulletsOver()){
      return document.getElementById('p').innerHTML = "wooo!! Bullets are Over"
    }
    return createBullet();
  },

  ArrowRight: function(){
    game.shooter.moveRight();
    return this.move();
  },

  ArrowLeft : function(){
    game.shooter.moveLeft();
    return this.move();
  },

  move : function(){
    return player.style.left = game.shooter.left + "px";
  }
};

let selectAction = function(){
  if(event.key == 's'){
    createBomb(100,100);
  }
  let key = event.key;
  if(playerActions[key]){
    playerActions[key]();
  }

};

const loadGame = function(){
  game = new Game(shooterTop,shooterLeft);
  createPlayer(game.shooter.top, game.shooter.left);
  bomber1 = createBomber(0,150,-250);
  bomber2 = createBomber(1,0,1200);
};

const addListener = function(){
  loadGame();
  window.onkeydown = selectAction;
};

window.onload = addListener;
