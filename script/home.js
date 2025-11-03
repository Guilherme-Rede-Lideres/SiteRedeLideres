// Barra de progresso de scroll
const bar = document.getElementById('progress');
const onScroll = () => {
  const max = document.body.scrollHeight - innerHeight;
  const pct = max > 0 ? (scrollY / max) * 100 : 0;
  bar.style.width = pct + '%';
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const video1 = document.getElementById("video1");

// Espera o vídeo estar carregado
video1.addEventListener("loadedmetadata", () => {
  video1.currentTime = 20; // pula para os 5 segundos
  video1.play();
});

const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");
const closeBtn = document.getElementById("closeBtn");

menuBtn.addEventListener("click", () => {
  menuOverlay.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  menuOverlay.classList.remove("show");
});

const cards = document.querySelectorAll('.people-container .person-card');
const groupSize = 8; 
let startIndex = 0;

function showNextGroup() {
  // fade out atual
  const currentGroup = [];
  for (let i = 0; i < groupSize; i++) {
    let index = (startIndex + i) % cards.length;
    currentGroup.push(cards[index]);
    cards[index].style.opacity = 0;
  }

  // espera o fade out terminar antes de mostrar próximo grupo
  setTimeout(() => {
    // remove 'show' do grupo antigo
    currentGroup.forEach(card => card.classList.remove('show'));

    // atualiza startIndex para próximo grupo
    startIndex = (startIndex + groupSize) % cards.length;

    // mostra o novo grupo
    for (let i = 0; i < groupSize; i++) {
      let index = (startIndex + i) % cards.length;
      cards[index].classList.add('show');
      cards[index].style.opacity = 2; // fade in suave
    }
  }, 1500); // mesmo tempo da transição
}

// inicializa
showNextGroup();
setInterval(showNextGroup, 5500);

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("videoinicio");
  video.playbackRate = 0.7; // 0.5 = metade da velocidade, 1 = normal, 2 = dobro
});