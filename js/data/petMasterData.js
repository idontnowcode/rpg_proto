const PET_MASTER = {
  // ── 초기 선택 페트 ─────────────────────────────────────────────────────────
  // initStatCoeff: Lv.1 내부 계수 스케일 (절반으로 감소)
  // growStats: 레벨업 당 내부 계수 증가치 (center값, var=분산)
  //   → UI HP += hp*4+atk+def+spd, UI ATK ≈ atk, UI DEF ≈ def, UI SPD = spd
  94: {
    petId: 94,
    name: '이그니스', emoji: '🔥', type: 'ATK 특화',
    rarity: '레어', habitat: '초기 선택',
    initStatCoeff: 13,
    hpCoeff: 24, atkCoeff: 38, defCoeff: 16, spdCoeff: 20,
    // 레벨업 UI 목표: HP+9, ATK+2.2, DEF+1.1, SPD+1.7 / 합계 ATK+DEF+SPD≈5.0
    growStats: { hp: 1.14, atk: 2.0, def: 0.75, spd: 1.7, var: 0.5 },
    desc: '화염을 품은 붉은 젤리 생명체. 공격력이 뛰어나다.',
  },
  12: {
    petId: 12,
    name: '아쿠론', emoji: '💧', type: 'HP/DEF형',
    rarity: '레어', habitat: '초기 선택',
    initStatCoeff: 15,
    hpCoeff: 30, atkCoeff: 28, defCoeff: 24, spdCoeff: 16,
    // 레벨업 UI 목표: HP+13, ATK+1.5, DEF+2.4, SPD+1.4 / 합계≈5.3
    growStats: { hp: 2.14, atk: 1.0, def: 2.05, spd: 1.4, var: 0.5 },
    desc: '심해에서 온 고대 수룡. 강인한 체력과 방어력을 자랑한다.',
  },
  7: {
    petId: 7,
    name: '볼팡', emoji: '⚡', type: 'SPD 특화',
    rarity: '레어', habitat: '초기 선택',
    initStatCoeff: 11,
    hpCoeff: 20, atkCoeff: 35, defCoeff: 12, spdCoeff: 30,
    // 레벨업 UI 목표: HP+8, ATK+2.0, DEF+1.4, SPD+1.7 / 합계≈5.1
    growStats: { hp: 0.88, atk: 1.75, def: 1.05, spd: 1.7, var: 0.5 },
    desc: '번개를 달리는 전설의 늑대. 압도적인 속도를 지닌다.',
  },

  // ── 야생 포획 (일반 조우) ──────────────────────────────────────────────────
  101: {
    petId: 101,
    name: '크리퍼', emoji: '🐀', type: 'SPD형',
    rarity: '일반', habitat: '초보 던전',
    initStatCoeff: 9,
    hpCoeff: 15, atkCoeff: 22, defCoeff: 10, spdCoeff: 28,
    // 레벨업 UI 목표: HP+7, ATK+1.5, DEF+0.7, SPD+1.7 / 합계≈3.9
    growStats: { hp: 0.65, atk: 1.3, def: 0.55, spd: 1.7, var: 0.35 },
    desc: '어둠 속을 빠르게 누비는 소형 마물. 속도가 빠르다.',
  },
  102: {
    petId: 102,
    name: '쉐이드', emoji: '🦇', type: 'SPD/ATK',
    rarity: '일반', habitat: '초보 던전',
    initStatCoeff: 10,
    hpCoeff: 16, atkCoeff: 26, defCoeff: 12, spdCoeff: 26,
    // 레벨업 UI 목표: HP+7, ATK+1.7, DEF+0.7, SPD+1.6 / 합계≈4.0
    growStats: { hp: 0.7, atk: 1.5, def: 0.55, spd: 1.6, var: 0.35 },
    desc: '어둠 속을 소리 없이 나는 박쥐형 마물. 공격과 속도 모두 준수하다.',
  },

  // ── 포획 전용 페트 (capturePool) ──────────────────────────────────────────
  201: {
    petId: 201,
    name: '글로비', emoji: '🟢', type: '균형형',
    rarity: '일반', habitat: '초보 던전',
    initStatCoeff: 10,
    hpCoeff: 22, atkCoeff: 18, defCoeff: 18, spdCoeff: 14,
    // 레벨업 UI 목표: HP+10, ATK+1.7, DEF+1.7, SPD+1.4 / 합계≈4.8
    growStats: { hp: 1.35, atk: 1.4, def: 1.4, spd: 1.4, var: 0.4 },
    desc: '초보 던전에 서식하는 녹색 슬라임. 균형 잡힌 성장을 보인다.',
  },
  202: {
    petId: 202,
    name: '네카', emoji: '🧚', type: 'SPD/ATK',
    rarity: '희귀', habitat: '어두운 숲',
    initStatCoeff: 11,
    hpCoeff: 15, atkCoeff: 30, defCoeff: 10, spdCoeff: 28,
    // 레벨업 UI 목표: HP+8, ATK+2.1, DEF+0.9, SPD+1.7 / 합계≈4.7
    growStats: { hp: 0.8, atk: 1.85, def: 0.8, spd: 1.7, var: 0.4 },
    desc: '숲 속에 숨어 사는 독을 품은 정령. 재빠른 공격이 특기.',
  },
  203: {
    petId: 203,
    name: '그리블', emoji: '👺', type: '균형형',
    rarity: '희귀', habitat: '마물의 동굴',
    initStatCoeff: 12,
    hpCoeff: 24, atkCoeff: 28, defCoeff: 20, spdCoeff: 16,
    // 레벨업 UI 목표: HP+10, ATK+1.7, DEF+1.8, SPD+1.3 / 합계≈4.8
    growStats: { hp: 1.35, atk: 1.4, def: 1.55, spd: 1.3, var: 0.4 },
    desc: '동굴 깊숙이 서식하는 소형 마물. 공격과 방어 모두 안정적.',
  },
  204: {
    petId: 204,
    name: '루파르', emoji: '🐺', type: 'ATK/SPD',
    rarity: '희귀', habitat: '암흑성',
    initStatCoeff: 13,
    hpCoeff: 20, atkCoeff: 38, defCoeff: 14, spdCoeff: 26,
    // 레벨업 UI 목표: HP+9, ATK+2.2, DEF+1.0, SPD+1.7 / 합계≈4.9
    growStats: { hp: 1.0, atk: 1.95, def: 0.8, spd: 1.7, var: 0.45 },
    desc: '암흑성을 지키는 반수인. 날카로운 발톱과 빠른 몸놀림이 위협적.',
  },
  205: {
    petId: 205,
    name: '아에테르나', emoji: '🌟', type: 'SPD/ATK',
    rarity: '신화', habitat: '암흑성',
    initStatCoeff: 12,
    hpCoeff: 20, atkCoeff: 32, defCoeff: 16, spdCoeff: 30,
    // 레벨업 UI 목표: HP+11, ATK+2.3, DEF+1.2, SPD+1.8 / 합계≈5.3 (신화급 보정)
    growStats: { hp: 1.35, atk: 2.05, def: 1.0, spd: 1.8, var: 0.5 },
    desc: '시간의 틈에서 태어난 별의 정령. 눈부신 빛과 함께 나타나며, 포획된 기록이 극히 드물다.',
  },
};

