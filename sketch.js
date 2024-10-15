let balls = [];
let numBalls = 8;
let grabbedBall = null; // 記錄被抓住的球
let maxSpeed = 10; // 設定最大速度，以避免球過快消失

function setup() {
  createCanvas(800, 600);

  // 初始化每顆球的位置、大小、速度和顏色
  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: random(width),
      y: random(height),
      size: random(30, 60),
      speedX: random(-3, 3),
      speedY: random(-3, 3),
      color: [random(100, 255), random(100, 255), random(100, 255)]
    });
  }
}

function draw() {
  background(0); // 將背景設為黑色

  // 更新和顯示每顆球
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    // 隨機變化球的顏色
    ball.color = [
      random(100, 255),
      random(100, 255),
      random(100, 255)
    ];

    // 畫出球
    fill(ball.color);
    noStroke();
    ellipse(ball.x, ball.y, ball.size);

    // 如果球被抓住，讓球隨滑鼠移動
    if (grabbedBall === ball) {
      ball.x = mouseX;
      ball.y = mouseY;
    } else {
      // 更新球的位置
      ball.x += ball.speedX;
      ball.y += ball.speedY;

      // 碰到邊界時反彈並加速
      if (ball.x < ball.size / 2 || ball.x > width - ball.size / 2) {
        ball.speedX *= -1.05; // 反彈並稍微加速
        ball.speedX = constrain(ball.speedX, -maxSpeed, maxSpeed); // 限制速度
      }
      if (ball.y < ball.size / 2 || ball.y > height - ball.size / 2) {
        ball.speedY *= -1.05; // 反彈並稍微加速
        ball.speedY = constrain(ball.speedY, -maxSpeed, maxSpeed); // 限制速度
      }

      // 當滑鼠靠近球時加速
      if (dist(mouseX, mouseY, ball.x, ball.y) < ball.size / 2) {
        ball.speedX *= 1.02;
        ball.speedY *= 1.02;
        ball.speedX = constrain(ball.speedX, -maxSpeed, maxSpeed); // 限制速度
        ball.speedY = constrain(ball.speedY, -maxSpeed, maxSpeed); // 限制速度
      }
    }
  }
}

function mousePressed() {
  // 檢查是否點擊到任意一顆球
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (dist(mouseX, mouseY, ball.x, ball.y) < ball.size / 2) {
      grabbedBall = ball; // 設定被抓住的球
      ball.speedX = 0; // 停止球的速度
      ball.speedY = 0;
      break;
    }
  }
}

function mouseReleased() {
  // 放開滑鼠時讓被抓住的球恢復隨機速度
  if (grabbedBall) {
    grabbedBall.speedX = random(-3, 3);
    grabbedBall.speedY = random(-3, 3);
    grabbedBall = null; // 釋放球
  }
}
