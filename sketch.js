var trex ,trex_running;
var ground;
var score = 0;
var gameState = "play";
var cloudsGroup;
var obstaclesGroup;
var restart, restartImg;
var gameOver, gameOverImg;
var trex_collided;
var jump
var die
var checkpoint

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex1.png");

groundImage = loadImage("ground2.png")

cloudimg = loadImage("cloud.png")


obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

trex_collided = loadAnimation("trex_collided.png")

checkpoint = loadSound("checkpoint.mp3");
die = loadSound("die.mp3");
jump = loadSound("jump.mp3");

jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkpointSound = loadSound("checkpoint.mp3")
}

function setup(){
  //createCanvas(600,200)
  createCanvas(windowWidth, windowHeight);

 //trex = createSprite(50,180, 20, 40);
 trex=createSprite(50,height-20,20,50);
trex.addAnimation("running",trex_running);
trex.scale = 0.5;

//ground = createSprite(200,180, 400, 20);
ground=createSprite(200,height-20,400,20);
ground.addImage(groundImage);

//invisibleGround = createSprite(200, 190, 400, 10);
invisibleGround = createSprite(200, height-10, 400, 10);
invisibleGround.visible = false;

cloudsGroup = new Group();
obstaclesGroup = new Group();

//gameOver = createSprite(300, 110);
gameOver=createSprite(width/2, height/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;

//restart = createSprite(300, 140);
restart = createSprite(width/2, height/2 +40);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

trex.setCollider("circle", 0, 0, 40);

trex.addAnimation("collided", trex_collided);

}

function draw(){
  background(197);

  if(gameState == "play"){
    ground.velocityX = -4;
  
    text("Puntuación: "+ Math.round(score), 500, 50);
  
    score = score + 0.1;
  
    if((keyDown("space") || touches.lenght>0) && trex.y >= height-60) {
      trex.velocityY = -12;
    jumpSound.play();
    touches = [];
    }
  
    if(ground.x<0){
      ground.x = ground.width/2;
    }
   
    spawnClouds();
    spawnObstacles();


    if(Math.round(score)>0 && Math.round(score)%100== 0){
      checkpointSound.play();
    }

    if(score%100 == 0){
      checkpointSound.play();
    }

    if(obstaclesGroup.isTouching(trex))

{

  gameState = "end";
  dieSound.play();
    }
  }
  if(gameState == "end"){
    text("Puntuación: "+ Math.round(score), 500, 50);
  
    gameOver.visible = true;
    restart.visible = true;
  ground.velocityX = 0;
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setLifetimeEach(-1);
obstaclesGroup.setLifetimeEach(-1);

trex.changeAnimation("collided", trex_collided);

if(mousePressedOver(restart) || touches.lenght>0){
  console.log("Reinicio");
  reset();
}touches= [];

  }

console.log(trex.y);

trex.velocityY = trex.velocityY + 0.8;
trex.collide(invisibleGround);

drawSprites();
}

function reset(){
  gameState = "play";
  score = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running");
  restart.visible = false;
  gameOver.visible = false;
}

function spawnClouds(){

if(frameCount% 50=== 0){

 // cloud = createSprite(600, 80, 40, 20);
 cloud = createSprite(width,100,40,10);

numAl = Math.round(random(20, 150));
cloud.y = Math.round(random(10,height-100));

  cloud.velocityX = -10;
  
  cloud.addImage(cloudimg);
  cloud.scale = 0.7

  trex.depth = cloud.depth;
  trex.depth = trex.depth +1;

  cloud.lifetime = 65;

cloudsGroup.add(cloud);
  }


}  

function spawnObstacles(){

  var obstacle = createSprite(width,height-35,10,40);

  if(frameCount% 60=== 0){
  
    //var obstacle = createSprite (700,170,20,40);
    obstacle.velocityX = -6

    var dado = Math.round(random(1,6));

switch(dado){
  case 1: obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  case 3: obstacle.addImage(obstacle3);
  break;
  case 4: obstacle.addImage(obstacle4);
  break;
  case 5: obstacle.addImage(obstacle5);
  break;
  case 6: obstacle.addImage(obstacle6);
  break;
default:
  break;

  }

obstacle.scale = 0.5;
obstacle.lifetime = 200;
obstaclesGroup.add(obstacle);
}

}