// ═══════════════════════════════════════════
//  ╔═══════════════════════════════════════╗
//  ║   🎵 CONFIGURAÇÕES DE MÚSICA           ║
//  ║                                       ║
//  ║   1. musicScene1: Toca no clique inicial║
//  ║   2. musicPresent: Toca ao abrir o    ║
//  ║      presente (arrastar o dedo)       ║
//  ║                                       ║
//  ╚═══════════════════════════════════════╝
// ═══════════════════════════════════════════
const CONFIG = {
  musicScene1    : '/inicio.mp3',   // ← Arquivo para a Cena 1
  musicPresent   : '/presente.mp3', // ← Arquivo para quando abrir o presente

  letterTitle    : 'Feliz Aniversário!',
  letterMessage  : 'Neste dia especial, quero que você saiba o quanto é importante. Obrigado por ser tão especial e trazer tanta felicidade à minha vida. Que este ano seja repleto de momentos mágicos, risadas sinceras e muito amor. Você merece o melhor que a vida pode oferecer.',
  letterSignature: 'Com todo meu amor, ✨',

  scene1Duration : 16000, 
  transitionMs   : 900,
};

// ═══════════════════════════════════════════
const state = { 
  currentScene: 1, 
  musicStarted: false,
  audio1: null,
  audio2: null
};

// ═══════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  updateLetterText();
  spawnStars();
  spawnConfetti();
  spawnStreamers();
  spawnFloatyHearts('floatyHearts');
  spawnFloatyHearts('floatyHearts2');
  setupMusic(); 
  startCandleAnimation();
  setupScene1();
  setupKeyboardSkip();
});

// ═══════════════════════════════════════════
// SISTEMA DE ÁUDIO
// ═══════════════════════════════════════════
function setupMusic() {
  const btn = document.getElementById('playButton');
  
  // Pré-carrega os áudios
  state.audio1 = new Audio(CONFIG.musicScene1);
  state.audio1.loop = true;

  state.audio2 = new Audio(CONFIG.musicPresent);
  state.audio2.loop = true;

  // Mostra o botão rapidamente para o usuário liberar o áudio
  setTimeout(() => {
    if (!state.musicStarted) btn.classList.remove('hidden');
  }, 1000);

  btn.addEventListener('click', () => {
    state.audio1.play().catch(e => console.warn("Bloqueio do navegador:", e));
    state.musicStarted = true;
    btn.classList.add('hidden');
    // Se ainda estiver na cena 1, aguarda um pouco e vai para a 2
    if (state.currentScene === 1) setTimeout(() => goToScene(2), 400);
  });
}

function switchMusicToPresent() {
  // Transição suave entre as músicas
  if (state.audio1) {
    state.audio1.pause();
    state.audio1.currentTime = 0; 
  }
  if (state.audio2) {
    state.audio2.play().catch(e => console.warn("Erro ao trocar música:", e));
  }
}

// ═══════════════════════════════════════════
// NAVEGAÇÃO
// ═══════════════════════════════════════════
function goToScene(n) {
  if (state.currentScene === n) return;
  document.getElementById(`scene${state.currentScene}`).classList.remove('active');
  state.currentScene = n;

  setTimeout(() => {
    document.getElementById(`scene${n}`).classList.add('active');
    if (n === 2) { initPresentScene(); }
    if (n === 3) initLetterScene();
  }, CONFIG.transitionMs);
}

// ═══════════════════════════════════════════
// CENA 2 — PRESENTE (LOGICA DE ARRASTAR)
// ═══════════════════════════════════════════
function initPresentScene() {
  const canvas = document.getElementById('presentAnimation');
  const ctx    = canvas.getContext('2d');
  const SIZE   = 400;
  canvas.width = canvas.height = SIZE;

  const ps = { opened:false, openProgress:0, isDragging:false, dragAmt:0, threshold:120 };
  let startX = 0, startY = 0;

  function draw() {
    ctx.clearRect(0, 0, SIZE, SIZE);
    if (ps.opened) drawOpenPresent(ctx, SIZE, ps.openProgress);
    else           drawClosedPresent(ctx, SIZE, ps.dragAmt);
  }

  function onDown(x, y) { if (!ps.opened) { ps.isDragging = true; startX = x; startY = y; } }
  function onMove(x, y) {
    if (!ps.isDragging || ps.opened) return;
    ps.dragAmt = Math.min(Math.abs(x - startX) + Math.abs(y - startY), ps.threshold);
    draw();
  }
  function onUp() {
    if (!ps.isDragging) return;
    ps.isDragging = false;
    if (ps.dragAmt >= ps.threshold * 0.75) openPresent();
    else { ps.dragAmt = 0; draw(); }
  }

  canvas.addEventListener('mousedown',  e => onDown(e.clientX, e.clientY));
  canvas.addEventListener('mousemove',  e => onMove(e.clientX, e.clientY));
  canvas.addEventListener('mouseup',    onUp);
  canvas.addEventListener('touchstart', e => { e.preventDefault(); onDown(e.touches[0].clientX, e.touches[0].clientY); }, {passive:false});
  canvas.addEventListener('touchmove',  e => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); }, {passive:false});
  canvas.addEventListener('touchend',   onUp);

  function openPresent() {
    ps.opened = true;
    switchMusicToPresent(); // ← A MÚSICA TROCA EXATAMENTE AQUI!
    
    const hint = document.getElementById('presentHint');
    if (hint) hint.style.opacity = '0';

    const t0 = Date.now(), dur = 1100;
    function animOpen() {
      ps.openProgress = Math.min((Date.now()-t0)/dur, 1);
      draw();
      if (ps.openProgress < 1) requestAnimationFrame(animOpen);
      else setTimeout(() => goToScene(3), 1300);
    }
    animOpen();
  }
  draw();
}

