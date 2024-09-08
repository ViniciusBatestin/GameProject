/* The Game Project*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

var canyons;
var collectables;

var trees_x;
var treePos_y;

var clouds
var mountain

var cameraPosX

var game_score;

var flagpole;

var lives;


function setup()
{
    createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    lives = 3
    startGame();
}

function draw()
{
    ///////////DRAWING CODE//////////

    // Fixing camera position to character in the center.
    cameraPosX = gameChar_x - width/2;

    background(100,155,255); //fill the sky blue

    noStroke();
    fill(0,155,0);
    rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

    //Save current game state
    push();
    translate(-cameraPosX, 0);

    // Drawn Mountains
    drawMountains();

    // Drawn clouds
    drawClouds();

    // Drawn trees
    drawTrees();

    // Draw Canyons
    for(i = 0; i < 3; i++)
    {
        //draw the canyon
        drawCanyons(canyons[i]);
        checkCanyon(canyons[i]);
    }

    for(i = 0; i < 3; i++)
    {
        if(!collectables[i].isFound)
        {
        // Check if collectable is found and adjust cameraPosX
            drawCollectable(collectables[i]);

            //Check if Collectable is found
            checkCollectable(collectables[i]);
        }
    }

    renderFlagpole();

    if(lives < 1)
    {
        fill(255);
        textSize(30);
        text("Game over. Press space to continue.", gameChar_x, height/2);
        return
    }
    if(flagpole.isReachead == true)
    {
        fill(255);
        textSize(30);
        text("Level complete. Press space to continue.", gameChar_x, height/2);
        return
    }


    // Return game to default state
    pop();

    if(gameChar_y < floorPos_y)
    {
        isFalling = true;
        gameChar_y += 2;
    }else
    {
        isFalling = false;
    }

    if(flagpole.isReachead == false)
    {
        checkFlagpole();
    }

    checkPlayerDie();

    //the game character

    fill(255);
    noStroke();
    text("Score is: " + game_score, 20, 20);

    if(isLeft && isFalling)
    {
        // add your jumping-left code
        fill(85,79,72);
        ellipse(gameChar_x, gameChar_y - 50, 10, 25);

        fill(85,79,72);
        rect(gameChar_x -2, gameChar_y - 38, 5, 5)

        // body
        fill(0,100, 50);
        rect(gameChar_x -4.5, gameChar_y - 35, 10, 20)

        // feets
        push()
        fill(85,79,72);
        rotate(0.02)
        rect(gameChar_x , gameChar_y-21, 8, 8)
        pop()

        fill(85,79,72);
        rect(gameChar_x -1, gameChar_y -15, 8, 8)
    }
    else if(isRight && isFalling)
    {
        // add your jumping-right code
        fill(85,79,72);
        ellipse(gameChar_x, gameChar_y - 50, 10, 25);

        fill(85,79,72);
        rect(gameChar_x -2, gameChar_y - 38, 5, 5)

        // body
        fill(0,100, 50);
        rect(gameChar_x -4.5, gameChar_y - 35, 10, 20)

        // feets
        push()
        fill(85,79,72);
        rect(gameChar_x - 5 , gameChar_y -15, 8, 8)
        pop()

        fill(85,79,72);
        rotate(-0.01)
        rect(gameChar_x -1 , gameChar_y -15, 8, 8)
    }
    else if(isLeft)
    {
        // Head
        fill(85,79,72);
        ellipse(gameChar_x, gameChar_y - 50, 10, 25);

        // Neck
        fill(85,79,72);
        rect(gameChar_x -2, gameChar_y - 38, 5, 5)

        // Body
        fill(0,100, 50);
        rect(gameChar_x -4.5, gameChar_y - 35, 10, 30)

        // Feet
        fill(85,79,72);
        rect(gameChar_x -10, gameChar_y - 5, 8, 8);

        fill(85,79,72);
        rect(gameChar_x -1, gameChar_y -5, 8, 8);
    }

    else if(isRight)
    {
        // Head
        fill(85,79,72);
        ellipse(gameChar_x, gameChar_y - 50, 10, 25);

        // Neck
        fill(85,79,72);
        rect(gameChar_x -2, gameChar_y - 38, 5, 5);

        // Body
        fill(0,100, 50);
        rect(gameChar_x -4.5, gameChar_y - 35, 10, 30);

        // Feet
        fill(85,79,72);
        rect(gameChar_x - 5 , gameChar_y -5, 8, 8); // Left foot

        fill(85,79,72);
        rect(gameChar_x + 1, gameChar_y -5, 8, 8); // Right foot
    }

    else if(isFalling || isPlummeting)
    {
        // add your jumping facing forwards code
        fill(85,79,72);
        ellipse(gameChar_x, gameChar_y - 50, 25, 25);

        fill(85,79,72);
        rect(gameChar_x -2, gameChar_y - 38, 5, 5)

        fill(0,100, 50);
        rect(gameChar_x -4.5, gameChar_y - 35, 10, 15)

        // feets
        fill(85,79,72);
        rect(gameChar_x -8, gameChar_y -20, 8, 8)

        fill(85,79,72);
        rect(gameChar_x + 1, gameChar_y -20, 8, 8)
    }
    else
    {
        // add your standing front facing code
        fill(85,79,72);
        ellipse(gameChar_x, gameChar_y - 50, 25, 25);

        fill(85,79,72);
        rect(gameChar_x -2, gameChar_y - 38, 5, 5)

        fill(0,100, 50);
        rect(gameChar_x -4.5, gameChar_y - 35, 10, 30)

        fill(85,79,72);
        rect(gameChar_x -8, gameChar_y -5, 8, 8)

        fill(85,79,72);
        rect(gameChar_x + 1, gameChar_y -5, 8, 8)

    }

	///////////INTERACTION CODE//////////

    //Put conditional statements to move the game character below here
    if(isLeft == true)
      {
          gameChar_x -= 1;
      }
    if(isRight == true)
      {
          gameChar_x += 1;
      }
}


function keyPressed()
{
    // if statements to control the animation of the character when
    // keys are pressed.

    //open up the console to see how these work
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);

    if(isPlummeting == true)
    {
        isLeft = false;
        isRight = false;
    }else{
        if(keyCode == 65)
        {
            isLeft = true;
        }
        else
        {
            if(keyCode == 68)
            {
                isRight = true;
            }
        }
        if(keyCode == 87 && !isFalling)
        {
            gameChar_y -= 100;
        }
    }
    if(keyCode == 32 && ( lives < 1 || flagpole.isReachead))
    {
        startGame();
        lives = 3
        flagpole.isReachead == false;
    }

}

function keyReleased()
{
    // if statements to control the animation of the character when
    // keys are released.

    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    if(keyCode == 65)
    {
        console.log("left arrow");
        isLeft = false;
    }
    if(keyCode == 68)
    {
        console.log("right arrow");
        isRight = false;
    }
    // }
    if(keyCode == 87)
    {
        isFalling = true
    }

}

function drawClouds()
{
    for(i = 0; i < clouds.length; i++)
    {
        // Learned i could call the var[i].object property with assistance.
        noStroke();
        fill(255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos , clouds[i].width, clouds[i].height);
        ellipse(clouds[i].x_pos + 20 ,clouds[i].y_pos, clouds[i].width - 30 , clouds[i].height - 20);
        ellipse(clouds[i].x_pos + 50 ,clouds[i].y_pos, clouds[i].width - 10 ,clouds[i].height);
        ellipse(clouds[i].x_pos + 80 , clouds[i].y_pos, clouds[i].width- 30, clouds[i].height- 20);
    }

}

function drawTrees()
{
  for(i = 0; i < trees_x.length; i++)
  {
      //trunk
      fill(139, 69, 19);
      rect(trees_x[i], treePos_y - 100, 20, 100);

      //leaves
      fill(0, 155, 0);
      ellipse(trees_x[i] + 10 , treePos_y - 110, 60, 80);
      ellipse(trees_x[i] + 30, treePos_y - 80 , 60, 80);
      ellipse(trees_x[i] - 10 , treePos_y - 80 , 60, 80);

      //apples
      fill(200, 0, 0);
      ellipse(trees_x[i], treePos_y - 100, 10, 10);
      ellipse(trees_x[i] - 5 , treePos_y -80 , 10, 10);
      ellipse(trees_x[i] + 30, treePos_y- 90, 10, 10);
      ellipse(trees_x[i] + 27 , treePos_y -60, 10, 10);
  }
}

function drawMountains()
{
    for(i = 0; i < mountain.length; i++)
    {
        // Mountain 1
        fill(160, 150, 130);
        beginShape();
        vertex(mountain[i].x_pos, mountain[i].y_pos);
        vertex(mountain[i].x_pos + 100, mountain[i].y_pos - 200);
        vertex(mountain[i].x_pos + 200, mountain[i].y_pos);
        endShape(CLOSE);

        // Mountain 2
        beginShape();
        vertex(mountain[i].x_pos + 100 ,mountain[i].y_pos);
        vertex(mountain[i].x_pos + 180, mountain[i].y_pos - 142);
        vertex(mountain[i].x_pos + 240 , mountain[i].y_pos);
        endShape(CLOSE);
    }
}

function drawCollectable(t_collectable)
{
  if(t_collectable.isFound == false)
  {
      // Drawn t_collectable Item
      // Ring
      stroke(212, 175, 55);
      strokeWeight(5);
      noFill();
      ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size - 20, t_collectable.size - 20);

      // pearl
      noStroke();
      fill(0, 255, 0);
      ellipse(t_collectable.x_pos, t_collectable.y_pos - 15, 10, 10);

      noStroke();
      fill(255);
  }
}

function checkCollectable(t_collectable)
{
    if(dist(gameChar_x, gameChar_y, t_collectable.x_pos - cameraPosX, t_collectable.y_pos) < 50)
    {
        t_collectable.isFound = true;
        game_score += 1;
    }
}

function drawCanyons(t_canyon)
{
    fill(100, 69, 19);
    rect(t_canyon.x_pos, 432, t_canyon.width, 144);
}


function checkCanyon(t_canyon)
{
    if(gameChar_x > t_canyon.x_pos - cameraPosX &&
    gameChar_x < t_canyon.x_pos + t_canyon.width - cameraPosX &&
    gameChar_y >= t_canyon.y_pos)
    {
        isPlummeting = true;
        isLeft = false
        isRight = false
        gameChar_y += 3;
    }else{
        isPlummeting = false;
    }
}

function renderFlagpole()
{
    // Flagpole draw
    push();
    strokeWeight(5);
    stroke(100);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);

    // flag draw
    noStroke();
    fill(0);
    if(flagpole.isReachead)
    {
        rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    }
    else
    {
      rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
    }


    pop();
}

function checkFlagpole()
{
   d = flagpole.x_pos;

   var range = 250

   if(abs(gameChar_x - d) <= range)
   {
        flagpole.isReachead = true;
   }
   console.log(d);
   console.log(gameChar_x);
}

function checkPlayerDie()
{

  if (gameChar_y > floorPos_y + 300)
  {
     lives -= 1
     if (lives > 0)
        {
            startGame();
        }
  }

  for(i = 0; i < lives; i ++)
  {
      space = 15 * i
      noStroke(0)
      fill(255,0,0)
      ellipse(900 + space , 30, 10, 10)
  }
  noStroke();
  fill(255);
  textSize(16);
  text("Lives", 895, 15);
}

function startGame()
{
  gameChar_x = width/2;
  gameChar_y = floorPos_y;

  canyons =
  [
      {x_pos: 70, y_pos: floorPos_y, width: 70},
      {x_pos: 400, y_pos: floorPos_y, width: 70},
      {x_pos: 900, y_pos: floorPos_y, width: 70}
  ];

  collectables =
  [
      {x_pos: 105,y_pos: floorPos_y -90, size: 40,isFound: false},
      {x_pos: 300,y_pos: floorPos_y, size: 40,isFound: false},
      {x_pos: 800,y_pos: floorPos_y, size: 40,isFound: false}
  ];

  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;

  trees_x = [180, 320, 540, 720, 900, 1080];
  treePos_y = floorPos_y;


  clouds =
  [
      {x_pos: 800, y_pos: 130, width: 90, height: 60},
      {x_pos: 300, y_pos: 100, width: 100, height: 50},
      {x_pos: 500, y_pos: 150, width: 80, height: 40}
  ];

  mountain =
  [
      {x_pos: 290, y_pos: 432},
      {x_pos: 900, y_pos: 432}
  ];

  cameraPosX = 0

  game_score = 0

  flagpole = { isReachead: false, x_pos: 1000};
}
