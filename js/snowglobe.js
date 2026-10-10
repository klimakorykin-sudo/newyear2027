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
const flakeCount = 60;

function globeCircle() {
  return {
    cx: width * 0.5,
    cy: height * 0.46,
    r: width * 0.42
  };
}

for (let i = 0; i < flakeCount; i++) {
  const { cx, cy, r } = globeCircle();
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.random() * r * 0.85;
  flakes.push({
    x: cx + Math.cos(angle) * dist,
    y: cy + Math.sin(angle) * dist,
    vx: (Math.random() - 0.5) * 0.4,
    vy: Math.random() * 0.3 + 0.1,
    size: Math.random() * 2.5 + 1.5,
    opacity: Math.random() * 0.7 + 0.3
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  const { cx, cy, r } = globeCircle();

  // СИЛЬНОЕ расталкивание
  for (let i = 0; i < flakes.length; i++) {
    for (let j = i + 1; j < flakes.length; j++) {
      const a = flakes[i];
      const b = flakes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = a.size + b.size + 4;

      if (dist < minDist && dist > 0.1) {
        const angle = Math.atan2(dy, dx);
        const overlap = minDist - dist;
        const pushX = Math.cos(angle) * overlap * 0.5;
        const pushY = Math.sin(angle) * overlap * 0.5;

        a.x -= pushX;
        a.y -= pushY;
        b.x += pushX;
        b.y += pushY;

        // Обмен скоростями
        const tempVx = a.vx;
        const tempVy = a.vy;
        a.vx = b.vx * 0.6;
        a.vy = b.vy * 0.6;
        b.vx = tempVx * 0.6;
        b.vy = tempVy * 0.6;
      }
    }
  }

  flakes.forEach(f => {
    f.vy += 0.01;
    f.x += f.vx;
    f.y += f.vy;
    f.vx *= 0.98;

    const dx = f.x - cx;
    const dy = f.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > r - 10) {
      const angle = Math.atan2(dy, dx);
      f.x = cx + Math.cos(angle) * (r - 10);
      f.y = cy + Math.sin(angle) * (r - 10);
      f.vx *= -0.3;
      f.vy *= -0.3;
    }

    if (Math.abs(f.vy) < 0.03 && f.y > cy + r * 0.4) {
      f.vy = -Math.random() * 0.6 - 0.3;
      f.vx = (Math.random() - 0.5) * 0.6;
    }

    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

let lastX = 0, lastY = 0;
let isShaking = false;

function shake(x, y) {
  const dx = x - lastX;
  const dy = y - lastY;
  flakes.forEach(f => {
    f.vx += dx * 0.5;
    f.vy += dy * 0.5;
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
