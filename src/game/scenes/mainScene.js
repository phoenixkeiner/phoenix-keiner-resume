import { npcDialogues } from '../data/npcs';
import { skills } from '../data/skills';
import playerSprite from '../assets/player.png';
import universitySprite from '../assets/npc_university.png';
import schoolSprite from '../assets/npc_school.png';
import anniesSprite from '../assets/npc_annies.png';
import reviveSprite from '../assets/npc_revive.png';
import groundTile from '../assets/tile_ground.png';
import treeTealTile from '../assets/tile_tree_teal.png';
import treeOrangeTile from '../assets/tile_tree_orange.png';

const CHAR_SCALE = 3.2;

const NAVY = [22, 58, 95];
const BLUE = [38, 96, 164];
const ORANGE = [241, 153, 83];
const GOLD = [217, 164, 65];
const CREAM = [245, 240, 230];
const PATH_COLOR = [199, 171, 122];
const PATH_EDGE = [172, 144, 98];

function loadCharSprite(k, name, url) {
  k.loadSprite(name, url, {
    sliceX: 8,
    sliceY: 1,
    anims: {
      walk: { from: 0, to: 3, loop: true, speed: 5 },
    },
  });
}

export function initMainScene(k, navigate, joystickRef, interactRef) {
  loadCharSprite(k, 'player', playerSprite);
  loadCharSprite(k, 'npc_university', universitySprite);
  loadCharSprite(k, 'npc_school', schoolSprite);
  loadCharSprite(k, 'npc_annies', anniesSprite);
  loadCharSprite(k, 'npc_revive', reviveSprite);
  k.loadSprite('tile_ground', groundTile);
  k.loadSprite('tile_tree_teal', treeTealTile);
  k.loadSprite('tile_tree_orange', treeOrangeTile);

  k.scene('main', () => {
    const SPEED = 120;
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
          Math.round(120 + t * 55),
          Math.round(175 + t * 45),
          Math.round(230 - t * 10)
        ),
        k.z(-10),
      ]);
    }

    [[W * 0.12, SKY_H * 0.3, 1.0], [W * 0.52, SKY_H * 0.15, 1.3], [W * 0.82, SKY_H * 0.4, 0.85]].forEach(([cx, cy, sc]) => {
      [[-18, 0, 12], [-6, -7, 15], [8, -5, 14], [20, 0, 11]].forEach(([ox, oy, r]) => {
        k.add([k.circle(Math.round(r * sc)), k.pos(cx + ox, cy + oy), k.color(252, 253, 255), k.opacity(0.9), k.anchor('center'), k.z(-9)]);
      });
    });

    const groundH = H - SKY_H;
    k.add([
      k.sprite('tile_ground', { width: W, height: groundH, tiled: true }),
      k.pos(0, SKY_H),
      k.z(-10),
    ]);

    const pathX = W * 0.5;
    for (let y = SKY_H; y < H; y += 6) {
      const wobble = Math.sin(y * 0.04) * 14;
      k.add([k.rect(84, 9, { radius: 4 }), k.pos(pathX + wobble, y), k.color(PATH_EDGE[0], PATH_EDGE[1], PATH_EDGE[2]), k.anchor('center'), k.z(-9)]);
      k.add([k.rect(74, 7, { radius: 3 }), k.pos(pathX + wobble, y), k.color(PATH_COLOR[0], PATH_COLOR[1], PATH_COLOR[2]), k.anchor('center'), k.z(-8)]);
    }

    function addTree(tx, ty, sc, kind) {
      k.add([
        k.circle(Math.round(11 * sc)),
        k.pos(tx, ty + Math.round(9 * sc)),
        k.color(0, 0, 0),
        k.opacity(0.14),
        k.anchor('center'),
        k.z(Math.floor(ty) - 1),
      ]);
      k.add([
        k.sprite(kind === 'orange' ? 'tile_tree_orange' : 'tile_tree_teal'),
        k.pos(tx, ty),
        k.scale(sc * 2.9),
        k.anchor('center'),
        k.z(Math.floor(ty)),
      ]);
    }

    [
      [W * 0.04, SKY_H + H * 0.08, 0.9, 'teal'], [W * 0.07, SKY_H + H * 0.28, 1.1, 'orange'],
      [W * 0.05, SKY_H + H * 0.5, 0.85, 'teal'], [W * 0.09, SKY_H + H * 0.68, 1.0, 'orange'],
      [W * 0.06, SKY_H + H * 0.62, 0.75, 'teal'],
      [W * 0.93, SKY_H + H * 0.1, 0.95, 'orange'], [W * 0.9, SKY_H + H * 0.32, 1.05, 'teal'],
      [W * 0.94, SKY_H + H * 0.55, 0.8, 'orange'], [W * 0.88, SKY_H + H * 0.72, 1.1, 'teal'],
      [W * 0.92, SKY_H + H * 0.48, 0.9, 'orange'],
      [W * 0.22, SKY_H + H * 0.02, 0.8, 'teal'], [W * 0.38, SKY_H + H * 0.0, 1.0, 'orange'],
      [W * 0.62, SKY_H + H * 0.01, 0.85, 'teal'], [W * 0.78, SKY_H + H * 0.03, 0.9, 'orange'],
      [W * 0.18, SKY_H + H * 0.62, 0.7, 'teal'], [W * 0.82, SKY_H + H * 0.65, 0.75, 'orange'],
    ].forEach(([tx, ty, sc, kind]) => addTree(tx, ty, sc, kind));

    for (let i = 0; i < 26; i++) {
      const fx = W * 0.12 + Math.random() * W * 0.76;
      const fy = SKY_H + 10 + Math.random() * (H - SKY_H - 14);
      const fc = [ORANGE, GOLD, BLUE, [235, 120, 150]][Math.floor(Math.random() * 4)];
      k.add([k.circle(3.5), k.pos(fx, fy), k.color(fc[0], fc[1], fc[2]), k.opacity(0.85), k.anchor('center'), k.z(-3)]);
    }

    const centerX = W / 2;
    const sp = (H - SKY_H) / 6;

    const SHADOW_Y = 17;
    const LABEL_Y = -40;

    let px = centerX;
    let py = SKY_H + sp * 0.6;
    let facingRight = true;
    let lastPx = px;
    let lastPy = py;

    function makeCharObj(spriteName, cx, cy, z) {
      const shadow = k.add([
        k.circle(12),
        k.pos(cx, cy + SHADOW_Y),
        k.color(0, 0, 0),
        k.opacity(0.2),
        k.anchor('center'),
        k.z(z - 1),
      ]);
      const obj = k.add([
        k.sprite(spriteName, { frame: 0 }),
        k.pos(cx, cy),
        k.anchor('center'),
        k.scale(CHAR_SCALE),
        k.z(z),
      ]);
      return { obj, shadow };
    }

    const player = makeCharObj('player', px, py, Math.floor(py));
    const pTag = k.add([k.text('Phoenix', { size: 11, font: 'monospace' }), k.pos(px, py + LABEL_Y), k.color(255, 255, 255), k.anchor('center'), k.outline(2, k.rgb(0, 0, 0)), k.opacity(1), k.z(800)]);

    const npcSpriteFor = {
      university: 'npc_university',
      school: 'npc_school',
      annies: 'npc_annies',
      revive: 'npc_revive',
      certifications: 'npc_university',
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
      const bobPhase = Math.random() * Math.PI * 2;
      const { obj, shadow } = makeCharObj(npcSpriteFor[key], pos.x, pos.y, Math.floor(pos.y));

      const label = k.add([k.text(nd.name, { size: 11, font: 'monospace' }), k.pos(pos.x, pos.y + LABEL_Y), k.anchor('center'), k.color(255, 255, 255), k.outline(2, k.rgb(0, 0, 0)), k.z(800)]);
      const bang = k.add([k.text('!', { size: 20, font: 'monospace' }), k.pos(pos.x, pos.y - 62), k.anchor('center'), k.color(GOLD[0], GOLD[1], GOLD[2]), k.outline(2, k.rgb(0, 0, 0)), k.z(801), k.opacity(0)]);
      const check = k.add([k.text('✓', { size: 15, font: 'monospace' }), k.pos(pos.x + 18, pos.y - 28), k.anchor('center'), k.color(120, 220, 150), k.outline(2, k.rgb(0, 0, 0)), k.z(801), k.opacity(0)]);

      npcs.push({ key, baseX: pos.x, baseY: pos.y, bobPhase, talked: false, obj, shadow, label, bang, check });
    });

    const hudChip = k.add([
      k.rect(96, 24, { radius: 6 }),
      k.pos(8, 8),
      k.color(NAVY[0], NAVY[1], NAVY[2]),
      k.opacity(0.85),
      k.fixed(),
      k.z(900),
    ]);
    const skillsHUD = k.add([k.text('Skills: 0/5', { size: 12, font: 'monospace' }), k.pos(18, 14), k.color(GOLD[0], GOLD[1], GOLD[2]), k.fixed(), k.z(901)]);
    k.add([
      k.rect(160, 20, { radius: 10 }),
      k.pos(W / 2, 8),
      k.anchor('top'),
      k.color(NAVY[0], NAVY[1], NAVY[2]),
      k.opacity(0.7),
      k.fixed(),
      k.z(900),
    ]);
    k.add([k.text('Talk to everyone!', { size: 10, font: 'monospace' }), k.pos(W / 2, 12), k.anchor('top'), k.color(255, 255, 255), k.fixed(), k.z(901)]);

    const DH = 128;
    const DY = H - DH / 2 - 10;
    const dlgOuter = k.add([k.rect(W - 18, DH, { radius: 12 }), k.pos(W / 2, DY), k.anchor('center'), k.color(NAVY[0], NAVY[1], NAVY[2]), k.z(900), k.fixed(), k.opacity(0)]);
    const dlgAccent = k.add([k.rect(W - 18, 4, { radius: 2 }), k.pos(W / 2, DY - DH / 2 + 2), k.anchor('center'), k.color(ORANGE[0], ORANGE[1], ORANGE[2]), k.z(901), k.fixed(), k.opacity(0)]);
    const dlgName  = k.add([k.text('', { size: 11, font: 'monospace' }), k.pos(20, DY - DH / 2 + 11), k.color(ORANGE[0], ORANGE[1], ORANGE[2]), k.z(902), k.fixed(), k.opacity(0)]);
    const dlgText  = k.add([k.text('', { size: 12, width: W - 55, font: 'monospace' }), k.pos(W / 2, DY + 10), k.anchor('center'), k.color(CREAM[0], CREAM[1], CREAM[2]), k.z(902), k.fixed(), k.opacity(0)]);
    const dlgNext  = k.add([k.text('▼', { size: 13, font: 'monospace' }), k.pos(W - 18, H - 13), k.anchor('center'), k.color(GOLD[0], GOLD[1], GOLD[2]), k.z(902), k.fixed(), k.opacity(0)]);

    function showDlg(npcKey) {
      currentNpc = npcKey;
      currentDialogue = npcDialogues[npcKey].dialogues;
      dialogueIndex = 0;
      renderDlg();
    }

    function renderDlg() {
      if (dialogueIndex < currentDialogue.length) {
        dlgOuter.opacity = dlgAccent.opacity = dlgText.opacity = dlgNext.opacity = dlgName.opacity = 1;
        dlgName.text = npcDialogues[currentNpc].name;
        dlgText.text = currentDialogue[dialogueIndex];
      } else {
        const key = currentNpc;
        hideDlg();
        grantSkill(key);
      }
    }

    function hideDlg() {
      dlgOuter.opacity = dlgAccent.opacity = dlgText.opacity = dlgNext.opacity = dlgName.opacity = 0;
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
      k.add([k.rect(210, 72, { radius: 12 }), k.pos(W / 2, H / 2 - 55), k.anchor('center'), k.color(NAVY[0], NAVY[1], NAVY[2]), k.outline(2, k.rgb(GOLD[0], GOLD[1], GOLD[2])), k.opacity(1), k.z(950), k.fixed(), k.lifespan(3, { fade: 0.6 })]);
      k.add([k.text(`${skill.icon}  ${skill.name}`, { size: 17, font: 'monospace' }), k.pos(W / 2, H / 2 - 62), k.anchor('center'), k.color(GOLD[0], GOLD[1], GOLD[2]), k.opacity(1), k.z(951), k.fixed(), k.lifespan(3, { fade: 0.6 })]);
      k.add([k.text('Skill Unlocked!', { size: 12, font: 'monospace' }), k.pos(W / 2, H / 2 - 44), k.anchor('center'), k.color(CREAM[0], CREAM[1], CREAM[2]), k.opacity(1), k.z(951), k.fixed(), k.lifespan(3, { fade: 0.6 })]);
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
      lastPx = px;
      lastPy = py;

      if (moving) {
        if (!player.obj.getCurAnim()) player.obj.play('walk');
      } else {
        player.obj.stop();
        player.obj.frame = 0;
      }
      player.obj.flipX = !facingRight;
      player.obj.pos.x = px;
      player.obj.pos.y = py;
      player.obj.z = Math.floor(py);
      player.shadow.pos.x = px;
      player.shadow.pos.y = py + SHADOW_Y;
      player.shadow.z = Math.floor(py) - 1;
      pTag.pos.x = px;
      pTag.pos.y = py + LABEL_Y + (moving ? Math.abs(Math.sin(t * 9)) * -2 : 0);
      pTag.opacity = currentDialogue ? 0 : 1;

      for (const npc of npcs) {
        const b = Math.sin(t * 2.2 + npc.bobPhase) * 2.5;
        const bx = npc.baseX;
        const by = npc.baseY + b;

        npc.obj.pos.x = bx;
        npc.obj.pos.y = by;
        npc.shadow.pos.x = bx;
        npc.shadow.pos.y = by + SHADOW_Y;
        npc.label.pos.x = bx;
        npc.label.pos.y = by + LABEL_Y;
        npc.check.pos.x = bx + 18;
        npc.check.pos.y = by - 28;
        npc.check.opacity = npc.talked ? 1 : 0;

        const dist = Math.sqrt((px - bx) ** 2 + (py - by) ** 2);
        if (dist < 72 && !npc.talked && !currentDialogue) {
          npc.bang.pos.x = bx;
          npc.bang.pos.y = by - 66 + Math.sin(t * 5) * 2;
          npc.bang.opacity = 0.65 + Math.sin(t * 5) * 0.35;
        } else {
          npc.bang.opacity = 0;
        }
      }
    });
  });
}
