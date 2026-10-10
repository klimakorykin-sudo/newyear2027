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

  // Летит СЛЕВА НАПРАВО
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

function scheduleSanta() {
  const delay = 30000 + Math.random() * 60000;
  setTimeout(() => { createSanta(); scheduleSanta(); }, delay);
}
scheduleSanta();