// ═══════════════════════════════════════════
// FUNÇÕES VISUAIS (ESTRELAS, VELAS, ETC)
// ═══════════════════════════════════════════

function setupScene1() {
  setTimeout(() => { if (state.currentScene === 1) goToScene(2); }, CONFIG.scene1Duration);
}

function spawnStars() {
  const layer = document.getElementById('starsLayer');
  if (!layer) return;
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'star';
    const size = 1.5 + Math.random() * 3;
    el.style.cssText = `left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; width: ${size}px; height: ${size}px; animation-duration: ${2 + Math.random() * 4}s; animation-delay: ${Math.random() * 5}s;`;
    layer.appendChild(el);
  }
}

function spawnConfetti() {
  const layer = document.getElementById('confettiLayer');
  if (!layer) return;
  const colors = ['#ffb3d1','#ff80b3','#ffd6a5','#a0e7e5','#b5ead7','#ffdac1','#e2c4f0','#fff0a0'];
  for (let i = 0; i < 32; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const w = 5 + Math.random() * 7; const h = 5 + Math.random() * 7;
    el.style.cssText = `left: ${Math.random() * 100}%; width: ${w}px; height: ${h}px; background: ${colors[Math.floor(Math.random() * colors.length)]}; border-radius: ${Math.random() > .5 ? '50%' : '2px'}; animation-duration: ${4 + Math.random() * 7}s; animation-delay: ${Math.random() * 6}s; opacity: ${.4 + Math.random() * .5};`;
    layer.appendChild(el);
  }
}

function spawnStreamers() {
  const layer = document.getElementById('streamersLayer');
  if (!layer) return;
  const palettes = [['#ff80b3','#ffb3d1'],['#ffd700','#ffe680'],['#a0e7e5','#c8f5f4'],['#b5ead7','#d4f5e9'],['#e2c4f0','#f0defa'],['#ffdac1','#fff0e0'],['#ff9de2','#ffcef3'],['#c7f2a4','#e4f9cd']];
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('div');
    el.className = 'streamer';
    const pal = palettes[Math.floor(Math.random() * palettes.length)];
    const left = Math.random() * 100; const len = 30 + Math.random() * 60; const width = 3 + Math.random() * 4; const dur = 4 + Math.random() * 6; const delay = Math.random() * 7; const angle = -20 + Math.random() * 40;
    el.style.cssText = `left: ${left}%; width: ${width}px; height: ${len}px; background: linear-gradient(180deg, ${pal[0]} 0%, ${pal[1]} 100%); border-radius: ${width / 2}px; transform: rotate(${angle}deg); animation-duration: ${dur}s; animation-delay: -${delay}s; opacity: .85;`;
    layer.appendChild(el);
  }
}

function spawnFloatyHearts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const emojis = ['❤️','🌸','✨','💕','🌷','💖','⭐'];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    el.className = 'fheart';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `left: ${Math.random() * 95}%; bottom: -10%; animation-duration: ${6 + Math.random() * 8}s; animation-delay: ${Math.random() * 8}s;`;
    container.appendChild(el);
  }
}

