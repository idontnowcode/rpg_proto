// ── Wild Pet Base Stats (Lv1 기준) ─────────────────────────────────────────────
// 모든 전투 상대를 '페트'로 통칭
const MONSTERS = {
  // ── 기존 종 ─────────────────────────────────────────────────────────────────
  rat:        { id:'rat',        name:'크리퍼',      emoji:'🐀', hp:14,  atk:5,  def:1,  spd:10, exp:8,   petId:101, baseSpecies:'rat' },
  slime:      { id:'slime',      name:'글로비',      emoji:'🟢', hp:28,  atk:8,  def:3,  spd:4,  exp:15,  petId:201, baseSpecies:'slime' },
  bat:        { id:'bat',        name:'쉐이드',      emoji:'🦇', hp:20,  atk:12, def:2,  spd:12, exp:18,  petId:102, baseSpecies:'bat' },
  fairy:      { id:'fairy',      name:'네카',        emoji:'🧚', hp:18,  atk:14, def:1,  spd:16, exp:22,             baseSpecies:'fairy' },
  goblin:     { id:'goblin',     name:'그리블',      emoji:'👺', hp:45,  atk:15, def:6,  spd:8,  exp:35,             baseSpecies:'goblin' },
  skeleton:   { id:'skeleton',   name:'오소렉',      emoji:'💀', hp:55,  atk:18, def:10, spd:6,  exp:45,             baseSpecies:'skeleton' },
  orc:        { id:'orc',        name:'오르가',      emoji:'🪓', hp:70,  atk:22, def:8,  spd:5,  exp:65 },
  werewolf:   { id:'werewolf',   name:'루파르',      emoji:'🐺', hp:55,  atk:26, def:5,  spd:18, exp:80,             baseSpecies:'werewolf' },
  darkKnight: { id:'darkKnight', name:'나이트셰이드', emoji:'🗡️', hp:100, atk:30, def:20, spd:8,  exp:120 },
  vampire:    { id:'vampire',    name:'뱀피르',      emoji:'🧛', hp:80,  atk:36, def:15, spd:20, exp:150 },
  aeterna:    { id:'aeterna',    name:'아에테르나',  emoji:'🌟', hp:60,  atk:22, def:8,  spd:24, exp:200, petId:205, baseSpecies:'aeterna' },

  // ── 거북 (turtle) 계열 — T2~T3 ──────────────────────────────────────────────
  // T2 forest 기준 스탯: hp 18-45, atk 8-18, def 2-8, spd 6-18
  turtleRed:  { id:'turtleRed',  name:'붉은 거북', emoji:'🐢', hp:30, atk:10, def:8,  spd:7,  exp:28, petId:301, baseSpecies:'turtle', variant:'red' },
  turtleBlue: { id:'turtleBlue', name:'푸른 거북', emoji:'🐢', hp:24, atk:11, def:5,  spd:15, exp:25, petId:302, baseSpecies:'turtle', variant:'blue' },
  // T3 cave 기준 스탯: hp 40-70, atk 15-25, def 6-14, spd 5-14
  turtleGold: { id:'turtleGold', name:'황금 거북', emoji:'🐢', hp:52, atk:16, def:14, spd:8,  exp:55, petId:303, baseSpecies:'turtle', variant:'gold' },

  // ── 여우 (fox) 계열 — T2~T4 ──────────────────────────────────────────────────
  foxFire:    { id:'foxFire',  name:'불여우', emoji:'🦊', hp:22, atk:17, def:3,  spd:14, exp:30, petId:311, baseSpecies:'fox', variant:'fire' },
  // T4 darkForest 기준: hp 50-80, atk 20-32, def 5-16, spd 12-22
  foxSnow:    { id:'foxSnow',  name:'설여우', emoji:'🦊', hp:52, atk:22, def:6,  spd:22, exp:75, petId:312, baseSpecies:'fox', variant:'snow' },
  foxNine:    { id:'foxNine',  name:'구미호', emoji:'🦊', hp:60, atk:30, def:10, spd:22, exp:95, petId:313, baseSpecies:'fox', variant:'nine' },

  // ── 늑대 (wolf) 계열 — T2~T4 ─────────────────────────────────────────────────
  wolfGrey:   { id:'wolfGrey',  name:'회색 늑대', emoji:'🐺', hp:26, atk:14, def:4,  spd:13, exp:32, petId:321, baseSpecies:'wolf', variant:'grey' },
  // T3 cave 기준
  wolfBlack:  { id:'wolfBlack', name:'검은 늑대', emoji:'🐺', hp:48, atk:22, def:7,  spd:13, exp:60, petId:322, baseSpecies:'wolf', variant:'black' },
  // T4 darkForest 기준
  wolfIce:    { id:'wolfIce',   name:'얼음 늑대', emoji:'🐺', hp:60, atk:24, def:14, spd:14, exp:85, petId:323, baseSpecies:'wolf', variant:'ice' },

  // ── 식물 (plant) 계열 — T1~T3 ────────────────────────────────────────────────
  // T1 dungeon 기준: hp 12-30, atk 4-12, def 1-4, spd 4-14
  plantSeed:    { id:'plantSeed',    name:'씨앗 요정',   emoji:'🌱', hp:14, atk:6,  def:2,  spd:12, exp:10,  petId:331, baseSpecies:'plant', variant:'seed' },
  // T2 forest 기준
  plantVine:    { id:'plantVine',    name:'덩굴 괴물',   emoji:'🌿', hp:38, atk:9,  def:7,  spd:6,  exp:30,  petId:332, baseSpecies:'plant', variant:'vine' },
  // T3 cave 기준
  plantAncient: { id:'plantAncient', name:'고목 수호자', emoji:'🌳', hp:68, atk:16, def:14, spd:5,  exp:60,  petId:333, baseSpecies:'plant', variant:'ancient' },

  // ── 물고기 (fish) 계열 — T1~T3 ───────────────────────────────────────────────
  fishGlow:     { id:'fishGlow',     name:'빛나는 물고기', emoji:'🐟', hp:16, atk:9,  def:2,  spd:16, exp:20,  petId:341, baseSpecies:'fish', variant:'glow' },
  // T3 cave 기준
  fishDeep:     { id:'fishDeep',     name:'심해 물고기',   emoji:'🐠', hp:58, atk:15, def:13, spd:7,  exp:52,  petId:342, baseSpecies:'fish', variant:'deep' },
  fishElectric: { id:'fishElectric', name:'전기 장어',     emoji:'🐍', hp:44, atk:24, def:6,  spd:14, exp:58,  petId:343, baseSpecies:'fish', variant:'electric' },

  // ── 조류 (bird) 계열 — T2~T5 ─────────────────────────────────────────────────
  birdFire:    { id:'birdFire',    name:'불새',      emoji:'🦅', hp:20, atk:16, def:3,  spd:17, exp:35,  petId:401, baseSpecies:'bird', variant:'fire' },
  // T4 darkForest 기준
  birdStorm:   { id:'birdStorm',   name:'폭풍새',    emoji:'🦅', hp:58, atk:25, def:12, spd:16, exp:88,  petId:402, baseSpecies:'bird', variant:'storm' },
  // T5 abyss 기준: hp 70-110, atk 28-40, def 12-22, spd 15-25
  birdPhoenix: { id:'birdPhoenix', name:'빛의 봉황', emoji:'🦅', hp:76, atk:36, def:14, spd:25, exp:130, petId:403, baseSpecies:'bird', variant:'phoenix' },

  // ── 곤충 (insect) 계열 — T1~T2 ───────────────────────────────────────────────
  insectPoison:  { id:'insectPoison',  name:'독 벌레',       emoji:'🐛', hp:12, atk:10, def:1,  spd:10, exp:9,   petId:411, baseSpecies:'insect', variant:'poison' },
  insectSteel:   { id:'insectSteel',   name:'강철 딱정벌레', emoji:'🪲', hp:20, atk:5,  def:4,  spd:5,  exp:12,  petId:412, baseSpecies:'insect', variant:'steel' },
  // T2 forest 기준
  insectThunder: { id:'insectThunder', name:'번개 나방',     emoji:'🦋', hp:18, atk:14, def:2,  spd:17, exp:28,  petId:413, baseSpecies:'insect', variant:'thunder' },

  // ── 영령 (spirit) 계열 — T4~T6 ───────────────────────────────────────────────
  // T4 darkForest 기준: hp 50-80, atk 20-32, def 5-16, spd 12-22
  spiritFire:    { id:'spiritFire',    name:'불꽃 영령', emoji:'👻', hp:54, atk:30, def:8,  spd:18, exp:90,  petId:421, baseSpecies:'spirit', variant:'fire' },
  spiritIce:     { id:'spiritIce',     name:'얼음 영령', emoji:'👻', hp:60, atk:20, def:16, spd:18, exp:88,  petId:422, baseSpecies:'spirit', variant:'ice' },
  // T6 shadowRealm 기준: hp 90-130, atk 35-50, def 18-28, spd 18-28
  spiritThunder: { id:'spiritThunder', name:'번개 영령', emoji:'👻', hp:92, atk:42, def:18, spd:26, exp:155, petId:423, baseSpecies:'spirit', variant:'thunder' },

  // ── 드래곤 (dragon) 계열 — T5~T7 ─────────────────────────────────────────────
  // T5 abyss 기준: hp 70-110, atk 28-40, def 12-22, spd 15-25
  dragonSalamander: { id:'dragonSalamander', name:'불도마뱀', emoji:'🦎', hp:80,  atk:38, def:14, spd:20, exp:140, petId:501, baseSpecies:'dragon', variant:'salamander' },
  // T6 shadowRealm 기준: hp 90-130, atk 35-50, def 18-28, spd 18-28
  dragonDark:       { id:'dragonDark',       name:'암룡',     emoji:'🐉', hp:120, atk:38, def:28, spd:18, exp:170, petId:502, baseSpecies:'dragon', variant:'dark' },
  // T7 darkCastle 기준: hp 110-160, atk 45-60, def 25-40, spd 20-30
  dragonStar:       { id:'dragonStar',       name:'별의 용',  emoji:'🐉', hp:150, atk:56, def:36, spd:28, exp:250, petId:503, baseSpecies:'dragon', variant:'star' },

  // ── 골렘 (golem) 계열 — T3~T5 ────────────────────────────────────────────────
  // T3 cave 기준: hp 40-70, atk 15-25, def 6-14, spd 5-14
  golemStone: { id:'golemStone', name:'돌 골렘', emoji:'🗿', hp:68, atk:17, def:14, spd:5,  exp:65,  petId:511, baseSpecies:'golem', variant:'stone' },
  // T5 abyss 기준
  golemIron:  { id:'golemIron',  name:'철 골렘', emoji:'🤖', hp:105, atk:32, def:22, spd:6, exp:145, petId:512, baseSpecies:'golem', variant:'iron' },

  // ── 마물 (demon) 계열 — T5~T7 ────────────────────────────────────────────────
  // T5 abyss 기준
  demonImp:      { id:'demonImp',      name:'소형 악마',    emoji:'😈', hp:74,  atk:36, def:14, spd:22, exp:135, petId:521, baseSpecies:'demon', variant:'imp' },
  // T6 shadowRealm 기준
  demonGreater:  { id:'demonGreater',  name:'대악마',        emoji:'👿', hp:110, atk:48, def:22, spd:22, exp:180, petId:522, baseSpecies:'demon', variant:'greater' },
  // T7 darkCastle 기준
  demonOverlord: { id:'demonOverlord', name:'심연의 지배자', emoji:'🔱', hp:155, atk:58, def:38, spd:26, exp:260, petId:523, baseSpecies:'demon', variant:'overlord' },

  // ── 기존 종 파생 (쥐/박쥐/슬라임/해골/요정) ─────────────────────────────────
  // T1 dungeon 기준
  ratRed:         { id:'ratRed',         name:'붉은 쥐',      emoji:'🐀', hp:14, atk:8,  def:1,  spd:10, exp:10,  petId:901, baseSpecies:'rat',      variant:'red' },
  // T2 forest 기준
  ratDark:        { id:'ratDark',        name:'암흑 쥐',       emoji:'🐀', hp:20, atk:15, def:2,  spd:16, exp:28,  petId:902, baseSpecies:'rat',      variant:'dark' },
  // T3 cave 기준
  batBlood:       { id:'batBlood',       name:'피의 박쥐',    emoji:'🦇', hp:44, atk:22, def:4,  spd:14, exp:50,  petId:903, baseSpecies:'bat',      variant:'blood' },
  // T4 darkForest 기준
  batThunder:     { id:'batThunder',     name:'천둥 박쥐',    emoji:'🦇', hp:52, atk:28, def:6,  spd:21, exp:85,  petId:904, baseSpecies:'bat',      variant:'thunder' },
  // T3 cave 기준
  slimeRed:       { id:'slimeRed',       name:'붉은 슬라임',  emoji:'🔴', hp:48, atk:22, def:8,  spd:7,  exp:55,  petId:905, baseSpecies:'slime',    variant:'red' },
  // T5 abyss 기준
  slimeBlack:     { id:'slimeBlack',     name:'검은 슬라임',  emoji:'⬛', hp:85, atk:38, def:20, spd:10, exp:140, petId:906, baseSpecies:'slime',    variant:'black' },
  // T3 cave 기준
  skeletonArcher: { id:'skeletonArcher', name:'해골 궁수',    emoji:'💀', hp:42, atk:20, def:6,  spd:10, exp:48,  petId:907, baseSpecies:'skeleton', variant:'archer' },
  // T4 darkForest 기준
  skeletonCursed: { id:'skeletonCursed', name:'저주받은 해골', emoji:'💀', hp:58, atk:26, def:12, spd:10, exp:88,  petId:908, baseSpecies:'skeleton', variant:'cursed' },
  // T4 darkForest 기준
  fairyFire:      { id:'fairyFire',      name:'화염 요정',    emoji:'🧚', hp:50, atk:30, def:6,  spd:20, exp:90,  petId:909, baseSpecies:'fairy',    variant:'fire' },
  // T6 shadowRealm 기준
  fairyFrost:     { id:'fairyFrost',     name:'서리 요정',    emoji:'🧚', hp:94, atk:28, def:22, spd:26, exp:155, petId:910, baseSpecies:'fairy',    variant:'frost' },
};

