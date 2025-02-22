const moveSound = new Audio("./music/move.mp3");
const foodSound = new Audio("./music/food.mp3");
const gameoverSound = new Audio("./music/gameover.mp3");
let gameContainer = document.querySelector('.game-container');
let scoreBox = document.querySelector('.score');
let HisBox = document.querySelector('.highScore');
let HighScore = 0;
let lastPaintTime = 0;
let speed = 5;
let score = 0;
food = {x: 2, y: 9};

let snakeArr = [
    {x: 12, y: 13}
];

let CurrentDir = { x: 0, y:0};


function main (timeStamp){
window.requestAnimationFrame(main);
if((timeStamp - lastPaintTime)/1000 < 1/speed){
    return;
}
lastPaintTime = timeStamp;


gameEngine();

}

function collison(snake){
    //if snake is bump into the wall 
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }

  // if snake is bump into yourself 
  for (let i = 1; i < snake.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
}
    return false;
}

function gameEngine(){

    if(collison(snakeArr)){
        alert('Game is Over Press any key to continue');
        CurrentDir = {x: 0 , y: 0};
        snakeArr = [{x: 12, y: 13}];
        score = 0;
    }
     // how to increment the snake length if it eats the food and randomize a food location
     if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        snakeArr.unshift({x : snakeArr[0].x + CurrentDir.x , y : snakeArr[0].y + CurrentDir.y})
       let a = 2;
       let b = 16
       food = {x : Math.round( a + (b-a)*Math.random()) , y: Math.round( a + (b-a)*Math.random()) };
       score++;
       scoreBox.innerHTML = `Score : ${score}`;
       localStorage.setItem('HighScore' , `${score}`);
       if(score > HighScore){
         HighScore =  localStorage.getItem('HighScore')
         HisBox.innerHTML = `High Score : ${HighScore}`;
       }
     }

     // Moving a snake
     for (i = snakeArr.length -2 ; i>=0; i--){
        snakeArr[i + 1]  = {...snakeArr[i]}
     }

     snakeArr[0].x += CurrentDir.x;
     snakeArr[0].y += CurrentDir.y;


    gameContainer.innerHTML = "";
    // Display a snake 
    snakeArr.forEach((e , index )=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;


        if (index === 0){
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }

        gameContainer.appendChild(snakeElement)
    })

    // display a food
    foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    gameContainer.appendChild(foodElement);

}



window.requestAnimationFrame(main);

window.addEventListener("keydown" , (e)=>{
    CurrentDir = { x: 0, y: 1}
    switch(e.key){
        case "ArrowUp":
            CurrentDir.x = 0;
            CurrentDir.y = -1;
            break;

        case "ArrowDown" :
            CurrentDir.x = 0;
            CurrentDir.y = 1;
            break;

        case "ArrowLeft" :
            CurrentDir.x = -1;
            CurrentDir.y = 0;
            break;

        case "ArrowRight" :
            CurrentDir.x = 1;
            CurrentDir.y = 0;
            break;
            default :
            break;

    }
})