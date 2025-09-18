  class CarrosselLideres {
            constructor() {
                this.slidesContainer = document.getElementById('containerSlides');
                this.botaoAnterior = document.getElementById('botaoAnterior');
                this.botaoProximo = document.getElementById('botaoProximo');
                this.indicadores = document.getElementById('pontosIndicadores');
                
                this.cartoesLider = document.querySelectorAll('.cartao-lider');
                this.indiceAtual = 0;
                this.cartoesPorVisao = this.calcularCartoesPorVisao();
                this.indiceMaximo = Math.max(0, this.cartoesLider.length - this.cartoesPorVisao);
                
            
            }

            calcularCartoesPorVisao() {
                const larguraContainer = document.querySelector('.area-carrossel').offsetWidth;
                const larguraCartao = 440; // 420px + 20px gap
                return Math.floor(larguraContainer / larguraCartao) || 1;
            }

            inicializar() {
                this.criarIndicadores();
                this.atualizarCarrossel();
                this.adicionarEventListeners();
                
                // Redimensionamento automático
                window.addEventListener('resize', () => {
                    this.cartoesPorVisao = this.calcularCartoesPorVisao();
                    this.indiceMaximo = Math.max(0, this.cartoesLider.length - this.cartoesPorVisao);
                    this.indiceAtual = Math.min(this.indiceAtual, this.indiceMaximo);
                    this.atualizarCarrossel();
                });

                // Auto-reprodução
       
            }

            criarIndicadores() {
                this.indicadores.innerHTML = '';
                for (let i = 0; i <= this.indiceMaximo; i++) {
                    const ponto = document.createElement('div');
                    ponto.className = 'ponto-indicador';
                    ponto.addEventListener('click', () => this.irParaSlide(i));
                    this.indicadores.appendChild(ponto);
                }
            }

            adicionarEventListeners() {
                this.botaoAnterior.addEventListener('click', () => this.anterior());
                this.botaoProximo.addEventListener('click', () => this.proximo());
                
                // Suporte a toque/deslizar
                let inicioX = 0;
                let arrastando = false;

                this.slidesContainer.addEventListener('touchstart', (e) => {
                    inicioX = e.touches[0].clientX;
                    arrastando = true;
                    this.pararAutoReproducao();
                });

                this.slidesContainer.addEventListener('touchmove', (e) => {
                    if (!arrastando) return;
                    e.preventDefault();
                });

                this.slidesContainer.addEventListener('touchend', (e) => {
                    if (!arrastando) return;
                    const fimX = e.changedTouches[0].clientX;
                    const diferenca = inicioX - fimX;
                    
                    if (Math.abs(diferenca) > 50) {
                        if (diferenca > 0) {
                            this.proximo();
                        } else {
                            this.anterior();
                        }
                    }
                    arrastando = false;
                    this.iniciarAutoReproducao();
                });

                // Pausar auto-reprodução no hover
                this.slidesContainer.addEventListener('mouseenter', () => this.pararAutoReproducao());
                this.slidesContainer.addEventListener('mouseleave', () => this.iniciarAutoReproducao());
            }

            atualizarCarrossel() {
                const larguraCartao = 440;
                const translateX = -this.indiceAtual * larguraCartao;
                this.slidesContainer.style.transform = `translateX(${translateX}px)`;
                
                // Atualizar botões de navegação
                this.botaoAnterior.disabled = this.indiceAtual === 0;
                this.botaoProximo.disabled = this.indiceAtual === this.indiceMaximo;
                
                // Atualizar indicadores
                const pontos = this.indicadores.querySelectorAll('.ponto-indicador');
                pontos.forEach((ponto, index) => {
                    ponto.classList.toggle('ativo', index === this.indiceAtual);
                });

                // Adicionar animação escalonada aos cartões visíveis
                this.cartoesLider.forEach((cartao, index) => {
                    const estaVisivel = index >= this.indiceAtual && index < this.indiceAtual + this.cartoesPorVisao;
                    if (estaVisivel) {
                        cartao.style.animationDelay = `${(index - this.indiceAtual) * 0.1}s`;
                        cartao.style.animation = 'deslizarEntrada 0.6s ease forwards';
                    }
                });
            }

            proximo() {
                if (this.indiceAtual < this.indiceMaximo) {
                    this.indiceAtual++;
                    this.atualizarCarrossel();
                }
            }

            anterior() {
                if (this.indiceAtual > 0) {
                    this.indiceAtual--;
                    this.atualizarCarrossel();
                }
            }

            irParaSlide(indice) {
                this.indiceAtual = Math.max(0, Math.min(indice, this.indiceMaximo));
                this.atualizarCarrossel();
            }

            iniciarAutoReproducao() {
                this.pararAutoReproducao();
                this.intervalAutoReproducao = setInterval(() => {
                    if (this.indiceAtual >= this.indiceMaximo) {
                        this.indiceAtual = 0;
                    } else {
                        this.indiceAtual++;
                    }
                    this.atualizarCarrossel();
                }, 4000);
            }

            pararAutoReproducao() {
                if (this.intervalAutoReproducao) {
                    clearInterval(this.intervalAutoReproducao);
                }
            }
        }

        // Adicionar animação de deslizar entrada
        const estilo = document.createElement('style');
        estilo.textContent = `
            @keyframes deslizarEntrada {
                from {
                    opacity: 0;
                    transform: translateY(30px) rotateY(10deg);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) rotateY(0);
                }
            }
        `;
        document.head.appendChild(estilo);

        // Inicializar carrossel quando DOM estiver carregado
        document.addEventListener('DOMContentLoaded', () => {
            new CarrosselLideres();
        });