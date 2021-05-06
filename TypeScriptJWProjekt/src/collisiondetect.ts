/*import {player1, player2, playerHeight, playerThickness, ball} from './config';



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



export function collisionDetect(){
    //Ball an Wand bouncen lassen 
    //links: 
    if(ballX < 10){
        if( ballY > player1Y && 
            ballY < player1Y + playerHeight){
                ballSpeedX = -ballSpeedX; 
                //Ball Kontrolle links / den Ball in einem anderen Winkel zurückgeben 
                let angleY: number = ballY -(player1Y+playerHeight/2); 
                ballSpeedY = angleY * 0.35; 
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
                    let angleY = ballY -(player2Y+playerHeight/2); 
                    ballSpeedY = angleY * 0.35; 
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
    }*/ 