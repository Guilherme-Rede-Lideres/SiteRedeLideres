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

