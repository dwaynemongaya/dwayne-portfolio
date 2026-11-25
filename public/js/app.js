import { Burst } from './burst.js';

const { gsap, ScrollTrigger } = window;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const phone = matchMedia('(max-width: 720px)');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* ───────── Easing ───────── */
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (t) => ((ax * t + bx) * t + cx) * t;
  const Y = (t) => ((ay * t + by) * t + cy) * t;
  const dX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = X(t) - x;
      if (Math.abs(e) < 1e-5) return Y(t);
      const d = dX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1; t = x;
    for (let i = 0; i < 24; i++) { const v = X(t); if (Math.abs(v - x) < 1e-5) break; if (v < x) lo = t; else hi = t; t = (lo + hi) / 2; }
    return Y(t);
  };
}
const QOUT = bezier(0.25, 1, 0.5, 1);
const COUT = bezier(0.33, 1, 0.68, 1);
const CIN = bezier(0.32, 0, 0.67, 0);
const RISE = bezier(0.2, 0.65, 0.3, 1);
const PORTRAIT = bezier(0.2, 0.5, 0.2, 1);
// "Glide then settle": steady travel, then an exponential settle.
const END = 0.293 * Math.exp(-(1.8 - 0.47) / 0.232);
const glide = (x) => {
  const t = clamp(x) * 1.8;
  const rem = t < 0.47 ? 1 - 1.506 * t : 0.293 * Math.exp(-(t - 0.47) / 0.232);
  return Math.min(1, (1 - rem) / (1 - END));
};
const easeIO = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

/* ───────── Glitch (double-exposure) reveal ───────── */
const EM = 'rgba(255,112,48,', INK = 'rgba(255,255,255,';
function glitch(el, delay = 0) {
  el.style.opacity = '1';
  if (rm) return;
  const kf = [
    { offset: 0, opacity: 0, clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-.05em)', textShadow: `-.12em 0 0 ${EM}.8), .07em 0 0 ${INK}.25)` },
    { offset: 0.3, opacity: 1, clipPath: 'inset(0 38% 0 0)', transform: 'translateX(.035em)', textShadow: `.09em 0 0 ${EM}.65), -.05em 0 0 ${INK}.3)` },
    { offset: 0.55, opacity: 0.8, clipPath: 'inset(0)', transform: 'translateX(-.018em)', textShadow: `-.045em 0 0 ${EM}.55), .025em 0 0 ${INK}.2)` },
    { offset: 0.78, opacity: 1, clipPath: 'inset(0)', transform: 'translateX(.008em)', textShadow: `.015em 0 0 ${EM}.35), 0 0 0 transparent` },
    { offset: 1, opacity: 1, clipPath: 'inset(0)', transform: 'none', textShadow: '0 0 0 transparent, 0 0 0 transparent' },
  ];
  el.animate(kf, { duration: 900, delay, easing: 'steps(14, end)', fill: 'backwards' });
}

/* ───────── Splitters ───────── */
function splitWords(el) {
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.innerHTML = text.split(/\s+/).map((w) => `<span class="w" aria-hidden="true"><span class="wi">${w}</span></span>`).join(' ');
  return $$('.wi', el);
}
function splitChars(el) {
  const text = el.textContent.trim();
  el.innerHTML = [...text].map((c) => `<span class="hc" aria-hidden="true">${c}</span>`).join('');
  return $$('.hc', el);
}
function splitIntro(el) {
  const text = el.textContent.trim();
  el.innerHTML = text.split(/\s+/).map((w) => `<span class="ww">${[...w].map((c) => `<span class="cw"><span class="ch">${c}</span></span>`).join('')}</span>`).join('<span class="sp"></span>');
  return $$('.ch', el);
}
function mask(el) {
  const inner = document.createElement('span');
  inner.className = 'mi';
  while (el.firstChild) inner.appendChild(el.firstChild);
  el.classList.add('mk');
  el.appendChild(inner);
  return inner;
}

