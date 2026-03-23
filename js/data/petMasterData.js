const PET_MASTER = {
  // ── 초기 선택 페트 ─────────────────────────────────────────────────────────
  94: {
    petId: 94,
    name: '이그니스', emoji: '🔥', type: 'ATK 특화',
    rarity: '레어', habitat: '초기 선택',
    initStatCoeff: 26, growFactor: 4.5,
    hpCoeff: 24, atkCoeff: 38, defCoeff: 16, spdCoeff: 20,
    desc: '화염을 품은 붉은 젤리 생명체. 공격력이 뛰어나다.',
  },
  12: {
    petId: 12,
    name: '아쿠론', emoji: '💧', type: 'HP/DEF형',
    rarity: '레어', habitat: '초기 선택',
    initStatCoeff: 30, growFactor: 3.8,
    hpCoeff: 30, atkCoeff: 28, defCoeff: 24, spdCoeff: 16,
    desc: '심해에서 온 고대 수룡. 강인한 체력과 방어력을 자랑한다.',
  },
  7: {
    petId: 7,
    name: '볼팡', emoji: '⚡', type: 'SPD 특화',
    rarity: '레어', habitat: '초기 선택',
    initStatCoeff: 22, growFactor: 5.0,
    hpCoeff: 20, atkCoeff: 35, defCoeff: 12, spdCoeff: 30,
    desc: '번개를 달리는 전설의 늑대. 압도적인 속도를 지닌다.',
  },

  // ── 포획 전용 페트 ─────────────────────────────────────────────────────────
  201: {
    petId: 201,
    name: '글로비', emoji: '🟢', type: '균형형',
    rarity: '일반', habitat: '초보 던전',
    initStatCoeff: 20, growFactor: 4.0,
    hpCoeff: 22, atkCoeff: 18, defCoeff: 18, spdCoeff: 14,
    desc: '초보 던전에 서식하는 녹색 슬라임. 균형 잡힌 성장을 보인다.',
  },
  202: {
    petId: 202,
    name: '네카', emoji: '🧚', type: 'SPD/ATK',
    rarity: '희귀', habitat: '어두운 숲',
    initStatCoeff: 22, growFactor: 5.2,
    hpCoeff: 15, atkCoeff: 30, defCoeff: 10, spdCoeff: 28,
    desc: '숲 속에 숨어 사는 독을 품은 정령. 재빠른 공격이 특기.',
  },
  203: {
    petId: 203,
    name: '그리블', emoji: '👺', type: '균형형',
    rarity: '희귀', habitat: '마물의 동굴',
    initStatCoeff: 24, growFactor: 4.2,
    hpCoeff: 24, atkCoeff: 28, defCoeff: 20, spdCoeff: 16,
    desc: '동굴 깊숙이 서식하는 소형 마물. 공격과 방어 모두 안정적.',
  },
  204: {
    petId: 204,
    name: '루파르', emoji: '🐺', type: 'ATK/SPD',
    rarity: '희귀', habitat: '암흑성',
    initStatCoeff: 26, growFactor: 4.8,
    hpCoeff: 20, atkCoeff: 38, defCoeff: 14, spdCoeff: 26,
    desc: '암흑성을 지키는 반수인. 날카로운 발톱과 빠른 몸놀림이 위협적.',
  },
  205: {
    petId: 205,
    name: '아에테르나', emoji: '🌟', type: 'SPD/ATK',
    rarity: '신화', habitat: '암흑성',
    initStatCoeff: 24, growFactor: 6.0,
    hpCoeff: 20, atkCoeff: 32, defCoeff: 16, spdCoeff: 30,
    desc: '시간의 틈에서 태어난 별의 정령. 눈부신 빛과 함께 나타나며, 포획된 기록이 극히 드물다.',
  },
};

// ── 페트 도감 데이터 ──────────────────────────────────────────────────────────
// petId 있는 종류 = capturePool 통해 Lv.1로 출현 시 포획 가능
const COMPENDIUM_WILD = [
  { id:'rat',        name:'크리퍼',      emoji:'🐀', rarity:'일반', habitat:'초보 던전',   desc:'던전의 어둠 속을 빠르게 누비는 소형 마물.' },
  { id:'slime',      name:'글로비',      emoji:'🟢', rarity:'일반', habitat:'초보 던전',   petId:201, desc:'초보 던전에 서식하는 녹색 슬라임. Lv.1 출현 시 포획 가능.' },
  { id:'bat',        name:'쉐이드',      emoji:'🦇', rarity:'일반', habitat:'초보 던전',   desc:'어둠 속을 소리 없이 나는 박쥐형 마물.' },
  { id:'fairy',      name:'네카',        emoji:'🧚', rarity:'희귀', habitat:'어두운 숲',   petId:202, desc:'독을 품은 숲의 정령. Lv.1 출현 시 포획 가능.' },
  { id:'goblin',     name:'그리블',      emoji:'👺', rarity:'희귀', habitat:'마물의 동굴', petId:203, desc:'동굴에 서식하는 소형 마물. Lv.1 출현 시 포획 가능.' },
  { id:'skeleton',   name:'오소렉',      emoji:'💀', rarity:'일반', habitat:'마물의 동굴', desc:'뼈로 이루어진 언데드 마물.' },
  { id:'orc',        name:'오르가',      emoji:'🪓', rarity:'희귀', habitat:'마물의 동굴', desc:'강인한 육체를 가진 대형 마물.' },
  { id:'werewolf',   name:'루파르',      emoji:'🐺', rarity:'희귀', habitat:'암흑성·동굴', petId:204, desc:'암흑성을 지키는 반수인. Lv.1 출현 시 포획 가능.' },
  { id:'darkKnight', name:'나이트셰이드', emoji:'🗡️', rarity:'전설', habitat:'암흑성',    desc:'어둠의 기사단. 최강의 방어력을 자랑한다.' },
  { id:'vampire',    name:'뱀피르',      emoji:'🧛', rarity:'전설', habitat:'암흑성',      desc:'암흑의 귀족. 놀라운 속도와 강렬한 공격력.' },
  { id:'aeterna',    name:'아에테르나',  emoji:'🌟', rarity:'신화', habitat:'암흑성',      petId:205, desc:'시간의 틈에서 태어난 별의 정령. 극히 드문 확률로 포획 가능.' },
];
