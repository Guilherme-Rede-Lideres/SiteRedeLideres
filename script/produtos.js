  let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        const track = document.getElementById('carouselTrack');
        const indicators = document.getElementById('indicators');

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

        // Inicializar quando a página carregar
        document.addEventListener('DOMContentLoaded', initCarousel);

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

         AOS.init(); 



         