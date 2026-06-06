/* ==============================
   SOUND CRAFT — Shared Script
   ============================== */

function makeStars(id, n) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  const parent = c.parentElement;
  const stars = [];
  function init() {
    c.width  = parent.offsetWidth;
    c.height = parent.offsetHeight;
    stars.length = 0;
    for (let i = 0; i < n; i++) {
      stars.push({
        x:  Math.random() * c.width,
        y:  Math.random() * c.height,
        r:  Math.random() * 1.2,
        a:  Math.random() * 0.6 + 0.1,
        sp: Math.random() * 0.008 + 0.002,
        ph: Math.random() * Math.PI * 2
      });
    }
  }
  function draw(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(s => {
      const f = (Math.sin(t * s.sp + s.ph) + 1) / 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,208,138,${s.a * 0.3 + f * s.a * 0.7})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', init);
  init();
  requestAnimationFrame(draw);
}

function makeCompassTicks(id) {
  const tg = document.getElementById(id);
  if (!tg) return;
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * 360;
    const r1 = 127, r2 = i % 6 === 0 ? 120 : 124;
    const rad = (a - 90) * Math.PI / 180;
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', 140 + r1 * Math.cos(rad));
    l.setAttribute('y1', 140 + r1 * Math.sin(rad));
    l.setAttribute('x2', 140 + r2 * Math.cos(rad));
    l.setAttribute('y2', 140 + r2 * Math.sin(rad));
    tg.appendChild(l);
  }
}

function buildWaveform(selector, bars) {
  const el = document.querySelector(selector);
  if (!el) return;
  const heights = [20, 35, 15, 40, 28, 38, 12, 40, 25, 38, 14, 40, 30, 36, 18, 40, 22, 35];
  for (let i = 0; i < (bars || 22); i++) {
    const span = document.createElement('span');
    const h = heights[i % heights.length];
    span.style.height = h + 'px';
    span.style.animationDelay = (i * 0.07) + 's';
    el.appendChild(span);
  }
}

// Auto-init on load
window.addEventListener('DOMContentLoaded', () => {
  makeStars('stars-canvas',  200);
  makeStars('stars-canvas2', 150);
  makeCompassTicks('ticks');
  buildWaveform('.waveform', 22);
});