/* ───────── Setup ───────── */
gsap.registerPlugin(ScrollTrigger);
const hwrap = $('#hwrap');
const hero = $('#home');
const heroBack = $('#heroBack');
const heroWord = $('#heroWord');
const heroBig = $('.hb');
const heroKick = $('.hk');
const heroCopy = $('#heroCopy');
const hz = $('#hz');
const portrait = $('#portrait');
const heroChars = [...splitChars(heroKick), ...splitChars(heroBig)];
heroBig.setAttribute('aria-hidden', 'true');
heroKick.setAttribute('aria-hidden', 'true');
const heroName = $('#heroName');
$('#heroName').setAttribute('aria-label', 'Dwayne Mongaya');
const roleIn = mask($('.hero-role'));
const introIn = mask($('.hero-intro'));
const menuLinks = $$('#menu a');
const menuSpans = menuLinks.map((a) => { const s = document.createElement('span'); s.textContent = a.textContent; a.textContent = ''; a.appendChild(s); return s; });
const introChars = $$('.intro-name').flatMap((n) => splitIntro(n));
$$('.split').forEach((h) => { h._words = splitWords(h); });

/* Smooth scroll, synced with GSAP */
let lenis = null;
if (!rm && window.Lenis) {
  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

/* Hero burst (back layer) */
const small = phone.matches;
const heroBurst = new Burst(hero, $('#burst'), {
  rays: small ? 90 : 140,
  embers: small ? 150 : 280,
  still: rm,
  anchor: () => ({ x: portrait.offsetLeft + portrait.offsetWidth * 0.5, y: portrait.offsetTop + portrait.offsetHeight * 0.17 }),
});
portrait.addEventListener('load', () => heroBurst.resize());

/* Pointer parallax across the three layers */
if (fine && !rm) {
  const px = gsap.quickTo(portrait, 'x', { duration: 1, ease: 'power3.out' });
  const py = gsap.quickTo(portrait, 'y', { duration: 1, ease: 'power3.out' });
  const wx = gsap.quickTo(heroWord, 'x', { duration: 1.2, ease: 'power3.out' });
  const wy = gsap.quickTo(heroWord, 'y', { duration: 1.2, ease: 'power3.out' });
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    px(nx * -14); py(ny * -6);
    wx(nx * 10); wy(ny * 5);
    heroBurst.setShift(nx * 34, ny * 20);
  });
  hero.addEventListener('pointerleave', () => { px(0); py(0); wx(0); wy(0); heroBurst.setShift(0, 0); });
}

/* Contact burst */
new Burst($('#contact'), $('#burst2'), {
  rays: small ? 50 : 80, embers: small ? 70 : 120, intensity: 0.75, still: rm, core: false,
  anchor: (w, h) => ({ x: w * (small ? 0.5 : 0.82), y: h * 0.46 }),
});

/* ───────── Horizon glow + hero glitch-out (scroll driven) ───────── */
let heroLive = rm; // true once the entrance has finished
const STOPS = [
  [0, 'rgba(0,0,0,0)'], [0.985, 'rgba(255,236,200,0)'], [1.0, 'rgba(255,222,170,.6)'], [1.06, '#ffb060'], [1.14, '#ff7a30'],
  [1.236, '#e8452e'], [1.32, '#8e2330'], [1.42, '#3a1420'], [1.53, '#170d0e'], [1.65, 'oklch(0.14 0.014 28)'],
];
let lastY = -1;
function updateHero() {
  const y = window.scrollY;
  const vh = innerHeight, vw = root.clientWidth;
  const key = `${y}|${vh}|${vw}`;
  if (key === lastY) return;
  lastY = key;
  const e = (hwrap.offsetHeight - y) / vh - 0.47;
  const edge = e > 0.12 ? e : -0.03 + 0.15 * Math.exp((e - 0.12) / 0.15);
  const op = 1 - easeIO(clamp((-0.12 - e) / 0.4));
  if (op < 0.002 || e > 1.04) {
    hz.style.display = 'none';
  } else {
    const Rx = Math.max(0.75 * vw, 0.9 * vh), Ry = 0.72 * vh;
    const cy = edge * vh - Ry;
    const stops = STOPS.map(([s, c]) => `${c} ${(s * Rx).toFixed(1)}px`).join(', ');
    hz.style.display = 'block';
    hz.style.background = `radial-gradient(${Rx.toFixed(1)}px ${Ry.toFixed(1)}px at 50% ${cy.toFixed(1)}px, ${stops})`;
    hz.style.opacity = op.toFixed(3);
  }
  hero.style.visibility = e < -0.06 ? 'hidden' : 'visible';
  if (!heroLive) return;
  const k = clamp((0.95 - e) / 0.42);
  heroCopy.style.opacity = String(1 - k);
  $('.hero-hint').style.opacity = String(1 - k);
  heroCopy.style.translate = `0 ${(-5 * k).toFixed(2)}vh`;
  if (k > 0 && k < 1) {
    const j = ((((Math.floor(k * 16) * 9301 + 49297) % 233280) / 233280) - 0.5);
    const o = j * 0.09;
    heroName.style.transform = `translateX(${o.toFixed(4)}em)`;
    heroName.style.textShadow = `${(-1.6 * o).toFixed(4)}em 0 0 rgba(255,112,48,${(0.7 * k + 0.15).toFixed(2)}), ${(0.8 * o).toFixed(4)}em 0 0 rgba(255,255,255,.25)`;
    heroName.style.clipPath = `inset(0 ${(k * k * 100).toFixed(2)}% 0 0)`;
  } else if (k >= 1) {
    heroName.style.clipPath = 'inset(0 100% 0 0)';
    heroName.style.textShadow = 'none';
  } else {
    heroName.style.transform = ''; heroName.style.textShadow = ''; heroName.style.clipPath = '';
  }
}
gsap.ticker.add(updateHero);
addEventListener('resize', () => { lastY = -1; });

