var score =0;

var spaceShip, laser, explosion, galaxy, alien;
var spaceShipImg, laserImg, explosionImg, galaxyImg, alienImg;

var laserGroup;
var alienGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  spaceShipImg = loadImage("spaceship.png");
  explosionImg = loadImage("explosion.gif");
  laserImg = loadImage("laser.png");
  galaxyImg= loadImage("galaxy.png");
  alienImg = loadImage("alien.png");
}
function setup() {
  createCanvas(800, 800);
  //galaxy = createSprite(50, 50, windowWidth,windowHeight);
  //galaxy.addImage(galaxyImg);
  
  spaceShip= createSprite(100, height-200, 50,50);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale=0.2;

  //alien= createSprite(100, height/2, 50,50);
  //alien.addImage(alienImg);
  //alien.scale=0.1;
  
  alienGroup = createGroup();   
  laserGroup = createGroup();  
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(galaxyImg);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    spaceShip.x=mouseX

    if (frameCount % 80 === 0) {
      drawAlien();
    }

    if (frameCount % 100 === 0) {
      drawAlien();
    }

    if(keyDown("space")){
      shootLaser();
    }

    if (alienGroup.collide(spaceShip)){
      handleGameover(alienGroup);
    }
    
    
    
    /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision();
    }*/
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    if(alienGroup.collide(laserGroup)){
      handlealienCollision(alienGroup);
    }

    

    drawSprites();
  }
    
  
}

function drawAlien(){
  alien = createSprite(50,50,40,40);
  alien.addImage(alienImg);
  alien.x = Math.round(random(50,750));
  alien.scale = 0.1;
  alien.velocityY = 8;
  alien.lifetime = 400;
  alienGroup.add(alien);
}


function shootLaser(){
  laser= createSprite(150, width/2, 50,20);
  laser.y = spaceShip.y;
  laser.x= spaceShip.x;
  laser.addImage(laserImg);
  laser.scale=0.1;
  laser.velocityY= -7;
  laserGroup.add(laser);
}

function alienCollision(alienGroup){
    if (life > 0) {
       score=score+1;
    }

     explosion= createSprite(laser.x+60, laser.y, 50,50);
    explosion.addImage(explosionImg) 

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    explosion.scale=0.3
    explosion.life=20
    laserGroup.destroyEach()
    alienGroup.destroyEach()
}

function handleGameover(alienGroup){
  
    life=life-1;
    alienGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}
