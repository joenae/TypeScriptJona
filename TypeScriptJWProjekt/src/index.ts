import { hitSound, scoreSound, wallHitSound } from "./audio";
import { splash , openBtn as openBtn , rules , closeBtn as closeßBtn } from "./dom-utils"; 

const startSpiel = document.querySelector("#startSpiel") as HTMLElement;
const startSpiel2 = document.querySelector("#startSpielZweiSpieler") as HTMLElement;
let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement; 
const ctx = canvas.getContext('2d')!;
let ballX = 50;
let ballY = 50; 
let ballSpeedX = 6; 
let ballSpeedY = 4; 

let player1Score: number = 0; 
let player2Score: number = 0; 

const winningScore = 3; 

// Tastatur
let upArrowPressed = false;
let downArrowPressed = false;
let SPressed = false; 
let WPressed = false; 

// Endscreen
let showingWinScreen = false; 
 
// Player
let player1Y = 250;  
let player2Y = 250; 
const playerHeight = 100; 
const playerThickness = 10; 


document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none'); 
    }, 2000)
})

canvas.addEventListener('mousedown', MouseClickHandler); 
openBtn.addEventListener('click', () => rules.classList.add('show'));
closeßBtn.addEventListener('click', () => rules.classList.remove('show'));


window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

// Hier werden die Keys definiert 
function keyDownHandler(event: KeyboardEvent) {
  switch (event.keyCode) {
    // "up arrow" key
    case 38:
      // 
      upArrowPressed = true;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = true;
      break;
       // "s" key
     case 83:
    SPressed = true;
       break;
     // "w" key
     case 87:
    WPressed = true;
       break;
  }
}

function keyUpHandler(event: KeyboardEvent) {
  switch (event.keyCode) {
    // "up arraow" key
    case 38:
      upArrowPressed = false;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = false;
      break;
     // s key
    case 83:
      SPressed = false;
      break;
    // "w" key
    case 87:
      WPressed = false;
      break;
  }
}

function MouseClickHandler() {
    if(showingWinScreen){
        player1Score = 0; 
        player2Score = 0; 
        showingWinScreen = false; 
    }
}

function ballReset() {
    if(player1Score >= winningScore ||
       player2Score >= winningScore) {
           showingWinScreen = true; 
       }
    
    ballSpeedX = 6; 
    ballSpeedY = 4; 
    ballSpeedY = ballSpeedY;   
    ballSpeedX = -ballSpeedX; 
    ballX = canvas.width/2; 
    ballY = canvas.height/2; 
}

function ballResetRight() {
    if(player1Score >= winningScore ||
       player2Score >= winningScore) {
           showingWinScreen = true; 
       }
    
    ballSpeedX = 6; 
    ballSpeedY = 4; 
    ballSpeedY = -ballSpeedY;   
    ballX = canvas.width/2; 
    ballY = canvas.height/2; 
}

function leftPlayerMove(){
     // Spieler bewegen 
     if (WPressed && player1Y > 0) {
        player1Y -= 12;
    } else if (SPressed && (player1Y < canvas.height - playerHeight)) {
        player1Y += 12;
    }
}

function rightPlayerMove(){
    if (upArrowPressed && player2Y > 0) {
        player2Y -= 12;
    } else if (downArrowPressed && (player2Y < canvas.height - playerHeight)) {
        player2Y += 12;
    }
}

function compMovement() {
    let paddle2YCenter = player2Y + (playerHeight/2); 
    if(paddle2YCenter < ballY - 40 && paddle2YCenter > 40){ // Ball ignorieren, wenn er unter 40 Pixel ist 
        player2Y += 8;  
    } else if(paddle2YCenter > ballY + 40 && (player2Y < canvas.height - playerHeight + 40)) {  
        player2Y -= 8; 
    }
}

let startBtn1 = document.querySelector("#startSpielZweiSpieler") as HTMLElement;
let startBtn = document.querySelector("#startSpiel") as HTMLElement;

function startGame() {
    startBtn.classList.add("deactivatebutton1"); 
    startBtn1.classList.add("deactivatebutton2"); 
    canvas.classList.remove("deactivecanvas");
    setInterval(gameLoop, 1000 / 60); 
}

function startGameTwoPlayer() {
    startBtn1.classList.add("deactivatebutton2"); 
    startBtn.classList.add("deactivatebutton1"); 
    canvas.classList.remove("deactivecanvas");
    setInterval(gameLoopTwoPlayer, 1000 / 60); 
}

startSpiel.addEventListener('click',function(){startGame()});
startSpiel2.addEventListener('click',function(){startGameTwoPlayer()});

