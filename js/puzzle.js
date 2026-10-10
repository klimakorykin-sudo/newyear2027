let currentType = 'tree';
let draggedPart = null;
let selectedPart = null;
let correctCount = 0;
let totalSlots = 5;

function selectPuzzle(type, btn) {
  currentType = type;

  document.querySelectorAll('.puzzle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.getElementById('puzzleTitle').textContent =
    type === 'tree' ? '🧩 Собери ёлку' : '🧩 Собери снеговика';

  document.querySelectorAll('.tree-part').forEach(p => p.style.display = type === 'tree' ? 'block' : 'none');
  document.querySelectorAll('.snowman-part').forEach(p => p.style.display = type === 'snowman' ? 'block' : 'none');

  document.querySelectorAll('.slot').forEach(s => {
    if (s.classList.contains('snowman-slot')) {
      s.style.display = (type === 'snowman' && !s.classList.contains('filled')) ? 'flex' : 'none';
    } else {
      s.style.display = (type === 'tree' && !s.classList.contains('filled')) ? 'flex' : 'none';
    }
  });

  resetPuzzle();
}

function resetPuzzle() {
  correctCount = 0;
  document.getElementById('puzzleDone').style.display = 'none';

  document.querySelectorAll('.slot').forEach(s => {
    s.innerHTML = '';
    s.classList.remove('filled');
    s.classList.add('invisible');
  });

  document.querySelectorAll('.part').forEach(p => {
    p.classList.remove('used');
    p.setAttribute('draggable', 'true');
    p.style.outline = 'none';
  });

  totalSlots = 5;
}

document.querySelectorAll('.part').forEach(part => {
  part.addEventListener('dragstart', () => {
    draggedPart = part;
    part.classList.add('dragging');
  });
  part.addEventListener('dragend', () => {
    part.classList.remove('dragging');
  });
});

document.querySelectorAll('.slot').forEach(slot => {
  slot.addEventListener('dragover', (e) => e.preventDefault());
  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!draggedPart) return;
    tryPlace(draggedPart, slot);
  });
});

document.querySelectorAll('.part').forEach(part => {
  part.addEventListener('click', () => {
    if (part.classList.contains('used')) return;
    if (selectedPart) selectedPart.style.outline = 'none';
    selectedPart = part;
    part.style.outline = '2px solid #d4af37';
  });
});

document.querySelectorAll('.slot').forEach(slot => {
  slot.addEventListener('click', () => {
    if (!selectedPart) return;
    tryPlace(selectedPart, slot);
  });
});

function tryPlace(part, slot) {
  const partType = part.dataset.part;
  const slotType = slot.dataset.slot;

  if (partType === slotType && !slot.classList.contains('filled')) {
    slot.innerHTML = part.innerHTML;
    slot.classList.add('filled');
    slot.classList.remove('invisible');
    part.classList.add('used');
    part.setAttribute('draggable', 'false');
    part.style.outline = 'none';
    correctCount++;
    draggedPart = null;
    selectedPart = null;

    if (correctCount === totalSlots) {
      document.getElementById('puzzleDone').style.display = 'block';
      const confetti = new JSConfetti();
      confetti.addConfetti({ emojis: ['🎉','🎄','⛄','⭐'], confettiNumber: 150 });
    }
  }
}

selectPuzzle('tree', document.querySelector('.puzzle-btn.active'));