/* ───────── Intro (once) + hero entrance ───────── */
function entrance(t0) {
  const tl = gsap.timeline();
  const at = (ms) => t0 + ms / 1000;
  tl.from(heroBack, { scale: 1.25, duration: 1.35, ease: QOUT }, t0);
  tl.from('.logo, .topbar-cta', { opacity: 0, duration: 0.4, ease: COUT }, at(200));
  tl.from('#menu', { opacity: 0, duration: 0.3, ease: COUT }, t0);
  menuSpans.forEach((s, i) => tl.from(s, { yPercent: -110, duration: 0.3, ease: COUT }, at(100 + i * 100)));
  heroChars.forEach((c, i) => tl.from(c, { opacity: 0, y: '0.14em', duration: 0.7, ease: RISE }, at(500 + i * 54)));
  tl.fromTo(portrait, { yPercent: 66 }, { yPercent: -2.5, duration: 1.9, ease: PORTRAIT }, at(850));
  tl.to(portrait, { yPercent: 0, duration: 0.9, ease: 'sine.inOut' }, at(2750));
  tl.from(roleIn, { yPercent: 100, duration: 0.9, ease: COUT }, at(1100));
  tl.from(introIn, { yPercent: 100, duration: 0.9, ease: COUT }, at(1200));
  tl.from('.hero-actions', { opacity: 0, y: 14, duration: 0.5, ease: COUT }, at(1350));
  tl.from('.hero-meta', { opacity: 0, x: -10, duration: 0.4, ease: COUT }, at(1450));
  tl.from('.hero-hint', { opacity: 0, duration: 0.5 }, at(1800));
  tl.call(() => heroBurst.ignite(), null, t0 + 0.15);
  tl.call(() => { heroLive = true; lastY = -1; }, null, at(1900));
  return tl;
}

function begin() {
  root.classList.add('ready');
  heroLive = true;
  lastY = -1;
  if (lenis) lenis.start();
  ScrollTrigger.refresh();
  if (location.hash && $(location.hash)) {
    const t = $(location.hash);
    if (lenis) lenis.scrollTo(t, { immediate: true }); else t.scrollIntoView();
  }
}

