let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

document.body.appendChild(canvas);

let box = 20;
let dBoxX = canvas.width / box;
let dBoxY = canvas.height / box;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box};
let food = { x: Math.floor(Math.random() * (dBoxX - 1)) * box,
             y: Math.floor(Math.random() * (dBoxY - 1)) * box
}
let d;
let score = 0;


document.addEventListener("keydown", direction);

function direction(event){
   if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT"
   }
   if(event.keyCode == 38 && d != "DOWN"){
       d = "UP";
   }
   if(event.keyCode == 39 && d != "LEFT"){
       d = "RIGHT";
   }
   if(event.keyCode == 40 && d != "UP"){
       d = "DOWN";
   }
}

function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y && i > 1){
            return true;
        }
    }
    return false;
}

function draw(){
    document.getElementById("score").innerHTML = "Score: " + score;
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.fillStyle = "white";
    for(let i = 0; i < snake.length; ++i){
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    // Previous head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * (dBoxX - 1)) * box,
            y: Math.floor(Math.random() * (dBoxY - 1)) * box
        }
        score += 20;
    }
    else {
        // Remove Tail
        snake.pop();
    }

    // Direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    //Reaches all the way to the left
    if(snakeX < box - box){
        let newHead = {
            x : canvas.width - box,
            y : snakeY
        }
    
        snake.unshift(newHead);
    } //All the way to the right
    else if(snakeX > canvas.width - box){
        let newHead = {
            x : 0,
            y : snakeY
        }
    
        snake.unshift(newHead);
    } //All the way up
    else if(snakeY < box - box){
        let newHead = {
            x : snakeX,
            y : canvas.height - box
        }
    
        snake.unshift(newHead);
    } //All the way down
    else if(snakeY > canvas.height - box){
        let newHead = {
            x : snakeX,
            y : 0
        }
    
        snake.unshift(newHead);
    }
    else{
        let newHead = {
            x : snakeX,
            y : snakeY
        }
    
        if(collision (newHead, snake)){
            alert("game over");
            clearInterval(game);
        }

        snake.unshift(newHead);
    }
};
let game = setInterval(draw, 60);

