class CarrosselLideres {
  constructor() {
    this.slidesContainer = document.getElementById('containerSlides');
    this.botaoAnterior = document.getElementById('botaoAnterior');
    this.botaoProximo = document.getElementById('botaoProximo');
    this.indicadores = document.getElementById('pontosIndicadores');
    this.areaCarrossel = document.querySelector('.area-carrossel');

    this.cartoesLider = document.querySelectorAll('.cartao-lider');
    this.indiceAtual = 0;
    this.cartoesPorVisao = this.calcularCartoesPorVisao();
    this.indiceMaximo = Math.max(0, this.cartoesLider.length - this.cartoesPorVisao);

    // Guardas de segurança logo no construtor
    if (!this.slidesContainer) console.error('[carousel] #containerSlides não encontrado.');
    if (!this.areaCarrossel) console.error('[carousel] .area-carrossel não encontrada.');
    if (!this.botaoAnterior || !this.botaoProximo) console.warn('[carousel] botões não encontrados.');
    if (!this.indicadores) console.warn('[carousel] contêiner de indicadores não encontrado.');
  }

  calcularCartoesPorVisao() {
    const larguraContainer = this.areaCarrossel?.offsetWidth || 0;
    const larguraCartao = 440; // 420 + 20 de gap
    return Math.max(1, Math.floor(larguraContainer / larguraCartao));
  }

  inicializar() {
    if (!this.slidesContainer) return; // sem trilho, aborta
    this.criarIndicadores();
    this.atualizarCarrossel();
    this.adicionarEventListeners();

    // Recalcular no resize
    window.addEventListener('resize', () => {
      this.cartoesPorVisao = this.calcularCartoesPorVisao();
      this.indiceMaximo = Math.max(0, this.cartoesLider.length - this.cartoesPorVisao);
      this.indiceAtual = Math.min(this.indiceAtual, this.indiceMaximo);
      this.atualizarCarrossel();
    });
  }

  criarIndicadores() {
    if (!this.indicadores) return;
    this.indicadores.innerHTML = '';
    for (let i = 0; i <= this.indiceMaximo; i++) {
      const ponto = document.createElement('div');
      ponto.className = 'ponto-indicador';
      ponto.addEventListener('click', () => this.irParaSlide(i));
      this.indicadores.appendChild(ponto);
    }
  }

  adicionarEventListeners() {
    if (this.botaoAnterior) this.botaoAnterior.addEventListener('click', () => this.anterior());
    if (this.botaoProximo) this.botaoProximo.addEventListener('click', () => this.proximo());

    if (!this.slidesContainer) return;

    // Suporte a toque/deslizar
    let inicioX = 0;
    let arrastando = false;

    this.slidesContainer.addEventListener('touchstart', (e) => {
      inicioX = e.touches[0].clientX;
      arrastando = true;

    }, { passive: true });

    this.slidesContainer.addEventListener('touchmove', (e) => {
      if (!arrastando) return;
      e.preventDefault(); // queremos bloquear o scroll horizontal ao arrastar
    }, { passive: false });

    this.slidesContainer.addEventListener('touchend', (e) => {
      if (!arrastando) return;
      const fimX = e.changedTouches[0].clientX;
      const diferenca = inicioX - fimX;

      if (Math.abs(diferenca) > 50) {
        diferenca > 0 ? this.proximo() : this.anterior();
      }
      arrastando = false;
   
    });

  }

  atualizarCarrossel() {
    if (!this.slidesContainer) return;
    const larguraCartao = 440;
    const translateX = -this.indiceAtual * larguraCartao;
    this.slidesContainer.style.transform = `translateX(${translateX}px)`;

    // Botões
    if (this.botaoAnterior) this.botaoAnterior.disabled = this.indiceAtual === 0;
    if (this.botaoProximo) this.botaoProximo.disabled = this.indiceAtual === this.indiceMaximo;

    // Indicadores
    if (this.indicadores) {
      const pontos = this.indicadores.querySelectorAll('.ponto-indicador');
      pontos.forEach((ponto, index) => {
        ponto.classList.toggle('ativo', index === this.indiceAtual);
      });
    }

    // Animação escalonada nos cartões visíveis
    this.cartoesLider.forEach((cartao, index) => {
      const visivel = index >= this.indiceAtual && index < this.indiceAtual + this.cartoesPorVisao;
      if (visivel) {
        cartao.style.animationDelay = `${(index - this.indiceAtual) * 0.1}s`;
        cartao.style.animation = 'deslizarEntrada 0.6s ease forwards';
      }
    });
  }

  proximo() {
    if (this.indiceAtual < this.indiceMaximo) {
      this.indiceAtual++;
    } else {
      this.indiceAtual = this.indiceMaximo;
    }
    this.atualizarCarrossel();
  }

  anterior() {
    if (this.indiceAtual > 0) {
      this.indiceAtual--;
    } else {
      this.indiceAtual = 0;
    }
    this.atualizarCarrossel();
  }

  irParaSlide(indice) {
    this.indiceAtual = Math.max(0, Math.min(indice, this.indiceMaximo));
    this.atualizarCarrossel();
  }


  pararAutoReproducao() {
    if (this.intervalAutoReproducao) {
      clearInterval(this.intervalAutoReproducao);
      this.intervalAutoReproducao = null;
    }
  }
}

// Keyframes (deixe como estava)
const estilo = document.createElement('style');
estilo.textContent = `
@keyframes deslizarEntrada {
  from { opacity: 0; transform: translateY(30px) rotateY(10deg); }
  to   { opacity: 1; transform: translateY(0) rotateY(0); }
}`;
document.head.appendChild(estilo);

// Garante DOM e inicializa de verdade
document.addEventListener('DOMContentLoaded', () => {
  const app = new CarrosselLideres();
  if (!app.slidesContainer) return;  // evita "reading 'style'"
  app.inicializar();
  app.iniciarAutoReproducao();
});