function playIntro() {
  const intro = $('#intro');
  if (rm || root.classList.contains('no-intro') || !intro) { intro && intro.remove(); begin(); return; }
  const tl = gsap.timeline({ onComplete: () => { intro.remove(); removeEventListener('keydown', skip); intro.removeEventListener('pointerdown', skip); } });
  const skip = () => tl.timeScale(4);
  const T0 = 0.95;
  tl.from(introChars, { yPercent: 140, duration: 0.55, ease: QOUT, stagger: 0.02 }, 0)
    .to('.seam', { scaleY: 1, duration: 0.5, ease: 'expo.out' }, 0.25)
    .to(introChars, { yPercent: -140, duration: 0.35, ease: CIN, stagger: 0.01 }, 0.78)
    .to('.door-l', { xPercent: -101, duration: 0.85, ease: 'expo.inOut' }, 0.9)
    .to('.door-r', { xPercent: 101, duration: 0.85, ease: 'expo.inOut' }, 0.9)
    .to('.seam', { opacity: 0, duration: 0.3 }, 0.95)
    .add(entrance(0), T0)
    .call(begin, null, 1.6);
  addEventListener('keydown', skip, { once: true });
  intro.addEventListener('pointerdown', skip, { once: true });
  // failsafe: never leave the visitor on a stalled intro (throttled tabs, slow devices)
  setTimeout(() => { if (tl.progress() < 1) tl.progress(1); }, 4500);
}

const ready = Promise.race([
  Promise.all([document.fonts ? document.fonts.ready : 0, portrait.decode ? portrait.decode().catch(() => {}) : 0]),
  new Promise((r) => setTimeout(r, 700)),
]);
ready.then(() => requestAnimationFrame(() => { heroBurst.resize(); playIntro(); }));

/* ───────── Navigation ───────── */
const menu = $('#menu');
const pill = $('#menuPill');
let activeLink = null, hoverLink = null;
function movePill() {
  const cur = hoverLink || activeLink;
  menuLinks.forEach((a) => a.classList.toggle('is-active', a === cur));
  if (!cur) { gsap.to(pill, { opacity: 0, duration: 0.3 }); return; }
  gsap.to(pill, { x: cur.offsetLeft, width: cur.offsetWidth, opacity: 1, duration: rm ? 0 : 0.55, ease: QOUT, overwrite: 'auto' });
  if (phone.matches && cur === activeLink) menu.scrollTo({ left: cur.offsetLeft - (menu.clientWidth - cur.offsetWidth) / 2, behavior: 'smooth' });
}
menuLinks.forEach((a) => {
  a.addEventListener('pointerenter', () => { if (fine) { hoverLink = a; movePill(); } });
  a.addEventListener('pointerleave', () => { hoverLink = null; movePill(); });
});
['about', 'projects', 'skills', 'certification', 'contact'].forEach((id) => {
  const el = document.getElementById(id);
  const link = menuLinks.find((a) => a.getAttribute('href') === `#${id}`);
  ScrollTrigger.create({
    trigger: el, start: 'top 55%', end: 'bottom 55%',
    onToggle: (s) => { if (s.isActive) { activeLink = link; } else if (activeLink === link) { activeLink = null; } movePill(); },
  });
});
addEventListener('resize', movePill);

$$('[data-nav]').forEach((a) => a.addEventListener('click', (e) => {
  const hash = a.getAttribute('href');
  const target = hash === '#home' ? hero : $(hash);
  if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(hash === '#home' ? 0 : target, { duration: 1.5, easing: glide });
  else target.scrollIntoView({ behavior: rm ? 'auto' : 'smooth' });
  history.replaceState(null, '', hash);
  if (hash !== '#home') { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
}));

const progress = $('#progress');
ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => gsap.set(progress, { scaleX: s.progress }) });

/* ───────── Scroll reveals ───────── */
if (!rm) {
  // headings: glitch double-exposure, word by word
  $$('.split').forEach((h) => {
    gsap.set(h._words, { opacity: 0 });
    ScrollTrigger.create({ trigger: h, start: 'top 88%', once: true, onEnter: () => h._words.forEach((w, i) => glitch(w, i * 110)) });
  });
  gsap.set('.reveal', { opacity: 0, y: 56 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.5, ease: glide, stagger: 0.09, overwrite: true }),
  });
  // at-a-glance numbers: glitch in, hairline draws, count up
  $$('.nums li').forEach((li) => {
    const n = $('.n', li);
    const target = Number(n.dataset.count);
    gsap.set(li, { opacity: 0, y: 12, '--hl': 0 });
    n.style.opacity = '0';
    n.textContent = '0';
    ScrollTrigger.create({
      trigger: li, start: 'top 88%', once: true,
      onEnter: () => {
        gsap.to(li, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        gsap.to(li, { '--hl': 1, duration: 0.9, delay: 0.06, ease: bezier(0.7, 0, 0.2, 1) });
        glitch(n, 60);
        const o = { v: 0 };
        gsap.to(o, { v: target, duration: 1.6, ease: 'power3.out', onUpdate: () => { n.textContent = String(Math.round(o.v)); } });
      },
    });
  });
}

