// ── Player Character (내부 계수 기반, 페트와 동일한 모델) ────────────────────────
// hp/atk/def/spd 는 내부 계수 (pet.hp 와 동일한 스케일)
// 실제 전투/표시 스탯은 getPlayerUIStats() 를 사용
const Player = {
  level: 1,
  exp: 0,
  expToNext: 30,
  hp:  5,   // 내부 계수 → UI maxHp ≈ 39
  atk: 10,  // 내부 계수 → UI atk ≈ 11
  def: 4,   // 내부 계수 → UI def ≈ 5
  spd: 5,   // 내부 계수 → UI spd = 5
  currentHp: null,  // 실제 현재 HP (null = 풀 HP)
  statPoints: 0,
};

// ── Pet Inventory + Gold ───────────────────────────────────────────────────────
const Inventory = {
  pets: [],
  gold: 0,
  maxPets: 10,
};

// ── Player UI Stats (페트 getUIStats 와 동일한 교차 보정 공식) ──────────────────
function getPlayerUIStats() {
  return {
    maxHp: Math.floor(Player.hp * 4 + Player.atk + Player.def + Player.spd),
    atk:   Math.floor(Player.hp * 0.1 + Player.atk + Player.def * 0.1 + Player.spd * 0.05),
    def:   Math.floor(Player.hp * 0.1 + Player.atk * 0.1 + Player.def + Player.spd * 0.05),
    spd:   Math.floor(Player.spd),
  };
}

// 현재 HP 헬퍼 (null이면 풀HP)
function getPlayerCurrentHp() {
  return Player.currentHp ?? getPlayerUIStats().maxHp;
}

// ── Player EXP & Level-up ─────────────────────────────────────────────────────
function playerGainExp(amount) {
  const msgs = [];
  Player.exp += amount;
  while (Player.exp >= Player.expToNext) {
    Player.exp -= Player.expToNext;
    Player.level++;
    Player.expToNext = calcExpToNext(Player.level);
    Player.statPoints += 4;
    // HP는 레벨업 시 자동 증가 없음 (스탯 포인트로만 성장)
    msgs.push(`[캐릭터] 레벨업! Lv.${Player.level} 달성 — 스탯 포인트 +4`);
  }
  return msgs;
}

// ── Stat Allocation ───────────────────────────────────────────────────────────
// HP +1 계수 → UI maxHp +4, ATK/DEF/SPD +1 계수 → UI 스탯 +1
function playerAllocateStat(stat, amount = 1) {
  const spend = Math.min(amount, Player.statPoints);
  if (spend <= 0) return false;
  const prevStats = getPlayerUIStats();
  switch (stat) {
    case 'hp':  Player.hp  += spend; break;
    case 'atk': Player.atk += spend; break;
    case 'def': Player.def += spend; break;
    case 'spd': Player.spd += spend; break;
    default: return false;
  }
  Player.statPoints -= spend;

  // HP를 올렸을 때 현재 HP도 동일하게 증가 (단, 새 maxHp 이하로 캡)
  const newStats = getPlayerUIStats();
  if (stat === 'hp') {
    const delta = newStats.maxHp - prevStats.maxHp;
    Player.currentHp = Math.min(getPlayerCurrentHp() + delta, newStats.maxHp);
  }
  return true;
}

// ── Pet Inventory Operations ───────────────────────────────────────────────────
function petSellPrice(pet) {
  return 50 + (pet.level || 1) * 10;
}

function addPetToInventory(pet) {
  if (Inventory.pets.length >= Inventory.maxPets) return false;
  Inventory.pets.push(pet);
  return true;
}

function removePetFromInventory(idx) {
  const pet = Inventory.pets[idx];
  // Block if it's the last party member
  if (G.party.includes(pet) && G.party.length <= 1) return false;
  // Remove from party if present
  G.party = G.party.filter(p => p !== pet);
  G.pet = G.party[0] || null;
  Inventory.pets.splice(idx, 1);
  return true;
}
