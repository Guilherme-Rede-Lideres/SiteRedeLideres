  const menuBtn = document.getElementById("menuBtn");
    const menuOverlay = document.getElementById("menuOverlay");
    const closeBtn = document.getElementById("closeBtn");

    menuBtn.addEventListener("click", () => {
      menuOverlay.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
      menuOverlay.classList.remove("show");
    });

    const steps = Array.from(document.querySelectorAll('.step'));
const restartBtn = document.getElementById('restart');
const toggleBtn = document.getElementById('toggle');


let index = -1; // começa "antes" do primeiro
const delay = 3000; // 3s
let timer = null;
let paused = false;


function clearAll(){ steps.forEach(s => s.classList.remove('active')); }


function stepNext(){
// se chegou ao fim, reinicia
if(index >= steps.length - 1){
index = -1;
clearAll();
}
index++;
steps[index].classList.add('active');
}


function start(){
// executa imediatamente o próximo e depois agenda
stepNext();
timer = setInterval(stepNext, delay);
}


function stop(){ clearInterval(timer); timer = null; }


restartBtn.addEventListener('click', () => { stop(); clearAll(); index = -1; start(); if(paused){ paused=false; toggleBtn.textContent='Pausar'; }});


toggleBtn.addEventListener('click', () => {
paused = !paused;
if(paused){ stop(); toggleBtn.textContent = 'Continuar'; }
else { // continua do ponto atual
timer = setInterval(stepNext, delay);
toggleBtn.textContent = 'Pausar';
}
});


// inicia automaticamente
start();



