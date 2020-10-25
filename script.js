var moveId;
var dir=[3,3];
var screen=document.querySelector('#container');
var paddle=document.getElementById('paddle');
var ball=document.getElementById('ball');
var scoreBoard=document.getElementById('score');
var score=0;

function startGame(){
    resetScore();
    ball.style.backgroundColor='blue';
    ball.style.position='absolute';
    paddle.style.position='absolute';
    ball.style.left=55+'px';
    ball.style.top=50+'px';
    paddle.style.top=50+'px';
}

function updateScore(){
    scoreBoard.innerText=parseInt(scoreBoard.innerText)+1;
}

function resetScore(){
    scoreBoard.innerText=0;
}

function moveBall(){
    var xx=parseInt(ball.style.left),yy=parseInt(ball.style.top);
    var paddleWidth=15,paddleHeight=100;
    var paddleTop=parseInt(paddle.style.top),paddleBottom=parseInt(paddle.style.top)+paddleHeight;
    if(xx<=30+paddleWidth){
        if(xx>30 && yy+50>paddleTop && yy<paddleBottom){
            console.log("Reflected off the length");
            dir[0]=-dir[0];
            updateScore();
        }
        else if(xx>30 && yy+50==paddleTop && yy==paddleBottom){
            console.log("Reflected off the breadth");
            dir[1]=-dir[1];
        }
        else if(xx<30){
            clearInterval(moveId);
            console.log("Ball is at "+yy);
            console.log("Paddle is between "+paddleTop+" and "+paddleBottom);
            alert('GAME OVER');
            startGame();
        }
    }
    else if(xx>1170){
        dir[0]=-dir[0];
    }
    else if(yy<50 || yy>500){
        dir[1]=-dir[1];
    }    

    ball.style.left=parseInt(ball.style.left)+dir[0]+'px';
    ball.style.top=parseInt(ball.style.top)+dir[1]+'px';
}

window.addEventListener('mousemove',(e)=>{
    if(e.clientY>=50 && e.clientY<=450)
        paddle.style.top = e.clientY+'px';
    else if(e.clientY<50)
        paddle.style.top = 50+'px';
    else
        paddle.style.top = 450+'px';
});

function fn(){
    startGame();
    moveId=setInterval(moveBall,10);
}