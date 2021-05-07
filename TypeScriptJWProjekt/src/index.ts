import { hitSound, scoreSound, wallHitSound } from "./audio";
import { startSpiel, startSpiel2, ctx, canvas} from "./dom-utils";  
import { player1, player2, playerHeight, playerThickness, ball, gameCanvas} from './config'; 
import { upArrowPressed, downArrowPressed, WPressed, SPressed} from './event'; 

canvas.addEventListener('mousedown', MouseClickHandler); 

//PlayerScore
let player1Score: number = 0; 
let player2Score: number = 0; 

//Signal 
let executed1: boolean = false; 
let executed2: boolean = false;
let executed3: boolean = false;
let executed4: boolean = false;

//Zahl um Spiel zu gewinnen --> hier veränderbar 
const winningScore = 3; 

//Canvas Höhe und Breite 
canvas.width = gameCanvas.width; 
canvas.height = gameCanvas.height; 

// Endscreen
let showingWinScreen = false; 


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
    
    ball.speedX = 6; 
    ball.speedY = 4;  
    ball.speedX = -ball.speedX; 
    ball.x = canvas.width/2; 
    ball.y = canvas.height/2; 
}

function ballResetRight() {
    if(player1Score >= winningScore ||
       player2Score >= winningScore) {
           showingWinScreen = true; 
       }
    
       ball.speedX = 6; 
       ball.speedY = 4; 
       ball.speedY = -ball.speedY;   
       ball.x = canvas.width/2; 
       ball.y = canvas.height/2; 
}

//Spieler bewegen 
function leftPlayerMove(){
     // Spieler bewegen 
     if (WPressed && player1.y > 0) {
        player1.y  -= 12;
    } else if (SPressed && (player1.y  < canvas.height - playerHeight)) {
        player1.y  += 12;
    }
}

function rightPlayerMove(){
    if (upArrowPressed && player2.y  > 0) {
        player2.y  -= 12;
    } else if (downArrowPressed && (player2.y  < canvas.height - playerHeight)) {
        player2.y  += 12;
    }
}

function compMovement() {
    let comp2YCenter = player2.y + (playerHeight/2); 
    if(comp2YCenter < ball.y - 40 && comp2YCenter > 40){ // Ball ignorieren, wenn er unter 40 Pixel ist 
        player2.y += 8;  
    } else if(comp2YCenter > ball.y + 40 && (player2.y < canvas.height - playerHeight + 40)) {  
        player2.y -= 8; 
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
//Ball an Wand bouncen lassen 
//links: 
if(ball.x < 10){
    if( ball.y > player1.y && 
        ball.y < player1.y + playerHeight){
            ball.speedX = -ball.speedX; 
            //Ball Kontrolle links / den Ball in einem anderen Winkel zurückgeben 
            let angleY: number = ball.y -(player1.y+playerHeight/2); 
            ball.speedY = angleY * 0.35; 
            hitSound.play();
        }else {
             player2Score ++;  
             scoreSound.play();
             ballResetRight();    
        } 
}
//rechts: 
if(ball.x > canvas.width - 10){
        if( ball.y > player2.y && 
            ball.y < player2.y + playerHeight){
                ball.speedX = -ball.speedX; 
                //Ball Kontrolle rechts
                let angleY = ball.y -(player2.y+playerHeight/2); 
                ball.speedY = angleY * 0.35; 
                hitSound.play();
            }else {
                 player1Score ++;  
                 scoreSound.play();
                 ballReset();
            } 
}
//oben: 
if(ball.y < 10){
    ball.speedY = -ball.speedY;
    wallHitSound.play(); 
}
//unten: 
if(ball.y > canvas.height - 10){
    ball.speedY = -ball.speedY;
    wallHitSound.play(); 
}
}


function moveAllOnePlayer() {
    if(showingWinScreen){
        return; 
    }
    leftPlayerMove();
    compMovement(); 
    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY; 
    collisionDetect(); 
}

function moveAllTwoPlayer() {
    if(showingWinScreen){
        return; 
    }
    leftPlayerMove();
    rightPlayerMove(); 
    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY; 
    collisionDetect(); 
}

//Zeichnen
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

//Signal: Funktioniert leider nur bei der ersten Runde 
function drawScoreHelp(){
    if(player1Score == 1){
        if (!executed1){ executed1 = true;
        drawBall(800, 0, 40, '#FACD22'); 
        drawBall(800, 600, 40, '#FACD22'); 
        }
    }
    if(player2Score == 1){
        if (!executed2){ executed2 = true;
        drawBall(0, 0, 40, '#FACD22'); 
        drawBall(0, 600, 40, '#FACD22');
        }
    }
    if(player1Score == 2){  
        if (!executed3){ executed3 = true;
        drawBall(800, 0, 40, '#FA9C37'); 
        drawBall(800, 600, 40, '#FA9C37'); 
        }
    }
    if(player2Score == 2){
        if (!executed4){ executed4 = true;
        drawBall(0, 0, 40, '#FA9C37'); 
        drawBall(0, 600, 40, '#FA9C37');
        }   
    }
}

function drawAll() {
    ctx.font = '20px "Video Medium", video, sans serif'; 
    //Spielfeld zeichnen  
    drawRect(0,0,canvas.width,canvas.height,'#F1F1F1'); 
    
    if(showingWinScreen){
        ctx.fillStyle = '#061324'; 
        if(player1Score >= winningScore) {
            ctx.fillText("Der linke Spieler hat gewonnen!", 260, 200); 
            ctx.fillText("Gratulation!", 345, 230); 
         } else if( player2Score >= winningScore){
            ctx.fillText("Der rechte Spieler hat gewonnen!", 260, 200);
            ctx.fillText("Gratulation!", 345, 230);
           }
        ctx.fillText("Click to continue", 325, 500); 
        return; 
    }
    drawScoreHelp();
    drawCircle(0, 300, 80, '#DB5756')
    drawCircle(800, 300, 80, '#DB5756')
    drawCircle(400, 300, 80, '#061324'); 
    drawLine(400, 0, 400, 600, '#061324'); 
    drawLine(550, 0, 550, 600, '#A8C9DA'); 
    drawLine(250, 0, 250, 600, '#A8C9DA'); 
    //zeichnet linken Spieler
    drawRect(0,player1.y,playerThickness,playerHeight,'#49738C'); 
    //zeichnet rechten Spieler
    drawRect(canvas.width - playerThickness,player2.y,10,playerHeight,'#49738C'); 
    //zeichnet Ball 
    drawBall(ball.x, ball.y, 10, '#49738C'); 
    
    let p1Scoretext: string = player1Score.toString(); // Number to String für print Methode 
    let p2ScoreText: string = player2Score.toString(); 
    ctx.fillText(p1Scoretext, 100, 100); 
    ctx.fillText(p2ScoreText, canvas.width - 100, 100); 
}

//Spielloop 
function gameLoop() {
    // updated hier alle 
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