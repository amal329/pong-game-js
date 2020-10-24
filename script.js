var moveId;
var dir=[1.8,1]
console.log('Connected');

function init(){
    let ball=document.getElementById('ball');
    let wall=document.getElementById('container');
    ball.style.backgroundColor='blue';
    ball.style.position='absolute';
    ball.style.left=55+'px';
    ball.style.top=50+'px';
}

function moveLeft(){
    let ball=document.getElementById('ball');
    var xx=parseInt(ball.style.left),yy=parseInt(ball.style.top);
    if(xx>1170 || xx<32){
        dir[0]=-dir[0];
    }
    else if(yy<50 || yy>500){
        dir[1]=-dir[1];
    }    

    ball.style.left=parseInt(ball.style.left)+dir[0]+'px';
    ball.style.top=parseInt(ball.style.top)+dir[1]+'px';
}

function fn(){
    init();
    moveId=setInterval(moveLeft,10);
}