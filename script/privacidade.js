 const menuBtn = document.getElementById("menuBtn");
    const menuOverlay = document.getElementById("menuOverlay");
    const closeBtn = document.getElementById("closeBtn");

    menuBtn.addEventListener("click", () => {
      menuOverlay.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
      menuOverlay.classList.remove("show");
    });
