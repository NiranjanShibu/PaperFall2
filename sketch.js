var plane, planeIMG, planeIMG2;
var bgIMG;
var windIMG;
var rockIMG;
var rockGroup, windGroup;
var score = 0;
var gameState = 0;
var windRate = 100;
var rockRate = 90;
var planeVelo = 0.3;
//var edges;

function preload() {
 
  planeIMG = loadImage("Airplane.png");
  planeIMG2 = loadImage("Airplane2.png");
  bgIMG = loadImage("Background3.jpg");
  windIMG = loadImage("Wind.png");
  rockIMG = loadImage("Rock2.png");
  
}

function setup() {
  createCanvas(950,530); 
  
  plane = createSprite(500, 10, 30, 30);
  plane.addImage(planeIMG2);
  plane.scale = 0.0115;
  plane.velocityY = planeVelo;

  //plane.debug = true;
  plane.setCollider("rectangle", 0, 40, 260, 120);

  //edges = createEdgeSprites();

  rockGroup = new Group();
  windGroup = new Group();

}

function draw() {

  background(bgIMG);

  if(gameState === 0){

  score = score + Math.round(getFrameRate()/60);

  if(keyDown("right") || keyDown("d")){
    plane.x = plane.x + 5;
    plane.addImage(planeIMG2);
    plane.scale = 0.0115;
  }
  if(keyDown("left") || keyDown("a")){
    plane.x = plane.x - 5;
    plane.addImage(planeIMG);
    plane.scale = 0.36;
  }

  if(score%250 === 0 && planeVelo < 0.8){
    planeVelo += 0.06;
    plane.velocityY  = planeVelo;
  }

  if(plane.x <= 35){
    plane.x = plane.x + 12;
  }
  if(plane.x >= 915){
    plane.x = plane.x - 12;
  }
  
  //plane.bounceOff(edges);

  makeWind();
  makeRock();

    for (var i = 0; i < windGroup.length; i++) {
      if (windGroup.get(i).isTouching(plane)) {
        console.log("wind touched");
        plane.y -= 37;                 
        windGroup.get(i).destroy();                
      }
    }

    for (var i = 0; i < rockGroup.length; i++) {
      if (rockGroup.get(i).isTouching(plane)) {
        console.log("rock touched");
        plane.y += 37;                 
        rockGroup.get(i).destroy();                
      }
    }

    if(plane.y > 532){
      gameState = 1;
    }

  }
  else if(gameState === 1){
    windGroup.setVelocityYEach(0);
    rockGroup.setVelocityYEach(0);
    plane.velocityY = 0;
    plane.destroy();
    windGroup.destroyEach();
    rockGroup.destroyEach();
    textSize(30);
    fill("black");
    text("GAME OVER", 425, 270);
    textSize(20); 
    text("Score: "+score, 470, 290);  
    textSize(13);
    text("Press R is restart!", 463, 305); 
    if(keyDown("r")){
      location.reload();
    }
  }

  textSize(25);
  fill("black");
  text("Score: "+score, 475, 40);

  drawSprites();

}

function makeWind(){

  //The number will be a var. The var will be changed based on specific threshholds

  if(score%175 === 0 && windRate > 50){
    windRate -= 3;
  }

  if(frameCount%windRate === 0){
    var wind = createSprite(10, -8, 15, 15);
    wind.addImage(windIMG);
    wind.velocityY = 2.4;
    wind.lifeTime = 235;
    wind.scale = 0.013;
    wind.x = Math.round(random(20, 930));

    //wind.debug = true;

    windGroup.add(wind);
  }

}

function makeRock(){

  if(score%175 === 0 && rockRate > 50){
    rockRate -= 5;
  }

  if(frameCount%rockRate === 0){
    var rock = createSprite(10, -8, 15, 15);
    rock.addImage(rockIMG);
    rock.velocityY = 2.55;
    rock.lifeTime = 235;
    rock.scale = 0.1;
    rock.x = Math.round(random(20, 930));

    rockGroup.add(rock);
  }

}