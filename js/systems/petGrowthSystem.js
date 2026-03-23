// 레벨업: growStats 기반 직접 성장
// 각 스탯은 center ± (var × 랜덤) 만큼 증가
// UI 스탯 목표값 (getUIStats 변환 후):
//   ATK + DEF + SPD 합계 평균 4.6~5.4, 범위 4~7
//   HP: 페트 타입별 center ±1 수준
function levelUp(pet) {
  const g = pet.master.growStats;
  if (!g) return {};

  const v = g.var || 0.5;
  const r = () => (Math.random() * 2 - 1) * v;

  // HP 내부 계수는 UI에서 ×4 증폭되므로 분산을 0.25배로 제한
  pet.hp  += Math.max(0.05, g.hp  + r() * 0.25);
  pet.atk += Math.max(0.05, g.atk + r());
  pet.def += Math.max(0,    g.def + r());
  pet.spd += Math.max(0.05, g.spd + r());
  pet.level++;

  return {};
}

// 내부 계수 → 실제 표시 스탯
function getUIStats(pet) {
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
