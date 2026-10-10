const photoInput = document.getElementById('photoInput');
const photoImg = document.getElementById('photoImg');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const downloadBtn = document.getElementById('downloadBtn');
const frames = {
  tree: document.getElementById('frame-tree'),
  snowman: document.getElementById('frame-snowman'),
  winter: document.getElementById('frame-winter')
};

let currentFrame = 'tree';
let uploadedImage = null;

function selectFrame(name, btn) {
  currentFrame = name;

  // Переключаем активную кнопку
  document.querySelectorAll('.frame-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Переключаем рамку
  Object.values(frames).forEach(f => f.style.display = 'none');
  frames[name].style.display = 'block';
}

photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    uploadedImage = event.target.result;
    photoImg.src = uploadedImage;
    photoImg.style.display = 'block';
    photoPlaceholder.style.display = 'none';
    downloadBtn.disabled = false;
  };
  reader.readAsDataURL(file);
});

function downloadPhoto() {
  if (!uploadedImage) return;

  // Создаём canvas 400x500
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');

  // Рисуем фото (обрезаем по размеру)
  const img = new Image();
  img.onload = () => {
    // Соотношение сторон
    const targetRatio = 400 / 500;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > targetRatio) {
      drawHeight = 500;
      drawWidth = img.width * (500 / img.height);
      offsetX = (400 - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = 400;
      drawHeight = img.height * (400 / img.width);
      offsetX = 0;
      offsetY = (500 - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Рисуем рамку
    drawFrame(ctx, currentFrame);

    // Скачиваем
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'new-year-photo.png';
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  img.src = uploadedImage;
}

function drawFrame(ctx, frameName) {
  const W = 400, H = 500;

  if (frameName === 'tree') {
    // Углы — ёлки
    ctx.fillStyle = '#0a5f0a';
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(60,0); ctx.lineTo(0,60); ctx.fill();
    ctx.beginPath(); ctx.moveTo(W,0); ctx.lineTo(W-60,0); ctx.lineTo(W,60); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0,H); ctx.lineTo(60,H); ctx.lineTo(0,H-60); ctx.fill();
    ctx.beginPath(); ctx.moveTo(W,H); ctx.lineTo(W-60,H); ctx.lineTo(W,H-60); ctx.fill();

    // Звёзды
    ctx.fillStyle = '#d4af37';
    drawStar(ctx, 30, 30, 5, 12, 5);
    drawStar(ctx, W-30, 30, 5, 12, 5);
    drawStar(ctx, 30, H-30, 5, 12, 5);
    drawStar(ctx, W-30, H-30, 5, 12, 5);

    // Шарики
    ctx.fillStyle = '#ff3333';
    ctx.beginPath(); ctx.arc(W/2, 15, 8, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(W/2, H-15, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#3333ff';
    ctx.beginPath(); ctx.arc(15, H/2, 8, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(W-15, H/2, 8, 0, Math.PI*2); ctx.fill();

    // Рамка
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(5, 5, W-10, H-10);
  }

  else if (frameName === 'snowman') {
    // Рамка
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.strokeRect(5, 5, W-10, H-10);

    // Снеговики на углах
    drawSnowman(ctx, 30, 30);
    drawSnowman(ctx, W-30, 30);
    drawSnowman(ctx, 30, H-30);
    drawSnowman(ctx, W-30, H-30);

    // Снежинки
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('❄', W/2, 25);
    ctx.fillText('❄', W/2, H-10);
  }

  else if (frameName === 'winter') {
    // Рамка
    ctx.strokeStyle = '#6a8fc5';
    ctx.lineWidth = 4;
    ctx.strokeRect(5, 5, W-10, H-10);

    // Снежинки на углах
    drawSnowflake(ctx, 30, 30);
    drawSnowflake(ctx, W-30, 30);
    drawSnowflake(ctx, 30, H-30);
    drawSnowflake(ctx, W-30, H-30);

    // Точки
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(W/2, 15, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(W/2, H-15, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(15, H/2, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(W-15, H/2, 3, 0, Math.PI*2); ctx.fill();
  }
}

function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerR);
  ctx.closePath();
  ctx.fill();
}

function drawSnowman(ctx, cx, cy) {
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy-14, 9, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy-24, 6, 0, Math.PI*2); ctx.fill();
  // Глаза
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.arc(cx-3, cy-25, 1.2, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+3, cy-25, 1.2, 0, Math.PI*2); ctx.fill();
  // Нос
  ctx.fillStyle = '#ff6600';
  ctx.beginPath(); ctx.moveTo(cx, cy-23); ctx.lineTo(cx+8, cy-22); ctx.lineTo(cx, cy-21); ctx.fill();
  // Шарф
  ctx.fillStyle = '#c02020';
  ctx.fillRect(cx-8, cy-16, 16, 3);
}

function drawSnowflake(ctx, cx, cy) {
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx-15, cy); ctx.lineTo(cx+15, cy);
  ctx.moveTo(cx, cy-15); ctx.lineTo(cx, cy+15);
  ctx.moveTo(cx-10, cy-10); ctx.lineTo(cx+10, cy+10);
  ctx.moveTo(cx-10, cy+10); ctx.lineTo(cx+10, cy-10);
  ctx.stroke();
}