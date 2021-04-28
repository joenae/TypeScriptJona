import { splash , openBtn as openBtn , rules , closeBtn as closeßBtn } from "./dom-utils"; 


let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement; 
const ctx = canvas.getContext('2d')!;
let ballX = 50;
let ballY = 50; 
let ballSpeedX = 6; 
let ballSpeedY = 4; 

let player1Score: number = 0; 
let player2Score: number = 0; 

const winningScore = 3; 

let upArrowPressed = false;
let downArrowPressed = false;

const hitSound = new Audio('sounds/hitSound.wav');
const scoreSound = new Audio('sounds/scoreSound.wav');
const wallHitSound = new Audio('sounds/wallHitSound.wav');

let showingWinScreen = false; 
//let titleScreen = true; 

let player1Y = 250;  
let player2Y = 250; 
const paddleHeight = 100; 
const paddleThickness = 10; 


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
  // get the keyCode
  switch (event.keyCode) {
    // "up arrow" key
    case 38:
      // setzt upArrowPressed = true
      upArrowPressed = true;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = true;
      break;
  }
}
// gets activated when we release the key
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
  }
}

function MouseClickHandler() {
    if(showingWinScreen){
        player1Score = 0; 
        player2Score = 0; 
        showingWinScreen = false; 
    }
}

/*function startGame() {
    let startDiv = document.querySelector(".start") as HTMLElement;
    startDiv.style.display = "none";
    canvas.style.display = "block";
}*/

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

function compMovement() {
    let paddle2YCenter = player2Y + (paddleHeight/2); 
    if(paddle2YCenter < ballY - 40 && paddle2YCenter > 40){ // Ball ignorieren, wenn er unter 40 Pixel ist 
        player2Y += 8;  
    } else if(paddle2YCenter > ballY + 40 && (player2Y < canvas.height - paddleHeight + 40)) {  
        player2Y -= 8; 
    }
}

function moveAll() {
    if(showingWinScreen){
        return; 
    }
    
      // Spieler bewegen 
    if (upArrowPressed && player1Y > 0) {
        player1Y -= 12;
    } else if (downArrowPressed && (player1Y < canvas.height - paddleHeight)) {
        player1Y += 12;
    }

    compMovement(); 


    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY; 
    //ballSpeedX = ballSpeedX + 1; 

    //Ball an Wnad bouncen lassen 
    //links: 
    if(ballX < 10){
        if( ballY > player1Y && 
            ballY < player1Y + paddleHeight){
                ballSpeedX = -ballSpeedX; 
                //Ball Kontrolle links / den Ball in einem anderen Winkel zurückgeben 
                let deltaY: number = ballY -(player1Y+paddleHeight/2); 
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
                ballY < player2Y + paddleHeight){
                    ballSpeedX = -ballSpeedX; 
                    //Ball Kontrolle rechts
                    let deltaY = ballY -(player2Y+paddleHeight/2); 
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

function colorRect(leftX: number, topY: number, width: number, height: number, drawColor: string){
    ctx.fillStyle = drawColor; 
    ctx.fillRect(leftX, topY, width, height); 
}

function colorCircle(centerX: number, centerY: number, radius: number, drawColor: string) {
    ctx.fillStyle = drawColor; 
    ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true); //True und False kann man bei änderung des PI Wertes die Seiten wählen
	ctx.fill();
}

function drawNet() {
    for(let i=0; i < canvas.height; i += 35.8){
        colorRect(canvas.width/2-1,i,3,30, 'brown');
    }
}

function drawAll() {
    ctx.font = '20px "Arial", sans serif'; 
    //Spielfeld zeichnen  
    colorRect(0,0,canvas.width,canvas.height,'bisque'); 
    if(showingWinScreen){
        ctx.fillStyle = 'brown'; 
        if(player1Score >= winningScore) {
            ctx.fillText("Du hast gewonnen! Gratulation!", 265, 200); 
         } else if( player2Score >= winningScore){
            ctx.fillText("Der Computer hat leider gewonnen!", 250, 200);
            ctx.fillText("Schade, versuche es weiter!", 280, 230);
           }
        ctx.fillText("Click to continue", 325, 500); 
        return; 
    }
    drawNet(); 
    //draws left Player paddle
    colorRect(0,player1Y,paddleThickness,paddleHeight,'brown'); 
    //draws rigth Computer paddle
    colorRect(canvas.width - paddleThickness,player2Y,10,paddleHeight,'brown'); 
    //draws Ball 
    colorCircle(ballX, ballY, 10, 'brown'); 
    
    let p1Scoretext: string = player1Score.toString(); // Number to String für print Methode 
    let p2ScoreText: string = player2Score.toString(); 

    ctx.fillText(p1Scoretext, 100, 100); 
    ctx.fillText(p2ScoreText, canvas.width - 100, 100); 
    
}

//startGame(); 
document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        function gameLoop() {
            // updated hier alles
            moveAll();
            // rendert hier alles 
            drawAll();
          }
    
        setInterval(gameLoop, 1000 / 60); 
    }, 2000)
}) 