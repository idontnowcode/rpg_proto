// ── Wild Pet Base Stats (Lv1 기준) ─────────────────────────────────────────────
// 모든 전투 상대를 '페트'로 통칭
const MONSTERS = {
  rat:        { id:'rat',        name:'크리퍼',      emoji:'🐀', hp:14,  atk:5,  def:1,  spd:10, exp:8,   petId:101 },
  slime:      { id:'slime',      name:'글로비',      emoji:'🟢', hp:28,  atk:8,  def:3,  spd:4,  exp:15,  petId:201 },
  bat:        { id:'bat',        name:'쉐이드',      emoji:'🦇', hp:20,  atk:12, def:2,  spd:12, exp:18,  petId:102 },
  fairy:      { id:'fairy',      name:'네카',        emoji:'🧚', hp:18,  atk:14, def:1,  spd:16, exp:22  },
  goblin:     { id:'goblin',     name:'그리블',      emoji:'👺', hp:45,  atk:15, def:6,  spd:8,  exp:35  },
  skeleton:   { id:'skeleton',   name:'오소렉',      emoji:'💀', hp:55,  atk:18, def:10, spd:6,  exp:45  },
  orc:        { id:'orc',        name:'오르가',      emoji:'🪓', hp:70,  atk:22, def:8,  spd:5,  exp:65  },
  werewolf:   { id:'werewolf',   name:'루파르',      emoji:'🐺', hp:55,  atk:26, def:5,  spd:18, exp:80  },
  darkKnight: { id:'darkKnight', name:'나이트셰이드', emoji:'🗡️', hp:100, atk:30, def:20, spd:8,  exp:120 },
  vampire:    { id:'vampire',    name:'뱀피르',      emoji:'🧛', hp:80,  atk:36, def:15, spd:20, exp:150 },
  aeterna:    { id:'aeterna',    name:'아에테르나',  emoji:'🌟', hp:60,  atk:22, def:8,  spd:24, exp:200 },
};

// ── Scaled Wild Pet Factory ────────────────────────────────────────────────────
function getScaledMonster(mapId) {
  const map = MAPS[mapId];
  if (!map || !map.encounters || !map.levelRange || map.encounters.length === 0) return null;

  const id    = map.encounters[randInt(0, map.encounters.length - 1)];
  const base  = MONSTERS[id];
  const level = randInt(map.levelRange[0], map.levelRange[1]);
  const scale = 1 + (level - 1) * 0.15;
  const weak  = 0.70 + Math.random() * 0.10;

  const capturable = level === 1 && !!base.petId;
  return {
    ...base,
    hp:        Math.max(1, Math.floor(base.hp  * scale * weak)),
    atk:       Math.max(1, Math.floor(base.atk * scale * weak)),
    def:       Math.max(0, Math.floor(base.def * scale * weak)),
    spd:       Math.max(1, Math.floor(base.spd * scale * weak)),
    exp:       Math.floor(base.exp * scale),
    level,
    currentHp: Math.max(1, Math.floor(base.hp * scale * weak)),
    capturable,
    petId: capturable ? base.petId : undefined,
  };
}

// ── Capturable Pets (항상 Lv.1, 독립 확률 판정) ──────────────────────────────
// capturePool 내 각 항목을 독립적으로 판정 → 첫 번째 성공 항목 반환
function getCapturableBattleMonster(mapId) {
  const map = MAPS[mapId];
  if (!map || !map.capturePool || map.capturePool.length === 0) return null;

  for (const entry of map.capturePool) {
    if (Math.random() < (entry.rate || 0)) {
      const base = MONSTERS[entry.monsterId];
      if (!base) continue;
      return {
        ...base,
        level: 1,
        currentHp: base.hp,
        capturable: true,
        petId: entry.petId,
      };
    }
  }
  return null;
}

function getRandomMonster() {
  return getScaledMonster('dungeon');
}
