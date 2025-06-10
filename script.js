const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselContainer.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('active');
});

function scrollToSection(event) {
  if (!event.target.hash) return;

  event.preventDefault();

  const targetId = event.target.hash.substring(1);
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const viewportHeight = window.innerHeight;
  const elemRect = targetElement.getBoundingClientRect();
  const elemHeight = elemRect.height;

  let scrollTo = window.pageYOffset + elemRect.top - (viewportHeight / 2) + (elemHeight / 2);

  scrollTo = Math.max(0, Math.min(scrollTo, document.body.scrollHeight - viewportHeight));

  window.scrollTo({
    top: scrollTo,
    behavior: 'smooth'
  });

  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
  }
}

document.querySelectorAll('nav ul.nav-links a[href^="#"]').forEach(link => {
  link.addEventListener('click', scrollToSection);
});

// Rezervační formulář výpočet ceny a validace
const rezervacniFormular = document.getElementById('rezervacniFormular');
const vyslednaCena = document.getElementById('vyslednaCena');
const typPokojeSelect = document.getElementById('typPokoje');
const datumPrijezduInput = document.getElementById('datumPrijezdu');
const datumOdjezduInput = document.getElementById('datumOdjezdu');
const jmenoInput = document.getElementById('jmeno');
const emailInput = document.getElementById('email');

// Nastavení min. datumů při načtení stránky
function nastavMinimaDatumu() {
  const dnes = new Date().toISOString().split('T')[0];
  datumPrijezduInput.setAttribute('min', dnes);
  datumOdjezduInput.setAttribute('min', dnes);
}

// Výpočet ceny a validace datumu
function vypocitejCenu() {
  const prijizdi = datumPrijezduInput.value;
  const odjizdi = datumOdjezduInput.value;
  const cenaZaNoc = Number(typPokojeSelect.value);

  if (!prijizdi || !odjizdi) {
    vyslednaCena.textContent = 'Prosím, vyplňte obě data.';
    return;
  }

  const prijizdiDatum = new Date(prijizdi);
  const odjizdiDatum = new Date(odjizdi);
  const dnes = new Date();
  dnes.setHours(0, 0, 0, 0); // pro srovnání bez času

  if (prijizdiDatum < dnes) {
    vyslednaCena.textContent = 'Datum příjezdu nemůže být v minulosti.';
    return;
  }
  if (odjizdiDatum <= prijizdiDatum) {
    vyslednaCena.textContent = 'Datum odjezdu musí být později než datum příjezdu.';
    return;
  }

  const rozdilCasu = odjizdiDatum - prijizdiDatum;
  const pocetNoci = rozdilCasu / (1000 * 60 * 60 * 24);

  const celkovaCena = pocetNoci * cenaZaNoc;

  vyslednaCena.textContent = `Celková cena za ${pocetNoci} nocí je ${celkovaCena.toLocaleString('cs-CZ')} Kč.`;
}

// Funkce pro validaci formuláře
function validujFormular() {
  if (!jmenoInput.value || !emailInput.value) {
    alert('Prosím, vyplňte jméno a email.');
    return false;
  }
  return true;
}

// Aktualizuj min datum odjezdu při změně příjezdu a resetuj cenu
datumPrijezduInput.addEventListener('change', () => {
  if (datumPrijezduInput.value) {
    datumOdjezduInput.min = datumPrijezduInput.value;
  } else {
    nastavMinimaDatumu();
  }
  vypocitejCenu();
});

// Aktualizace ceny při změně data odjezdu nebo typu pokoje
datumOdjezduInput.addEventListener('change', vypocitejCenu);
typPokojeSelect.addEventListener('change', vypocitejCenu);

// Přidání validace a odeslání formuláře
rezervacniFormular.addEventListener('submit', (event) => {
  event.preventDefault(); // Zrušení výchozího odeslání

  if (validujFormular()) {
    vypocitejCenu();
    alert('Formulář odeslán (pouze pro ukázku, data se nikam neposílají).');
  }
});


// Countdown
function startCountdown() {
  let timeLeft = (7 * 60 * 60) + (32 * 60) + 15; // 7 hours, 32 minutes, 15 seconds in seconds
  function updateTimer() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('timer').textContent = hours + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + seconds;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      document.getElementById('timer').textContent = 'Čas vypršel!';
    }
  }
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}
window.addEventListener('load', () => {
  nastavMinimaDatumu();
  vypocitejCenu();
  startCountdown();
});
