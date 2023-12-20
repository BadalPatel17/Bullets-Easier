const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 30,
  width: 50,
  height: 10,
  speed: 15,
};

const bullets = [];
const circles = [];

function drawPlayer() {
  ctx.fillStyle = "#00f";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullet(bullet) {
  ctx.fillStyle = "red";
  ctx.fillRect(bullet.x, bullet.y, 5, 10);
}

function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function movePlayer(event) {
  if (event.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  } else if (
    event.key === "ArrowRight" &&
    player.x < canvas.width - player.width
  ) {
    player.x += player.speed;
  }
}

function createCircle() {
  const radius = Math.random() * 20 + 10;
  const circle = {
    x: Math.random() * (canvas.width - 2 * radius) + radius,
    y: Math.random() * (canvas.height / 2 - 2 * radius) + radius,
    radius: radius,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
  };
  circles.push(circle);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  circles.forEach((circle) => {
    drawCircle(circle);

    circle.x += circle.dx;
    circle.y += circle.dy;

    if (
      circle.x - circle.radius < 0 ||
      circle.x + circle.radius > canvas.width
    ) {
      circle.dx = -circle.dx;
    }

    if (
      circle.y - circle.radius < 0 ||
      circle.y + circle.radius > canvas.height / 2
    ) {
      circle.dy = -circle.dy;
    }
  });

  bullets.forEach((bullet, bulletIndex) => {
    drawBullet(bullet);
    bullet.y -= 5;

    if (bullet.y < 0) {
      bullets.splice(bulletIndex, 1);
    }

    circles.forEach((circle, circleIndex) => {
      const distance = Math.sqrt(
        (bullet.x - circle.x) ** 2 + (bullet.y - circle.y) ** 2
      );

      if (distance < circle.radius + 5) {
        bullets.splice(bulletIndex, 1);
        circles.splice(circleIndex, 1);
      }
    });
  });

  requestAnimationFrame(draw);
}

function fireBullet() {
  const bullet = {
    x: player.x + player.width / 2 - 2.5,
    y: player.y,
  };
  bullets.push(bullet);
}

document.addEventListener("keydown", movePlayer);
document.addEventListener("mousedown", fireBullet);

setInterval(createCircle, 1000);

draw();
