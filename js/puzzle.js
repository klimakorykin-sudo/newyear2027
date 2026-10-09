const parts = document.querySelectorAll('.part');
const slots = document.querySelectorAll('.slot');
const puzzleDone = document.getElementById('puzzleDone');

let draggedPart = null;
let correctCount = 0;

parts.forEach(part => {
  part.addEventListener('dragstart', (e) => {
    draggedPart = part;
    part.classList.add('dragging');
  });
  part.addEventListener('dragend', () => {
    part.classList.remove('dragging');
  });
});

slots.forEach(slot => {
  slot.addEventListener('dragover', (e) => e.preventDefault());
  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!draggedPart) return;
    const partType = draggedPart.dataset.part;
    const slotType = slot.dataset.slot;

    if (partType === slotType && !slot.classList.contains('filled')) {
      slot.innerHTML = draggedPart.innerHTML;
      slot.classList.add('filled');
      draggedPart.classList.add('used');
      draggedPart.setAttribute('draggable', 'false');
      correctCount++;
      draggedPart = null;

      if (correctCount === slots.length) {
        puzzleDone.style.display = 'block';
        const confetti = new JSConfetti();
        confetti.addConfetti({ emojis: ['🎉','🎄','⭐'], confettiNumber: 150 });
      }
    }
  });
});