//Game Logic
let gameOver = false;
const gameBox = document.getElementById("game");
const content = gameBox.getContext("2d");
const gameSpeed = 100
//food
let foodX;
let foodY;



//Background Game Size
const squareSize= 25;
const gameRow = 15
const gameCol = 15
//calculated game size
const gameHeight = squareSize * gameCol
const gameWidth = squareSize * gameRow
gameBox.height = gameHeight;
gameBox.width = gameWidth;
//Snake
const SpawnLocationX =Math.floor(gameCol/2)*squareSize;
const SpawnLocationY = Math.floor(gameRow/2)*squareSize
let headX = SpawnLocationX;
let headY = SpawnLocationY;

// let headX = Math.ceil(gameBox.height/2);
// let headY = Math.ceil(gameBox.width/2);
let snakeBody = [];
let bodyLength = 0;
let snakeDir = 1;
    // 1 == right, 2 == left, , 3 == up, 4== down

//Anitmate
const maxAnimate = 100;
const perMax = 1/maxAnimate

//Game Start
content.fillStyle = "green"
content.fillRect(0,0,gameWidth,gameHeight);

content.fillStyle = "white"
content.fillRect(headX,headY,squareSize,squareSize);

bodyLength = snakeBody.push({headX,headY})
newFoodLocation()

//check Dir
window.addEventListener("keydown",checkKey)


//Draw updates
window.setInterval(gameLogic,gameSpeed);

//test





function gameLogic(){
    content.fillStyle = "green"
    content.fillRect(0,0,gameWidth,gameHeight);
    spawnFood();

    // Reset
    // outbound
    if(headY > gameWidth || headY < 0 || headX > gameWidth || headX < 0){
        headY = SpawnLocationY;
        headX = SpawnLocationY;
        snakeDir = 1
        snakeBody = [];
        bodyLength = snakeBody.push({headX,headY})
    }
    // Body Colision
    if(!checkColision(headX,headY)){
        headY = SpawnLocationY;
        headX = SpawnLocationY;
        snakeDir = 1
        snakeBody = [];
        bodyLength = snakeBody.push({headX,headY})
    }

    // update Array/ moving head forward
    bodyLength = snakeBody.push({headX,headY})
    switch(snakeDir){
        case 1: 
        headX += 25;
        break;

        case 2: 
        headX -= 25;
        break;

        case 3: 
        headY -= 25;
        break;

        case 4: 
        headY += 25;
        break;
    }
    // moving tail forward
    snakeBody.shift();
    bodyLength --;

    // food Logic
    if(headX == foodX && headY == foodY){
        bodyLength = snakeBody.push({headX, headY})
        newFoodLocation();
    }

    // draw body
    snakeBody.forEach(drawBody)

}

// draw the the food with the food location
function spawnFood(){
    content.fillStyle = "red"
    content.fillRect(foodX,foodY,squareSize,squareSize)
}

// create cord for new food location
    // check if food is on body and restart if so
function newFoodLocation(){
    let tempX;
    let tempY;
    do{
        tempX = squareSize* (Math.floor(Math.random()*gameRow))
        tempY = squareSize* (Math.floor(Math.random()*gameCol))
    }while(!checkColision(tempX, tempY))
    foodX = tempX;
    foodY = tempY;
}

//given an x and y cord, is the body on it
function checkColision(x,y){
    let spotOpen = true
    snakeBody.forEach( (element, index)=>{
        if(element.headX == x && element.headY == y){
            spotOpen = false;
        }    
        if((element.headX == x && element.headY == y) && index == bodyLength-1){

            spotOpen = true;
        }
    })
    
    return spotOpen
}

//draw the body with the array x and y cord
    // the head of the snake is white
function drawBody(element, index){
    if(index == bodyLength -1)
    {
        content.fillStyle = "white"
    }
    else{
        content.fillStyle = "yellow"
    }


    content.fillRect(element.headX,element.headY,squareSize,squareSize);
}

function checkKey(event){
    //Stop from going back on itself
    if(snakeDir == 1 && event.key == "ArrowLeft"){
        snakeDir = 1;
    }
    else if(snakeDir == 2 && event.key == "ArrowRight"){
        snakeDir = 2;
    }
    else if(snakeDir == 3 && event.key == "ArrowDown"){
        snakeDir = 3;
    }
    else if(snakeDir == 4 && event.key == "ArrowUp"){
        snakeDir = 4;
    }
    else{
        //set snake Direction
        switch(event.key){
            case("ArrowRight"):
            snakeDir = 1;
            break
            case("ArrowLeft"):
            snakeDir = 2;
            break
            case("ArrowUp"):
            snakeDir = 3;
            break
            case("ArrowDown"):
            snakeDir = 4;
            break
            default: break;
        } 
    }

}