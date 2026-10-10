const roomTime = document.getElementById('roomTime');
const poses = {
  sleep: document.getElementById('pose-sleep'),
  sit: document.getElementById('pose-sit'),
  stand: document.getElementById('pose-stand'),
  walk: document.getElementById('pose-walk')
};

const lampGlow = document.getElementById('lampGlow');
const lampLight = document.getElementById('lampLight');
const windowNight = document.getElementById('windowNight');
const windowDay = document.getElementById('windowDay');

const compliments = [
  "Ты — свет этого Нового года.",
  "Тебя ждёт что-то очень хорошее.",
  "Ты умнее, чем думаешь.",
  "Ты — чудо.",
  "Твоя улыбка согревает.",
  "Ты не одна. Рядом всегда кто-то есть.",
  "Ты делаешь этот мир лучше.",
  "В тебе больше силы, чем ты думаешь."
];

const advices = [
  "Загадай желание — оно сбудется.",
  "Улыбнись сегодня кому-то просто так.",
  "Сделай то, что давно откладывала.",
  "Позвони тому, кого давно не слышала.",
  "Поверь в себя — ты справишься.",
  "Отдохни. Ты заслужила.",
  "Скажи кому-то спасибо.",
  "Позволь себе быть счастливой."
];

function showPose(name) {
  Object.values(poses).forEach(p => p.style.display = 'none');
  if (poses[name]) poses[name].style.display = 'block';
}

function updateRoom() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  roomTime.textContent = `Сейчас ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

  if (h >= 0 && h < 7) {
    showPose('sleep');
    lampGlow.setAttribute('opacity', '0');
    lampLight.setAttribute('opacity', '0.2');
    windowNight.setAttribute('opacity', '1');
    windowDay.setAttribute('opacity', '0');
    document.getElementById('wall').setAttribute('fill', '#1a1028');
  } else if (h >= 7 && h < 10) {
    showPose('walk');
    lampGlow.setAttribute('opacity', '0.08');
    lampLight.setAttribute('opacity', '0.8');
    windowNight.setAttribute('opacity', '0');
    windowDay.setAttribute('opacity', '1');
    document.getElementById('wall').setAttribute('fill', '#3a2a4a');
  } else if (h >= 10 && h < 13) {
    showPose('stand');
    lampGlow.setAttribute('opacity', '0.05');
    lampLight.setAttribute('opacity', '0.6');
    windowNight.setAttribute('opacity', '0');
    windowDay.setAttribute('opacity', '1');
    document.getElementById('wall').setAttribute('fill', '#4a3a5a');
  } else if (h >= 13 && h < 14) {
    showPose('sit');
    lampGlow.setAttribute('opacity', '0.05');
    lampLight.setAttribute('opacity', '0.6');
    windowNight.setAttribute('opacity', '0');
    windowDay.setAttribute('opacity', '1');
    document.getElementById('wall').setAttribute('fill', '#4a3a5a');
  } else if (h >= 14 && h < 18) {
    showPose('walk');
    lampGlow.setAttribute('opacity', '0.05');
    lampLight.setAttribute('opacity', '0.6');
    windowNight.setAttribute('opacity', '0');
    windowDay.setAttribute('opacity', '1');
    document.getElementById('wall').setAttribute('fill', '#4a3a5a');
  } else if (h >= 18 && h < 22) {
    showPose('stand');
    lampGlow.setAttribute('opacity', '0.12');
    lampLight.setAttribute('opacity', '1');
    windowNight.setAttribute('opacity', '0.7');
    windowDay.setAttribute('opacity', '0');
    document.getElementById('wall').setAttribute('fill', '#3a2a4a');
  } else {
    showPose('sleep');
    lampGlow.setAttribute('opacity', '0.05');
    lampLight.setAttribute('opacity', '0.4');
    windowNight.setAttribute('opacity', '1');
    windowDay.setAttribute('opacity', '0');
    document.getElementById('wall').setAttribute('fill', '#2a1a3a');
  }

  const garland = document.querySelectorAll('#treeGarland circle, #wallGarland circle');
  garland.forEach((c, i) => {
    const colors = ['#ffd700', '#ff3333', '#3333ff', '#00cc00'];
    c.setAttribute('fill', colors[(Math.floor(Date.now() / 500) + i) % colors.length]);
  });
}

function isGiftTime() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  return (month === 11 && day === 31) || (month === 0 && day >= 1 && day <= 9);
}

document.getElementById('giftsClick').addEventListener('click', () => {
  const modal = document.getElementById('giftModal');
  const text = document.getElementById('giftText');

  if (!isGiftTime()) {
    text.innerHTML = '🎁 <b>Подарки пока закрыты магией.</b><br><br>Подожди до 31.12 — и <b>Наруто</b> покажет тебе свои дары.';
    modal.classList.add('show');
    return;
  }

  const compliment = compliments[Math.floor(Math.random() * compliments.length)];
  const advice = advices[Math.floor(Math.random() * advices.length)];

  const confetti = new JSConfetti();
  confetti.addConfetti({ emojis: ['🎉','🎄','⭐','🎁'], confettiNumber: 100 });

  text.innerHTML = `✨ <b>Комплимент:</b><br>${compliment}<br><br>💡 <b>Совет:</b><br>${advice}`;
  modal.classList.add('show');
});

function closeGiftModal() {
  document.getElementById('giftModal').classList.remove('show');
}

updateRoom();
setInterval(updateRoom, 1000);