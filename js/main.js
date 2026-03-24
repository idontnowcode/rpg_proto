// ── Global State ──────────────────────────────────────────────────────────────
const G = {
  scene: 'login',
  currentUser: null,
  pet: null,      // lead pet = party[0]
  party: [],      // active party (max 3)
  map: null,
  playerRow: 0,
  playerCol: 0,
  battle: {
    active: false,
    waitingMonsterTurn: false,
    targetIdx: 0,
    monsters: [],
    playerHp: 0, playerMaxHp: 0,
    petsHp: [],  petsMaxHp: [],
  },
};

// ── Save / Load ───────────────────────────────────────────────────────────────
const SAVE_PREFIX = 'rpg_save_';

function saveGame() {
  if (!G.currentUser) return;
  const partyIndices = G.party.map(p => Inventory.pets.indexOf(p)).filter(i => i >= 0);
  const data = {
    player: { ...Player },
    inventory: {
      gold: Inventory.gold,
      maxPets: Inventory.maxPets,
      pets: Inventory.pets.map(p => ({ ...p })),
    },
    partyIndices: partyIndices.length > 0 ? partyIndices : [0],
    mapId: G.map ? G.map.id : 'town',
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(SAVE_PREFIX + G.currentUser, JSON.stringify(data));
}

function loadGame(username) {
  const raw = localStorage.getItem(SAVE_PREFIX + username);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    Object.assign(Player, data.player);
    Inventory.gold    = data.inventory.gold;
    Inventory.maxPets = data.inventory.maxPets;
    Inventory.pets    = data.inventory.pets;
    const idxs = data.partyIndices || [data.activePetIdx >= 0 ? data.activePetIdx : 0];
    G.party = idxs.map(i => Inventory.pets[i]).filter(Boolean);
    if (G.party.length === 0 && Inventory.pets.length > 0) G.party = [Inventory.pets[0]];
    G.pet = G.party[0] || Inventory.pets[0];
    G._loadedMapId = data.mapId || 'town';
    // 구 세이브 호환: initStats 없는 페트에 Lv1 스탯 근사값 복원
    Inventory.pets.forEach(pet => {
      if (!pet.initStats) pet.initStats = petInitStatsFromBase(pet);
    });
    return true;
  } catch (e) { return false; }
}

function getSaveList() {
  const saves = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(SAVE_PREFIX)) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        saves.push({ username: key.slice(SAVE_PREFIX.length), savedAt: data.savedAt,
          level: data.player.level, petName: data.inventory.pets[data.activePetIdx]?.name || '?' });
      } catch (_) {}
    }
  }
  saves.sort((a, b) => (b.savedAt || '').localeCompare(a.savedAt || ''));
  return saves;
}

// ── Login Scene ───────────────────────────────────────────────────────────────
function renderSaveSlots() {
  const el = document.getElementById('save-slots');
  const saves = getSaveList();
  if (saves.length === 0) { el.innerHTML = ''; return; }
  el.innerHTML = '<div class="save-list-title">저장된 계정</div>' +
    saves.map(s => {
      const date = s.savedAt ? s.savedAt.slice(0,10) : '';
      return `<div class="save-slot" onclick="document.getElementById('login-username').value='${s.username}'">` +
        `<span class="save-name">${s.username}</span>` +
        `<span class="save-info">Lv.${s.level} · ${s.petName} · ${date}</span>` +
        `<button class="save-delete" onclick="event.stopPropagation();deleteSave('${s.username}')">🗑</button>` +
        `</div>`;
    }).join('');
}

function deleteSave(username) {
  if (!confirm(`'${username}' 계정 데이터를 삭제하시겠습니까?`)) return;
  localStorage.removeItem(SAVE_PREFIX + username);
  renderSaveSlots();
}

function onLogin() {
  const username = document.getElementById('login-username').value.trim();
  if (!username) return;
  G.currentUser = username;

  if (loadGame(username)) {
    enterMap(G._loadedMapId || 'town');
    showScene('map');
    updateHUD();
    addMapLog(`${username}님, 환영합니다! (저장 데이터 로드)`);
  } else {
    showScene('title');   // new game — pick pet
  }
}

// ── Scene Management ──────────────────────────────────────────────────────────
function showScene(name) {
  G.scene = name;
  document.querySelectorAll('.scene').forEach(el => el.classList.remove('active'));
  document.getElementById(`scene-${name}`).classList.add('active');
  if (name === 'login') renderSaveSlots();
}

// ── Title: Pet Selection ───────────────────────────────────────────────────────
function selectPet(masterId) {
  const pet = createLevel1Pet(masterId);
  pet.currentHp = getUIStats(pet).hp;
  G.party = [pet];
  G.pet = pet;
  Inventory.pets = [pet];
  Player.currentHp = getPlayerUIStats().maxHp;   // init player HP on new game
  enterMap('town');
  showScene('map');
  updateHUD();
  saveGame();
  addMapLog(`${G.pet.name}과(와) 함께 모험을 시작했습니다!`);
}