/* ───────── Projects: sticky stack ───────── */
const projs = $$('.proj');
const wide = matchMedia('(min-width: 900px)');
function setTops() {
  projs.forEach((p) => { p.style.top = wide.matches ? `${Math.min(0, innerHeight - p.offsetHeight)}px` : ''; });
}
setTops();
addEventListener('resize', () => { setTops(); ScrollTrigger.refresh(); });
addEventListener('load', () => { setTops(); ScrollTrigger.refresh(); });

if (!rm) {
  projs.forEach((p, i) => {
    const next = projs[i + 1];
    if (next) {
      gsap.to($('.proj-in', p), {
        scale: 0.93, opacity: 0.3, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
      });
    }
    gsap.from($('.frame', p), {
      y: 90, rotationX: 10, opacity: 0, duration: 1.4, ease: glide,
      scrollTrigger: { trigger: p, start: 'top 70%', once: true },
    });
  });
  if (fine) {
    $$('.proj-media').forEach((m) => {
      const f = $('.frame', m);
      m.addEventListener('pointermove', (e) => {
        const r = m.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1, ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        gsap.to(f, { rotationY: nx * 6, rotationX: -ny * 5, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
      });
      m.addEventListener('pointerleave', () => gsap.to(f, { rotationY: 0, rotationX: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' }));
    });
  }
}

/* ───────── Skills marquee (speeds up with scroll) ───────── */
const track = $('#marquee');
if (track && !rm) {
  track.innerHTML += track.innerHTML;
  const half = () => track.scrollWidth / 2;
  const loop = gsap.to(track, { x: () => -half(), duration: 38, ease: 'none', repeat: -1 });
  let ts = 1, boost = 1;
  ScrollTrigger.create({
    trigger: '.marquee', start: 'top bottom', end: 'bottom top',
    onUpdate: (s) => { boost = s.direction * (1 + Math.min(Math.abs(s.getVelocity()) / 350, 6)); },
  });
  gsap.ticker.add(() => { ts += (boost - ts) * 0.08; boost += (1 - boost) * 0.04; loop.timeScale(ts); });
  addEventListener('resize', () => loop.invalidate());
}

/* ───────── Magnetic buttons ───────── */
if (fine && !rm) {
  $$('.mag').forEach((b) => {
    const qx = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' });
    const qy = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' });
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.28);
      qy((e.clientY - (r.top + r.height / 2)) * 0.34);
    });
    b.addEventListener('pointerleave', () => { qx(0); qy(0); });
  });
}

/* ───────── Viewer (images, certificates, award) ───────── */
const viewer = $('#viewer');
const vImg = $('#viewerImg');
const vCap = $('#viewerCap');
$$('[data-view]').forEach((b) => b.addEventListener('click', () => {
  vImg.src = b.dataset.view;
  vImg.alt = b.dataset.alt || '';
  vCap.textContent = b.dataset.caption || '';
  viewer.showModal();
  if (lenis) lenis.stop();
}));
viewer.addEventListener('close', () => { if (lenis) lenis.start(); });
viewer.addEventListener('click', (e) => { if (e.target === viewer || e.target.classList.contains('viewer-in')) viewer.close(); });

/* ───────── Copy email ───────── */
const toast = $('#toast');
let toastTimer;
function say(msg) {
  $('#toastText').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
$('#copyEmail').addEventListener('click', async () => {
  const email = 'dwayne.mongaya24@gmail.com';
  try { await navigator.clipboard.writeText(email); say('Email address copied'); }
  catch {
    const t = document.createElement('textarea'); t.value = email; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); say('Email address copied'); } catch { say(email); }
    t.remove();
  }
});
