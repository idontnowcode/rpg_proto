function getRankBonus(sum) {
  if (sum >= 100) return [450, 500];
  if (sum >= 95)  return [470, 520];
  if (sum >= 90)  return [490, 540];
  if (sum >= 85)  return [510, 560];
  if (sum >= 80)  return [530, 580];
  return [550, 600];
}

function levelUp(pet) {
  const add = distributePoints();
  const sum = pet.master.hpCoeff + pet.master.atkCoeff
            + pet.master.defCoeff + pet.master.spdCoeff;
  const [bMin, bMax] = getRankBonus(sum);
  const B = randInt(bMin, bMax);
  // growFactor: baseline 4.5. higher = faster growth per level
  const growMult = (pet.master.growFactor || 4.5) / 4.5;

  pet.hp  += (pet.baseHp  + add[0]) * B * growMult / 10000;
  pet.atk += (pet.baseAtk + add[1]) * B * growMult / 10000;
  pet.def += (pet.baseDef + add[2]) * B * growMult / 10000;
  pet.spd += (pet.baseSpd + add[3]) * B * growMult / 10000;
  pet.level++;

  return { add, B };
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
