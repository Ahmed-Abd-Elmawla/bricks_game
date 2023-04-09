w = cvs.width;
h = cvs.height;
pad_w = 150;
pad_h = 25;
pad_m = 100;
ball_rad = 8;
leftArrow = false;
rightArrow = false;
score = 0;
index = 1;
blocks = [];
k = 0;
unBreak = 3;
arry = [];
lvl = 1;
extraLife = false;
angle = 2*Math.PI;
fillArr = [
  fil_1,
  fil_2,
  fil_3,
  fil_4,
  fil_5,
  fil_6,
  fil_7,
  fil_8,
  fil_9,
  fil_10,
  fil_1,
];
fillBrArr = [
  filBr_1,
  filBr_2,
  filBr_3,
  filBr_4,
  filBr_5,
  filBr_6,
  filBr_7,
  filBr_8,
  filBr_9,
  filBr_10,
  filBr_1,
];
bks = [bk, bk2, bk3, bk4, bk5, bk];
// create elements
const paddle = {
  x: w / 2 - pad_w / 2,
  y: h - pad_h - pad_m,
  width: pad_w,
  height: pad_h,
  dx: 5,
};
const ball = {
  x: w / 2,
  y: paddle.y - ball_rad,
  rad: ball_rad,
  fil: balPattern,
  speed: 4,
  dx: 3 * (Math.random() * 2 - 1),
  dy: -3,
};
const block = {
  row: 2,
  col: 6,
  width: 70,
  height: 30,
  ofSetTop: 30,
  ofSetLeft: 37,
  marginLeft: 50,
  marginTop: 40,
  fil: fil_1,
  filBr: filBr_1,
  filUnBr: balPattern,
};
health = {
  x: w/2,
  y: 0,
  radius:10,
  speed:4,
  dx:2,
  dy:-1
}
// draw elements
function drawPad() {
  ctx.fillStyle = block.fil;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  // ctx.fill();
}
function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = ball.fil;
  ctx.arc(ball.x, ball.y, ball.rad, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}
function creatBlocks() {
  for (let r = 0; r < block.row; r++) {
    blocks[r] = [];
    for (let c = 0; c < block.col; c++) {
      blocks[r][c] = {
        x: c * (block.width + block.ofSetLeft) + block.marginLeft,
        y:
          r * (block.height + block.ofSetTop) +
          block.ofSetTop +
          block.marginTop,
        index: index,
        crach: 2,
        status: true,
      };
      index++;
    }
  }
}
creatBlocks();
function drawBlocks() {
  for (let r = 0; r < block.row; r++) {
    for (let c = 0; c < block.col; c++) {
      let blc = blocks[r][c];
      if (blc.status) {
        if (blc.crach == 2) {
          ctx.fillStyle = block.fil;
          ctx.fillRect(blc.x, blc.y, block.width, block.height);
          // ctx.fill();
        } else if (arry.includes(blc.index)) {
          ctx.fillStyle = block.filUnBr;
          ctx.fillRect(blc.x, blc.y, block.width, block.height);
        } else if (blc.crach == 1) {
          ctx.fillStyle = block.filBr;
          ctx.fillRect(blc.x, blc.y, block.width, block.height);
        }
      }
    }
  }
}
// // move elements
document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowLeft") {
    leftArrow = true;
  } else if (e.key == "ArrowRight") {
    rightArrow = true;
  }
});
document.addEventListener("keyup", function (e) {
  if (e.key == "ArrowLeft") {
    leftArrow = false;
  } else if (e.key == "ArrowRight") {
    rightArrow = false;
  }
});
paddleX = (w - paddle.width) / 2;
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
  var relativeX = e.clientX - cvs.offsetLeft;
  if (relativeX > 0 && relativeX < w) {
    paddle.x = relativeX - paddle.width / 2;
  }
}
function movePad() {
  if (leftArrow && paddle.x > 0) {
    paddle.x -= paddle.dx;
  } else if (rightArrow && paddle.x + paddle.width < w) {
    paddle.x += paddle.dx;
  }
}
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}
function drawHealth(){
  ctx.beginPath();
  ctx.arc(health.x,health.y,health.radius,0,angle); 
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "#000";
//  // cxt.stroke();
  ctx.lineWidth = 2; 
  ctx.closePath();
}
function moveHealth(){
  health.y -= health.dy;
}
function barHealthCol(){
  let touchBar =health.y +health.radius>=paddle.y && health.y -health.radius<= paddle.y +paddle.height && health.x + health.radius>= paddle.x && health.x -health.radius <= paddle.x+paddle.width;
  if(touchBar){
      addLife();
      health.y += h;
  }
}
// draw elments
function draw() {
  drawBlocks();
  drawPad();
  drawBall();
  // drawExtra();
}
//ball collision detection
function balwalCol() {
  if (ball.x + ball.rad >= w || ball.x - ball.rad <= 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y - ball.rad <= 0) {
    ball.dy = -ball.dy;
  }
  if (ball.y + ball.rad >= h) {
    loseLife();
    resetBall();
    resetPaddle();
  }
}
function resetBall() {
  // paddle.x = w / 2 - paddle.width / 2;
  ball.x = w / 2;
  ball.y = paddle.y - ball.rad;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}