function collisionDetect(){
//Ball an Wnad bouncen lassen 
//links: 
if(ballX < 10){
    if( ballY > player1Y && 
        ballY < player1Y + playerHeight){
            ballSpeedX = -ballSpeedX; 
            //Ball Kontrolle links / den Ball in einem anderen Winkel zurückgeben 
            let deltaY: number = ballY -(player1Y+playerHeight/2); 
            ballSpeedY = deltaY * 0.35; 
            hitSound.play();
        }else {
             player2Score ++;  
             scoreSound.play();
             ballResetRight();    
        } 
}
//rechts: 
if(ballX > canvas.width - 10){
        if( ballY > player2Y && 
            ballY < player2Y + playerHeight){
                ballSpeedX = -ballSpeedX; 
                //Ball Kontrolle rechts
                let deltaY = ballY -(player2Y+playerHeight/2); 
                ballSpeedY = deltaY * 0.35; 
                hitSound.play();
            }else {
                 player1Score ++;  
                 scoreSound.play();
                 ballReset();
            } 
}
//oben: 
if(ballY < 10){
    ballSpeedY = -ballSpeedY;
    wallHitSound.play(); 
}
//unten: 
if(ballY > canvas.height - 10){
    ballSpeedY = -ballSpeedY;
    wallHitSound.play(); 
}
}

function moveAllOnePlayer() {
    if(showingWinScreen){
        return; 
    }
    leftPlayerMove();
    compMovement(); 
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY; 
    collisionDetect(); 
}

function moveAllTwoPlayer() {
    if(showingWinScreen){
        return; 
    }
    leftPlayerMove();
    rightPlayerMove(); 
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY; 
    collisionDetect(); 
}

function drawRect(leftX: number, topY: number, width: number, height: number, drawColor: string){
    ctx.fillStyle = drawColor; 
    ctx.fillRect(leftX, topY, width, height); 
}

function drawBall(centerX: number, centerY: number, radius: number, drawColor: string) {
    ctx.fillStyle = drawColor; 
    ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true); //True und False kann man bei änderung des PI Wertes die Seiten wählen
	ctx.fill();
}

function drawLine(startPointX: number, startPointY: number, endPointX: number, endPointY: number, drawColor: string) {
    ctx.strokeStyle = drawColor; 
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(startPointX, startPointY);
    ctx.lineTo(endPointX, endPointY);
    ctx.stroke(); 
    }

function drawCircle(centerX: number, centerY: number, radius: number, drawColor: string) {
    ctx.strokeStyle = drawColor; 
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = 5;
    ctx.stroke(); 
}

function drawAll() {
    ctx.font = '20px "Arial", sans serif'; 
    //Spielfeld zeichnen  
    drawRect(0,0,canvas.width,canvas.height,'#F1F1F1'); 
    if(showingWinScreen){
        ctx.fillStyle = '#061324'; 
        if(player1Score >= winningScore) {
            ctx.fillText("Du hast gewonnen! Gratulation!", 265, 200); 
         } else if( player2Score >= winningScore){
            ctx.fillText("Der Computer hat leider gewonnen!", 250, 200);
            ctx.fillText("Schade, versuche es weiter!", 280, 230);
           }
        ctx.fillText("Click to continue", 325, 500); 
        return; 
    }
    drawCircle(0, 300, 80, '#DB5756')
    drawCircle(800, 300, 80, '#DB5756')
    drawCircle(400, 300, 80, '#061324'); 
    drawLine(400, 0, 400, 600, '#061324'); 
    drawLine(550, 0, 550, 600, '#A8C9DA'); 
    drawLine(250, 0, 250, 600, '#A8C9DA'); 
    //zeichnet linken Spieler
    drawRect(0,player1Y,playerThickness,playerHeight,'#49738C'); 
    //zeichnet rechten Spieler
    drawRect(canvas.width - playerThickness,player2Y,10,playerHeight,'#49738C'); 
    //zeichnet Ball 
    drawBall(ballX, ballY, 10, '#49738C'); 
    
    let p1Scoretext: string = player1Score.toString(); // Number to String für print Methode 
    let p2ScoreText: string = player2Score.toString(); 

    ctx.fillText(p1Scoretext, 100, 100); 
    ctx.fillText(p2ScoreText, canvas.width - 100, 100); 
    
}
function gameLoop() {
    // updated hier alles
    moveAllOnePlayer();
    // rendert hier alles 
    drawAll();
  }

function gameLoopTwoPlayer(){
    // updated hier alles
    moveAllTwoPlayer();
    // rendert hier alles 
    drawAll();
}