document.addEventListener('DOMContentLoaded', () => {
          
          // Timeline (mantém funcionando)
          const contents = {
            1: {
            title: "VALOR AGREGADO REAL E DIÁRIO",
            text: "Atendemos todos os dias os nossos líderes e empresas em demandas diversas. Qualquer decisor possui vários interesses, como qualificação profissional, posicionamento no mercado de trabalho, indicação para vagas e networking qualificado. Ajudamos todos nossos líderes diariamente.Somos um parceiro para toda jornada da vida profissional e empresarial."
          },
          2: {
            title: "VALOR AGREGADO REAL E DIÁRIO",
            text: "Atendemos todos os dias os nossos líderes e empresas em demandas diversas. Qualquer decisor possui vários interesses, como qualificação profissional, posicionamento no mercado de trabalho, indicação para vagas e networking qualificado. Ajudamos todos nossos líderes diariamente.Somos um parceiro para toda jornada da vida profissional e empresarial."
          },
          3: {
            title: "CONHECIMENTO DE DENTRO DAS EMPRESAS",
            text: "Não somos observadores. Somos praticantes. Atuamos dentro das empresas. Estamos no dia a dia de cada líder e empresa. Seja como criadores, como aconteceu no iFood e Loggi, seja como parceiro de empresas como Mercado Livre e OLX. Por isso, temos autoridade, reputação e credibilidade."
          },
          4: {
            title: "SOMOS UMA NOVA GERAÇÃO DE LÍDERES",
            text: "Estar conosco é entender as dores e as novas soluções do mercado antecipadamente. Somos uma nova geração de líderes com novos hábitos e novas formas de se relacionar."

          },
          5: {
            title: "Turning point",
            text: "Estar conosco é entender as dores e as novas soluções do mercado antecipadamente. Somos uma nova geração de líderes com novos hábitos e novas formas de se relacionar."
          },
        };

        const navItems = document.querySelectorAll(".timeline-nav li");
        const contentBox = document.querySelector(".timeline-content");
        const yearEl = contentBox.querySelector(".year");
        const titleEl = contentBox.querySelector("h1");
        const textEl = contentBox.querySelector("p");

        navItems.forEach(item => {
          item.addEventListener("click", () => {
            document.querySelector(".timeline-nav li.active")?.classList.remove("active");
            item.classList.add("active");

            const year = item.dataset.year;

            // animação de saída
            contentBox.classList.add("fade-out");

            setTimeout(() => {
              // troca o conteúdo
              yearEl.textContent = year;
              titleEl.innerHTML = contents[year].title;
              textEl.textContent = contents[year].text;

              // animação de entrada
              contentBox.classList.remove("fade-out");
              contentBox.classList.add("fade-in");

              setTimeout(() => contentBox.classList.remove("fade-in"), 800);
            }, 800);
          });
        });



         AOS.init();
        });


document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-livro');

  cards.forEach(card => {
    const btnCoautores = card.querySelector('.btn-coautores');
    const overlay = card.querySelector('.overlay');
    const imgCapa = card.querySelector('img:not(.img-coautores)');
    const imgCoautores = card.querySelector('.img-coautores');

    let mostrandoCoautores = false;
    let mostrandoOverlay = false;

    // ===== PC (hover) =====
    card.addEventListener('mouseenter', () => {
      if (!mostrandoCoautores && !isMobile()) {
        overlay.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!mostrandoCoautores && !isMobile()) {
        overlay.style.opacity = '0';
      }
    });

    // ===== Mobile (clique) =====
    card.addEventListener('click', (e) => {
      // se clicou no botão, não fecha o overlay
      if (e.target.closest('.btn')) return;

      if (mostrandoCoautores) {
        // se está mostrando coautores → volta pra capa
        mostrandoCoautores = false;
        imgCapa.style.opacity = '1';
        imgCoautores.style.opacity = '0';
        overlay.style.opacity = '0';
        mostrandoOverlay = false;
      } else {
        // toggle do overlay
        mostrandoOverlay = !mostrandoOverlay;
        overlay.style.opacity = mostrandoOverlay ? '1' : '0';
      }
    });

    // ===== Botão Co-autores =====
    btnCoautores.addEventListener('click', (event) => {
      event.stopPropagation();
      mostrandoCoautores = true;
      mostrandoOverlay = false;

      overlay.style.opacity = '0';
      imgCapa.style.opacity = '0';
      imgCoautores.style.opacity = '1';
    });
  });

  // Detecta se é mobile
  function isMobile() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  }
});


document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-cont');
    const cards = Array.from(track.children);
    const cardWidth = cards[0].getBoundingClientRect().width + 20; // gap entre cards

    // Clonar os cards para criar loop infinito
    const clones = cards.map(card => card.cloneNode(true));
    clones.forEach(clone => track.appendChild(clone));

    let position = 0;
    const speed = 0.5; // pixels por frame

    function animate() {
        position += speed;
        track.style.transform = `translateX(-${position}px)`;
        track.style.transition = 'transform 0.02s linear';

        // Reinicia quando passar o total dos cards originais
        if (position >= cardWidth * cards.length) {
            position = 0;
            track.style.transition = 'none';
            track.style.transform = `translateX(-${position}px)`;
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.02s linear';
            });
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Swipe Mobile
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const moveX = startX - currentX;
        position += moveX;
        track.style.transform = `translateX(-${position}px)`;
        startX = currentX;
    });

    track.addEventListener('touchend', e => {
        isDragging = false;
        track.style.transition = 'transform 0.02s linear';
    });
});


   // Intersection Observer para animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar todos os itens da timeline
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Função para voltar ao topo
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Mostrar/esconder indicador de scroll
        window.addEventListener('scroll', () => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (window.scrollY > 300) {
                scrollIndicator.style.opacity = '1';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });

        // Animação suave ao carregar
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });