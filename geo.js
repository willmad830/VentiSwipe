/**
 * VentiSwipe - Seamless Geometric Background
 * Builds three vertically tileable SVG pattern tiles (wave mesh, strict grid,
 * wireframe accents) and renders them as repeating backgrounds on a fixed
 * layer. A single rAF loop translates each layer by scroll (wrapped modulo the
 * tile height) so the geometry flows forever with no seams, adds pointer
 * parallax, and cross-fades layers per scroll progress so the pattern adapts
 * from section to section. Identical behaviour on desktop and mobile.
 * Strictly NO emojis, NO em-dashes.
 */

const TILE_W = 1200;

function svgWrap(width, height, par, body) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height +
    '" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="' + par + '">' + body + '</svg>';
}

function defs() {
  return '<defs>' +
    '<linearGradient id="gm" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#7c3aed"/></linearGradient>' +
    '<linearGradient id="gn" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#06b6d4"/><stop offset="1" stop-color="#2563eb"/></linearGradient>' +
    '<linearGradient id="ga" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#a855f7"/><stop offset="1" stop-color="#ec4899"/></linearGradient>' +
    '</defs>';
}

// Warped mesh. Waves use whole cycles per tile so top and bottom edges match.
function meshTile(tile) {
  const rows = 9;
  const cols = 9;
  const amp = 26;
  const step = tile / rows;
  let body = defs();

  for (let i = 0; i < rows; i++) {
    const baseY = i * step;
    const phase = (i / rows) * Math.PI * 4;
    const pts = [];
    for (let x = 0; x <= TILE_W; x += 40) {
      const y = baseY + Math.sin((x / TILE_W) * Math.PI * 4 + phase) * amp;
      pts.push(x + ',' + y.toFixed(1));
    }
    body += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="url(#gm)" stroke-width="1.1"/>';
  }

  for (let c = 0; c <= cols; c++) {
    const baseX = (TILE_W / cols) * c;
    const phase = (c / cols) * Math.PI * 2;
    const pts = [];
    for (let y = 0; y <= tile; y += 40) {
      const x = baseX + Math.sin((y / tile) * Math.PI * 4 + phase) * amp * 0.6;
      pts.push(x.toFixed(1) + ',' + y);
    }
    body += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="url(#gn)" stroke-width="1"/>';
  }

  return svgWrap(TILE_W, tile, 'none', body);
}

// Strict, denser grid with node dots. Perfectly periodic per tile.
function gridTile(tile) {
  const cols = 12;
  const rows = Math.max(6, Math.round(tile / 90));
  let body = defs();

  for (let c = 0; c <= cols; c++) {
    const x = (TILE_W / cols) * c;
    body += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + tile +
      '" stroke="url(#gn)" stroke-width="1" stroke-opacity="0.55"/>';
  }
  for (let r = 0; r <= rows; r++) {
    const y = (tile / rows) * r;
    body += '<line x1="0" y1="' + y + '" x2="' + TILE_W + '" y2="' + y +
      '" stroke="url(#gm)" stroke-width="1" stroke-opacity="0.45"/>';
  }
  for (let c = 0; c <= cols; c += 2) {
    for (let r = 0; r <= rows; r += 2) {
      const x = (TILE_W / cols) * c;
      const y = (tile / rows) * r;
      body += '<circle cx="' + x + '" cy="' + y + '" r="2.2" fill="url(#ga)" fill-opacity="0.5"/>';
    }
  }

  return svgWrap(TILE_W, tile, 'none', body);
}

// Wireframe sphere plus digital rays, kept inside the tile so it repeats cleanly.
function accentsTile(tile) {
  const cx = TILE_W / 2;
  const cy = tile / 2;
  const min = Math.min(tile, TILE_W);
  const r = min * 0.16;
  const rr = min * 0.42;
  let body = defs();

  for (let i = 0; i < 24; i++) {
    const a = (Math.PI * 2 * i) / 24;
    body += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.cos(a) * rr).toFixed(1) +
      '" y2="' + (cy + Math.sin(a) * rr).toFixed(1) +
      '" stroke="url(#ga)" stroke-width="1" stroke-opacity="0.32"/>';
  }

  body += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r.toFixed(1) +
    '" fill="none" stroke="url(#gn)" stroke-width="1.2" stroke-opacity="0.6"/>';
  [0.36, 0.7, 0.92].forEach((k) => {
    body += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (r * k).toFixed(1) + '" ry="' + r.toFixed(1) +
      '" fill="none" stroke="url(#gn)" stroke-width="1" stroke-opacity="0.5"/>';
  });
  [0.38, 0.74].forEach((k) => {
    body += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + r.toFixed(1) + '" ry="' + (r * k).toFixed(1) +
      '" fill="none" stroke="url(#gn)" stroke-width="1" stroke-opacity="0.5"/>';
  });

  return svgWrap(TILE_W, tile, 'xMidYMid meet', body);
}

