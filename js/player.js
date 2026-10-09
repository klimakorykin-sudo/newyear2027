const tracks = [
  // Классика
  { title: 'Last Christmas', artist: 'Wham!', src: 'assets/music/last-christmas.mp3' },
  { title: 'Jingle Bell Rock', artist: 'Bobby Helms', src: 'assets/music/jingle-bell-rock.mp3' },
  { title: 'Rockin\' Around the Christmas Tree', artist: 'Brenda Lee', src: 'assets/music/rockin-around.mp3' },
  { title: 'Let It Snow! Let It Snow! Let It Snow!', artist: 'Dean Martin', src: 'assets/music/let-it-snow.mp3' },
  { title: 'White Christmas', artist: 'Bing Crosby', src: 'assets/music/white-christmas.mp3' },
  { title: 'The Christmas Song', artist: 'Nat King Cole', src: 'assets/music/the-christmas-song.mp3' },
  { title: 'Have Yourself a Merry Little Christmas', artist: 'Frank Sinatra', src: 'assets/music/have-yourself-frank.mp3' },
  { title: 'Winter Wonderland', artist: 'Michael Bublé', src: 'assets/music/winter-wonderland.mp3' },

  // Из «Один дома»
  { title: 'Somewhere in My Memory', artist: 'John Williams', src: 'assets/music/somewhere-in-my-memory.mp3' },
  { title: 'Carol of the Bells', artist: 'John Williams', src: 'assets/music/carol-of-the-bells.mp3' },
  { title: 'Have Yourself a Merry Little Christmas', artist: 'Mel Tormé', src: 'assets/music/have-yourself.mp3' },

  // Спокойные, атмосферные
  { title: 'Snowman', artist: 'Sia', src: 'assets/music/snowman.mp3' },

  // Современные
  { title: 'All I Want for Christmas Is You', artist: 'Mariah Carey', src: 'assets/music/all-i-want.mp3' },
  { title: 'Mistletoe', artist: 'Justin Bieber', src: 'assets/music/mistletoe.mp3' },
  { title: 'Underneath the Tree', artist: 'Kelly Clarkson', src: 'assets/music/underneath-the-tree.mp3' },
  { title: 'Santa Tell Me', artist: 'Ariana Grande', src: 'assets/music/santa-tell-me.mp3' },
  { title: 'It\'s Beginning to Look a Lot Like Christmas', artist: 'Michael Bublé', src: 'assets/music/beginning-to-look.mp3' }
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
const dancingCat = document.getElementById('dancingCat');
const playIcon = document.getElementById('playIcon');
const playlistEl = document.getElementById('playlist');
const volumeSlider = document.getElementById('volume');

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
    audio.play().catch(() => {});
    updatePlayIcon(true);
  }
}

function togglePlay() {
  if (!audio.src) { loadTrack(0, true); return; }
  if (audio.paused) {
    audio.play().catch(() => {});
    updatePlayIcon(true);
  } else {
    audio.pause();
    updatePlayIcon(false);
  }
}

function updatePlayIcon(playing) {
  if (playing) {
    playIcon.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
    dancingCat.classList.add('playing');
  } else {
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    dancingCat.classList.remove('playing');
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
