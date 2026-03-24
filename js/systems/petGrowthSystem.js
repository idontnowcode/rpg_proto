// ── 등급별 성장 배율 (ref: PetGrowthSystem.cs GetRankBonus 패턴) ──────────────
// B 값 기준: 기준 B=500, 등급마다 ±50~100 범위
// D:×0.80  C:×0.90  B:×1.00  A:×1.10  S:×1.20
const GRADE_GROW_MULT = { S: 1.20, A: 1.10, B: 1.00, C: 0.90, D: 0.80 };

// ── 등급별 Lv1 초기 스탯 배율 ────────────────────────────────────────────────
// initStatCoeff에 곱해져 초기 능력치 차이를 만듦
// D:×0.90  C:×0.95  B:×1.00  A:×1.05  S:×1.10
const GRADE_INIT_MULT = { S: 1.10, A: 1.05, B: 1.00, C: 0.95, D: 0.90 };

// ── RANK 보정계수 B 산출 (ref: 페트 성장률 공식.md) ─────────────────────────
// 종족 계수 합산(hpCoeff+atkCoeff+defCoeff+spdCoeff)에 따라 RANK 결정
// 강한 종(합 높음) → B 낮음, 약한 종(합 낮음) → B 높음 (역보정)
function getRankB(master) {
  const sum = (master.hpCoeff || 0) + (master.atkCoeff || 0)
            + (master.defCoeff || 0) + (master.spdCoeff || 0);
  if (sum >= 100) return randInt(450, 500); // RANK 1
  if (sum >= 95)  return randInt(470, 520); // RANK 2
  if (sum >= 90)  return randInt(490, 540); // RANK 3
  if (sum >= 85)  return randInt(510, 560); // RANK 4
  if (sum >= 80)  return randInt(530, 580); // RANK 5
  return randInt(550, 600);                 // RANK 6
}

// 레벨업: 레퍼런스 공식 기반 성장
// 능력치별 성장률 = (base성장률 + A) * B / 10000 * gradeMult
// base성장률: 개체 고유 baseHp/Atk/Def/Spd (생성 시 hpCoeff ± 2로 결정)
// A: 레벨업마다 10포인트 랜덤 분배
// B: RANK 보정계수 (약한 종이 더 빠르게 성장)
function levelUp(pet) {
  if (!pet.master) return {};

  // A: 10포인트를 체/공/방/순에 랜덤 분배
  const add = [0, 0, 0, 0];
  for (let i = 0; i < 10; i++) add[randInt(0, 3)]++;

  const B = getRankB(pet.master);
  const m = GRADE_GROW_MULT[pet.grade] || 1.0;

  // 개체 고유 base 성장률 (없으면 종족 계수 fallback)
  const bHp  = pet.baseHp  ?? pet.master.hpCoeff  ?? 20;
  const bAtk = pet.baseAtk ?? pet.master.atkCoeff ?? 20;
  const bDef = pet.baseDef ?? pet.master.defCoeff ?? 10;
  const bSpd = pet.baseSpd ?? pet.master.spdCoeff ?? 15;

  const Δhp  = Math.max(0.05, (bHp  + add[0]) * B / 10000 * m);
  const Δatk = Math.max(0.05, (bAtk + add[1]) * B / 10000 * m);
  const Δdef = Math.max(0,    (bDef + add[2]) * B / 10000 * m);
  const Δspd = Math.max(0.05, (bSpd + add[3]) * B / 10000 * m);

  if (pet.fixedStats) {
    // 포획 개체: float 누적 후 getUIStats에서 floor (소수점 손실 방지)
    const fs = pet.fixedStats;
    fs.hp  += Δhp * 4 + Δatk + Δdef + Δspd;
    fs.atk += Δhp * 0.1 + Δatk + Δdef * 0.1 + Δspd * 0.05;
    fs.def += Δhp * 0.1 + Δatk * 0.1 + Δdef + Δspd * 0.05;
    fs.spd += Δspd;
    pet.level++;
    return {};
  }

  pet.hp  += Δhp;
  pet.atk += Δatk;
  pet.def += Δdef;
  pet.spd += Δspd;
  pet.level++;
  return {};
}

// 내부 계수 → 실제 표시 스탯
// fixedStats가 있으면 (포획 개체) floor 적용 후 반환 (내부는 float 누적)
function getUIStats(pet) {
  if (pet.fixedStats) {
    const fs = pet.fixedStats;
    return {
      hp:  Math.floor(fs.hp),
      atk: Math.floor(fs.atk),
      def: Math.floor(fs.def),
      spd: Math.floor(fs.spd),
    };
  }
  return {
    hp:  Math.floor(pet.hp * 4 + pet.atk + pet.def + pet.spd),
    atk: Math.floor(pet.hp * 0.1 + pet.atk + pet.def * 0.1 + pet.spd * 0.05),
    def: Math.floor(pet.hp * 0.1 + pet.atk * 0.1 + pet.def + pet.spd * 0.05),
    spd: Math.floor(pet.spd),
  };
}

function calcExpToNext(level) {
  return Math.floor(30 * Math.pow(level, 1.5));
}

// 경험치 획득 → 레벨업 체크. 레벨업 메시지 배열 반환
function gainExp(pet, amount) {
  const messages = [];
  pet.exp += amount;
  while (pet.exp >= pet.expToNext) {
    pet.exp -= pet.expToNext;
    levelUp(pet);
    pet.expToNext = calcExpToNext(pet.level);
    messages.push(`레벨업! Lv.${pet.level} 달성`);
  }
  return messages;
}
