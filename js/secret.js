// ═══════════════════════════════════════════
//   СЕКРЕТНЫЙ ПОДАРОК
//   Открывается 31.12 с 12:00
// ═══════════════════════════════════════════

const OPEN_MONTH = 11; // 11 = декабрь
const OPEN_DAY = 31;
const OPEN_HOUR = 12;

const secretLocked = document.getElementById('secretLocked');
const secretContent = document.getElementById('secretContent');
const lockSub = document.getElementById('lockSub');

// ТЕКСТ ПОЗДРАВЛЕНИЯ
const greetingLines = [
  "🎄 Аня, с Новым годом! 🎄",
  "Ты — это лучшее, что было в этом году.",
  "Спасибо тебе за то, что ты есть.",
  "Пусть в Новом году у тебя всё будет превосходно, не будет расстройств и приставал. Пусть этот год станет для тебя самым лучшим.",
  "12 19 10 5"
];


function isTimeToOpen() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  const hour = now.getHours();

  // Декабрь 31, после 12:00
  if (month === 11 && day === 31 && hour >= OPEN_HOUR) return true;
  // Январь и позже — открыто
  if (month === 0) return true;
  // Февраль и позже — открыто
  if (month > 0) return true;

  return false;
}

function timeUntilOpen() {
  const now = new Date();
  const target = new Date(now.getFullYear(), OPEN_MONTH, OPEN_DAY, OPEN_HOUR, 0, 0);
  const diff = target - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function updateLockScreen() {
  const time = timeUntilOpen();

  if (!time) {
    openSecret();
    return;
  }

  lockSub.textContent = `Откроется через ${time.days} д. ${time.hours} ч. ${time.minutes} мин. ${time.seconds} сек.`;
}

function openSecret() {
  secretLocked.style.display = 'none';
  secretContent.style.display = 'block';

  // Конфетти
  const confetti = new JSConfetti();
  confetti.addConfetti({
    emojis: ['🎉', '🎄', '⭐', '🎁', '❄️'],
    confettiNumber: 200
  });

  // Запускаем анимации
  setTimeout(() => {
    typeText();
    animatePhoto();
    flySanta();
  }, 500);
}

function typeText() {
  const container = document.getElementById('secretText');
  container.innerHTML = '';

  let lineIndex = 0;
  let charIndex = 0;

  function typeChar() {
    if (lineIndex >= greetingLines.length) return;

    if (charIndex === 0) {
      const p = document.createElement('p');
      p.className = 'secret-line';
      container.appendChild(p);
    }

    const currentLine = greetingLines[lineIndex];
    const currentP = container.children[lineIndex];

    if (charIndex < currentLine.length) {
      currentP.textContent += currentLine[charIndex];
      charIndex++;
      setTimeout(typeChar, 25);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 800);
    }
  }

  typeChar();
}

function animatePhoto() {
  const photo = document.getElementById('secretPhoto');
  photo.style.opacity = '0';
  photo.style.transform = 'scale(0.8)';
  setTimeout(() => {
    photo.style.transition = 'all 1.5s ease';
    photo.style.opacity = '1';
    photo.style.transform = 'scale(1)';
  }, 2000);
}

function flySanta() {
  // Пролёт Санты
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      if (typeof createSanta === 'function') createSanta();
    }, i * 1500);
  }
}

// Подставляем RSA-подпись
document.getElementById('rsaSignature').textContent = RSA_SIGNATURE;

// Запуск
updateLockScreen();
setInterval(updateLockScreen, 1000);
