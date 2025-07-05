const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function showHearts() {
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 10,
      speed: Math.random() * 2 + 1,
      opacity: 1
    });
  }
}

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 100, size / 100);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -30, -50, -30, -50, 0);
  ctx.bezierCurveTo(-50, 30, 0, 50, 0, 80);
  ctx.bezierCurveTo(0, 50, 50, 30, 50, 0);
  ctx.bezierCurveTo(50, -30, 0, -30, 0, 0);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.y -= heart.speed;
    heart.opacity -= 0.01;
    drawHeart(heart.x, heart.y, heart.size, heart.opacity);
    if (heart.opacity <= 0) hearts.splice(index, 1);
  });
  requestAnimationFrame(animate);
}
animate();