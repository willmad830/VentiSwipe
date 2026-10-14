/**
 * VentiSwipe - Mobile Interaction Layer
 * Drawer navigation, gesture quiz navigation, thumb-zone action bar,
 * undo history and haptic feedback. Initialized by app.js with a small API
 * so this module never imports app.js (no circular dependency).
 * Strictly NO emojis and NO em-dashes.
 */

const COARSE_QUERY = '(pointer: coarse)';

function isCoarsePointer() {
  return !!(window.matchMedia && window.matchMedia(COARSE_QUERY).matches);
}

// Haptic feedback via the native Vibration API. No-op where unsupported (iOS).
export function haptic(type) {
  if (!isCoarsePointer()) return;
  if (!navigator || typeof navigator.vibrate !== 'function') return;
  const patterns = { like: 12, skip: 12, undo: 26, step: 8 };
  const pattern = patterns[type];
  if (!pattern) return;
  try {
    navigator.vibrate(pattern);
  } catch (err) {
    /* noop */
  }
}

function initDrawer() {
  const trigger = document.getElementById('btn-mobile-menu');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const closeBtn = document.getElementById('btn-mobile-menu-close');
  const cta = document.getElementById('btn-start-hero-mobile');
  if (!trigger || !drawer || !backdrop) return;

  let lastFocused = null;
  let closeTimer = null;

  const focusable = () => Array.from(drawer.querySelectorAll('a[href], button:not([disabled])'));

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = focusable();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function open() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    lastFocused = document.activeElement;
    drawer.hidden = false;
    backdrop.hidden = false;
    window.requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
    });
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
    const items = focusable();
    if (items[0]) items[0].focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
    document.removeEventListener('keydown', onKeydown);
    closeTimer = window.setTimeout(() => {
      drawer.hidden = true;
      backdrop.hidden = true;
      closeTimer = null;
    }, 280);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  trigger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  drawer.querySelectorAll('a[href]').forEach((link) => link.addEventListener('click', close));
  if (cta) {
    cta.addEventListener('click', () => {
      close();
      const hero = document.getElementById('hero-block');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Horizontal swipe between quiz questions. Uses the pointer stream directly so
// vertical page scrolling keeps working (no preventDefault, direction lock).
function initQuizGestures(api) {
  const form = document.getElementById('step-1-form');
  if (!form) return;

  const IGNORE = 'input, textarea, select, button, .range-input, .preset-btn, a';
  const LOCK_PX = 12;
  const COMMIT_PX = 64;

  let startX = 0;
  let startY = 0;
  let tracking = false;
  let axis = null;
  let pointerId = null;

  form.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    if (e.target.closest(IGNORE)) return;
    tracking = true;
    axis = null;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
  }, { passive: true });

  form.addEventListener('pointermove', (e) => {
    if (!tracking || e.pointerId !== pointerId || axis) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) < LOCK_PX && Math.abs(dy) < LOCK_PX) return;
    axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
  }, { passive: true });

  form.addEventListener('pointerup', (e) => {
    if (!tracking || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    const horizontal = axis === 'x';
    tracking = false;
    axis = null;
    pointerId = null;
    if (!horizontal || Math.abs(dx) < COMMIT_PX) return;
    if (dx < 0) {
      api.quizNext();
    } else {
      api.quizPrev();
    }
    haptic('step');
  }, { passive: true });

  form.addEventListener('pointercancel', () => {
    tracking = false;
    axis = null;
    pointerId = null;
  }, { passive: true });
}

function initSwiperBar(api) {
  const skip = document.getElementById('btn-mobile-skip');
  const like = document.getElementById('btn-mobile-like');
  const undo = document.getElementById('btn-mobile-undo');
  const restart = document.getElementById('btn-mobile-restart');

  if (skip) skip.addEventListener('click', () => api.triggerCardAction('skip'));
  if (like) like.addEventListener('click', () => api.triggerCardAction('like'));
  if (undo) undo.addEventListener('click', () => api.undoLastSwipe());
  if (restart) restart.addEventListener('click', () => api.restart());
}

function initGestureHint() {
  const hint = document.getElementById('swiper-gesture-hint');
  const swiper = document.getElementById('step-2-swiper');
  if (!hint || !swiper) return;

  let revealed = false;

  function hide() {
    hint.classList.remove('is-visible');
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem('venti-hint-seen') === '1';
    } catch (err) {
      seen = false;
    }
    if (seen) return;
    hint.classList.add('is-visible');
    try {
      window.sessionStorage.setItem('venti-hint-seen', '1');
    } catch (err) {
      /* noop */
    }
    window.setTimeout(hide, 4200);
  }

  const stack = document.getElementById('card-stack');
  if (stack) stack.addEventListener('pointerdown', hide, { passive: true });

  if (!('MutationObserver' in window)) {
    reveal();
    return;
  }
  const observer = new MutationObserver(() => {
    if (!swiper.classList.contains('hidden')) {
      reveal();
      observer.disconnect();
    }
  });
  observer.observe(swiper, { attributes: true, attributeFilter: ['class'] });
}

export function initMobile(api) {
  initDrawer();
  initSwiperBar(api);
  initGestureHint();
  if (isCoarsePointer()) {
    initQuizGestures(api);
  }
}
