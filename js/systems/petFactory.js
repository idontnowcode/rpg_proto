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

  // Step 3: 개체 등급 (S~D) — 성장률 롤 합계 기준
  const rollSum = r0 + r1 + r2 + r3;  // range: -8 ~ +8
  const indivGrade = rollSum >= 6 ? 'S'
                   : rollSum >= 3 ? 'A'
                   : rollSum >= 0 ? 'B'
                   : rollSum >= -3 ? 'C' : 'D';

  // Step 4: 레벨 1 초기 계수
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
    hp:  master.initStatCoeff * (baseHp  + add[0]) / 100,
    atk: master.initStatCoeff * (baseAtk + add[1]) / 100,
    def: master.initStatCoeff * (baseDef + add[2]) / 100,
    spd: master.initStatCoeff * (baseSpd + add[3]) / 100,
    exp: 0,
    expToNext: calcExpToNext(1),
  };

  return pet;
}
