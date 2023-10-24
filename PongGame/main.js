let canvasWidth = 700;
let canvasHeight = 400;
let run = false;
let player1Points = 0
let player2Points = 0
let ctx;

function startGame(){
    const startScreen = document.querySelector('.startScreen');
    startScreen.style.display = 'none';
    run = true;
    if (run) {
        let canvas = document.createElement('canvas');
        canvas.id = "canvas";
        document.body.appendChild(canvas);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx = canvas.getContext("2d");
        requestAnimationFrame(update);
        document.addEventListener('keyup', movePlayer)
    }

}




playerWidth = 10;
playerHeight = 90;
playerYSpeed = 0

pad1 = {
    x: playerWidth,
    y:canvasHeight / 2 - playerHeight + playerHeight / 2,
    width:playerWidth,
    height:playerHeight,
    ySpeed:playerYSpeed
}

pad2 = {
    x: canvasWidth - playerWidth * 2,
    y:canvasHeight / 2 - playerHeight + playerHeight / 2 ,
    width:playerWidth,
    height:playerHeight,
    ySpeed:playerYSpeed
}

ball = {
    x:canvasWidth / 2 + 2,
    y: canvasHeight / 2,
    radius: 10,
    dx : 3,
    dy: 3
}

function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)


    // player 1
    ctx.fillStyle = 'white';
    let newPad1Y = pad1.y + pad1.ySpeed;
    if(!outOfBounds(newPad1Y)){
        pad1.y = newPad1Y;
    }
    ctx.fillRect(pad1.x, pad1.y, pad1.width, pad1.height)
    
    let newPad2Y = pad2.y + pad2.ySpeed;
    if(!outOfBounds(newPad2Y)){
        pad2.y = newPad2Y;
    }
        // player 2
    ctx.fillStyle = 'white';
    ctx.fillRect(pad2.x, pad2.y, pad2.width, pad2.height)

    //net 
    ctx.fillRect(canvasWidth/2, 0, 5, canvasHeight)
    
    // ball
    ball.y += ball.dy;
    ball.x += ball.dx;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    if (isCollision(ball,pad1)){
        if (ball.x <= pad1.x + pad1.height){
            ball.dx *= -1
        }
    }
    if (isCollision(ball,pad2)){
        if (ball.x + ball.radius * 2 >= pad2.x){
            ball.dx *= -1
        }
    }

    if (ball.x < 0) {
        player2Points += 1
        ball.x = canvasWidth / 2 + 2
        ball.y = canvasHeight / 2
    } else if (ball.x > canvasWidth){
        player1Points += 1
        ball.x = canvasWidth / 2 + 2
        ball.y = canvasHeight / 2
    }

    document.querySelector('.player1').innerHTML = `Player 1: <br> ${player1Points}`
document.querySelector('.player2').innerHTML = `Player 2: <br> ${player2Points}`
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}


function movePlayer(e){
    if (e.code === 'KeyW'){
        pad1.ySpeed = -5;
    }
    else if (e.code === 'KeyS'){
        pad1.ySpeed = 5;
    }
    
    if (e.code === 'ArrowUp'){
        pad2.ySpeed = -4;
    }
    else if (e.code === 'ArrowDown'){
        pad2.ySpeed = 4;
    }
}

function outOfBounds(ypos){
    return (ypos < 0 || ypos + playerHeight > canvasHeight);
}

function isCollision(ball,pad){
    return  ball.x < pad.x + pad.width &&
            ball.x + ball.radius * 2> pad.x &&
            ball.y < pad.y + pad.height &&
            ball.y + ball.radius * 2 > pad.y
}