// ── Map System ────────────────────────────────────────────────────────────────
function enterMap(mapId) {
  G.map = MAPS[mapId];
  G.playerRow = G.map.spawnRow;
  G.playerCol = G.map.spawnCol;
  if (mapId === 'town') {
    Player.currentHp = getPlayerUIStats().maxHp;
    G.party.forEach(p => { p.currentHp = getUIStats(p).hp; });
    G.pet = G.party[0] || G.pet;
  }
  renderMap();
}

function getMapTileSize(cols) {
  // Compute tile size so map always fits within viewport horizontally
  const available = window.innerWidth - 28; // body(4) + map-area border(4) + map-area padding(8) + margin(12)
  const dynamic = Math.floor(available / cols);
  return Math.min(36, Math.max(20, dynamic));
}

function renderMap() {
  const mapEl = document.getElementById('map-grid');
  const map = G.map;
  const tileSize = getMapTileSize(map.cols);
  mapEl.style.gridTemplateColumns = `repeat(${map.cols}, ${tileSize}px)`;
  mapEl.innerHTML = '';

  for (let r = 0; r < map.rows; r++) {
    for (let c = 0; c < map.cols; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.style.width  = tileSize + 'px';
      tile.style.height = tileSize + 'px';
      const t = map.tiles[r][c];
      if (t === 1) tile.classList.add('tile-wall');
      else if (t === 2) tile.classList.add('tile-portal');
      else tile.classList.add('tile-ground');

      if (r === G.playerRow && c === G.playerCol) {
        tile.classList.add('tile-player');
        tile.textContent = '🧑';
      } else if (t === 2) {
        tile.textContent = '🌀';
      }
      mapEl.appendChild(tile);
    }
  }

  const rangeText = G.map.levelRange
    ? ` (Lv ${G.map.levelRange[0]}-${G.map.levelRange[1]})`
    : '';
  document.getElementById('map-name').textContent = G.map.name + rangeText;
}

function tryMove(dr, dc) {
  if (G.battle.active || G.scene !== 'map') return;

  const newRow = G.playerRow + dr;
  const newCol = G.playerCol + dc;
  const map = G.map;

  if (newRow < 0 || newRow >= map.rows || newCol < 0 || newCol >= map.cols) return;
  if (map.tiles[newRow][newCol] === 1) return;

  G.playerRow = newRow;
  G.playerCol = newCol;

  const portal = map.portals.find(p => p.row === newRow && p.col === newCol);
  if (portal) {
    addMapLog(`🌀 ${MAPS[portal.toMap].name}(으)로 이동했습니다.`);
    enterMap(portal.toMap);
    G.playerRow = portal.spawnRow;
    G.playerCol = portal.spawnCol;
    renderMap();
    return;
  }

  renderMap();

  if (map.encounterRate > 0 && Math.random() < map.encounterRate) {
    startBattle();
  }
}

