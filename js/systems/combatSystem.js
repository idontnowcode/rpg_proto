// 데미지 = max(1, ATK - DEF×0.5) ± 2 랜덤 편차
function calcDamage(atk, def) {
  const base = Math.max(1, atk - Math.floor(def * 0.5));
  return Math.max(1, base + randInt(-2, 2));
}

// SPD 행동 속도 롤: spd ± 30% 분산 → 수치가 높을수록 먼저 행동
function rollSpeed(spd) {
  const variance = Math.round(spd * 0.3);
  return spd + randInt(-variance, variance);
}
