// Interactive explosion: shards, embers, shockwaves and a hot core drawn on a 2D canvas.
// The pointer bends nearby shards, repels embers; clicks detonate a shockwave.

const TAU = Math.PI * 2;
const COLORS = [
  [255, 240, 170], // flare
  [255, 190, 70],
  [255, 128, 46],  // ember
  [244, 70, 62],
  [226, 52, 96],   // rose
];
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export class Burst {
  constructor(host, canvas, opts = {}) {
    this.host = host;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.o = Object.assign({ rays: 130, embers: 260, intensity: 1, still: false, anchor: null, maxDpr: 2, core: true }, opts);
    this.w = 0; this.h = 0; this.dpr = 1;
    this.origin = { x: 0, y: 0 };
    this.shift = { x: 0, y: 0 };
    this.shiftNow = { x: 0, y: 0 };
    this.ptr = { x: 0, y: 0, active: false, str: 0 };
    this.kickV = 0;
    this.rings = [];
    this.rot = Math.random() * TAU;
    this.t = 0;
    this.quality = 1;
    this.slow = 0;
    this.visible = true;
    this.running = false;
    this.last = 0;

    this.buildRays();
    this.resize();
    this.buildEmbers();

    this.onFrame = this.onFrame.bind(this);
    if (!this.o.still) {
      this.bindEvents();
      this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; this.sync(); }, { threshold: 0 });
      this.io.observe(this.canvas);
      document.addEventListener('visibilitychange', () => this.sync());
      this.sync();
    }
    this.ro = new ResizeObserver(() => { this.resize(); if (this.o.still) this.draw(0); });
    this.ro.observe(this.canvas);
    if (this.o.still) this.draw(0);
  }

  buildRays() {
    const n = this.o.rays;
    this.rays = Array.from({ length: n }, (_, i) => {
      const fat = Math.random() < 0.32;
      return {
        a: (i / n) * TAU + rand(-0.5, 0.5) * (TAU / n),
        len: fat ? rand(0.45, 0.95) : rand(0.3, 1),
        bw: fat ? rand(7, 20) : rand(1.2, 5),
        c: Math.floor(Math.random() * COLORS.length),
        al: fat ? rand(0.16, 0.34) : rand(0.28, 0.72),
        sp: rand(-0.05, 0.05),
        ph: rand(0, TAU),
        fl: rand(0.6, 2.2),
        off: rand(0.6, 1.3),
      };
    });
  }

  buildEmbers() {
    const n = this.o.embers;
    this.embers = Array.from({ length: n + 220 }, (_, i) => ({
      x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1, c: 0, loop: i < n,
    }));
    this.embers.slice(0, n).forEach((e) => { this.spawn(e, this.origin.x, this.origin.y, 1); e.life = rand(0, e.max); });
  }

  spawn(e, x, y, power) {
    const a = rand(0, TAU);
    const sp = rand(70, 430) * power;
    const r = rand(0, this.coreR * 0.9);
    e.x = x + Math.cos(a) * r; e.y = y + Math.sin(a) * r;
    e.vx = Math.cos(a) * sp; e.vy = Math.sin(a) * sp;
    e.max = rand(1.2, 3.4); e.life = e.max;
    e.size = rand(0.8, 2.8); e.c = Math.floor(Math.random() * COLORS.length);
  }

  resize() {
    // layout size (ignores CSS transforms such as the intro zoom)
    this.w = this.canvas.clientWidth; this.h = this.canvas.clientHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.o.maxDpr);
    this.canvas.width = Math.max(1, Math.round(this.w * this.dpr));
    this.canvas.height = Math.max(1, Math.round(this.h * this.dpr));
    this.R = Math.hypot(this.w, this.h) * 0.62;
    this.coreR = Math.min(this.w, this.h) * 0.075;
    this.small = this.w < 720;
    this.anchor();
  }

  anchor() {
    const a = this.o.anchor ? this.o.anchor(this.w, this.h) : { x: this.w / 2, y: this.h / 2 };
    this.origin.x = a.x; this.origin.y = a.y;
  }

  setShift(x, y) { this.shift.x = x; this.shift.y = y; }

  bindEvents() {
    const h = this.host;
    const local = (e) => {
      const r = this.canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    h.addEventListener('pointermove', (e) => {
      const p = local(e);
      this.ptr.x = p.x; this.ptr.y = p.y; this.ptr.active = true;
    });
    h.addEventListener('pointerleave', () => { this.ptr.active = false; });
    h.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a, button, input, dialog')) return;
      const p = local(e);
      this.ptr.x = p.x; this.ptr.y = p.y; this.ptr.active = true;
      this.shock(p.x, p.y, 1);
    });
    h.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') this.ptr.active = false; });
  }

  shock(x, y, power = 1) {
    this.rings.push({ x, y, r: 0, v: 1100 * power, life: 1, w: 5 * power });
    this.rings.push({ x, y, r: 0, v: 620 * power, life: 0.8, w: 2.5 * power });
    this.kickV = Math.min(1.6, this.kickV + 0.9 * power);
    let n = Math.round(110 * power * this.quality);
    for (const e of this.embers) {
      if (n <= 0) break;
      if (!e.loop && e.life <= 0) {
        this.spawn(e, x, y, rand(1.4, 3.2) * power);
        e.max = rand(0.9, 2.2); e.life = e.max;
        n--;
      }
    }
  }

  // Big opening detonation from the anchor.
  ignite() {
    this.anchor();
    this.shock(this.origin.x, this.origin.y, 1.5);
    this.kickV = 1.8;
  }

  sync() {
    const should = this.visible && !document.hidden && !this.o.still;
    if (should && !this.running) { this.running = true; this.last = performance.now(); requestAnimationFrame(this.onFrame); }
    else if (!should) this.running = false;
  }

  onFrame(now) {
    if (!this.running) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.draw(dt);
    // adaptive quality: shed work on slow devices
    if (dt > 0.026) this.slow++; else this.slow = Math.max(0, this.slow - 1);
    if (this.slow > 40 && this.quality > 0.45) { this.quality -= 0.15; this.slow = 0; }
    requestAnimationFrame(this.onFrame);
  }

  draw(dt) {
    const { ctx, w, h, dpr, ptr } = this;
    this.t += dt;
    const I = this.o.intensity;
    this.rot += dt * 0.03;
    this.kickV *= Math.exp(-dt * 2.6);
    ptr.str += ((ptr.active ? 1 : 0) - ptr.str) * Math.min(1, dt * 5);
    this.shiftNow.x += (this.shift.x - this.shiftNow.x) * Math.min(1, dt * 4);
    this.shiftNow.y += (this.shift.y - this.shiftNow.y) * Math.min(1, dt * 4);
    const ox = this.origin.x + this.shiftNow.x, oy = this.origin.y + this.shiftNow.y;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    const pa = Math.atan2(ptr.y - oy, ptr.x - ox);
    const R = this.R, core = this.coreR * (1 + this.kickV * 0.5);
    const breathe = 1 + 0.04 * Math.sin(this.t * 1.4);
    const nRays = Math.floor(this.rays.length * this.quality);

    // shards
    for (let i = 0; i < nRays; i++) {
      const r = this.rays[i];
      r.a += r.sp * dt;
      const ang = r.a + this.rot;
      let d = Math.atan2(Math.sin(ang - pa), Math.cos(ang - pa));
      const boost = ptr.str * Math.exp(-(d * d) / (2 * 0.16 * 0.16));
      const flick = 0.78 + 0.22 * Math.sin(this.t * r.fl + r.ph);
      const tip = R * r.len * r.off * breathe * (1 + this.kickV * 0.28 + boost * 0.55) * (0.85 + 0.15 * I);
      const a2 = ang - d * boost * 0.12;
      const cos = Math.cos(a2), sin = Math.sin(a2);
      const base = core * 0.5;
      const bx = ox + cos * base, by = oy + sin * base;
      const tx = ox + cos * (base + tip), ty = oy + sin * (base + tip);
      const nx = -sin, ny = cos;
      const [cr, cg, cb] = COLORS[r.c];
      const al = clamp((r.al + boost * 0.35 + this.kickV * 0.12) * flick * I, 0, 1);
      // soft halo pass
      let bw = r.bw * (1 + boost * 0.6);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${al * 0.32})`;
      ctx.beginPath();
      ctx.moveTo(bx + nx * bw * 2.2, by + ny * bw * 2.2);
      ctx.lineTo(bx - nx * bw * 2.2, by - ny * bw * 2.2);
      ctx.lineTo(tx, ty);
      ctx.closePath(); ctx.fill();
      // bright pass
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${al})`;
      ctx.beginPath();
      ctx.moveTo(bx + nx * bw, by + ny * bw);
      ctx.lineTo(bx - nx * bw, by - ny * bw);
      ctx.lineTo(tx, ty);
      ctx.closePath(); ctx.fill();
    }

    // core
    if (this.o.core) {
    const pulse = 1 + 0.06 * Math.sin(this.t * 2.1);
    const cr = core * 3.6 * pulse;
    const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, cr);
    g.addColorStop(0, `rgba(255,248,214,${0.95 * I})`);
    g.addColorStop(0.14, `rgba(255,205,96,${0.8 * I})`);
    g.addColorStop(0.42, `rgba(255,104,42,${0.3 * I})`);
    g.addColorStop(1, 'rgba(255,60,30,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(ox, oy, cr, 0, TAU); ctx.fill();
    }

    // rings
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const s = this.rings[i];
      s.r += s.v * dt; s.v *= Math.exp(-dt * 2.1); s.life -= dt * 0.9;
      if (s.life <= 0) { this.rings.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(255,214,130,${s.life * 0.75 * I})`;
      ctx.lineWidth = Math.max(0.5, s.w * s.life);
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU); ctx.stroke();
    }

    // embers
    ctx.lineCap = 'round';
    const px = ptr.x, py = ptr.y;
    const limit = this.o.embers * this.quality;
    for (let i = 0; i < this.embers.length; i++) {
      const e = this.embers[i];
      if (e.life <= 0) {
        if (e.loop && i < limit) this.spawn(e, ox, oy, 1);
        else continue;
      }
      e.life -= dt;
      if (ptr.str > 0.02) {
        const dx = e.x - px, dy = e.y - py, d2 = dx * dx + dy * dy;
        if (d2 < 32000) {
          const d = Math.sqrt(d2) + 1, f = (1 - d / 180) * 1300 * dt * ptr.str;
          if (f > 0) { e.vx += (dx / d) * f; e.vy += (dy / d) * f; }
        }
      }
      e.x += e.vx * dt; e.y += e.vy * dt;
      const k = Math.exp(-dt * 0.45);
      e.vx *= k; e.vy *= k;
      const lf = e.life / e.max;
      const a = Math.sin(clamp(lf, 0, 1) * Math.PI) * 0.95 * I;
      const [r, gg, b] = COLORS[e.c];
      ctx.strokeStyle = `rgba(${r},${gg},${b},${a})`;
      ctx.lineWidth = e.size;
      ctx.beginPath();
      ctx.moveTo(e.x - e.vx * 0.045, e.y - e.vy * 0.045);
      ctx.lineTo(e.x, e.y);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }
}