function addMapLog(msg) {
  const log = document.getElementById('map-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

// ── HUD ───────────────────────────────────────────────────────────────────────
function updateHUD() {
  // 출전 중인 파티 전원 표시
  const partyEl = document.getElementById('hud-party');
  partyEl.innerHTML = G.party.map(p => {
    const s   = getUIStats(p);
    const cur = p.currentHp !== undefined ? p.currentHp : s.hp;
    const ini = p.initStats || petInitStatsFromBase(p);
    let hpGr = '-', stGr = '-';
    if (p.level > 1 && ini) {
      const n = p.level - 1;
      hpGr = ((s.hp - ini.hp) / n).toFixed(1);
      stGr = (((s.atk + s.def + s.spd) - (ini.atk + ini.def + ini.spd)) / n).toFixed(1);
    }
    return `<div class="hud-row">
      <span class="hud-name">${p.emoji || '🐾'} ${p.name} Lv.${p.level} <span class="grade-badge grade-${p.grade||'B'}">${p.grade||'B'}</span></span>
      <span class="hud-hp">HP ${cur}/${s.hp}</span>
      <span class="hud-atk">ATK ${s.atk}</span>
      <span class="hud-def">DEF ${s.def}</span>
      <span class="hud-spd">SPD ${s.spd}</span>
      <span class="hud-exp">EXP ${p.exp}/${p.expToNext}</span>
    </div>
    <div class="hud-row hud-growth-row">
      <span class="hud-growth">HP 성장률: ${hpGr} | 성장률: ${stGr}</span>
    </div>`;
  }).join('');

  const pStats = getPlayerUIStats();
  document.getElementById('hud-player-name').textContent = `🧑 캐릭터 Lv.${Player.level}`;
  document.getElementById('hud-player-hp').textContent   = `HP ${getPlayerCurrentHp()}/${pStats.maxHp}`;
  document.getElementById('hud-player-atk').textContent  = `ATK ${pStats.atk}`;
  document.getElementById('hud-player-def').textContent  = `DEF ${pStats.def}`;
  document.getElementById('hud-player-spd').textContent  = `SPD ${pStats.spd}`;
  document.getElementById('hud-player-exp').textContent  = `EXP ${Player.exp}/${Player.expToNext}`;

  document.getElementById('hud-gold').textContent      = `💰 ${Inventory.gold}G`;
  document.getElementById('hud-pet-count').textContent = `${Inventory.pets.length}/${Inventory.maxPets}`;

  const spBtn = document.getElementById('hud-sp');
  spBtn.textContent = `SP: ${Player.statPoints}`;
  spBtn.classList.toggle('sp-available', Player.statPoints > 0);

  // Sync open panels
  if (document.getElementById('side-stat').classList.contains('open')) updateCharStatPanel();
}

// ── Side Panel System ─────────────────────────────────────────────────────────
function openPanel(side) {
  closeAllPanels();
  document.getElementById(`side-${side}`).classList.add('open');
  document.getElementById('panel-backdrop').style.display = 'block';
  if (side === 'stat') updateCharStatPanel();
  if (side === 'pet')  renderPetPanel();
}
function closePanels() {
  closeAllPanels();
}
function closeAllPanels() {
  document.querySelectorAll('.side-panel').forEach(p => p.classList.remove('open'));
  document.getElementById('panel-backdrop').style.display = 'none';
}
function togglePanel(side) {
  const panel = document.getElementById(`side-${side}`);
  if (panel.classList.contains('open')) { closeAllPanels(); }
  else { openPanel(side); }
}

// ── Character Stat Panel ───────────────────────────────────────────────────────
function updateCharStatPanel() {
  const pStats = getPlayerUIStats();
  document.getElementById('cs-level').textContent = `Lv. ${Player.level}`;
  document.getElementById('cs-hp').textContent    = `${getPlayerCurrentHp()} / ${pStats.maxHp}`;
  document.getElementById('cs-atk').textContent   = pStats.atk;
  document.getElementById('cs-def').textContent   = pStats.def;
  document.getElementById('cs-spd').textContent   = pStats.spd;
  document.getElementById('cs-exp').textContent   = `${Player.exp} / ${Player.expToNext}`;

  const spSection = document.getElementById('stat-alloc-section');
  const spCount   = document.getElementById('sp-remaining');
  spSection.style.display = Player.statPoints > 0 ? 'flex' : 'none';
  if (spCount) spCount.textContent = Player.statPoints;

  const spBtn = document.getElementById('hud-sp');
  if (spBtn) {
    spBtn.textContent = `SP: ${Player.statPoints}`;
    spBtn.classList.toggle('sp-available', Player.statPoints > 0);
  }
}

function allocateStat(stat, amount = 1) {
  if (playerAllocateStat(stat, amount)) {
    updateHUD();
    updateCharStatPanel();
    saveGame();
    if (Player.statPoints <= 0) {
      document.getElementById('stat-alloc-section').style.display = 'none';
    }
  }
}

// ── Pet Inventory Panel ───────────────────────────────────────────────────────
function renderPetPanel() {
  const list = document.getElementById('pet-list');
  list.innerHTML = '';

  Inventory.pets.forEach((pet, idx) => {
    const stats    = getUIStats(pet);
    const partyPos = G.party.indexOf(pet); // -1 if not in party
    const inParty  = partyPos >= 0;
    const price    = petSellPrice(pet);

    // 성장률 계산
    const initSt = pet.initStats || petInitStatsFromBase(pet);
    let hpGrowthStr = '-', statGrowthStr = '-';
    if (pet.level > 1 && initSt) {
      const n = pet.level - 1;
      hpGrowthStr   = ((stats.hp - initSt.hp) / n).toFixed(1);
      statGrowthStr = (((stats.atk + stats.def + stats.spd)
                      - (initSt.atk + initSt.def + initSt.spd)) / n).toFixed(1);
    }

    const div = document.createElement('div');
    div.className = `pet-item${inParty ? ' active-pet' : ''}`;
    div.innerHTML = `
      <div class="pet-item-info">
        <strong>${pet.emoji || '🐾'} ${pet.name} Lv.${pet.level}</strong>
        <div class="pet-item-badges">
          <span class="grade-badge grade-${pet.grade||'B'}">${pet.grade||'B'}</span>
          <span class="rarity-badge rarity-${(pet.rarity||'일반').replace(/[^a-zA-Z가-힣]/g,'')}">${pet.rarity||'일반'}</span>
          ${inParty ? `<span class="tag-active">파티 ${partyPos+1}번</span>` : ''}
        </div>
        <span>HP ${stats.hp} | ATK ${stats.atk} | DEF ${stats.def} | SPD ${stats.spd}</span>
        <span class="pet-growth">HP 성장률: ${hpGrowthStr} | 성장률: ${statGrowthStr}</span>
      </div>
      <div class="pet-item-actions">
        ${!inParty && G.party.length < 3
          ? `<button onclick="addToParty(${idx})">➕ 파티</button>` : ''}
        ${inParty && G.party.length > 1
          ? `<button onclick="removeFromParty(${idx})">➖ 파티</button>` : ''}
        ${!inParty ? `<button onclick="doSellPet(${idx})">💰 ${price}G</button>` : ''}
        ${!inParty ? `<button onclick="doReleasePet(${idx})">방생</button>` : ''}
      </div>
    `;
    list.appendChild(div);
  });

  document.getElementById('pet-panel-title').textContent =
    `페트 목록 (${Inventory.pets.length}/${Inventory.maxPets}) | 파티 ${G.party.length}/3`;
}

function addToParty(idx) {
  const pet = Inventory.pets[idx];
  if (!pet || G.party.includes(pet) || G.party.length >= 3) return;
  G.party.push(pet);
  G.pet = G.party[0];
  updateHUD();
  renderPetPanel();
  saveGame();
  addMapLog(`${pet.name}을(를) 파티에 추가했습니다. (${G.party.length}/3)`);
}

function removeFromParty(idx) {
  const pet = Inventory.pets[idx];
  if (!pet || G.party.length <= 1) return;
  G.party = G.party.filter(p => p !== pet);
  G.pet = G.party[0];
  updateHUD();
  renderPetPanel();
  saveGame();
  addMapLog(`${pet.name}을(를) 파티에서 제외했습니다.`);
}
function doSellPet(idx) {
  const pet = Inventory.pets[idx];
  const price = petSellPrice(pet);
  if (!removePetFromInventory(idx)) return;
  Inventory.gold += price;
  updateHUD();
  renderPetPanel();
  saveGame();
  addMapLog(`${pet.name} 판매. +${price}G`);
}
function doReleasePet(idx) {
  const pet = Inventory.pets[idx];
  if (!removePetFromInventory(idx)) return;
  renderPetPanel();
  saveGame();
  addMapLog(`${pet.name}을(를) 방생했습니다.`);
}

// ── Battle: Start ─────────────────────────────────────────────────────────────
function startBattle() {
  const count = randInt(1, 3);
  const monsters = [];

  const map = G.map;
  if (map.capturePool && map.capturePool.length > 0) {
    const cm = getCapturableBattleMonster(map.id);
    if (cm) {
      monsters.push(cm);
      addMapLog(`✨ Lv.1 ${cm.name} 출현! 포획 가능!`);
    }
  }

  while (monsters.length < count) {
    const m = getScaledMonster(map.id);
    if (m) monsters.push(m);
  }

  // Safety: any Lv.1 monster with a known petId becomes capturable
  monsters.forEach(m => {
    if (m.level === 1 && !m.capturable) {
      const base = MONSTERS[m.id];
      if (base && base.petId) {
        m.capturable = true;
        m.petId = base.petId;
      }
    }
  });

  const pStats = getPlayerUIStats();
  G.battle = {
    active: true,
    waitingMonsterTurn: false,
    targetIdx: 0,
    monsters,
    playerHp:    getPlayerCurrentHp(),
    playerMaxHp: pStats.maxHp,
    petsHp:    G.party.map(p => p.currentHp !== undefined ? p.currentHp : getUIStats(p).hp),
    petsMaxHp: G.party.map(p => getUIStats(p).hp),
  };

  closeAllPanels();
  showScene('battle');
  renderBattle();
  const names = monsters
    .map(m => `${m.emoji}${m.capturable ? '✨' : ''} Lv.${m.level} ${m.name}`)
    .join(', ');
  addBattleLog(`⚔️ ${names}이(가) 출현했다!`);
  if (monsters.length > 1) addBattleLog('👆 페트 카드를 클릭해 공격 대상을 선택하세요.');
}

// ── Battle: Target Selection ───────────────────────────────────────────────────
function setTarget(idx) {
  const b = G.battle;
  if (!b.active || b.waitingMonsterTurn) return;
  if (b.monsters[idx] && b.monsters[idx].currentHp > 0) {
    b.targetIdx = idx;
    renderBattle();
  }
}

// ── Battle: Render ────────────────────────────────────────────────────────────
// ── Rarity → portrait CSS class ─────────────────────────────────────────────
function rarityPortraitClass(rarity) {
  const map = { '일반':'common', '희귀':'rare', '전설':'legend', '신화':'myth', '레어':'epic' };
  return map[rarity] || 'common';
}
function monsterRarityLabel(m) {
  if (m.petId && typeof PET_MASTER !== 'undefined' && PET_MASTER[m.petId]) {
    return PET_MASTER[m.petId].rarity || '일반';
  }
  // tier-based fallback by exp
  if (m.exp >= 150) return '전설';
  if (m.exp >= 80)  return '희귀';
  return '일반';
}

// ── Flash hit animation ───────────────────────────────────────────────────────
function flashHit(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.classList.remove('hit-flash');
  void el.offsetWidth; // reflow to restart animation
  el.classList.add('hit-flash');
  setTimeout(() => el.classList.remove('hit-flash'), 350);
}

function renderBattle() {
  const b = G.battle;

  // ── Enemy cards
  const enemiesEl = document.getElementById('battle-enemies');
  enemiesEl.innerHTML = '';
  b.monsters.forEach((m, idx) => {
    const pct      = Math.max(0, m.currentHp / m.hp * 100);
    const isTarget = idx === b.targetIdx && m.currentHp > 0;
    const rarity   = monsterRarityLabel(m);
    const porCls   = rarityPortraitClass(rarity);
    const card     = document.createElement('div');

    card.id = `enemy-card-${idx}`;
    card.className = [
      'combatant', 'enemy-card',
      m.currentHp <= 0 ? 'defeated' : '',
      m.capturable      ? 'capturable' : '',
      isTarget          ? 'targeted'   : '',
    ].filter(Boolean).join(' ');

    const mMaster   = m.petId ? PET_MASTER[m.petId] : null;
    const mPortrait = mMaster?.img
      ? `<img src="${mMaster.img}" class="battle-sprite" alt="${m.name}">`
      : `<div class="portrait-emoji">${m.emoji}</div>`;
    card.innerHTML = `
      <div class="portrait-area portrait-${porCls}">
        ${mPortrait}
        <div class="portrait-lv">Lv.${m.level}</div>
        <div class="portrait-rarity rarity-${rarity}">${rarity}</div>
        ${m.capturable ? '<div class="portrait-capturable">✨</div>' : ''}
      </div>
      <div class="card-body">
        <div class="combatant-name">${m.name}</div>
        <div class="hp-bar-bg"><div class="hp-bar monster-bar" style="width:${pct}%"></div></div>
        <div class="combatant-hp">${Math.max(0, m.currentHp)} / ${m.hp}</div>
        ${isTarget ? '<div class="target-indicator">▼ 대상</div>' : ''}
      </div>
    `;
    if (m.currentHp > 0) card.addEventListener('click', () => setTarget(idx));
    enemiesEl.appendChild(card);
  });

  // ── Allies (player + party)
  const playerPct = b.playerMaxHp > 0 ? Math.max(0, b.playerHp / b.playerMaxHp * 100) : 0;
  const alliesEl  = document.getElementById('battle-allies');
  alliesEl.innerHTML = `
    <div class="combatant${b.playerHp <= 0 ? ' defeated' : ''}" id="ally-player">
      <div class="portrait-area portrait-player">
        <div class="portrait-emoji">🧑</div>
        <div class="portrait-lv">Lv.${Player.level}</div>
      </div>
      <div class="card-body">
        <div class="combatant-name">캐릭터</div>
        <div class="hp-bar-bg"><div class="hp-bar player-bar" style="width:${playerPct}%"></div></div>
        <div class="combatant-hp">HP ${Math.max(0,b.playerHp)} / ${b.playerMaxHp}</div>
      </div>
    </div>
    ${G.party.map((p, pi) => {
      const pct    = b.petsMaxHp[pi] > 0 ? Math.max(0, b.petsHp[pi] / b.petsMaxHp[pi] * 100) : 0;
      const rarity = p.master?.rarity || '일반';
      const porCls = rarityPortraitClass(rarity);
      const petImg     = p.master?.img;
      const petPortrait = petImg
        ? `<img src="${petImg}" class="battle-sprite" alt="${p.name}">`
        : `<div class="portrait-emoji">${p.emoji||'🐾'}</div>`;
      return `<div class="combatant${b.petsHp[pi] <= 0 ? ' defeated' : ''}" id="ally-pet-${pi}">
        <div class="portrait-area portrait-pet portrait-${porCls}">
          ${petPortrait}
          <div class="portrait-lv">Lv.${p.level}</div>
          <div class="portrait-rarity rarity-${rarity}">${p.grade||'B'}급</div>
        </div>
        <div class="card-body">
          <div class="combatant-name">${p.name}</div>
          <div class="hp-bar-bg"><div class="hp-bar player-bar-pet" style="width:${pct}%"></div></div>
          <div class="combatant-hp">HP ${Math.max(0,b.petsHp[pi])} / ${b.petsMaxHp[pi]}</div>
        </div>
      </div>`;
    }).join('')}
  `;

  // ── Capture button state
  updateCaptureBtn();
}

function updateCaptureBtn() {
  const b      = G.battle;
  const btn    = document.getElementById('btn-capture');
  const target = b.monsters[b.targetIdx];
  const rate   = Math.min(95, Player.level * 5);

  if (target && target.capturable && target.currentHp > 0) {
    btn.disabled = false;
    btn.classList.remove('btn-disabled');
    btn.textContent = `🎯 포획 (${rate}%)`;
  } else {
    btn.disabled = false;
    btn.classList.add('btn-disabled');
    btn.textContent = '🎯 포획';
  }
}

function addBattleLog(msg) {
  const log = document.getElementById('battle-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

// ── Battle: Turn Order (SPD 기반) ─────────────────────────────────────────────
function calcTurnOrder(b) {
  const units = [];
  if (b.playerHp > 0)
    units.push({ type: 'player', name: '캐릭터', roll: rollSpeed(getPlayerUIStats().spd) });
  G.party.forEach((p, pi) => {
    if (b.petsHp[pi] > 0)
      units.push({ type: 'pet', petIdx: pi, name: p.name, roll: rollSpeed(getUIStats(p).spd) });
  });
  b.monsters.forEach((m, mIdx) => {
    if (m.currentHp > 0)
      units.push({ type: 'monster', mIdx, name: m.name, roll: rollSpeed(m.spd) });
  });
  units.sort((a, x) => x.roll - a.roll);
  return units;
}

function executeTurns(order, idx) {
  const b = G.battle;
  if (!b.active) return;

  if (idx >= order.length) {
    b.waitingMonsterTurn = false;
    const allPetsDead = b.petsHp.every(hp => hp <= 0);
    if (b.playerHp <= 0 && allPetsDead) { renderBattle(); endBattle(false); return; }
    if (b.playerHp <= 0) { renderBattle(); endBattle(false); return; }
    renderBattle();
    return;
  }

  const unit = order[idx];

  if (unit.type === 'player' && b.playerHp > 0) {
    let target = b.monsters[b.targetIdx];
    if (!target || target.currentHp <= 0) {
      target = b.monsters.find(m => m.currentHp > 0);
      if (target) b.targetIdx = b.monsters.indexOf(target);
    }
    if (target) {
      const dmg = calcDamage(getPlayerUIStats().atk, target.def);
      target.currentHp = Math.max(0, target.currentHp - dmg);
      addBattleLog(`💥 캐릭터 → ${target.name} ${dmg} 데미지!`);
      flashHit(`enemy-card-${b.targetIdx}`);
    }

  } else if (unit.type === 'pet') {
    const pi = unit.petIdx;
    const p  = G.party[pi];
    if (p && b.petsHp[pi] > 0) {
      const alive = b.monsters.filter(m => m.currentHp > 0);
      if (alive.length > 0) {
        const playerTarget = b.monsters[b.targetIdx];
        const petTarget = alive.find(m => m !== playerTarget) || alive[0];
        const dmg = calcDamage(getUIStats(p).atk, petTarget.def);
        petTarget.currentHp = Math.max(0, petTarget.currentHp - dmg);
        addBattleLog(`💥 ${p.name} → ${petTarget.name} ${dmg} 데미지!`);
        flashHit(`enemy-card-${b.monsters.indexOf(petTarget)}`);
      }
    }

  } else if (unit.type === 'monster') {
    const m = b.monsters[unit.mIdx];
    if (m && m.currentHp > 0) {
      // Monster picks random alive ally
      const alivePartyIdxs = G.party.map((_, pi) => pi).filter(pi => b.petsHp[pi] > 0);
      const validTargets = [];
      if (b.playerHp > 0) validTargets.push({ type: 'player' });
      alivePartyIdxs.forEach(pi => validTargets.push({ type: 'pet', pi }));

      const tgt = validTargets.length > 0
        ? validTargets[randInt(0, validTargets.length - 1)]
        : { type: 'player' };

      if (tgt.type === 'player') {
        const dmg = calcDamage(m.atk, getPlayerUIStats().def);
        b.playerHp = Math.max(0, b.playerHp - dmg);
        addBattleLog(`💢 ${m.name} → 캐릭터 ${dmg} 데미지!`);
        flashHit('ally-player');
      } else {
        const pi  = tgt.pi;
        const pp  = G.party[pi];
        const dmg = calcDamage(m.atk, getUIStats(pp).def);
        b.petsHp[pi] = Math.max(0, b.petsHp[pi] - dmg);
        addBattleLog(`💢 ${m.name} → ${pp.name} ${dmg} 데미지!`);
        flashHit(`ally-pet-${pi}`);
        if (b.petsHp[pi] <= 0) addBattleLog(`💀 ${pp.name} 쓰러짐!`);
      }
    }
  }

  // Check end conditions after each action
  if (b.monsters.every(m => m.currentHp <= 0)) { renderBattle(); endBattle(true); return; }
  if (b.playerHp <= 0 && b.petsHp.every(hp => hp <= 0)) { renderBattle(); endBattle(false); return; }

  // Auto-advance target if dead
  if (b.monsters[b.targetIdx] && b.monsters[b.targetIdx].currentHp <= 0) {
    const next = b.monsters.findIndex(m => m.currentHp > 0);
    if (next >= 0) b.targetIdx = next;
  }

  renderBattle();
  setTimeout(() => executeTurns(order, idx + 1), 400);
}

// ── Battle: Attack ────────────────────────────────────────────────────────────
function onAttack() {
  if (!G.battle.active || G.battle.waitingMonsterTurn) return;
  const b = G.battle;
  const order = calcTurnOrder(b);
  addBattleLog(`⚡ 행동 순서: ${order.map(u => `${u.name}(${u.roll})`).join(' → ')}`);
  b.waitingMonsterTurn = true;
  executeTurns(order, 0);
}

// ── Battle: Capture ───────────────────────────────────────────────────────────
function onCapture() {
  if (!G.battle.active || G.battle.waitingMonsterTurn) return;

  const b      = G.battle;
  const target = b.monsters[b.targetIdx];

  if (!target || target.currentHp <= 0) {
    addBattleLog('대상이 이미 쓰러졌습니다.'); return;
  }
  if (!target.capturable) {
    addBattleLog(`❌ ${target.name}은(는) 포획할 수 없습니다.`); return;
  }

  const successRate = Math.min(0.95, Player.level * 0.05);
  addBattleLog(`🎯 포획 시도! (성공률 ${Math.floor(successRate * 100)}%)`);

  if (Math.random() < successRate) {
    target.currentHp = 0;
    addBattleLog(`✨ ${target.name} 포획 성공!`);

    if (Inventory.pets.length < Inventory.maxPets) {
      const newPet = captureMonsterAsPet(target);
      if (!newPet) { addBattleLog('포획 처리 오류'); return; }
      addPetToInventory(newPet);
      addBattleLog(`📦 인벤토리 추가 (${Inventory.pets.length}/${Inventory.maxPets})`);
    } else {
      addBattleLog(`❌ 인벤토리 가득 참 — 페트를 판매하거나 방생하세요.`);
    }

    if (b.monsters.every(m => m.currentHp <= 0)) {
      renderBattle();
      endBattle(true);
      return;
    }
    // Auto-select next alive target
    const next = b.monsters.findIndex(m => m.currentHp > 0);
    if (next >= 0) b.targetIdx = next;
  } else {
    addBattleLog(`❌ 포획 실패! ${target.name}이(가) 반격!`);
    const dmg = calcDamage(target.atk, getPlayerUIStats().def);
    b.playerHp = Math.max(0, b.playerHp - dmg);
    addBattleLog(`💢 ${target.name} → 캐릭터 ${dmg} 데미지!`);
    if (b.playerHp <= 0 && b.petsHp.every(hp => hp <= 0)) {
      renderBattle();
      endBattle(false);
      return;
    }
  }

  renderBattle();
}

// ── Battle: Run ───────────────────────────────────────────────────────────────
function onRun() {
  if (!G.battle.active) return;
  addBattleLog('🏃 도망쳤다!');
  G.battle.active = false;
  setTimeout(() => { showScene('map'); renderMap(); }, 800);
}

// ── Battle: End ───────────────────────────────────────────────────────────────
function endBattle(won) {
  G.battle.active = false;

  if (won) {
    const totalExp = G.battle.monsters.reduce((sum, m) => sum + (m.exp || 0), 0);
    addBattleLog(`✨ 전투 승리! EXP +${totalExp}`);

    const prevPlayerLv = Player.level;
    const prevPetLvs   = G.party.map(p => p.level);

    const playerMsgs = playerGainExp(totalExp);
    playerMsgs.forEach(m => addBattleLog(`🆙 ${m}`));

    G.party.forEach(p => {
      const msgs = gainExp(p, totalExp);
      msgs.forEach(m => addBattleLog(`🆙 ${p.name} ${m}`));
    });

    Player.currentHp = G.battle.playerHp;
    G.party.forEach((p, pi) => { p.currentHp = G.battle.petsHp[pi]; });

    // 레벨업 시 HP 완전 회복
    if (Player.level > prevPlayerLv) {
      Player.currentHp = getPlayerUIStats().maxHp;
      addBattleLog(`💚 캐릭터 레벨업! HP 완전 회복`);
    }
    G.party.forEach((p, pi) => {
      if (p.level > prevPetLvs[pi]) {
        p.currentHp = getUIStats(p).hp;
        addBattleLog(`💚 ${p.name} 레벨업! HP 완전 회복`);
      }
    });
    updateHUD();
    saveGame();

    setTimeout(() => {
      showScene('map');
      renderMap();
      addMapLog(`전투 승리! EXP +${totalExp}`);
      if (Player.statPoints > 0)
        addMapLog(`💡 스탯 포인트 ${Player.statPoints}pt — 좌측 스탯창에서 배분하세요`);
    }, 1800);
  } else {
    addBattleLog('💀 패배... 마을로 귀환합니다.');
    Player.currentHp = getPlayerUIStats().maxHp;
    setTimeout(() => {
      enterMap('town');
      showScene('map');
      renderMap();
      updateHUD();
      addMapLog('마을로 귀환. 체력이 회복됐습니다.');
    }, 1800);
  }
}

// ── Pet Compendium ────────────────────────────────────────────────────────────
let _compTab = 'starter';

function toggleCompendium() {
  const ov = document.getElementById('compendium-overlay');
  const open = ov.style.display === 'none';
  ov.style.display = open ? 'flex' : 'none';
  if (open) renderCompendium(_compTab);
}

function switchCompTab(tab) {
  _compTab = tab;
  document.querySelectorAll('.comp-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  renderCompendium(tab);
}

function renderCompendium(tab) {
  const el = document.getElementById('comp-content');
  const ownedIds = new Set(Inventory.pets.map(p => p.petId));
  const rarityColor = { '일반':'#aaa', '희귀':'#66aaff', '레어':'#f0c060', '전설':'#ff6688', '신화':'#dd88ff' };

  if (tab === 'starter') {
    el.innerHTML = Object.values(PET_MASTER)
      .filter(m => m.habitat === '초기 선택')
      .map(m => compCard(m.petId, m.emoji, m.name, m.type, m.rarity, m.habitat, m.desc, ownedIds.has(m.petId), rarityColor, m.img))
      .join('');
  } else {
    el.innerHTML = COMPENDIUM_WILD.map(w => {
      const owned  = w.petId && ownedIds.has(w.petId);
      const master = w.petId ? PET_MASTER[w.petId] : null;
      return compCard(w.petId, w.emoji, w.name, w.id, w.rarity, w.habitat, w.desc, owned, rarityColor, master?.img);
    }).join('');
  }
}

function compCard(petId, emoji, name, type, rarity, habitat, desc, owned, rarityColor, img) {
  const rarCls   = rarityPortraitClass(rarity);
  const portrait = img
    ? `<img src="${img}" class="comp-sprite" alt="${name}">`
    : `<div class="comp-portrait portrait-${rarCls}"><div class="portrait-emoji">${emoji}</div></div>`;
  const ownBadge = owned ? `<span class="comp-badge comp-owned">✅ 보유 중</span>` : '';
  const lvBadge  = petId ? `<span class="comp-badge comp-cap">🎯 Lv.1 포획</span>` : '';
  return `<div class="comp-card">
    ${portrait}
    <div class="comp-info">
      <div class="comp-name" style="color:${rarityColor[rarity]||'#aaa'}">${name} <span class="comp-rarity">[${rarity}]</span></div>
      <div class="comp-type">${type} · ${habitat}</div>
      <div class="comp-desc">${desc}</div>
      <div class="comp-badges">${lvBadge}${ownBadge}</div>
    </div>
  </div>`;
}

// ── Developer Mode ────────────────────────────────────────────────────────────
const DEV = { forceLv1: false };

function toggleDevPanel() {
  const panel = document.getElementById('dev-panel');
  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
}

function devToggleForceLv1() {
  DEV.forceLv1 = !DEV.forceLv1;
  const btn = document.getElementById('dev-lv1-btn');
  btn.textContent = `Lv.1 확률 50%: ${DEV.forceLv1 ? 'ON' : 'OFF'}`;
  btn.style.background = DEV.forceLv1 ? '#334433' : '';
  addMapLog(`🔧 DEV: Lv.1 강제 50% ${DEV.forceLv1 ? 'ON' : 'OFF'}`);
}

function devGoto(mapId) {
  if (G.scene !== 'map' || G.battle.active) return;
  enterMap(mapId);
  addMapLog(`🔧 DEV: ${MAPS[mapId].name}으로 이동`);
  document.getElementById('dev-panel').style.display = 'none';
  updateHUD();
}

function devLevelUpPlayer() {
  Player.level++;
  Player.expToNext = calcExpToNext(Player.level);
  Player.exp = 0;
  Player.statPoints += 4;
  Player.currentHp = getPlayerUIStats().maxHp;
  updateHUD();
  saveGame();
  addMapLog(`🔧 DEV: 캐릭터 → Lv.${Player.level} (SP +4)`);
}

function devLevelUpAllPets() {
  G.party.forEach(p => {
    levelUp(p);
    p.currentHp = getUIStats(p).hp;
    p.expToNext = calcExpToNext(p.level);
    p.exp = 0;
  });
  updateHUD();
  if (document.getElementById('side-pet').classList.contains('open')) renderPetPanel();
  saveGame();
  addMapLog(`🔧 DEV: 파티 페트 전원 레벨업 → ${G.party.map(p => `${p.name} Lv.${p.level}`).join(', ')}`);
}

// ── Keyboard Input ────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (G.scene === 'login' && e.key === 'Enter') { onLogin(); return; }
  if (G.scene !== 'map') return;
  const keyMap = {
    ArrowUp: [-1,0], w: [-1,0],
    ArrowDown: [1,0], s: [1,0],
    ArrowLeft: [0,-1], a: [0,-1],
    ArrowRight: [0,1], d: [0,1],
  };
  const dir = keyMap[e.key];
  if (dir) { e.preventDefault(); tryMove(dir[0], dir[1]); }
});

// ── Init ─────────────────────────────────────────────────────────────────────
renderSaveSlots();
