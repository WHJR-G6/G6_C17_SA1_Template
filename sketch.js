//boilerplate
// create constants for game states and intialize gmae state


var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;
var gameOver,restart;
var gameOverImg,restartImg;
var jumpSound , checkPointSound, dieSound

function preload(){

  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground.png");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,150);
  trex.addAnimation("trex_running",trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  gameOver = createSprite(300,70);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300,120);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  invisibleGround = createSprite(300,185,600,5);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
 
}

function draw() {
  background(255);
  //displaying score
  text("Score: " + score, 500,50);
  trex.collide(invisibleGround); 

  if(gameState === PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    console.log(trex.y);
    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space") && trex.y>158){
      trex.velocityY = -13;
    }
    trex.velocityY = trex.velocityY + 0.8;

    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    //When trex touches obstacles update gamestate to END
    

  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    // change trex animation to collided
    // Set velocity of cloud and obstacles group to 0 and lifetime to -1
    


    //if mouse is pressed over restart call reset function 
  }
  
  drawSprites();
}

function reset(){
  // Change trex animation

  // hide gameOver and restart sprites

  //destroy clouds and obstacles group, change gameState and restart score
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 == 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //adjust the depth
    trex.depth = cloud.depth + 1;
    
    //adding cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 80 == 0) {
    obstacle = createSprite(600,165,40,10);
    r = Math.round(random(1,6));
    switch(r){
      case 1 : obstacle.addImage(obstacle1);
      break;
      case 2 : obstacle.addImage(obstacle2);
      break;
      case 3 : obstacle.addImage(obstacle3);
      break;
      case 4 : obstacle.addImage(obstacle4);
      break;
      case 5 : obstacle.addImage(obstacle5);
      break;
      case 6 : obstacle.addImage(obstacle6);
      break;
      default: break;

    }
    obstacle.scale = 0.4;
    obstacle.velocityX = -5;
    
    //adjust the depth
    trex.depth = cloud.depth + 1;
    
    //adding cloud to the group
    obstaclesGroup.add(obstacle);
  }
}
