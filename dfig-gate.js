/* fig-gate.js — replacement for the old fig_gate (LOOK/PREDICT/ACT/GRADE/RECORD)
 * Channels-and-earned-execution loop. Same canvas pattern: DIMS + one draw fn per variant.
 *
 *   DIMS.fig_gate = { wide: [1800, 560], narrow: [700, 1300] }
 *   drawFigGateWide(ctx, opts)   drawFigGateNarrow(ctx, opts)
 *   opts = { accent, showProbe, showTicks, hideLabels }
 */

const P = { ground: '#efece6', ink: '#1a1815', muted: '#b8b1a7', mid: '#6d6760', accent: '#2d4f8f' };

export const DIMS_FIG_GATE = { wide: [1800, 560], narrow: [700, 1300] };

/* ---------------- WIDE 1800 x 560 ---------------- */
export function drawFigGateWide(ctx, opts) {
  const o = Object.assign({ accent: P.accent, showProbe: true, showTicks: true, hideLabels: false }, opts);
  const A = o.accent, cy = 210;
  const X = { world: 130, rack: 440, pred: 780, gate: 1090, exec: 1435 };
  const BAND = { x0: 60, x1: 1740, y0: 470, y1: 508 };

  if (!o.hideLabels) {
    lab(ctx, 'WORLD', X.world, 40, ['raw observation'], 21, 18);
    lab(ctx, 'CHANNELS', X.rack, 40, ['the agent names', 'what it sees'], 21, 18);
    lab(ctx, 'PREDICT', X.pred, 40, ['committed claims,', 'registered before acting'], 21, 18);
    lab(ctx, 'GRADE', X.gate, 40, ['code against the world\u2019s', 'own response'], 21, 18);
    lab(ctx, 'EXECUTE', X.exec, 40, ['earned batches,', 'halt on first miss'], 21, 18);
  }

  gridPatch(ctx, X.world, cy, 84);

  const rw = 240, rx = X.rack - rw / 2, rh = 36, gap = 7;
  let ry = cy - (5 * rh + 4 * gap) / 2;
  RACK.forEach(r => { rackRow(ctx, rx, ry, rw, rh, r[0], r[1], r[2], A, 13); ry += rh + gap; });
  arrow(ctx, [[X.world + 46, cy], [rx - 8, cy]], { w: 1.8 });
  arrow(ctx, [[rx + rw + 8, cy], [X.pred - 100, cy]], { w: 1.8 });

  const tokY = [123, 181, 239, 297];
  CLAIMS.forEach((c, i) => {
    dashCircle(ctx, 700, tokY[i], 12, P.mid);
    txt(ctx, c, 722, tokY[i] + 5, 13, P.mid, 'left');
  });

  const s = 110;
  tokY.forEach(y => hair(ctx, 885, y, X.gate - s / 2 - 5, cy));
  gate(ctx, X.gate, cy, s, A);

  arrow(ctx, [[X.gate + s / 2 + 6, cy], [X.exec - 92, cy]], { w: 2.5, color: A });
  check(ctx, 1250, 186, 15, A);

  [[1078, 1060], [1102, 1120]].forEach(([fx, mx]) => {
    line(ctx, [[fx, cy + s / 2], [mx, 300], [mx, 404]], 1.4, P.mid);
    line(ctx, [[mx, 420], [mx, BAND.y0]], 1.4, P.mid);
    cross(ctx, mx, 336, 6, P.mid);
    ctx.fillStyle = P.mid; ctx.fillRect(mx - 3, 486, 6, 6);
  });

  codeBlock(ctx, X.exec, cy, 170, A, 13, 13);

  if (o.showProbe) {
    arrow(ctx, [[X.pred, 306], [X.pred, 350], [105, 350], [105, cy + 46]], { w: 1.4, color: P.muted });
    txt(ctx, 'probe (paid, one action)', 440, 374, 15, P.mid, 'center');
  }
  arrow(ctx, [[X.exec, cy + 46], [X.exec, 412], [155, 412], [155, cy + 46]], { w: 3.4, color: P.mid });

  journal(ctx, BAND, [130, 440, 780, 1090, 1435], o.showTicks);
  if (!o.hideLabels) {
    txt(ctx, 'JOURNAL', 60, 452, 21, P.ink, 'left', 500);
    txt(ctx, 'every claim, grade, and action, hash-chained', 172, 452, 18, P.mid, 'left');
    txt(ctx, 'no action without a prediction.   high grades earn execution.', 900, 546, 16, P.mid, 'center');
  }
}