function startCandleAnimation() {
  const canvas = document.getElementById('candleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 440, H = 260; canvas.width = W; canvas.height = H;
  const candles = [{ x: W * .32, baseY: H * .90 }, { x: W * .50, baseY: H * .86 }, { x: W * .68, baseY: H * .90 }];
  const candleH = H * .28, candleW = W * .028;
  let t = 0;
  function drawFrame() {
    ctx.clearRect(0, 0, W, H); t += .04;
    candles.forEach((c, i) => {
      const phase = t + i * 1.1;
      const bodyGrad = ctx.createLinearGradient(c.x - candleW, 0, c.x + candleW, 0);
      bodyGrad.addColorStop(0, '#f9e4b8'); bodyGrad.addColorStop(.5,'#fff6e0'); bodyGrad.addColorStop(1, '#e8c97a');
      ctx.fillStyle = bodyGrad;
      roundRectFill(ctx, c.x - candleW, c.baseY - candleH, candleW * 2, candleH, candleW * .4);
      const wickY = c.baseY - candleH;
      ctx.strokeStyle = '#5a3a1a'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(c.x, wickY); ctx.lineTo(c.x + Math.sin(phase * 2) * 1.5, wickY - 7); ctx.stroke();
      const flicker = Math.sin(phase * 3.7) * .12 + Math.sin(phase * 5.1) * .06;
      const flameH = 22 + flicker * 18; const flameW = 7 + flicker * 4;
      const cx = c.x + Math.sin(phase * 2.3) * 1.5; const cy = wickY - 6;
      const flame = ctx.createRadialGradient(cx, cy - flameH * .5, 0, cx, cy - flameH * .25, flameH * .6);
      flame.addColorStop(0, 'rgba(255,255,200,.95)'); flame.addColorStop(.3, 'rgba(255,220,60,.9)'); flame.addColorStop(1, 'rgba(255,60,0,.0)');
      ctx.fillStyle = flame; ctx.beginPath(); ctx.moveTo(cx - flameW, cy);
      ctx.bezierCurveTo(cx - flameW * 1.1, cy - flameH * .4, cx + Math.sin(phase) * 2 - flameW * .2, cy - flameH * .9, cx + Math.sin(phase * 1.5) * 1.5, cy - flameH);
      ctx.bezierCurveTo(cx + flameW * .2 + Math.cos(phase) * 2, cy - flameH * .9, cx + flameW * 1.1, cy - flameH * .4, cx + flameW, cy);
      ctx.fill();
    });
    requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

function roundRectFill(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r); ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h); ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r); ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y); ctx.fill();
}

function drawClosedPresent(ctx, S, drag) {
  const W = S*.56, H = S*.56; const bx = (S-W)/2, by = (S-H)/2; const shake = (drag/120) * 4;
  ctx.save(); ctx.translate((Math.random()-.5)*shake, (Math.random()-.5)*shake*.6);
  const g = ctx.createLinearGradient(bx, by, bx+W, by+H); g.addColorStop(0,'#ffb3d1'); g.addColorStop(1,'#ff80b3');
  ctx.fillStyle = g; roundRect(ctx, bx, by, W, H, 14); ctx.fill();
  ctx.fillStyle='#ff4d8d'; ctx.fillRect(bx+W/2-12, by-12, 24, H+24); ctx.fillRect(bx-12, by+H/2-12, W+24, 24);
  ctx.restore();
}

function drawOpenPresent(ctx, S, p) {
  const W=S*.56, H=S*.56; const bx=(S-W)/2, by=(S-H)/2;
  ctx.fillStyle='#ff80b3'; roundRect(ctx, bx, by+H*.3*p, W, H-H*.3*p, 14); ctx.fill();
  ctx.save(); ctx.translate(bx+W/2, by+H*.3); ctx.rotate(p*Math.PI/1.5); ctx.fillStyle='#ff4d8d'; roundRect(ctx, -W/2, -H*.38, W, H*.38, 14); ctx.restore();
  if (p>.65) { ctx.globalAlpha=(p-.65)/.35; ctx.font=`bold ${Math.round(S*.075)}px serif`; ctx.fillStyle='#d63a7a'; ctx.textAlign='center'; ctx.fillText('🎉 Surpresa!', S/2, S/2+12); ctx.globalAlpha=1; }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

function setupKeyboardSkip() { document.addEventListener('keydown', e => { if (e.key === 'Escape') goToScene(state.currentScene < 3 ? state.currentScene + 1 : 1); }); }

function initLetterScene() {
  document.getElementById('letterTitle').textContent = CONFIG.letterTitle;
  document.getElementById('letterMessage').textContent = CONFIG.letterMessage;
  document.getElementById('letterSignature').textContent = CONFIG.letterSignature;
  const w = document.querySelector('.letter-wrapper'); if (w) w.style.animationPlayState = 'running';
}

function updateLetterText() {
  const t=document.getElementById('letterTitle'); const m=document.getElementById('letterMessage'); const s=document.getElementById('letterSignature');
  if(t) t.textContent=CONFIG.letterTitle; if(m) m.textContent=CONFIG.letterMessage; if(s) s.textContent=CONFIG.letterSignature;
}