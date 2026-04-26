import { npcDialogues } from '../data/npcs';
import { skills } from '../data/skills';

export function initMainScene(k, navigate, joystickRef, interactRef) {
  k.scene('main', () => {
    const SPEED = 165;
    const W = k.width();
    const H = k.height();
    const collectedSkills = new Set();
    let currentDialogue = null;
    let currentNpc = null;
    let dialogueIndex = 0;

    const SKY_H = H * 0.26;

    const skyRows = 7;
    for (let i = 0; i < skyRows; i++) {
      const t = i / (skyRows - 1);
      k.add([
        k.rect(W, Math.ceil(SKY_H / skyRows) + 1),
        k.pos(0, i * (SKY_H / skyRows)),
        k.color(
          Math.round(110 + t * 45),
          Math.round(185 + t * 30),
          Math.round(235 - t * 15)
        ),
        k.z(-10),
      ]);
    }

    [[W * 0.12, SKY_H * 0.3, 1.0], [W * 0.52, SKY_H * 0.15, 1.3], [W * 0.82, SKY_H * 0.4, 0.85]].forEach(([cx, cy, sc]) => {
      [[-18, 0, 12], [-6, -7, 15], [8, -5, 14], [20, 0, 11]].forEach(([ox, oy, r]) => {
        k.add([k.circle(Math.round(r * sc)), k.pos(cx + ox, cy + oy), k.color(248, 250, 255), k.anchor('center'), k.z(-9)]);
      });
    });

    k.add([k.rect(W, H * 0.74), k.pos(0, SKY_H), k.color(55, 125, 60), k.z(-10)]);

    k.add([k.rect(W, 8), k.pos(0, SKY_H - 1), k.color(80, 155, 75), k.z(-9)]);

    for (let i = 0; i < 55; i++) {
      const gx = Math.random() * W;
      const gy = SKY_H + 6 + Math.random() * (H - SKY_H - 10);
      const dark = Math.random() > 0.5;
      k.add([
        k.rect(16 + Math.random() * 28, 12 + Math.random() * 18),
        k.pos(gx, gy),
        k.color(dark ? 48 : 68, dark ? 112 : 140, dark ? 52 : 68),
        k.z(-9),
      ]);
    }

    const pathX = W * 0.5;
    for (let y = SKY_H; y < H; y += 6) {
      const wobble = Math.sin(y * 0.04) * 14;
      k.add([k.rect(52, 8), k.pos(pathX + wobble, y), k.color(165, 128, 82), k.anchor('center'), k.z(-8)]);
    }
    for (let i = 0; i < 70; i++) {
      const gy = SKY_H + Math.random() * (H - SKY_H);
      const wobble = Math.sin(gy * 0.04) * 14;
      const side = (Math.random() - 0.5) * 44;
      k.add([k.rect(4, 2), k.pos(pathX + wobble + side, gy), k.color(148, 110, 68), k.z(-7)]);
    }

    function drawTree(tx, ty, sc) {
      const th = Math.round(48 * sc);
      const tw = Math.round(9 * sc);
      const c1 = Math.round(30 * sc);
      const c2 = Math.round(25 * sc);
      const c3 = Math.round(19 * sc);
      k.add([k.rect(tw * 3, 7), k.pos(tx, ty + Math.round(th * 0.52)), k.color(0, 0, 0), k.opacity(0.18), k.anchor('center'), k.z(-4)]);
      k.add([k.rect(tw, th), k.pos(tx, ty), k.color(100, 62, 28), k.anchor('center'), k.z(-3)]);
      k.add([k.rect(tw - 2, Math.round(th * 0.3)), k.pos(tx, ty - Math.round(th * 0.1)), k.color(80, 48, 20), k.anchor('center'), k.z(-3)]);
      k.add([k.circle(c1), k.pos(tx, ty - Math.round(th * 0.35)), k.color(32, 92, 36), k.anchor('center'), k.z(-2)]);
      k.add([k.circle(c2), k.pos(tx - Math.round(c1 * 0.45), ty - Math.round(th * 0.52)), k.color(40, 108, 44), k.anchor('center'), k.z(-2)]);
      k.add([k.circle(c2), k.pos(tx + Math.round(c1 * 0.4), ty - Math.round(th * 0.5)), k.color(36, 102, 40), k.anchor('center'), k.z(-2)]);
      k.add([k.circle(c3), k.pos(tx, ty - Math.round(th * 0.72)), k.color(52, 128, 55), k.anchor('center'), k.z(-1)]);
      k.add([k.circle(Math.round(9 * sc)), k.pos(tx - Math.round(c1 * 0.28), ty - Math.round(th * 0.64)), k.color(68, 152, 70), k.anchor('center'), k.z(-1)]);
    }

    [
      [W * 0.04, SKY_H + H * 0.08, 0.9], [W * 0.07, SKY_H + H * 0.28, 1.1],
      [W * 0.05, SKY_H + H * 0.5, 0.85], [W * 0.09, SKY_H + H * 0.68, 1.0],
      [W * 0.06, SKY_H + H * 0.62, 0.75],
      [W * 0.93, SKY_H + H * 0.1, 0.95], [W * 0.9, SKY_H + H * 0.32, 1.05],
      [W * 0.94, SKY_H + H * 0.55, 0.8], [W * 0.88, SKY_H + H * 0.72, 1.1],
      [W * 0.92, SKY_H + H * 0.48, 0.9],
      [W * 0.22, SKY_H + H * 0.02, 0.8], [W * 0.38, SKY_H + H * 0.0, 1.0],
      [W * 0.62, SKY_H + H * 0.01, 0.85], [W * 0.78, SKY_H + H * 0.03, 0.9],
      [W * 0.18, SKY_H + H * 0.62, 0.7], [W * 0.82, SKY_H + H * 0.65, 0.75],
    ].forEach(([tx, ty, sc]) => drawTree(tx, ty, sc));

    [
      [W * 0.15, SKY_H + H * 0.18], [W * 0.18, SKY_H + H * 0.44],
      [W * 0.8, SKY_H + H * 0.22], [W * 0.83, SKY_H + H * 0.5],
      [W * 0.33, SKY_H + H * 0.68], [W * 0.67, SKY_H + H * 0.7],
    ].forEach(([bx, by]) => {
      [[-9, 0, 11], [0, -5, 13], [9, 0, 11]].forEach(([ox, oy, r]) => {
        k.add([k.circle(r), k.pos(bx + ox, by + oy), k.color(38, 104, 42), k.anchor('center'), k.z(-2)]);
      });
    });

    for (let i = 0; i < 30; i++) {
      const fx = W * 0.12 + Math.random() * W * 0.76;
      const fy = SKY_H + 10 + Math.random() * (H - SKY_H - 14);
      const fc = [[245, 95, 95], [255, 215, 55], [195, 100, 250], [95, 195, 255], [255, 165, 80]][Math.floor(Math.random() * 5)];
      k.add([k.circle(4), k.pos(fx, fy), k.color(fc[0], fc[1], fc[2]), k.anchor('center'), k.z(-3)]);
      k.add([k.circle(2), k.pos(fx, fy), k.color(255, 245, 160), k.anchor('center'), k.z(-2)]);
    }

    const centerX = W / 2;
    const sp = (H - SKY_H) / 6;

    let px = centerX;
    let py = SKY_H + sp * 0.6;
    let walkTime = 0;
    let facingRight = true;
    let lastPx = px;
    let lastPy = py;

    function makeChar(cx, cy, skin, shirt, pants, hairC, zBase) {
      const s = k.add([k.rect(22, 6), k.pos(cx, cy + 18), k.color(0, 0, 0), k.opacity(0.22), k.anchor('center'), k.z(zBase)]);
      const sl = k.add([k.rect(6, 4), k.pos(cx - 3.5, cy + 17), k.color(42, 28, 14), k.anchor('center'), k.z(zBase + 1)]);
      const sr = k.add([k.rect(6, 4), k.pos(cx + 3.5, cy + 17), k.color(42, 28, 14), k.anchor('center'), k.z(zBase + 1)]);
      const ll = k.add([k.rect(5, 9), k.pos(cx - 3.5, cy + 8), k.color(pants[0], pants[1], pants[2]), k.anchor('top'), k.z(zBase + 1)]);
      const lr = k.add([k.rect(5, 9), k.pos(cx + 3.5, cy + 8), k.color(pants[0], pants[1], pants[2]), k.anchor('top'), k.z(zBase + 1)]);
      const al = k.add([k.rect(4, 10), k.pos(cx - 10, cy - 1), k.color(skin[0], skin[1], skin[2]), k.anchor('top'), k.z(zBase + 1)]);
      const ar = k.add([k.rect(4, 10), k.pos(cx + 6, cy - 1), k.color(skin[0], skin[1], skin[2]), k.anchor('top'), k.z(zBase + 1)]);
      const bd = k.add([k.rect(14, 13), k.pos(cx, cy), k.color(shirt[0], shirt[1], shirt[2]), k.anchor('center'), k.outline(1, k.rgb(0, 0, 0)), k.z(zBase + 2)]);
      const nk = k.add([k.rect(5, 4), k.pos(cx, cy - 9), k.color(skin[0], skin[1], skin[2]), k.anchor('center'), k.z(zBase + 2)]);
      const hd = k.add([k.circle(8), k.pos(cx, cy - 17), k.color(skin[0], skin[1], skin[2]), k.anchor('center'), k.outline(1, k.rgb(0, 0, 0)), k.z(zBase + 3)]);
      const hr = k.add([k.rect(17, 6), k.pos(cx, cy - 23), k.color(hairC[0], hairC[1], hairC[2]), k.anchor('center'), k.z(zBase + 4)]);
      const hrf = k.add([k.rect(6, 4), k.pos(cx - 1, cy - 18), k.color(hairC[0], hairC[1], hairC[2]), k.anchor('center'), k.z(zBase + 4)]);
      const elw = k.add([k.rect(5, 4), k.pos(cx - 2.5, cy - 19), k.color(235, 228, 218), k.anchor('center'), k.z(zBase + 3)]);
      const erw = k.add([k.rect(5, 4), k.pos(cx + 2.5, cy - 19), k.color(235, 228, 218), k.anchor('center'), k.z(zBase + 3)]);
      const el = k.add([k.rect(3, 3), k.pos(cx - 2.5, cy - 19), k.color(28, 18, 8), k.anchor('center'), k.z(zBase + 4)]);
      const er = k.add([k.rect(3, 3), k.pos(cx + 2.5, cy - 19), k.color(28, 18, 8), k.anchor('center'), k.z(zBase + 4)]);
      return { s, sl, sr, ll, lr, al, ar, bd, nk, hd, hr, hrf, elw, erw, el, er };
    }

    const p = makeChar(px, py, [210, 140, 90], [55, 110, 175], [42, 52, 88], [80, 50, 30], 9);
    const pTag = k.add([k.text('Phoenix', { size: 11, font: 'monospace' }), k.pos(px, py - 34), k.color(255, 255, 255), k.anchor('center'), k.outline(2, k.rgb(0, 0, 0)), k.z(24)]);

    const npcDefs = {
      university:     { shirt: [75, 95, 185], pants: [50, 50, 82], head: [255, 218, 182], hair: [68, 52, 32] },
      school:         { shirt: [155, 195, 75], pants: [52, 68, 38], head: [255, 208, 172], hair: [135, 88, 38] },
      annies:         { shirt: [215, 108, 148], pants: [82, 42, 52], head: [255, 228, 202], hair: [195, 138, 58] },
      revive:         { shirt: [75, 185, 118], pants: [38, 88, 58], head: [255, 222, 188], hair: [42, 32, 22] },
      certifications: { shirt: [205, 172, 48], pants: [98, 78, 18], head: [255, 198, 142], hair: [175, 128, 38] },
    };

    const npcPositions = {
      university:     { x: centerX - 38,  y: SKY_H + sp * 1.4 },
      school:         { x: centerX - 110, y: SKY_H + sp * 3.0 },
      annies:         { x: centerX + 92,  y: SKY_H + sp * 2.0 },
      revive:         { x: centerX + 55,  y: SKY_H + sp * 3.6 },
      certifications: { x: centerX,       y: SKY_H + sp * 4.8 },
    };

    const npcs = [];

    Object.entries(npcPositions).forEach(([key, pos]) => {
      const nd = npcDialogues[key];
      const c = npcDefs[key];
      const bobPhase = Math.random() * Math.PI * 2;
      const parts = makeChar(pos.x, pos.y, c.head, c.shirt, c.pants, c.hair, 4);

      const label = k.add([k.text(nd.name, { size: 11, font: 'monospace' }), k.pos(pos.x, pos.y - 32), k.anchor('center'), k.color(255, 255, 255), k.outline(2, k.rgb(0, 0, 0)), k.z(10)]);
      const bang = k.add([k.text('!', { size: 20, font: 'monospace' }), k.pos(pos.x, pos.y - 46), k.anchor('center'), k.color(255, 240, 50), k.outline(2, k.rgb(0, 0, 0)), k.z(11), k.opacity(0)]);
      const check = k.add([k.text('✓', { size: 13, font: 'monospace' }), k.pos(pos.x + 13, pos.y - 20), k.anchor('center'), k.color(100, 225, 100), k.outline(2, k.rgb(0, 0, 0)), k.z(11), k.opacity(0)]);

      npcs.push({ key, baseX: pos.x, baseY: pos.y, bobPhase, talked: false, parts, label, bang, check });
    });

    const skillsHUD = k.add([k.text('Skills: 0/5', { size: 13, font: 'monospace' }), k.pos(10, 10), k.color(255, 220, 55), k.outline(2, k.rgb(0, 0, 0)), k.fixed(), k.z(100)]);
    k.add([k.text('* Talk to everyone!', { size: 11, font: 'monospace' }), k.pos(W / 2, 11), k.anchor('center'), k.color(255, 255, 255), k.outline(2, k.rgb(0, 0, 0)), k.fixed(), k.z(100)]);

    const DH = 128;
    const DY = H - DH / 2 - 10;
    const dlgOuter = k.add([k.rect(W - 18, DH), k.pos(W / 2, DY), k.anchor('center'), k.color(0, 0, 0), k.outline(4, k.rgb(255, 255, 255)), k.z(100), k.fixed(), k.opacity(0)]);
    const dlgInner = k.add([k.rect(W - 26, DH - 8), k.pos(W / 2, DY), k.anchor('center'), k.color(12, 12, 30), k.z(101), k.fixed(), k.opacity(0)]);
    const dlgName  = k.add([k.text('', { size: 11, font: 'monospace' }), k.pos(20, DY - DH / 2 + 7), k.color(255, 215, 0), k.z(102), k.fixed(), k.opacity(0)]);
    const dlgText  = k.add([k.text('', { size: 12, width: W - 55, font: 'monospace' }), k.pos(W / 2, DY + 10), k.anchor('center'), k.color(255, 255, 255), k.z(102), k.fixed(), k.opacity(0)]);
    const dlgNext  = k.add([k.text('▼', { size: 13, font: 'monospace' }), k.pos(W - 18, H - 13), k.anchor('center'), k.color(255, 220, 55), k.z(102), k.fixed(), k.opacity(0)]);

    function showDlg(npcKey) {
      currentNpc = npcKey;
      currentDialogue = npcDialogues[npcKey].dialogues;
      dialogueIndex = 0;
      renderDlg();
    }

    function renderDlg() {
      if (dialogueIndex < currentDialogue.length) {
        dlgOuter.opacity = dlgInner.opacity = dlgText.opacity = dlgNext.opacity = dlgName.opacity = 1;
        dlgName.text = npcDialogues[currentNpc].name;
        dlgText.text = currentDialogue[dialogueIndex];
      } else {
        const key = currentNpc;
        hideDlg();
        grantSkill(key);
      }
    }

    function hideDlg() {
      dlgOuter.opacity = dlgInner.opacity = dlgText.opacity = dlgNext.opacity = dlgName.opacity = 0;
      currentDialogue = null;
      currentNpc = null;
    }

    function advanceDlg() {
      if (!currentDialogue) return;
      dialogueIndex++;
      renderDlg();
    }

    function grantSkill(npcKey) {
      const npc = npcs.find(n => n.key === npcKey);
      if (npc) npc.talked = true;
      const skillKey = npcDialogues[npcKey].skillReward;
      if (collectedSkills.has(skillKey)) return;
      collectedSkills.add(skillKey);
      skillsHUD.text = `Skills: ${collectedSkills.size}/5`;
      const skill = skills[skillKey];
      k.add([k.rect(210, 72), k.pos(W / 2, H / 2 - 55), k.anchor('center'), k.color(8, 8, 22), k.outline(3, k.rgb(255, 215, 0)), k.opacity(1), k.z(200), k.fixed(), k.lifespan(3, { fade: 0.6 })]);
      k.add([k.text(`${skill.icon}  ${skill.name}`, { size: 17, font: 'monospace' }), k.pos(W / 2, H / 2 - 62), k.anchor('center'), k.color(255, 215, 0), k.opacity(1), k.z(201), k.fixed(), k.lifespan(3, { fade: 0.6 })]);
      k.add([k.text('Skill Unlocked!', { size: 12, font: 'monospace' }), k.pos(W / 2, H / 2 - 44), k.anchor('center'), k.color(190, 190, 215), k.opacity(1), k.z(201), k.fixed(), k.lifespan(3, { fade: 0.6 })]);
    }

    function interact() {
      if (currentDialogue) { advanceDlg(); return; }
      for (const npc of npcs) {
        const d = Math.sqrt((px - npc.baseX) ** 2 + (py - npc.baseY) ** 2);
        if (d < 68) { showDlg(npc.key); return; }
      }
    }

    interactRef.current = interact;
    k.onKeyPress('space', interact);
    k.onMousePress(() => {
      if (currentDialogue) { advanceDlg(); return; }
      const m = k.mousePos();
      for (const npc of npcs) {
        const d = Math.sqrt((m.x - npc.baseX) ** 2 + (m.y - npc.baseY) ** 2);
        if (d < 55) { showDlg(npc.key); return; }
      }
    });

    function setPos(obj, x, y) { obj.pos.x = x; obj.pos.y = y; }

    function applyChar(parts, cx, cy, bob, legL, legR, armL, armR, eyeDir) {
      setPos(parts.s,   cx,          cy + 18);
      setPos(parts.sl,  cx - 3.5,    cy + 17 + legL);
      setPos(parts.sr,  cx + 3.5,    cy + 17 + legR);
      setPos(parts.ll,  cx - 3.5,    cy + 8 + legL * 0.5);
      setPos(parts.lr,  cx + 3.5,    cy + 8 + legR * 0.5);
      setPos(parts.al,  cx - 10,     cy - 1 + armL);
      setPos(parts.ar,  cx + 6,      cy - 1 + armR);
      setPos(parts.bd,  cx,          cy + bob);
      setPos(parts.nk,  cx,          cy - 9 + bob);
      setPos(parts.hd,  cx,          cy - 17 + bob);
      setPos(parts.hr,  cx,          cy - 23 + bob);
      setPos(parts.hrf, cx - 1,      cy - 18 + bob);
      const ex = eyeDir;
      setPos(parts.elw, cx + ex * -2.5, cy - 19 + bob);
      setPos(parts.erw, cx + ex * 2.5,  cy - 19 + bob);
      setPos(parts.el,  cx + ex * -2.5, cy - 19 + bob);
      setPos(parts.er,  cx + ex * 2.5,  cy - 19 + bob);
    }

    let blinkT = 0;

    k.onUpdate(() => {
      const dt = k.dt();
      const t = k.time();

      if (dlgNext.opacity > 0) {
        blinkT += dt * 5;
        dlgNext.opacity = 0.45 + Math.abs(Math.sin(blinkT)) * 0.55;
      }

      if (!currentDialogue) {
        let mx = 0, my = 0;
        if (k.isKeyDown('left')  || k.isKeyDown('a')) mx -= 1;
        if (k.isKeyDown('right') || k.isKeyDown('d')) mx += 1;
        if (k.isKeyDown('up')    || k.isKeyDown('w')) my -= 1;
        if (k.isKeyDown('down')  || k.isKeyDown('s')) my += 1;
        if (mx === 0 && my === 0) {
          mx = joystickRef.current.x;
          my = joystickRef.current.y;
        }
        const len = Math.sqrt(mx * mx + my * my);
        if (len > 0.05) {
          px += (mx / Math.max(len, 1)) * SPEED * dt;
          py += (my / Math.max(len, 1)) * SPEED * dt;
          px = Math.max(18, Math.min(W - 18, px));
          py = Math.max(SKY_H + 10, Math.min(H - 20, py));
          if (mx > 0.08)  facingRight = true;
          if (mx < -0.08) facingRight = false;
        }
      }

      const moving = Math.abs(px - lastPx) > 0.15 || Math.abs(py - lastPy) > 0.15;
      if (moving) walkTime += dt * 9;
      lastPx = px;
      lastPy = py;

      const bob = moving ? Math.abs(Math.sin(walkTime)) * -2 : 0;
      const lL  = moving ? Math.sin(walkTime) * 5 : 0;
      const lR  = moving ? -Math.sin(walkTime) * 5 : 0;
      const aL  = moving ? Math.sin(walkTime) * 3.5 : 0;
      const aR  = moving ? -Math.sin(walkTime) * 3.5 : 0;
      const eD  = facingRight ? 1 : -1;

      applyChar(p, px, py, bob, lL, lR, aL, aR, eD);
      setPos(pTag, px, py - 34 + bob);

      for (const npc of npcs) {
        const b = Math.sin(t * 2.2 + npc.bobPhase) * 2.5;
        const bx = npc.baseX;
        const by = npc.baseY;

        applyChar(npc.parts, bx, by, b, 0, 0, 0, 0, 1);
        setPos(npc.label, bx, by - 32 + b);
        setPos(npc.check, bx + 13, by - 20 + b);
        npc.check.opacity = npc.talked ? 1 : 0;

        const dist = Math.sqrt((px - bx) ** 2 + (py - by) ** 2);
        if (dist < 72 && !npc.talked && !currentDialogue) {
          setPos(npc.bang, bx, by - 48 + b + Math.sin(t * 5) * 2);
          npc.bang.opacity = 0.65 + Math.sin(t * 5) * 0.35;
        } else {
          npc.bang.opacity = 0;
        }
      }
    });
  });
}