// ── Scaled Wild Pet Factory ────────────────────────────────────────────────────
function getScaledMonster(mapId) {
  const map = MAPS[mapId];
  if (!map || !map.encounters || !map.levelRange || map.encounters.length === 0) return null;

  const id    = map.encounters[randInt(0, map.encounters.length - 1)];
  const base  = MONSTERS[id];
  let   level = randInt(map.levelRange[0], map.levelRange[1]);
  // DEV: petId 있는 포획 가능 종만 50% 확률로 Lv.1 강제
  if (typeof DEV !== 'undefined' && DEV.forceLv1 && base.petId && Math.random() < 0.5) level = 1;
  // Normal per-level growth: +15% per level
  // Wild per-level growth: +10~12% per level (70~80% of normal growth rate)
  // Result: Lv.1 wild == Lv.1 normal; Lv.2+ normal > Lv.2+ wild > Lv.1
  const wildGrowthRate = 0.105 + Math.random() * 0.015; // ~70~80% of 0.15
  const wildScale = 1 + (level - 1) * wildGrowthRate;
  const normalScale = 1 + (level - 1) * 0.15;

  const capturable = level === 1 && !!base.petId;
  return {
    ...base,
    hp:        Math.max(1, Math.floor(base.hp  * wildScale)),
    atk:       Math.max(1, Math.floor(base.atk * wildScale)),
    def:       Math.max(0, Math.floor(base.def * wildScale)),
    spd:       Math.max(1, Math.floor(base.spd * wildScale)),
    exp:       Math.floor(base.exp * normalScale),
    level,
    currentHp: Math.max(1, Math.floor(base.hp * wildScale)),
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
