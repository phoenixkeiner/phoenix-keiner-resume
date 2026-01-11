import { npcDialogues } from '../data/npcs';
import { skills } from '../data/skills';

export function initMainScene(k, navigate) {
  
  k.scene("main", () => {
    const SPEED = 180;
    
    const collectedSkills = new Set();
    let currentDialogue = null;
    let currentNpc = null;
    let dialogueIndex = 0;

    const worldWidth = k.width();
    const worldHeight = k.height();

    k.add([
      k.rect(worldWidth, worldHeight),
      k.color(34, 139, 34),
      k.z(-10)
    ]);

    for (let x = 0; x < worldWidth; x += 32) {
      for (let y = 0; y < worldHeight; y += 32) {
        const baseGreen = 34 + Math.floor(Math.random() * 20);
        k.add([
          k.rect(32, 32),
          k.pos(x, y),
          k.color(baseGreen - 10, baseGreen + 100, baseGreen),
          k.z(-5),
        ]);

        if (Math.random() > 0.8) {
          k.add([
            k.rect(4, 6),
            k.pos(x + Math.random() * 20 + 6, y + Math.random() * 20 + 6),
            k.color(20, 80 + Math.random() * 40, 20),
            k.z(-4),
          ]);
        }
      }
    }

    const treeCount = Math.floor((worldWidth * worldHeight) / 10000);
    for (let i = 0; i < treeCount; i++) {
      const treeX = 50 + Math.random() * (worldWidth - 100);
      const treeY = 50 + Math.random() * (worldHeight - 100);
      
      k.add([
        k.rect(8, 24),
        k.pos(treeX, treeY),
        k.color(101, 67, 33),
        k.anchor("center"),
        k.z(-3),
      ]);
      
      k.add([
        k.circle(16),
        k.pos(treeX, treeY - 20),
        k.color(34, 139, 34),
        k.anchor("center"),
        k.outline(2, k.rgb(20, 100, 20)),
        k.z(-3),
      ]);
    }

    let playerX = worldWidth / 3.5;
    let playerY = 100;

    const playerCollision = k.add([
      k.pos(playerX, playerY),
      k.rect(16, 24),
      k.area(),
      k.body(),
      k.anchor("center"),
      k.z(1),
      k.opacity(0),
      "player",
    ]);

    const playerHead = k.add([
      k.circle(6),
      k.pos(playerX, playerY - 8),
      k.color(210, 140, 90),
      k.anchor("center"),
      k.outline(1, k.rgb(0, 0, 0)),
      k.z(11),
    ]);

    const playerHair = k.add([
      k.rect(10, 4),
      k.pos(playerX, playerY - 13),
      k.color(80, 50, 30),
      k.anchor("center"),
      k.outline(1, k.rgb(0, 0, 0)),
      k.z(11),
    ]);

    const playerBody = k.add([
      k.rect(12, 14),
      k.pos(playerX, playerY + 4),
      k.color(60, 120, 180),
      k.anchor("center"),
      k.outline(1, k.rgb(0, 0, 0)),
      k.z(10),
    ]);

    const playerLegL = k.add([
      k.rect(5, 8),
      k.pos(playerX - 3, playerY + 12),
      k.color(40, 40, 60),
      k.anchor("top"),
      k.outline(1, k.rgb(0, 0, 0)),
      k.z(10),
    ]);

    const playerLegR = k.add([
      k.rect(5, 8),
      k.pos(playerX + 3, playerY + 12),
      k.color(40, 40, 60),
      k.anchor("top"),
      k.outline(1, k.rgb(0, 0, 0)),
      k.z(10),
    ]);

    const nameTag = k.add([
      k.text("Phoenix", { size: 14, font: "monospace" }),
      k.pos(playerX, playerY - 25),
      k.color(255, 255, 255),
      k.anchor("center"),
      k.outline(2, k.rgb(0, 0, 0)),
      k.z(12),
    ]);

    const npcSprites = {
      university: { body: [80, 100, 220], shirt: [200, 200, 255], head: [255, 220, 180] },
      school: { body: [100, 180, 100], shirt: [255, 240, 150], head: [255, 210, 170] },
      annies: { body: [220, 100, 150], shirt: [255, 180, 200], head: [255, 230, 200] },
      revive: { body: [100, 200, 120], shirt: [180, 255, 180], head: [255, 220, 190] },
      certifications: { body: [200, 150, 50], shirt: [255, 215, 0], head: [255, 200, 140] }
    };

    const centerX = worldWidth / 2;
    const spacing = worldHeight / 6;
    
    const dynamicPositions = {
      university: { x: centerX - 25, y: spacing * 1.6 },
      school: { x: centerX - 100, y: spacing * 3.8 },
      annies: { x: centerX + 80, y: spacing * 2.2 },
      revive: { x: centerX + 50, y: spacing * 3.3 },
      certifications: { x: centerX, y: spacing * 5 }
    };

    const npcs = [];
    Object.entries(dynamicPositions).forEach(([npcKey, position]) => {
      const npcData = npcDialogues[npcKey];
      const colors = npcSprites[npcKey];
      
      const npcBody = k.add([
        k.rect(14, 18),
        k.pos(position.x, position.y),
        k.area(),
        k.anchor("center"),
        k.color(colors.body[0], colors.body[1], colors.body[2]),
        k.outline(2, k.rgb(0, 0, 0)),
        k.z(5),
        {
          npcKey: npcKey,
          talked: false
        }
      ]);

      k.add([
        k.circle(7),
        k.pos(position.x, position.y - 12),
        k.color(colors.head[0], colors.head[1], colors.head[2]),
        k.anchor("center"),
        k.outline(2, k.rgb(0, 0, 0)),
        k.z(5),
      ]);

      k.add([
        k.rect(12, 8),
        k.pos(position.x, position.y + 4),
        k.color(colors.shirt[0], colors.shirt[1], colors.shirt[2]),
        k.anchor("center"),
        k.z(5),
      ]);

      k.add([
        k.text(npcData.name, { size: 13, font: "monospace" }),
        k.pos(position.x, position.y - 25),
        k.anchor("center"),
        k.color(255, 255, 255),
        k.outline(2, k.rgb(0, 0, 0)),
        k.z(6),
      ]);

      npcs.push(npcBody);
    });

    const skillsDisplay = k.add([
      k.text("Skills: 0/5", { size: 16, font: "monospace" }),
      k.pos(10, 10),
      k.color(255, 255, 100),
      k.fixed(),
      k.outline(2, k.rgb(0, 0, 0)),
      k.z(100),
    ]);

    function updateSkillsDisplay() {
      skillsDisplay.text = `Skills: ${collectedSkills.size}/5`;
    }

    const dialogueBox = k.add([
      k.rect(k.width() - 40, 140),
      k.pos(k.width() / 2, k.height() - 80),
      k.anchor("center"),
      k.color(0, 0, 0),
      k.outline(4, k.WHITE),
      k.z(100),
      k.fixed(),
      k.opacity(0),
    ]);

    const dialogueInner = k.add([
      k.rect(k.width() - 48, 132),
      k.pos(k.width() / 2, k.height() - 80),
      k.anchor("center"),
      k.color(20, 20, 40),
      k.z(100),
      k.fixed(),
      k.opacity(0),
    ]);

    const dialogueText = k.add([
      k.text("", { size: 14, width: k.width() - 80, font: "monospace" }),
      k.pos(k.width() / 2, k.height() - 80),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.z(101),
      k.fixed(),
      k.opacity(0),
    ]);

    const continuePrompt = k.add([
      k.text("▼ TAP or SPACE", { size: 16 }),
      k.pos(k.width() / 2, k.height() - 20),
      k.anchor("center"),
      k.color(255, 255, 100),
      k.z(101),
      k.fixed(),
      k.opacity(0),
    ]);

    let promptBlink = 0;

    function showDialogue(npcKey) {
      currentNpc = npcKey;
      currentDialogue = npcDialogues[npcKey].dialogues;
      dialogueIndex = 0;
      displayCurrentDialogue();
    }

    function displayCurrentDialogue() {
      if (dialogueIndex < currentDialogue.length) {
        dialogueBox.opacity = 1;
        dialogueInner.opacity = 1;
        dialogueText.opacity = 1;
        continuePrompt.opacity = 1;
        dialogueText.text = currentDialogue[dialogueIndex];
      } else {
        const npcToReward = currentNpc;
        hideDialogue();
        
        if (npcToReward) {
          const npcData = npcDialogues[npcToReward];
          const skillKey = npcData.skillReward;
          if (!collectedSkills.has(skillKey)) {
            collectedSkills.add(skillKey);
            updateSkillsDisplay();
            const skill = skills[skillKey];
            
            k.add([
              k.rect(220, 90),
              k.pos(k.width() / 2, k.height() / 2 - 100),
              k.anchor("center"),
              k.color(255, 215, 0),
              k.outline(4, k.rgb(200, 150, 0)),
              k.z(200),
              k.fixed(),
              k.opacity(1),
              k.lifespan(2.5, { fade: 0.5 }),
            ]);

            k.add([
              k.text(`${skill.icon}`, { size: 36 }),
              k.pos(k.width() / 2, k.height() / 2 - 115),
              k.anchor("center"),
              k.z(201),
              k.fixed(),
              k.opacity(1),
              k.lifespan(2.5, { fade: 0.5 }),
            ]);

            k.add([
              k.text(skill.name, { size: 18, font: "monospace" }),
              k.pos(k.width() / 2, k.height() / 2 - 90),
              k.anchor("center"),
              k.color(0, 0, 0),
              k.z(201),
              k.fixed(),
              k.opacity(1),
              k.lifespan(2.5, { fade: 0.5 }),
            ]);
          }
          npcs.find(n => n.npcKey === npcToReward).talked = true;
        }
      }
    }

    function hideDialogue() {
      dialogueBox.opacity = 0;
      dialogueInner.opacity = 0;
      dialogueText.opacity = 0;
      continuePrompt.opacity = 0;
      currentDialogue = null;
      currentNpc = null;
    }

    function advanceDialogue() {
      if (currentDialogue) {
        dialogueIndex++;
        displayCurrentDialogue();
      }
    }

    k.onKeyPress("space", () => {
      if (currentDialogue) {
        advanceDialogue();
      } else {
        npcs.forEach(npc => {
          if (playerCollision.pos.dist(npc.pos) < 60) {
            showDialogue(npc.npcKey);
          }
        });
      }
    });

    k.onMousePress(() => {
      if (currentDialogue) {
        advanceDialogue();
      } else {
        npcs.forEach(npc => {
          const mousePos = k.mousePos();
          if (mousePos.dist(npc.pos) < 50) {
            showDialogue(npc.npcKey);
          }
        });
      }
    });

    let moveX = 0;
    let moveY = 0;

    k.onTouchStart((id, pos) => {
      if (currentDialogue) {
        advanceDialogue();
      }
    });

    k.onTouchMove((id, pos) => {
      if (!currentDialogue) {
        const touchPos = k.toWorld(pos);
        const diff = touchPos.sub(playerCollision.pos);
        
        if (diff.len() > 30) {
          moveX = diff.x;
          moveY = diff.y;
          const len = Math.sqrt(moveX * moveX + moveY * moveY);
          moveX /= len;
          moveY /= len;
        } else {
          moveX = 0;
          moveY = 0;
        }
      }
    });

    k.onTouchEnd(() => {
      moveX = 0;
      moveY = 0;
    });

    k.onUpdate(() => {
      if (continuePrompt.opacity > 0) {
        promptBlink += k.dt() * 4;
        continuePrompt.opacity = 0.5 + Math.abs(Math.sin(promptBlink)) * 0.5;
      }

      playerX = playerCollision.pos.x;
      playerY = playerCollision.pos.y;

      playerHead.pos.x = playerX;
      playerHead.pos.y = playerY - 8;
      
      playerHair.pos.x = playerX;
      playerHair.pos.y = playerY - 13;
      
      playerBody.pos.x = playerX;
      playerBody.pos.y = playerY + 4;
      
      playerLegL.pos.x = playerX - 3;
      playerLegL.pos.y = playerY + 12;
      
      playerLegR.pos.x = playerX + 3;
      playerLegR.pos.y = playerY + 12;
      
      nameTag.pos.x = playerX;
      nameTag.pos.y = playerY - 25;

      if (!currentDialogue) {
        let keyMoveX = 0;
        let keyMoveY = 0;

        if (k.isKeyDown("left") || k.isKeyDown("a")) keyMoveX -= 1;
        if (k.isKeyDown("right") || k.isKeyDown("d")) keyMoveX += 1;
        if (k.isKeyDown("up") || k.isKeyDown("w")) keyMoveY -= 1;
        if (k.isKeyDown("down") || k.isKeyDown("s")) keyMoveY += 1;

        const finalMoveX = keyMoveX || moveX;
        const finalMoveY = keyMoveY || moveY;

        if (finalMoveX !== 0 || finalMoveY !== 0) {
          playerCollision.move(finalMoveX * SPEED, finalMoveY * SPEED);
        }

        playerCollision.pos.x = Math.max(20, Math.min(worldWidth - 20, playerCollision.pos.x));
        playerCollision.pos.y = Math.max(20, Math.min(worldHeight - 20, playerCollision.pos.y));
      }
    });

    k.add([
      k.text("* Talk to everyone to collect all skills!", { size: 14, font: "monospace" }),
      k.pos(k.width() / 2, 30),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.fixed(),
      k.outline(2, k.rgb(0, 0, 0)),
      k.z(100),
    ]);
  });
}