function resetPaddle() {
  paddle.x = (w - paddle.width) / 2;
}
function balPadCol() {
  if (
    ball.x - ball.rad == paddle.x &&
    ball.y + ball.rad == paddle.y &&
    paddle.x == 0
  ) {
    ball.dx = -ball.dx;
    ball.dy = -ball.dy;
  } else if (
    ball.x + ball.rad == paddle.x + paddle.width &&
    ball.y + ball.rad == paddle.y &&
    paddle.x + paddle.width == w
  ) {
    ball.dx = -ball.dx;
    ball.dy = -ball.dy;
  } else if (
    ball.x - ball.rad <= paddle.x + paddle.width &&
    ball.x + ball.rad >= paddle.x &&
    ball.y + ball.rad == paddle.y
  ) {
    let collisionPoint = ball.x - (paddle.x + paddle.width / 2);
    collisionPoint = collisionPoint / (paddle.width / 2);
    let angle = (collisionPoint * Math.PI) / 3;
    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);
  }
}
function balBlcCol() {
  for (let r = 0; r < block.row; r++) {
    for (let c = 0; c < block.col; c++) {
      let blc = blocks[r][c];
      if (arry.includes(blc.index)) {
        if (
          ball.y < blc.y + block.height &&
          ball.y > blc.y &&
          ball.x + ball.rad > blc.x &&
          ball.x - ball.rad < blc.x + block.width
        ) {
          ball.dx = -ball.dx;
          blc.crach = unBreak;
        } else if (
          ball.x > blc.x &&
          ball.x < blc.x + block.width &&
          ball.y + ball.rad > blc.y &&
          ball.y - ball.rad < blc.y + block.height
        ) {
          ball.dy = -ball.dy;
          blc.crach = unBreak;
        }
      } else if (blc.crach == 2) {
        if (
          ball.y < blc.y + block.height &&
          ball.y > blc.y &&
          ball.x + ball.rad > blc.x &&
          ball.x - ball.rad < blc.x + block.width
        ) {
          ball.dx = -ball.dx;
          blc.crach--;
        } else if (
          ball.x > blc.x &&
          ball.x < blc.x + block.width &&
          ball.y + ball.rad > blc.y &&
          ball.y - ball.rad < blc.y + block.height
        ) {
          ball.dy = -ball.dy;
          blc.crach--;
        }
      } else if (blc.status) {
        if (
          ball.y < blc.y + block.height &&
          ball.y > blc.y &&
          ball.x + ball.rad > blc.x &&
          ball.x - ball.rad < blc.x + block.width
        ) {
          ball.dx = -ball.dx;
          score++;
          if (score == 2) {
            health.x = blc.x +block.width/2;
            health.y = blc.y +block.height;
            extraLife = true;
          }
          blc.status = false;
        } else if (
          ball.x > blc.x &&
          ball.x < blc.x + block.width &&
          ball.y + ball.rad > blc.y &&
          ball.y - ball.rad < blc.y + block.height
        ) {
          ball.dy = -ball.dy;
          score++;
          if (score == 2) {
            health.x = blc.x +block.width/2;
            health.y = blc.y +block.height;
            extraLife = true;
          }
          blc.status = false;
        }
      }
    }
  }
}
function lvlDon() {
  let lvlDone = true;
  for (let r = 0; r < block.row; r++) {
    for (let c = 0; c < block.col; c++) {
      let blc = blocks[r][c];
      lvlDone =
        (lvlDone && !blc.status) || (lvlDone && arry.includes(blc.index));
    }
  }
  if (lvlDone) {
    lvl++;
    switch (lvl) {
      case 2:
        levels[9].setAttribute("src", "images/star_.png");
        block.row++;
        index = 1;
        bk_ = rand_3();
        img = bks[bk_];
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        creatBlocks();
        ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      case 3:
        levels[8].setAttribute("src", "images/star_.png");
        addLife();
        block.row++;
        index = 1;
        bk_ = rand_3();
        img = bks[bk_];
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        creatBlocks();
        ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      case 4:
        levels[7].setAttribute("src", "images/star_.png");
        block.row++;
        index = 1;
        bk_ = rand_3();
        img = bks[bk_];
        unBreak = 6;
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        rand(unBreak);
        creatBlocks();
        // ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      case 5:
        levels[6].setAttribute("src", "images/star_.png");
        block.row -= 2;
        index = 1;
        paddle.width = 100;
        block.height = 50;
        unBreak = 4;
        bk_ = rand_3();
        img = bks[bk_];
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        creatBlocks();
        // ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      case 6:
        levels[5].setAttribute("src", "images/star_.png");
        addLife();
        block.row++;
        index = 1;
        block.height = 30;
        unBreak = 4;
        bk_ = rand_3();
        img = bks[bk_];
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        creatBlocks();
        // ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      case 7:
        levels[4].setAttribute("src", "images/star_.png");
        // block.row++;
        index = 1;
        paddle.y = h - pad_h - 250;
        bk_ = rand_3();
        img = bks[bk_];
        unBreak = 5;
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        rand(unBreak);
        creatBlocks();
        // ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      case 8:
        levels[3].setAttribute("src", "images/star_.png");
        // block.row++;
        index = 1;
        bk_ = rand_3();
        img = bks[bk_];
        unBreak = 6;
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        creatBlocks();
        // ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      case 9:
        levels[2].setAttribute("src", "images/star_.png");
        addLife();
        // block.row++;
        index = 1;
        bk_ = rand_3();
        img = bks[bk_];
        unBreak = 6;
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        creatBlocks();
        ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      case 10:
        levels[1].setAttribute("src", "images/star_.png");
        // block.row++;
        index = 1;
        bk_ = rand_3();
        img = bks[bk_];
        unBreak = 8;
        indx = rand_2();
        block.fil = fillArr[indx];
        block.filBr = fillBrArr[indx];
        rand(unBreak);
        creatBlocks();
        // ball.speed += 0.5;
        resetBall();
        resetPaddle();
        break;
      default:
        levels[0].setAttribute("src", "images/star_.png");
        win();
        break;
    }
  }
}
// other functions
function rand(bk) {
  for (let i = 0; i < bk; i++) {
    m = Math.floor(Math.random() * (block.row * block.col) + 1);
    if (arry.includes(m)) {
      i--;
    } else {
      arry[i] = m;
    }
  }
}
function rand_2() {
  randNum = Math.floor(Math.random() * 10) + 1;
  return randNum;
}
function rand_3() {
  randNum = Math.floor(Math.random() * 5) + 1;
  return randNum;
}
function addLife() {
  lifs = document.querySelectorAll("img[id='lif']");
  extraLife = document.createElement("img");
  extraLife.setAttribute("src", "images/love.png");
  extraLife.setAttribute("id", "lif");
  if (lifs.length <= 5) {
    document.getElementById("life").appendChild(extraLife);
  }
}
function loseLife() {
  last = document.getElementById("life").lastChild;
  last.remove();
  last = document.getElementById("life").lastChild;
  last.remove();
  lifs = document.querySelectorAll("img[id='lif']");
  if (lifs.length == 0) {
    // location.reload();
    gameOver();
  }
}
//function update
function update() {
  movePad();
  moveBall();
  balwalCol();
  balPadCol();
  balBlcCol();
  lvlDon();
}
// the game
function game() { 
  if(extraLife){
    drawHealth();
    moveHealth();
    barHealthCol();
}
  ctx.drawImage(img, 0, 0, 1700, 1200, 0, 0, 700, 850);
  ctx.font = "30px Arial";
  ctx.fillText(score, 10, 50);
  draw();
  update();
  requestAnimationFrame(game);
}
game();