/* ---------------- NARROW 700 x 1520 ---------------- */
export function drawFigGateNarrow(ctx, opts) {
  const o = Object.assign({ accent: P.accent, showProbe: true, showTicks: true, hideLabels: false }, opts);
  const A = o.accent, sx = 430;
  const BAND = { x0: 40, x1: 660, y0: 1120, y1: 1182 }, LX = 110;

  gridPatch(ctx, sx, 150, 72);
  if (!o.hideLabels) labL(ctx, 'WORLD', LX, 140, ['raw observation'], 19, 15);
  arrow(ctx, [[sx, 190], [sx, 240]], { w: 1.8 });

  const rw = 220, rx = sx - rw / 2, rh = 30, gap = 6;
  let ry = 250;
  RACK.forEach(r => { rackRow(ctx, rx, ry, rw, rh, r[0], r[1], r[2], A, 12); ry += rh + gap; });
  if (!o.hideLabels) labL(ctx, 'CHANNELS', LX, 320, ['the agent names', 'what it sees'], 19, 15);
  arrow(ctx, [[sx, 428], [sx, 476]], { w: 1.8 });

  const tokY = [500, 538, 576, 614];
  CLAIMS.forEach((c, i) => {
    dashCircle(ctx, 340, tokY[i], 11, P.mid);
    txt(ctx, c, 360, tokY[i] + 4, 12, P.mid, 'left');
  });
  if (!o.hideLabels) labL(ctx, 'PREDICT', LX, 540, ['committed claims,', 'registered', 'before acting'], 19, 15);

  const s = 92, gcy = 714;
  tokY.forEach(y => hair(ctx, 512, y, sx, gcy - s / 2 - 5));
  gate(ctx, sx, gcy, s, A);
  if (!o.hideLabels) labL(ctx, 'GRADE', LX, 700, ['code against the', 'world\u2019s own response'], 19, 15, A);

  [[418, 56, 830, 890], [442, 76, 860, 942]].forEach(([fx, mx, my, cy2]) => {
    line(ctx, [[fx, gcy + s / 2], [mx, my], [mx, BAND.y0]], 1.4, P.mid);
    cross(ctx, mx, cy2, 6, P.mid);
    ctx.fillStyle = P.mid; ctx.fillRect(mx - 3, BAND.y0 + 25, 6, 6);
  });

  arrow(ctx, [[sx, gcy + s / 2 + 4], [sx, 886]], { w: 2.5, color: A });
  check(ctx, 462, 796, 14, A);

  codeBlock(ctx, sx, 930, 150, A, 10, 12);
  if (!o.hideLabels) labL(ctx, 'EXECUTE', LX, 918, ['earned batches,', 'halt on first miss'], 19, 15);

  if (o.showProbe) {
    arrow(ctx, [[512, 538], [590, 538], [590, 178], [472, 178]], { w: 1.4, color: P.muted });
    txt(ctx, 'probe', 584, 462, 11, P.mid, 'right');
    txt(ctx, '(paid, one action)', 584, 478, 11, P.mid, 'right');
  }
  arrow(ctx, [[sx, 972], [sx, 1030], [650, 1030], [650, 150], [472, 150]], { w: 3.2, color: P.mid });

  journal(ctx, BAND, [430, 340, 540], o.showTicks);
  if (!o.hideLabels) {
    txt(ctx, 'JOURNAL', LX, 1092, 19, P.ink, 'left', 500);
    txt(ctx, 'every claim, grade, and action, hash-chained', LX, 1112, 14, P.mid, 'left');
    txt(ctx, 'no action without a prediction.', 350, 1240, 13, P.mid, 'center');
    txt(ctx, 'high grades earn execution.', 350, 1260, 13, P.mid, 'center');
  }
}

/* ---------------- content ---------------- */
const RACK = [['goal', '\u00b7', 'n'], ['level', '3', 'n'], ['budget', '142', 'n'], ['lever', '1', 'struck'], ['switch3', '2', 'new']];
const CLAIMS = ['ch switch3 = 2', 'noop', 'verify: hook.py', 'ch level delta = +1'];

