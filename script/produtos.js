document.addEventListener('DOMContentLoaded', () => {
          // Carrossel só executa se existir na página
          const track = document.getElementById('carouselTrack');
          const indicators = document.getElementById('indicators');
          if (track && indicators) {
            let currentSlide = 0;
            const slides = document.querySelectorAll('.testimonial-slide');
            const totalSlides = slides.length;

            // Criar indicadores
            function createIndicators() {
                for (let i = 0; i < totalSlides; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    indicator.addEventListener('click', () => goToSlide(i));
                    indicators.appendChild(indicator);
                }
                updateIndicators();
            }

            // Atualizar indicadores
            function updateIndicators() {
                const allIndicators = document.querySelectorAll('.indicator');
                allIndicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            }

            // Ir para slide específico
            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                const translateX = -currentSlide * 100;
                track.style.transform = `translateX(${translateX}%)`;
                updateIndicators();
                updateNavButtons();
            }

            // Próximo slide
            function nextSlide() {
                if (currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                }
            }

            // Slide anterior
            function previousSlide() {
                if (currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                }
            }

            // Atualizar botões de navegação
            function updateNavButtons() {
                document.getElementById('prevBtn').disabled = currentSlide === 0;
                document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
            }

            // Reproduzir vídeo (placeholder)
            function playVideo(button) {
                const container = button.parentElement;
                // Aqui você pode adicionar a lógica para reproduzir o vídeo real
                // Por exemplo, substituir o placeholder por um elemento de vídeo
                
                // Exemplo de feedback visual
                button.style.transform = 'translate(-50%, -50%) scale(0.9)';
                setTimeout(() => {
                    button.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 150);
                
                // Simular carregamento do vídeo
                console.log('Reproduzindo vídeo...');
                alert('Aqui você integraria seu player de vídeo favorito!');
            }

            // Auto-play do carrossel
            function startAutoPlay() {
                setInterval(() => {
                    if (currentSlide < totalSlides - 1) {
                        nextSlide();
                    } else {
                        goToSlide(0);
                    }
                }, 8000); // 8 segundos
            }

            // Inicializar carrossel
            function initCarousel() {
                createIndicators();
                updateNavButtons();
                startAutoPlay();
            }

            initCarousel();

            // Suporte para navegação por teclado
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    previousSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            });

            // Pausar auto-play quando o mouse estiver sobre o carrossel
            const carousel = document.querySelector('.carousel-container');
            let autoPlayPaused = false;

            carousel.addEventListener('mouseenter', () => {
                autoPlayPaused = true;
            });

            carousel.addEventListener('mouseleave', () => {
                autoPlayPaused = false;
            });
          }

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