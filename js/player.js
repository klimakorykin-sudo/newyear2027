const tracks = [
  { title: 'Новогодняя', artist: 'Дискотека Авария', src: 'assets/music/diskoteka-avaria.mp3' },
  { title: 'Last Christmas', artist: 'Wham!', src: 'assets/music/last-christmas.mp3' },
  { title: 'Jingle Bell Rock', artist: 'Bobby Helms', src: 'assets/music/jingle-bell-rock.mp3' },
  { title: 'Rockin\' Around the Christmas Tree', artist: 'Brenda Lee', src: 'assets/music/rockin-around.mp3' },
  { title: 'Let It Snow', artist: 'Dean Martin', src: 'assets/music/let-it-snow.mp3' },
  { title: 'The Christmas Song', artist: 'Nat King Cole', src: 'assets/music/the-christmas-song.mp3' },
  { title: 'Have Yourself a Merry Little Christmas', artist: 'Frank Sinatra', src: 'assets/music/have-yourself-frank.mp3' },
  { title: 'Winter Wonderland', artist: 'Michael Bublé', src: 'assets/music/winter-wonderland.mp3' },
  { title: 'All I Want for Christmas', artist: 'Mariah Carey', src: 'assets/music/all-i-want.mp3' },
  { title: 'Santa Tell Me', artist: 'Ariana Grande', src: 'assets/music/santa-tell-me.mp3' },
  { title: 'Underneath the Tree', artist: 'Kelly Clarkson', src: 'assets/music/underneath-the-tree.mp3' },
  { title: 'It\'s Beginning to Look a Lot Like Christmas', artist: 'Michael Bublé', src: 'assets/music/beginning-to-look.mp3' },

  // День 1
  { title: 'Happy New Year', artist: 'ABBA', src: 'assets/music/happy-new-year-abba.mp3' },
  { title: 'Auld Lang Syne', artist: 'Mariah Carey', src: 'assets/music/auld-lang-syne-mariah.mp3' },
  { title: 'Do They Know It\'s Christmas?', artist: 'Band Aid', src: 'assets/music/do-they-know-christmas.mp3' },
  { title: 'Little Things', artist: 'ABBA', src: 'assets/music/little-things-abba.mp3' },
  { title: 'Пять минут', artist: 'Людмила Гурченко', src: 'assets/music/pyat-minut.mp3' },
  { title: 'Звенит январская вьюга', artist: 'Нина Бродская', src: 'assets/music/zvenit-yanvarskaya-vyuga.mp3' },
  { title: 'Песня о снежинке', artist: 'Ольга Рождественская', src: 'assets/music/pesnya-o-snezhinke.mp3' },
  { title: 'Этот Новый год', artist: 'Майя Кристалинская', src: 'assets/music/etot-novyy-god.mp3' },
  { title: 'Кабы не было зимы', artist: 'Валентина Толкунова', src: 'assets/music/kaby-ne-bylo-zimy.mp3' },
  { title: 'Расскажи, Снегурочка', artist: 'Клара Румянова', src: 'assets/music/rasskazi-snegurochka.mp3' },
  { title: 'Новогодние игрушки', artist: 'Самоцветы', src: 'assets/music/novogodnie-igrushki.mp3' },

  // День 2
  { title: 'Новый год', artist: 'Руки Вверх!', src: 'assets/music/ruki-vverh-novyy-god.mp3' },
  { title: 'Иней', artist: 'Ваня Дмитриенко & Yanix', src: 'assets/music/iney-dmitrienko.mp3' },
  { title: 'Новый год', artist: 'Gayazov Brothers', src: 'assets/music/gayazov-novyy-god.mp3' },
  { title: 'Новый Год в кафе', artist: 'Василий Уриевский', src: 'assets/music/novyy-god-v-kafe.mp3' },
  { title: 'С Новым Годом (слово пацана)', artist: 'NU', src: 'assets/music/novym-godom-slovo-patsana.mp3' },
  { title: 'С Новым Годом', artist: 'Кравц', src: 'assets/music/kravts-s-novym-godom.mp3' },
  { title: 'Кабы не было зимы', artist: 'Uma2Rman & Дора', src: 'assets/music/kaby-ne-bylo-zimy-uma2rman.mp3' },
  { title: 'Зимняя песня', artist: 'Дмитрий Маликов & Milash', src: 'assets/music/zimnyaya-pesnya-malikov.mp3' },
  { title: 'В моей душе идёт снег', artist: 'Ирина Нельсон & Nechaev', src: 'assets/music/v-moey-dushe-idet-sneg.mp3' },
  { title: 'Календарь', artist: 'Город 312', src: 'assets/music/kalendar-gorod-312.mp3' },

  // День 3
  { title: 'В лесу родилась ёлочка', artist: 'Классика', src: 'assets/music/v-lesu-rodilas-elochka.mp3' },
  { title: 'Ёлки-палки, Новый год!', artist: 'Алексей Петрухин', src: 'assets/music/elki-palki-novyy-god.mp3' },
  { title: 'В новогоднюю ночь', artist: 'Инна Вальтер', src: 'assets/music/v-novogodnyuyu-noch.mp3' },
  { title: 'С праздником!', artist: 'Ирина Круг', src: 'assets/music/s-prazdnikom-irina-krug.mp3' },
  { title: 'Новогодняя', artist: 'Ольга Стельмах', src: 'assets/music/novogodnyaya-stelmah.mp3' },
  { title: 'По старому календарю', artist: 'Татьяна Буланова', src: 'assets/music/po-staromu-kalendaryu.mp3' },
  { title: 'Новогодние дела', artist: 'Наташа МальДива', src: 'assets/music/novogodnie-dela.mp3' },
  { title: '31 число Новый год', artist: 'Владислав Агафонов', src: 'assets/music/31-chislo-novyy-god.mp3' },
  { title: 'С Новым годом!', artist: 'Восток', src: 'assets/music/vostok-s-novym-godom.mp3' },
  { title: 'Новый год', artist: 'Александр Серов', src: 'assets/music/serov-novyy-god.mp3' },

  // День 4
  { title: 'Зимушка-зима', artist: 'Артур', src: 'assets/music/zimushka-zima-artur.mp3' },
  { title: 'Новогодняя любовь', artist: 'ТУ-134', src: 'assets/music/novogodnyaya-lyubov.mp3' },
  { title: 'Снежинка', artist: 'Дайкири', src: 'assets/music/snezhinka-daykiri.mp3' },
  { title: 'Белая роза', artist: 'ARKADiAS', src: 'assets/music/belaya-roza.mp3' },
  { title: 'Снежная королева', artist: 'ARKADiAS', src: 'assets/music/snezhnaya-koroleva.mp3' },
  { title: 'Хочу быть с тобой', artist: 'Татьяна Буланова', src: 'assets/music/hochu-byt-s-toboy.mp3' },
  { title: 'С Новым годом - под звёздным небосводом!', artist: 'Дуэт Не уходи', src: 'assets/music/pod-zvezdnym-nebosvodom.mp3' },
  { title: 'Мне тебя так мало', artist: '140 ударов в минуту', src: 'assets/music/mne-tebya-tak-malo.mp3' },
  { title: 'Любовь-карусель', artist: 'Фабрика', src: 'assets/music/lyubov-karusel.mp3' },
  { title: 'Верю в любовь', artist: 'Михаил Бублик', src: 'assets/music/veryu-v-lyubov.mp3' },

  // День 5
  { title: 'Зимний сон', artist: 'Алсу', src: 'assets/music/zimniy-son-alsu.mp3' },
  { title: 'Опять метель', artist: 'Алла Пугачева & Кристина Орбакайте', src: 'assets/music/opyat-metel.mp3' },
  { title: 'Снег над Ленинградом', artist: 'Микаэл Таривердиев', src: 'assets/music/sneg-nad-leningradom.mp3' },
  { title: 'Загадаю', artist: 'Glazami', src: 'assets/music/zagadayu-glazami.mp3' },
  { title: 'С горки на картонке', artist: 'hehehe', src: 'assets/music/s-gorki-na-kartonke.mp3' },
  { title: 'Новогодняя #2', artist: 'VLNY', src: 'assets/music/novogodnyaya-2-vlny.mp3' },
  { title: 'Не опускай рук', artist: 'Элли на маковом поле', src: 'assets/music/ne-opuskay-ruk.mp3' },
  { title: 'Новогодняя', artist: 'Хлеб', src: 'assets/music/novogodnyaya-hleb.mp3' },
  { title: 'Новый год', artist: 'Стекловата', src: 'assets/music/novyy-god-steklovata.mp3' },
  { title: 'С Новым годом', artist: 'Zadonskaya', src: 'assets/music/s-novym-godom-zadonskaya.mp3' },

  // День 6
  { title: 'Под Новый год', artist: 'Betsy', src: 'assets/music/pod-novyy-god-betsy.mp3' },
  { title: 'Когда часы 12 бьют', artist: 'Классика', src: 'assets/music/kogda-chasy-12-byut.mp3' },
  { title: 'Потолок ледяной', artist: 'Балаган Лимитед', src: 'assets/music/potolok-ledyanoy.mp3' },
  { title: 'Зима-холода', artist: 'Андрей Губин', src: 'assets/music/zima-holoda.mp3' },
  { title: 'Снежинки', artist: 'Алена Свиридова', src: 'assets/music/snezhinki-sviridova.mp3' },
  { title: 'Метель', artist: 'Александр Буйнов', src: 'assets/music/metel-buynov.mp3' },
  { title: 'Зимняя вишня', artist: 'Анжелика Варум', src: 'assets/music/zimnyaya-vishnya.mp3' },
  { title: 'Замела зима', artist: 'Зара', src: 'assets/music/zamela-zima.mp3' },
  { title: 'Снег', artist: 'Елена Ваенга', src: 'assets/music/sneg-vaenga.mp3' },
  { title: 'Новый год', artist: 'Надежда Кадышева', src: 'assets/music/novyy-god-kadysheva.mp3' },

  // День 7
  { title: 'Разбросала косы русые берёза', artist: 'Балагуры', src: 'assets/music/razbrosala-kosy.mp3' },
  { title: 'Зимний вечер', artist: 'Евгений Осин', src: 'assets/music/zimniy-vecher.mp3' },
  { title: 'Летают и тают', artist: 'Валерий Курас', src: 'assets/music/letayut-i-tayut.mp3' },
  { title: 'В Рождественскую ночь', artist: 'Виктор Салтыков', src: 'assets/music/v-rozhdestvenskuyu-noch.mp3' },
  { title: 'Новый год в салоне самолета', artist: 'Михаил Шуфутинский', src: 'assets/music/novyy-god-v-salone.mp3' },
  { title: 'Снежная королева', artist: 'Ирина Круг', src: 'assets/music/snezhnaya-koroleva-krug.mp3' },
  { title: 'Запорошил снежок', artist: 'Рада Рай', src: 'assets/music/zaporoshil-snezhok.mp3' },
  { title: 'Белым снегом', artist: 'Александр Ломинский', src: 'assets/music/belym-snegom.mp3' },
  { title: 'Зима', artist: 'Юта', src: 'assets/music/zima-yuta.mp3' },
  { title: 'С Новым годом, страна!', artist: 'Кай Метов', src: 'assets/music/s-novym-godom-strana.mp3' }
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
