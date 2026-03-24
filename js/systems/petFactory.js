// 구 세이브 호환: baseHp/Atk/Def/Spd에서 Lv1 UI 스탯 근사 복원
function petInitStatsFromBase(pet) {
  if (pet.fixedStats) return { ...pet.fixedStats }; // 포획 개체
  if (!pet.master || pet.baseHp === undefined) return null;
  const c = pet.master.initStatCoeff || 10;
  const hp  = c * pet.baseHp  / 100;
  const atk = c * pet.baseAtk / 100;
  const def = c * pet.baseDef / 100;
  const spd = c * pet.baseSpd / 100;
  return {
    hp:  Math.floor(hp * 4 + atk + def + spd),
    atk: Math.floor(hp * 0.1 + atk + def * 0.1 + spd * 0.05),
    def: Math.floor(hp * 0.1 + atk * 0.1 + def + spd * 0.05),
    spd: Math.floor(spd),
  };
}

// getUIStats()의 역산: 전투 표시 스탯 → 내부 계수
// UI_HP = 4a + b + c + d  (a=hp, b=atk, c=def, d=spd)
// UI_ATK = 0.1a + b + 0.1c + 0.05d
// UI_DEF = 0.1a + 0.1b + c + 0.05d
// UI_SPD = d
function invertUIStats(uiHp, uiAtk, uiDef, uiSpd) {
  const d  = uiSpd;
  const r1 = uiHp  - d;
  const r2 = uiAtk - 0.05 * d;
  const r3 = uiDef - 0.05 * d;
  // (2)-(3): 0.9b - 0.9c = r2-r3 → b = c + Δ
  const delta = (r2 - r3) / 0.9;
  // Substitute into (1) and (3), solve for c
  const r3adj = r3 - 0.1 * delta;
  const r1adj = r1 - delta;
  const c = (r3adj - 0.025 * r1adj) / 1.05;
  const a = (r1adj - 2 * c) / 4;
  const b = c + delta;
  return { hp: Math.max(0.05, a), atk: Math.max(0.05, b), def: Math.max(0, c), spd: Math.max(0, d) };
}

// 전투 몬스터를 그대로 페트화 — 표시 스탯이 동일한 개체로 인벤토리에 추가
function captureMonsterAsPet(monster) {
  const master = PET_MASTER[monster.petId];
  if (!master) return null;

  // 전투 스탯 역산 → 내부 계수 (getUIStats 가 동일한 값을 반환하게 됨)
  const coeff = invertUIStats(
    monster.hp, monster.atk || 1, monster.def || 0, monster.spd || 1
  );

  // 포획 등급 판정 (S:5% A:20% B:35% C:28% D:12%)
  const cgr = Math.random();
  const captureGrade = cgr >= 0.95 ? 'S'
                     : cgr >= 0.75 ? 'A'
                     : cgr >= 0.40 ? 'B'
                     : cgr >= 0.12 ? 'C' : 'D';

  // 등급 보정 Lv1 스탯 (GRADE_INIT_MULT 적용)
  const im = GRADE_INIT_MULT[captureGrade] || 1.0;
  const fs = {
    hp:  Math.max(1, Math.round(monster.hp  * im)),
    atk: Math.max(1, Math.round((monster.atk || 1) * im)),
    def: Math.max(0, Math.round((monster.def || 0) * im)),
    spd: Math.max(1, Math.round((monster.spd || 1) * im)),
  };

  // 개체 고유 Base 성장률 (종족 계수 ± 2) — levelUp() 공식에서 사용
  const baseHp  = master.hpCoeff  + randInt(-2, 2);
  const baseAtk = master.atkCoeff + randInt(-2, 2);
  const baseDef = master.defCoeff + randInt(-2, 2);
  const baseSpd = master.spdCoeff + randInt(-2, 2);

  return {
    petId:   master.petId,
    name:    master.name,
    emoji:   master.emoji,
    type:    master.type,
    rarity:  master.rarity || '일반',
    grade:   captureGrade,
    level:   monster.level || 1,
    master,
    baseHp, baseAtk, baseDef, baseSpd,
    hp:  coeff.hp,  atk: coeff.atk,
    def: coeff.def, spd: coeff.spd,
    // 등급 보정된 표시 스탯
    fixedStats: { ...fs },
    // 성장률 계산 기준점 (등급 보정 포함)
    initStats: { ...fs },
    exp: 0,
    expToNext: calcExpToNext(monster.level || 1),
    currentHp: fs.hp,
  };
}

function createLevel1Pet(masterId) {
  const master = PET_MASTER[masterId];

  // Step 1: 개체 고유 Base 성장률 (종족 계수 ± 2)
  const r0 = randInt(-2, 2), r1 = randInt(-2, 2),
        r2 = randInt(-2, 2), r3 = randInt(-2, 2);
  const baseHp  = master.hpCoeff  + r0;
  const baseAtk = master.atkCoeff + r1;
  const baseDef = master.defCoeff + r2;
  const baseSpd = master.spdCoeff + r3;

  // Step 2: 10포인트 랜덤 분배
  const add = distributePoints();

  // Step 3: 개체 등급 (S~D) — 균등 분포 기반 (S:5% A:20% B:35% C:28% D:12%)
  // 스탯은 r0~r3 다이스를 그대로 사용, 등급 표시는 별도 균등 판정
  const gr = Math.random();
  const indivGrade = gr >= 0.95 ? 'S'
                   : gr >= 0.75 ? 'A'
                   : gr >= 0.40 ? 'B'
                   : gr >= 0.12 ? 'C' : 'D';

  // Step 4: 레벨 1 초기 계수 — 등급 보정 포함 (ref: GRADE_INIT_MULT)
  const im = GRADE_INIT_MULT[indivGrade] || 1.0;
  const ic = master.initStatCoeff * im; // 등급 보정된 초기 계수
  const pet = {
    petId:   master.petId,
    name:    master.name,
    emoji:   master.emoji,
    type:    master.type,
    rarity:  master.rarity || '일반',
    grade:   indivGrade,
    level:   1,
    master,
    baseHp, baseAtk, baseDef, baseSpd,
    hp:  ic * (baseHp  + add[0]) / 100,
    atk: ic * (baseAtk + add[1]) / 100,
    def: ic * (baseDef + add[2]) / 100,
    spd: ic * (baseSpd + add[3]) / 100,
    exp: 0,
    expToNext: calcExpToNext(1),
  };

  // 성장률 계산 기준점 (Lv1 UI 스탯)
  const lv1ui = getUIStats(pet);
  pet.initStats = { hp: lv1ui.hp, atk: lv1ui.atk, def: lv1ui.def, spd: lv1ui.spd };

  return pet;
}