// ── 페트 도감 데이터 ──────────────────────────────────────────────────────────
// petId 있는 종류 = capturePool 통해 Lv.1로 출현 시 포획 가능
const COMPENDIUM_WILD = [
  { id:'rat',        name:'크리퍼',      emoji:'🐀', rarity:'일반', habitat:'초보 던전',   petId:101, desc:'던전의 어둠 속을 빠르게 누비는 소형 마물. Lv.1 출현 시 포획 가능.' },
  { id:'slime',      name:'글로비',      emoji:'🟢', rarity:'일반', habitat:'초보 던전',   petId:201, desc:'초보 던전에 서식하는 녹색 슬라임. Lv.1 출현 시 포획 가능.' },
  { id:'bat',        name:'쉐이드',      emoji:'🦇', rarity:'일반', habitat:'초보 던전',   petId:102, desc:'어둠 속을 소리 없이 나는 박쥐형 마물. Lv.1 출현 시 포획 가능.' },
  { id:'fairy',      name:'네카',        emoji:'🧚', rarity:'희귀', habitat:'어두운 숲',   petId:202, desc:'독을 품은 숲의 정령. Lv.1 출현 시 포획 가능.' },
  { id:'goblin',     name:'그리블',      emoji:'👺', rarity:'희귀', habitat:'마물의 동굴', petId:203, desc:'동굴에 서식하는 소형 마물. Lv.1 출현 시 포획 가능.' },
  { id:'skeleton',   name:'오소렉',      emoji:'💀', rarity:'일반', habitat:'마물의 동굴', desc:'뼈로 이루어진 언데드 마물.' },
  { id:'orc',        name:'오르가',      emoji:'🪓', rarity:'희귀', habitat:'마물의 동굴', desc:'강인한 육체를 가진 대형 마물.' },
  { id:'werewolf',   name:'루파르',      emoji:'🐺', rarity:'희귀', habitat:'암흑성·동굴', petId:204, desc:'암흑성을 지키는 반수인. Lv.1 출현 시 포획 가능.' },
  { id:'darkKnight', name:'나이트셰이드', emoji:'🗡️', rarity:'전설', habitat:'암흑성',    desc:'어둠의 기사단. 최강의 방어력을 자랑한다.' },
  { id:'vampire',    name:'뱀피르',      emoji:'🧛', rarity:'전설', habitat:'암흑성',      desc:'암흑의 귀족. 놀라운 속도와 강렬한 공격력.' },
  { id:'aeterna',    name:'아에테르나',  emoji:'🌟', rarity:'신화', habitat:'암흑성',      petId:205, desc:'시간의 틈에서 태어난 별의 정령. 극히 드문 확률로 포획 가능.' },
];
