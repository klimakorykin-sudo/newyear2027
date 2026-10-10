function createSanta() {
  const container = document.getElementById('santa-container');
  if (!container) return;

  const santa = document.createElement('img');
  santa.src = 'assets/images/santa.png';
  santa.className = 'santa';
  santa.onerror = function() {
    this.remove();
  };
  container.appendChild(santa);

  const startX = -300;
  const endX = window.innerWidth + 300;
  const startY = 50 + Math.random() * (window.innerHeight * 0.4);
  const duration = 14000 + Math.random() * 6000;

  santa.style.left = startX + 'px';
  santa.style.top = startY + 'px';

  const anim = santa.animate([
    { transform: 'translateX(0) translateY(0)' },
    { transform: `translateX(${endX - startX}px) translateY(${(Math.random() - 0.5) * 80}px)` }
  ], { duration, easing: 'linear' });

  anim.onfinish = () => santa.remove();
}

// Отряд Сант — друг за другом
function createSantaSquad() {
  const count = 5 + Math.floor(Math.random() * 6); // 5-10
  const gap = 800; // задержка между ними
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createSantaWithOffset(i * 60);
    }, i * gap);
  }
}

function createSantaWithOffset(offsetY) {
  const container = document.getElementById('santa-container');
  if (!container) return;

  const santa = document.createElement('img');
  santa.src = 'assets/images/santa.png';
  santa.className = 'santa';
  santa.onerror = function() { this.remove(); };
  container.appendChild(santa);

  const startX = -300;
  const endX = window.innerWidth + 300;
  const startY = 50 + Math.random() * (window.innerHeight * 0.3) + offsetY;
  const duration = 14000 + Math.random() * 4000;

  santa.style.left = startX + 'px';
  santa.style.top = startY + 'px';

  const anim = santa.animate([
    { transform: 'translateX(0) translateY(0)' },
    { transform: `translateX(${endX - startX}px) translateY(${(Math.random() - 0.5) * 40}px)` }
  ], { duration, easing: 'linear' });

  anim.onfinish = () => santa.remove();
}

// Обычный Санта — каждые 30-90 сек
function scheduleSanta() {
  const delay = 30000 + Math.random() * 60000;
  setTimeout(() => { createSanta(); scheduleSanta(); }, delay);
}

// Отряд — редко, раз в 10-20 минут
function scheduleSquad() {
  const delay = 600000 + Math.random() * 600000; // 10-20 мин
  setTimeout(() => { createSantaSquad(); scheduleSquad(); }, delay);
}

scheduleSanta();
scheduleSquad();
