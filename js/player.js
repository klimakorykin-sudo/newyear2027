const tracks = [
  { title: 'Last Christmas', artist: 'Wham!', src: 'assets/music/last-christmas.mp3' },
  { title: 'Jingle Bell Rock', artist: 'Bobby Helms', src: 'assets/music/jingle-bell-rock.mp3' },
  { title: 'All I Want for Christmas', artist: 'Mariah Carey', src: 'assets/music/all-i-want.mp3' },
  { title: 'Snowman', artist: 'Sia', src: 'assets/music/snowman.mp3' },
  { title: 'Let It Snow', artist: 'Dean Martin', src: 'assets/music/let-it-snow.mp3' }
];

let currentIndex = 0;
const audio = new Audio();
audio.volume = 0.7;

const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const progressFill = document.getElementById('progressFill');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const vinyl = document.getElementById('vinyl');
const playIcon = document.getElementById('playIcon');
const playlistEl = document.getElementById('playlist');
const volumeSlider = document.getElementById('volume');

// Строим плейлист
tracks.forEach((track, i) => {
  const item = document.createElement('div');
  item.className = 'playlist-item';
  item.innerHTML = `<span>${track.title}</span><span>${track.artist}</span>`;
  item.onclick = () => loadTrack(i, true);
  playlistEl.appendChild(item);
});

function loadTrack(index, autoplay = false) {
  currentIndex = index;
  const track = tracks[index];
  audio.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;

  document.querySelectorAll('.playlist-item').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  if (autoplay) {
    audio.play();
    updatePlayIcon(true);
  }
}

function togglePlay() {
  if (!audio.src) loadTrack(0, true);
  if (audio.paused) {
    audio.play();
    updatePlayIcon(true);
  } else {
    audio.pause();
    updatePlayIcon(false);
  }
}

function updatePlayIcon(playing) {
  if (playing) {
    playIcon.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
    vinyl.classList.add('playing');
  } else {
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    vinyl.classList.remove('playing');
  }
}

function nextTrack() {
  loadTrack((currentIndex + 1) % tracks.length, true);
}
function prevTrack() {
  loadTrack((currentIndex - 1 + tracks.length) % tracks.length, true);
}

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = percent + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

audio.addEventListener('ended', nextTrack);

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  if (audio.duration) audio.currentTime = percent * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

loadTrack(0, false);