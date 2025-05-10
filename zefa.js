const imagens = [
    "imagens/coraciones.png",
    "imagens/vero.png",
    "imagens/ze.png",
    "imagens/zezi.png",
    "imagens/zefaa.png"
  ];
  
  let cartas = [];
  let cartaVirada = null;
  let bloqueio = false;
  let paresEncontrados = 0;
  
  function iniciarJogo() {
    document.getElementById('tela-inicial').classList.remove('visivel');
    document.getElementById('tela-jogo').classList.add('visivel');
    iniciarCartas();
  }
  
  function iniciarCartas() {
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';
    paresEncontrados = 0;
    cartas = [...imagens, ...imagens].sort(() => 0.5 - Math.random());
  
    cartas.forEach((src) => {
      const carta = document.createElement('div');
      carta.classList.add('carta');
      carta.dataset.imagem = src;
  
      const frente = document.createElement('div');
      frente.classList.add('carta-frente');
      frente.innerHTML = '';
  
      const verso = document.createElement('div');
      verso.classList.add('carta-verso');
      const img = document.createElement('img');
      img.src = src;
      verso.appendChild(img);
  
      carta.appendChild(frente);
      carta.appendChild(verso);
      carta.addEventListener('click', virarCarta);
  
      tabuleiro.appendChild(carta);
    });
  }
  
  function virarCarta() {
    if (bloqueio || this.classList.contains('virada')) return;
  
    this.classList.add('virada');
  
    if (!cartaVirada) {
      cartaVirada = this;
    } else {
      if (cartaVirada.dataset.imagem === this.dataset.imagem) {
        paresEncontrados++;
        cartaVirada = null;
        if (paresEncontrados === imagens.length) {
          setTimeout(mostrarPresente, 1000);
        }
      } else {
        bloqueio = true;
        setTimeout(() => {
          cartaVirada.classList.remove('virada');
          this.classList.remove('virada');
          cartaVirada = null;
          bloqueio = false;
        }, 800);
      }
    }
  }
  
  function mostrarPresente() {
    document.getElementById('tela-jogo').classList.remove('visivel');
    document.getElementById('tela-final').classList.add('visivel');
  }
  
  function abrirPresente() {
    const presente = document.getElementById('presente');
    presente.src = "imagens/presente-aberto.png";
    animarConfetes();
    document.getElementById('cartao').classList.remove('escondido');
  }
  
  function animarConfetes() {
    const confetes = document.getElementById('confetes');
    confetes.innerHTML = '';
    confetes.style.height = "100vh";
  
    for (let i = 0; i < 100; i++) {
      const confete = document.createElement('div');
      confete.style.position = 'absolute';
      confete.style.left = Math.random() * 100 + 'vw';
      confete.style.top = '-20px';
      confete.style.width = '10px';
      confete.style.height = '10px';
      confete.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
      confete.style.borderRadius = '50%';
      confete.style.animation = `cair 3s ease-out forwards`;
      confete.style.animationDelay = Math.random() * 2 + 's';
      confetes.appendChild(confete);
    }
  
    // Remove os confetes depois de 5s
    setTimeout(() => {
      confetes.innerHTML = '';
      confetes.style.height = "0";
    }, 5000);
  }
  