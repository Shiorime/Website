var canvas = document.createElement("canvas");
var b = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

document.body.appendChild(canvas);

b.fillStyle = "black";
b.fillRect(0,0, canvas.width, canvas.height);

var posX = canvas.width/2;
var posY = canvas.height/2;
var dx = 0;
var dy = 0;

var width = 10;
var height = 10;

setInterval (function(){
    b.fillStyle = "black";
    b.fillRect(0,0, canvas.width, canvas.height);

    posX += dx;
    posY += dy;

    if(posX > canvas.width - width){
        dx = 0;
        posX = 390;
    }
    if(posX <= 0){
        dx = 0;
        posX = 0;
    }
    if(posY > canvas.height - height){
        dy = 0;
        posY = 390;
    }
    if(posY <= 0){
        dy = 0;
        posY = 0;
    }

    b.fillStyle = "white";
    b.fillRect(posX, posY, width, height);
}, 20)

window.addEventListener("keydown", function(event){
    switch(event.keyCode){
        case 37:
            dx = -5;
            dy = 0;
            break;
        case 38:
            dx = 0;
            dy = -5;
            break;
        case 39:
            dx = 5;
            dy = 0;
            break;
        case 40:
            dx = 0;
            dy = 5;
            break;
    }
})