/* ---------------- primitives ---------------- */
function mono(ctx, size, weight) { ctx.font = (weight || 400) + ' ' + size + 'px "IBM Plex Mono", ui-monospace, monospace'; }
function txt(ctx, s, x, y, size, color, align, weight) {
  mono(ctx, size, weight); ctx.fillStyle = color; ctx.textAlign = align || 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(s, x, y); ctx.textAlign = 'left';
}
function lab(ctx, name, cx, y, subs, ns, ss, color) {
  txt(ctx, name, cx, y, ns, color || P.ink, 'center', 500);
  subs.forEach((s, i) => txt(ctx, s, cx, y + 26 + i * 22, ss, P.mid, 'center'));
}
function labL(ctx, name, x, y, subs, ns, ss, color) {
  txt(ctx, name, x, y, ns, color || P.ink, 'left', 500);
  subs.forEach((s, i) => txt(ctx, s, x, y + 22 + i * 19, ss, P.mid, 'left'));
}
function line(ctx, pts, w, color, dash) {
  ctx.save(); ctx.lineWidth = w; ctx.strokeStyle = color; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke(); ctx.restore();
}
function arrow(ctx, pts, opts) {
  const w = (opts && opts.w) || 1.6, color = (opts && opts.color) || P.mid;
  line(ctx, pts, w, color, opts && opts.dash);
  const a = pts[pts.length - 2], b = pts[pts.length - 1];
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), h = 5 + w * 2.1;
  ctx.save(); ctx.fillStyle = color; ctx.translate(b[0], b[1]); ctx.rotate(ang);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-h, h * 0.52); ctx.lineTo(-h, -h * 0.52); ctx.closePath(); ctx.fill(); ctx.restore();
}
function hair(ctx, x1, y1, x2, y2) { line(ctx, [[x1, y1], [x2, y2]], 1.1, P.muted); }
function dashCircle(ctx, x, y, r, color) {
  ctx.save(); ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4; ctx.strokeStyle = color;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
const GRID = ['011010', '100110', '010001', '111010', '001101', '100100'];
function gridPatch(ctx, cx, cy, size) {
  const n = 6, cell = size / n, x0 = cx - size / 2, y0 = cy - size / 2;
  ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = P.ink;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++)
    if (GRID[r][c] === '1') ctx.fillRect(x0 + c * cell + 1, y0 + r * cell + 1, cell - 2.5, cell - 2.5);
  ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.35; ctx.strokeStyle = P.muted; ctx.lineWidth = 1.1;
  ctx.strokeRect(x0, y0, size, size); ctx.restore();
}
function rackRow(ctx, x, y, w, h, name, val, state, A, fs) {
  const size = fs || 13, isNew = state === 'new', dim = state === 'struck';
  ctx.save();
  ctx.lineWidth = isNew ? 2 : 1.4;
  ctx.strokeStyle = isNew ? A : (dim ? P.muted : P.mid);
  if (dim) ctx.globalAlpha = 0.75;
  ctx.strokeRect(x, y, w, h); ctx.restore();
  const col = isNew ? A : (dim ? P.muted : P.ink);
  txt(ctx, name, x + 12, y + h / 2 + size * 0.36, size, col, 'left', isNew ? 500 : 400);
  txt(ctx, val, x + w - 12, y + h / 2 + size * 0.36, size, isNew ? A : (dim ? P.muted : P.mid), 'right');
  if (dim) {
    mono(ctx, size, 400);
    const nw = ctx.measureText(name).width;
    line(ctx, [[x + 9, y + h / 2], [x + 15 + nw, y + h / 2]], 1.3, P.muted);
  }
}
function gate(ctx, cx, cy, s, A) {
  const x0 = cx - s / 2, y0 = cy - s / 2, x1 = cx + s / 2, y1 = cy + s / 2, slot = s * 0.24;
  ctx.save(); ctx.strokeStyle = A; ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.lineTo(x1, y1);
  ctx.moveTo(x0, y1); ctx.lineTo(cx - slot, y1);
  ctx.moveTo(cx + slot, y1); ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(x0, y0 + s * 0.2); ctx.lineTo(x1, y0 + s * 0.2); ctx.stroke();
  ctx.lineWidth = 1.6; ctx.beginPath();
  ctx.moveTo(x0 + s * 0.13, y0 + s * 0.36); ctx.lineTo(cx - slot, y1);
  ctx.moveTo(x1 - s * 0.13, y0 + s * 0.36); ctx.lineTo(cx + slot, y1);
  ctx.stroke(); ctx.restore();
}
function check(ctx, x, y, s, A) {
  ctx.save(); ctx.strokeStyle = A; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - s * 0.5, y + s * 0.1); ctx.lineTo(x - s * 0.12, y + s * 0.5); ctx.lineTo(x + s * 0.55, y - s * 0.45);
  ctx.stroke(); ctx.restore();
}
function cross(ctx, x, y, s, c) {
  ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s);
  ctx.stroke(); ctx.restore();
}
function codeBlock(ctx, cx, cy, w, A, bh, bg) {
  const ws = [0.95, 0.62, 1, 0.45], total = ws.length * bh + (ws.length - 1) * bg, x0 = cx - w / 2;
  let y = cy - total / 2;
  ws.forEach((f, i) => { ctx.fillStyle = i === 2 ? A : P.muted; ctx.fillRect(x0, y, w * f, bh); y += bh + bg; });
}
function journal(ctx, B, ticks, showTicks) {
  ctx.save(); ctx.strokeStyle = P.mid; ctx.lineWidth = 1.4;
  ctx.strokeRect(B.x0, B.y0, B.x1 - B.x0, B.y1 - B.y0); ctx.restore();
  if (showTicks) {
    ctx.save(); ctx.globalAlpha = 0.4; ctx.strokeStyle = P.muted; ctx.lineWidth = 1.2;
    ticks.forEach(x => { ctx.beginPath(); ctx.moveTo(x, B.y0 + 7); ctx.lineTo(x, B.y1 - 7); ctx.stroke(); });
    ctx.restore();
  }
}
