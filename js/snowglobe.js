const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
const globe = document.getElementById('globe');

let width, height;

function resize() {
  const rect = globe.getBoundingClientRect();
  width = canvas.width = rect.width;
  height = canvas.height = rect.height;
}
resize();
window.addEventListener('resize', resize);

const flakes = [];
const flakeCount = 80;

// Область шара (примерно)
const globeCircle = {
  cx: () => width / 2,
  cy: () => height * 0.46,
  r: () => width * 0.42
};

for (let i = 0; i < flakeCount; i++) {
  flakes.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: Math.random() * 0.5 + 0.2,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.7 + 0.3
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  const cx = globeCircle.cx();
  const cy = globeCircle.cy();
  const r = globeCircle.r();

  flakes.forEach(f => {
    // Гравитация
    f.vy += 0.02;
    f.x += f.vx;
    f.y += f.vy;

    // Трение
    f.vx *= 0.99;

    // Ограничение внутри шара
    const dx = f.x - cx;
    const dy = f.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > r - 5) {
      const angle = Math.atan2(dy, dx);
      f.x = cx + Math.cos(angle) * (r - 5);
      f.y = cy + Math.sin(angle) * (r - 5);
      f.vx *= -0.5;
      f.vy *= -0.5;
    }

    // Отрисовка
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

// Тряска
let lastX = 0, lastY = 0;
let isShaking = false;

function shake(x, y) {
  const dx = x - lastX;
  const dy = y - lastY;
  flakes.forEach(f => {
    f.vx += dx * 0.3;
    f.vy += dy * 0.3;
  });
  lastX = x;
  lastY = y;
}

globe.addEventListener('mousedown', (e) => {
  isShaking = true;
  lastX = e.clientX;
  lastY = e.clientY;
});
window.addEventListener('mouseup', () => isShaking = false);
window.addEventListener('mousemove', (e) => {
  if (isShaking) shake(e.clientX, e.clientY);
});

globe.addEventListener('touchstart', (e) => {
  isShaking = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
});
window.addEventListener('touchend', () => isShaking = false);
window.addEventListener('touchmove', (e) => {
  if (isShaking) {
    shake(e.touches[0].clientX, e.touches[0].clientY);
  }
});