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
var test=true;
function moveBall(){

    var ballLeft=parseInt(ball.style.left),ballTop=parseInt(ball.style.top);
    var ballRadius=25;
    var ballRight=ballLeft+(2*ballRadius),ballBottom=ballTop+(2*ballRadius);
    var paddleWidth=15,paddleHeight=100;
    var paddleTop=parseInt(paddle.style.top),paddleBottom=parseInt(paddle.style.top)+paddleHeight;
    
    if(ballLeft<=(30+paddleWidth)){

        if(test){
            console.log("Ball from"+ballTop+" to "+ballBottom);
            console.log("Paddle from"+paddleTop+" to "+paddleBottom);
            test=false;
        }

        if((ballBottom>=paddleTop && ballBottom<=paddleBottom) || (ballTop>=paddleTop && ballTop<=paddleBottom)){
            console.log('first case');
            dir[0]=-dir[0];
            updateScore();
        }
        else if((paddleBottom<=ballTop) || (paddleTop<=ballBottom)){
            // console.log(ballBottom+" "+ballTop);
            // console.log(paddleBottom+" "+paddleTop);
            console.log('second case');
            dir[1]=-dir[1];
            updateScore();
        }

        if(ballLeft<=30){
            console.log('third case');
            clearInterval(moveId);
            console.log("Ball is at "+ballLeft);
            console.log("Paddle is between "+paddleTop+" and "+paddleBottom);
            alert('GAME OVER');
            startGame();
        }
    }
    if(ballLeft>30+paddleWidth){
        test=true;
    }

    if(ballRight>1220){
        dir[0]=-dir[0];
    }
    if(ballTop<50 || ballBottom>550){
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