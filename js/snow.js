function createSnow() {
  const container = document.getElementById('snow');
  if (!container) return;

  const chars = ['❄', '❅', '❆'];
  for (let i = 0; i < 70; i++) {
    const flake = document.createElement('div');
    flake.textContent = chars[Math.floor(Math.random() * chars.length)];
    flake.style.cssText = `
      position: absolute;
      color: white;
      opacity: ${0.2 + Math.random() * 0.6};
      font-size: ${6 + Math.random() * 10}px;
      left: ${Math.random() * 100}%;
      top: -30px;
      animation: fall ${8 + Math.random() * 10}s linear infinite;
      animation-delay: ${Math.random() * 15}s;
      pointer-events: none;
    `;
    container.appendChild(flake);
  }
}

const style = document.createElement('style');
style.textContent = `@keyframes fall { to { transform: translateY(110vh) rotate(360deg); } }`;
document.head.appendChild(style);
createSnow();