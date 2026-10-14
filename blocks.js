/**
 * VentiSwipe - Content Block Scroll Motion
 * Drives the blocks below the quiz on a virtual horizontal cylinder as the
 * page scrolls (scenario A) and warps them with scroll velocity (scenario B),
 * springing back softly when scrolling stops. Desktop and mobile alike.
 * Writes only the individual `rotate` / `scale` properties so the desktop
 * cursor-field `transform` keeps working. Strictly NO emojis, NO em-dashes.
 */

const BLOCK_SELECTOR = [
  '.feature-card',
  '.stat-card',
  '.finance-card-wrapper',
  '.partner-box',
  '.shock-insight-card',
  '.section-head'
].join(', ');

const MAX_ANGLE = 12;
const MAX_VEL_DEG = 6;

export function initBlockMotion() {
  const blocks = Array.from(document.querySelectorAll(BLOCK_SELECTOR));
  if (!blocks.length) return;

  const items = blocks.map((el) => {
    el.classList.add('motion-block');
    return { el: el, top: 0, h: 1 };
  });

  let vh = window.innerHeight || 1;
  let lastScroll = window.scrollY || window.pageYOffset || 0;
  let velocityPx = 0;
  let rafId = null;
  let running = false;
  let idleFrames = 0;
  let frameCount = 0;

  function measure() {
    vh = window.innerHeight || 1;
    const sy = window.scrollY || window.pageYOffset || 0;
    for (let i = 0; i < items.length; i++) {
      const r = items[i].el.getBoundingClientRect();
      items[i].top = r.top + sy;
      items[i].h = r.height || 1;
    }
  }

  function reset(el) {
    if (el.style.rotate) {
      el.style.rotate = '0deg';
      el.style.scale = '1';
    }
  }

  function frame() {
    rafId = window.requestAnimationFrame(frame);
    frameCount++;
    if (frameCount % 45 === 0) measure();

    const sy = window.scrollY || window.pageYOffset || 0;
    const dv = sy - lastScroll;
    lastScroll = sy;
    velocityPx += (dv - velocityPx) * 0.25;
    velocityPx *= 0.85;
    if (Math.abs(velocityPx) < 0.1) velocityPx = 0;

    const cy = vh / 2;
    const half = vh / 2 || 1;
    const velDeg = Math.max(-MAX_VEL_DEG, Math.min(MAX_VEL_DEG, velocityPx * 0.16));

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const center = item.top + item.h / 2 - sy;

      if (center < -item.h || center > vh + item.h) {
        reset(item.el);
        continue;
      }

      let d = (center - cy) / half;
      d = Math.max(-1.3, Math.min(1.3, d));
      const abs = Math.abs(d);
      const angle = -d * MAX_ANGLE + velDeg;
      const scale = Math.max(0.9, 1 - abs * 0.05 - Math.abs(velDeg) * 0.004);

      item.el.style.rotate = 'x ' + angle.toFixed(2) + 'deg';
      item.el.style.scale = scale.toFixed(4);
    }

    if (dv === 0 && velocityPx === 0) {
      idleFrames++;
      if (idleFrames > 50) stop();
    } else {
      idleFrames = 0;
    }
  }

  function start() {
    idleFrames = 0;
    if (running) return;
    running = true;
    lastScroll = window.scrollY || window.pageYOffset || 0;
    rafId = window.requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  window.addEventListener('scroll', start, { passive: true });
  window.addEventListener('resize', measure);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  measure();
  start();
}
