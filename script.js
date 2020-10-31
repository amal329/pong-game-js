var moveId;
var dir = [3,3];
var screenHeight=500,screenWidth=1200,screenMargin=27;
var screen = document.querySelector('#container');
var paddle = document.getElementById('paddle');
var paddle2 = document.getElementById('paddle2');
var ball = document.getElementById('ball');
var playerScore = document.getElementById('score');
var computerScore = document.getElementById('score2');
var computerSpeed=2;
var ballRadius=15, paddleWidth = 15, paddleHeight = 100;

function initGame() {
    resetScore();
    startNewGame();
}

function startNewGame(){
    if(parseInt(playerScore.innerText)==3 || parseInt(computerScore.innerText)==3){
        var winMessage=(parseInt(playerScore.innerText)==3)?'You Won :)':'Computer won :(';
        alert(winMessage);
        initGame();
        return;
    }
    
    var dir1=Math.round(Math.random());
    var dir2=Math.round(Math.random());

    dir[0]=(dir1===0)?3:-3;
    dir[1]=(dir1===0)?-3:3;

    clearInterval(moveId);
    // console.log("Starting New Game");
    ball.style.height=2*ballRadius+'px';
    ball.style.width=2*ballRadius+'px';
    ball.style.position = 'absolute';
    paddle.style.position = 'absolute';
    ball.style.left = 355 + 'px';
    ball.style.top = 350 + 'px';
    paddle.style.top = 95 + 'px';
    paddle2.style.top = 95 + 'px';
    paddle2.style.left=screenMargin+screenWidth-paddleWidth+'px';
    moveId = setInterval(moveBall, 10);
}

function resetScore() {
    playerScore.innerText = 0;
    computerScore.innerText = 0;
}

var firstTimeL = true,firstTimeR = true;

function moveBall() {
    var ballLeft = parseInt(ball.style.left), ballTop = parseInt(ball.style.top);
    var ballRight = ballLeft + (2 * ballRadius), ballBottom = ballTop + (2 * ballRadius);
    var paddleTop = parseInt(paddle.style.top), paddleBottom = parseInt(paddle.style.top) + paddleHeight;
    var paddle2Top = parseInt(paddle2.style.top), paddle2Bottom = parseInt(paddle2.style.top) + paddleHeight;

    if (ballLeft <= (30 + paddleWidth)) {
        if (firstTimeL){
             if((ballBottom >= paddleTop && ballBottom <= paddleBottom) || (ballTop >= paddleTop && ballTop <= paddleBottom)) {
                // console.log('case 1');
                dir[0] = -dir[0];
             }
             else{
                firstTimeL=false;
             }
        }
        else{
            if (ballLeft <= 30) {
                computerScore.innerText = parseInt(computerScore.innerText) + 1;
                startNewGame();
                return;
            }
            else if((paddleBottom >= ballTop) || (paddleTop<=ballBottom)){
                dir[1]=-dir[1];
            }       
        }
    }
    else if (ballRight >= screenMargin+screenWidth-paddleWidth) {
        if (firstTimeR){
            // console.log('First time');
            if((ballBottom >= paddle2Top && ballBottom <= paddle2Bottom) || (ballTop >= paddle2Top && ballTop <= paddle2Bottom)) {
            //    console.log('case 1 R');
               dir[0] = -dir[0];
            }
            else{
               firstTimeR=false;
            }
       }
       else{
           console.log('case 2');
           if (ballRight >= screenWidth+screenMargin) {
               playerScore.innerText = parseInt(playerScore.innerText) + 1;
               startNewGame();
               return;
           }
           else if((paddle2Bottom >= ballTop) || (paddle2Top<=ballBottom)){
               dir[1]=-dir[1];
           }       
       }
    }

    if (ballTop < 50 || ballBottom > 550) {
        dir[1] = -dir[1];
    }

    
    if (ballLeft<30 || ballLeft >= 30 + paddleWidth) {
        firstTimeL=true;
    }
    if(ballRight<=screenMargin+screenWidth-paddleWidth || ballRight>screenMargin+screenWidth){
        firstTimeR=true;
    }

    ball.style.left = ballLeft + dir[0] + 'px';
    ball.style.top = ballTop + dir[1] + 'px';

    //'Dumb Computer' logic
    if(ballRight>=screenWidth/2){
        if(ballTop<=paddle2Top){
            paddle2.style.top=paddle2Top-computerSpeed+'px';
        }
        else{
            paddle2.style.top=paddle2Top+computerSpeed+'px';
        }
    }
}

window.addEventListener('mousemove', (e) => {
    if (e.clientY >= 50 && e.clientY <= 450)
        paddle.style.top = e.clientY + 'px';
    else if (e.clientY < 50)
        paddle.style.top = 50 + 'px';
    else
        paddle.style.top = 450 + 'px';
});

function fn() {
    initGame();
    // moveId = setInterval(moveBall, 10);
}