function tileImage(kind, tile) {
  let svg;
  if (kind === 'grid') svg = gridTile(tile);
  else if (kind === 'accents') svg = accentsTile(tile);
  else svg = meshTile(tile);
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function kindOf(el) {
  if (el.classList.contains('geo-flow--grid')) return 'grid';
  if (el.classList.contains('geo-flow--accents')) return 'accents';
  return 'mesh';
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function mod(a, m) {
  return ((a % m) + m) % m;
}

// Per-section density: mesh softens, strict grid fades in further down.
function opacityFor(kind, progress) {
  if (kind === 'grid') return smoothstep(0.14, 0.55, progress) * 0.5;
  if (kind === 'accents') return 0.34;
  return 0.44 - 0.18 * progress;
}

export function initGeoBackground() {
  const host = document.getElementById('geo-bg');
  if (!host) return;

  const layers = Array.from(host.querySelectorAll('.geo-flow')).map((el) => {
    const tile = parseFloat(el.dataset.tile) || 700;
    const kind = kindOf(el);
    el.style.setProperty('--tile', tile + 'px');
    el.style.backgroundImage = 'url("' + tileImage(kind, tile) + '")';
    return {
      el: el,
      kind: kind,
      tile: tile,
      factor: parseFloat(el.dataset.factor) || 0.2,
      depth: parseFloat(el.dataset.depth) || 0.5
    };
  });

  const state = {
    tx: 0, ty: 0, x: 0, y: 0, pulse: 0, lastPointer: -1e9
  };

  let docH = 1;
  let vh = window.innerHeight || 1;
  let rafId = null;
  let frameCount = 0;

  function measure() {
    vh = window.innerHeight || 1;
    docH = Math.max(1, document.documentElement.scrollHeight - vh);
  }

  function setPointer(e) {
    state.tx = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
    state.ty = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
    state.lastPointer = performance.now();
  }

  function frame(now) {
    rafId = window.requestAnimationFrame(frame);
    frameCount++;
    if (frameCount % 90 === 0) measure();

    const t = now / 1000;
    const idleX = Math.sin(t * 0.24) * 0.3;
    const idleY = Math.cos(t * 0.19) * 0.24;
    const weight = Math.max(0, Math.min(1, 1 - (now - state.lastPointer) / 1500));
    state.x += (idleX + (state.tx - idleX) * weight - state.x) * 0.06;
    state.y += (idleY + (state.ty - idleY) * weight - state.y) * 0.06;

    state.pulse *= 0.94;
    if (state.pulse < 0.001) state.pulse = 0;

    const progress = Math.max(0, Math.min(1, (window.scrollY || window.pageYOffset || 0) / docH));

    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      const scrollShift = (window.scrollY || window.pageYOffset || 0) * layer.factor;
      const offset = mod(scrollShift - state.y * 16 * layer.depth + state.pulse * 44, layer.tile);
      const px = state.x * layer.depth * 16;
      let op = opacityFor(layer.kind, progress) + Math.sin(t * 0.5 + i * 1.7) * 0.03 +
        state.pulse * (layer.kind === 'grid' ? 0.1 : 0.04);
      op = Math.max(0, Math.min(0.85, op));
      layer.el.style.transform = 'translate3d(' + px.toFixed(1) + 'px, ' + (-offset).toFixed(1) + 'px, 0)';
      layer.el.style.opacity = op.toFixed(3);
    }
  }

  function start() {
    if (rafId == null) rafId = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId != null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  window.addEventListener('pointermove', setPointer, { passive: true });
  window.addEventListener('resize', measure);
  document.addEventListener('venti:step', () => {
    state.pulse = 1;
    measure();
  });
  document.addEventListener('venti:phase', (e) => {
    state.pulse = e.detail && e.detail.phase === 'swiper' ? 1.3 : 1;
    measure();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  measure();
  host.classList.add('is-ready');
  start();
}
