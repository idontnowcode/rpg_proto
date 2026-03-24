const PET_MASTER = {
  // ── 초기 선택 페트 ─────────────────────────────────────────────────────────
  // initStatCoeff: Lv.1 내부 계수 스케일 (절반으로 감소)
  // growStats: 레벨업 당 내부 계수 증가치 (center값, var=분산)
  //   → UI HP += hp*4+atk+def+spd, UI ATK ≈ atk, UI DEF ≈ def, UI SPD = spd
  94: {
    petId: 94,
    name: '이그니스', emoji: '🔥', type: 'ATK 특화',
    rarity: '레어', habitat: '초기 선택',
    img: 'images/pets/94.svg',
    initStatCoeff: 13,
    hpCoeff: 24, atkCoeff: 38, defCoeff: 16, spdCoeff: 20,
    // 레벨업 UI 목표: HP+9, ATK+2.2, DEF+1.1, SPD+1.7 / 합계 ATK+DEF+SPD≈5.0
    growStats: { hp: 1.14, atk: 2.0, def: 0.75, spd: 1.7, var: 0.5 },
    desc: '화염형. 붉은 젤리 몸체에 주황-노란 화염 문양이 흐르는 소형 생명체. 눈은 두 개의 빛나는 불꽃점이다.',
  },
  12: {
    petId: 12,
    name: '아쿠론', emoji: '💧', type: 'HP/DEF형',
    rarity: '레어', habitat: '초기 선택',
    img: 'images/pets/12.svg',
    initStatCoeff: 15,
    hpCoeff: 30, atkCoeff: 28, defCoeff: 24, spdCoeff: 16,
    // 레벨업 UI 목표: HP+13, ATK+1.5, DEF+2.4, SPD+1.4 / 합계≈5.3
    growStats: { hp: 2.14, atk: 1.0, def: 2.05, spd: 1.4, var: 0.5 },
    desc: '수룡형. 짙은 청남색 비늘로 뒤덮인 소형 수룡. 등지느러미와 꼬리 끝에 청록 빛이 맥동한다.',
  },
  7: {
    petId: 7,
    name: '볼팡', emoji: '⚡', type: 'SPD 특화',
    rarity: '레어', habitat: '초기 선택',
    img: 'images/pets/7.svg',
    initStatCoeff: 11,
    hpCoeff: 20, atkCoeff: 35, defCoeff: 12, spdCoeff: 30,
    // 레벨업 UI 목표: HP+8, ATK+2.0, DEF+1.4, SPD+1.7 / 합계≈5.1
    growStats: { hp: 0.88, atk: 1.75, def: 1.05, spd: 1.7, var: 0.5 },
    desc: '전격 늑대형. 회백색 털에 황금 번개 줄무늬가 새겨진 날렵한 늑대. 발톱 주위로 정전기 불꽃이 튄다.',
  },

  // ── 야생 포획 (일반 조우) ──────────────────────────────────────────────────
  101: {
    petId: 101,
    name: '크리퍼', emoji: '🐀', type: 'SPD형',
    rarity: '일반', habitat: '초보 던전',
    baseSpecies: 'rat',
    img: 'images/pets/101.svg',
    initStatCoeff: 9,
    hpCoeff: 15, atkCoeff: 22, defCoeff: 10, spdCoeff: 28,
    // 레벨업 UI 목표: HP+8, ATK+1.5, DEF+0.8, SPD+1.7 / 합계≈4.0
    growStats: { hp: 1.0, atk: 1.5, def: 0.8, spd: 1.7, var: 0.4 },
    desc: '쥐형. 회갈색 털에 긴 꼬리를 가진 소형 마물. 붉은 눈과 뾰족한 귀가 특징이다.',
  },
  102: {
    petId: 102,
    name: '쉐이드', emoji: '🦇', type: 'SPD/ATK',
    rarity: '일반', habitat: '초보 던전',
    baseSpecies: 'bat',
    img: 'images/pets/102.svg',
    initStatCoeff: 10,
    hpCoeff: 16, atkCoeff: 26, defCoeff: 12, spdCoeff: 26,
    // 레벨업 UI 목표: HP+8, ATK+1.7, DEF+0.6, SPD+1.7 / 합계≈4.0
    growStats: { hp: 1.0, atk: 1.7, def: 0.6, spd: 1.7, var: 0.4 },
    desc: '박쥐형. 짙은 회자색 날개막과 날카로운 송곳니를 가진 소형 박쥐 마물. 귀 안쪽이 분홍빛이다.',
  },

  // ── 포획 전용 페트 (capturePool) ──────────────────────────────────────────
  201: {
    petId: 201,
    name: '글로비', emoji: '🟢', type: '균형형',
    rarity: '일반', habitat: '초보 던전',
    baseSpecies: 'slime',
    img: 'images/pets/201.svg',
    initStatCoeff: 10,
    hpCoeff: 22, atkCoeff: 18, defCoeff: 18, spdCoeff: 14,
    // 레벨업 UI 목표: HP+10, ATK+1.7, DEF+1.7, SPD+1.4 / 합계≈4.8
    growStats: { hp: 1.35, atk: 1.4, def: 1.4, spd: 1.4, var: 0.4 },
    desc: '슬라임형. 밝은 녹색 반투명 젤리 구체. 눈 두 개가 구체 중앙에 있으며 표면이 물결치듯 일렁인다.',
  },
  202: {
    petId: 202,
    name: '네카', emoji: '🧚', type: 'SPD/ATK',
    rarity: '희귀', habitat: '어두운 숲',
    baseSpecies: 'fairy',
    img: 'images/pets/202.svg',
    initStatCoeff: 11,
    hpCoeff: 15, atkCoeff: 30, defCoeff: 10, spdCoeff: 28,
    // 레벨업 UI 목표: HP+8.4, ATK+2.1, DEF+0.9, SPD+1.7 / 합계≈4.7
    growStats: { hp: 1.0, atk: 1.9, def: 0.8, spd: 1.7, var: 0.4 },
    desc: '요정형. 보랏빛 반투명 날개와 에메랄드 녹색 피부를 가진 소형 정령. 손끝에서 독색 빛 입자가 흩날린다.',
  },
  203: {
    petId: 203,
    name: '그리블', emoji: '👺', type: '균형형',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'goblin',
    img: 'images/pets/203.svg',
    initStatCoeff: 12,
    hpCoeff: 24, atkCoeff: 28, defCoeff: 20, spdCoeff: 16,
    // 레벨업 UI 목표: HP+10, ATK+1.7, DEF+1.8, SPD+1.3 / 합계≈4.8
    growStats: { hp: 1.35, atk: 1.4, def: 1.55, spd: 1.3, var: 0.4 },
    desc: '고블린형. 황록색 피부와 커다란 노란 눈을 가진 소형 마물. 머리에 뿔이 두 개 있고 가죽 조각을 걸치고 있다.',
  },
  204: {
    petId: 204,
    name: '루파르', emoji: '🐺', type: 'ATK/SPD',
    rarity: '희귀', habitat: '암흑성',
    baseSpecies: 'werewolf',
    img: 'images/pets/204.svg',
    initStatCoeff: 13,
    hpCoeff: 20, atkCoeff: 38, defCoeff: 14, spdCoeff: 26,
    // 레벨업 UI 목표: HP+9, ATK+2.2, DEF+1.0, SPD+1.7 / 합계≈4.9
    growStats: { hp: 1.0, atk: 1.95, def: 0.8, spd: 1.7, var: 0.45 },
    desc: '반수인형. 짙은 회흑색 털과 붉은 눈을 가진 직립 늑대. 길게 뻗은 발톱이 어둠 속에서 빛난다.',
  },
  205: {
    petId: 205,
    name: '아에테르나', emoji: '🌟', type: 'SPD/ATK',
    rarity: '신화', habitat: '암흑성',
    baseSpecies: 'aeterna',
    img: 'images/pets/205.svg',
    initStatCoeff: 12,
    hpCoeff: 20, atkCoeff: 32, defCoeff: 16, spdCoeff: 30,
    // 레벨업 UI 목표: HP+11, ATK+2.3, DEF+1.2, SPD+1.8 / 합계≈5.3 (신화급 보정)
    growStats: { hp: 1.35, atk: 2.05, def: 1.0, spd: 1.8, var: 0.5 },
    desc: '성령형. 은백색 반투명 몸체에 황금 별빛 입자가 소용돌이치는 신화 생명체. 눈은 두 개의 빛나는 별 형태다.',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ── 신규 파생 종 페트 (301~399: 거북/여우/늑대/식물/물고기) ──────────────
  // ════════════════════════════════════════════════════════════════════════════

  // ── 거북 (turtle) 계열 — T2~T3 ───────────────────────────────────────────
  301: {
    petId: 301,
    name: '붉은 거북', emoji: '🐢', type: 'DEF형',
    rarity: '일반', habitat: '어두운 숲',
    baseSpecies: 'turtle', variant: 'red',
    img: 'images/pets/301.svg',
    initStatCoeff: 10,
    hpCoeff: 28, atkCoeff: 14, defCoeff: 30, spdCoeff: 10,
    // 합계 atk+def+spd ≈ 4.0 / hp 1.1
    growStats: { hp: 1.1, atk: 0.9, def: 2.2, spd: 0.9, var: 0.4 },
    desc: '거북형. 붉은 갑각과 주황빛 발톱을 가진 소형 거북. 등딱지에 방사형 빨간 무늬가 있다.',
  },
  302: {
    petId: 302,
    name: '푸른 거북', emoji: '🐢', type: 'SPD/DEF',
    rarity: '일반', habitat: '어두운 숲',
    baseSpecies: 'turtle', variant: 'blue',
    img: 'images/pets/302.svg',
    initStatCoeff: 10,
    hpCoeff: 22, atkCoeff: 16, defCoeff: 22, spdCoeff: 18,
    // 합계 ≈ 4.0 / hp 1.0
    growStats: { hp: 1.0, atk: 1.0, def: 1.6, spd: 1.4, var: 0.4 },
    desc: '거북형. 청록색 등딱지와 하늘빛 발에 물결 무늬가 새겨진 소형 거북. 헤엄칠 때 발 사이에 물막이 생긴다.',
  },
  303: {
    petId: 303,
    name: '황금 거북', emoji: '🐢', type: '균형형',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'turtle', variant: 'gold',
    img: 'images/pets/303.svg',
    initStatCoeff: 12,
    hpCoeff: 28, atkCoeff: 22, defCoeff: 28, spdCoeff: 14,
    // 합계 ≈ 4.8 / hp 1.2
    growStats: { hp: 1.2, atk: 1.3, def: 2.0, spd: 1.5, var: 0.4 },
    desc: '거북형. 황금빛 광택 갑각을 가진 희귀 거북. 등딱지 중앙에 태양 문양이 새겨져 빛을 받으면 반짝인다.',
  },

  // ── 여우 (fox) 계열 — T2~T4 ───────────────────────────────────────────────
  311: {
    petId: 311,
    name: '불여우', emoji: '🦊', type: 'ATK형',
    rarity: '일반', habitat: '어두운 숲',
    baseSpecies: 'fox', variant: 'fire',
    img: 'images/pets/311.svg',
    initStatCoeff: 10,
    hpCoeff: 16, atkCoeff: 30, defCoeff: 12, spdCoeff: 22,
    // 합계 ≈ 4.0
    growStats: { hp: 0.9, atk: 1.8, def: 0.8, spd: 1.4, var: 0.4 },
    desc: '여우형. 주황-적색 털과 불꽃처럼 타오르는 꼬리를 가진 소형 여우. 발끝에서 작은 불씨가 흩날린다.',
  },
  312: {
    petId: 312,
    name: '설여우', emoji: '🦊', type: 'SPD형',
    rarity: '희귀', habitat: '어둠의 숲 심층',
    baseSpecies: 'fox', variant: 'snow',
    img: 'images/pets/312.svg',
    initStatCoeff: 12,
    hpCoeff: 16, atkCoeff: 24, defCoeff: 14, spdCoeff: 34,
    // 합계 ≈ 4.9
    growStats: { hp: 1.0, atk: 1.6, def: 0.9, spd: 2.2, var: 0.45 },
    desc: '여우형. 순백 털과 얼음 결정이 박힌 꼬리를 가진 소형 여우. 발자국마다 서리 결정이 맺힌다.',
  },
  313: {
    petId: 313,
    name: '구미호', emoji: '🦊', type: 'ATK/SPD',
    rarity: '전설', habitat: '어둠의 숲 심층',
    baseSpecies: 'fox', variant: 'nine',
    img: 'images/pets/313.svg',
    initStatCoeff: 14,
    hpCoeff: 20, atkCoeff: 40, defCoeff: 18, spdCoeff: 36,
    // 합계 ≈ 5.3
    growStats: { hp: 1.4, atk: 2.3, def: 1.0, spd: 2.2, var: 0.5 },
    desc: '구미호형. 금빛-흰빛이 뒤섞인 아홉 꼬리를 지닌 대형 여우. 꼬리 끝마다 다른 색의 불꽃이 타오른다.',
  },

  // ── 늑대 (wolf) 계열 — T2~T4 ──────────────────────────────────────────────
  321: {
    petId: 321,
    name: '회색 늑대', emoji: '🐺', type: '균형형',
    rarity: '일반', habitat: '어두운 숲',
    baseSpecies: 'wolf', variant: 'grey',
    img: 'images/pets/321.svg',
    initStatCoeff: 10,
    hpCoeff: 20, atkCoeff: 24, defCoeff: 16, spdCoeff: 20,
    // 합계 ≈ 4.0
    growStats: { hp: 1.0, atk: 1.6, def: 1.0, spd: 1.4, var: 0.4 },
    desc: '늑대형. 회색-연갈색 털과 황색 눈을 가진 중형 야생 늑대. 귀와 꼬리 끝 털이 짙은 회색이다.',
  },
  322: {
    petId: 322,
    name: '검은 늑대', emoji: '🐺', type: 'ATK형',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'wolf', variant: 'black',
    img: 'images/pets/322.svg',
    initStatCoeff: 12,
    hpCoeff: 20, atkCoeff: 34, defCoeff: 16, spdCoeff: 22,
    // 합계 ≈ 4.8
    growStats: { hp: 1.1, atk: 2.1, def: 1.0, spd: 1.7, var: 0.45 },
    desc: '늑대형. 칠흑색 털과 핏빛 눈을 가진 중형 늑대. 어둠 속에서 눈만 붉게 빛나 형체를 알아보기 힘들다.',
  },
  323: {
    petId: 323,
    name: '얼음 늑대', emoji: '🐺', type: 'ATK/DEF',
    rarity: '희귀', habitat: '어둠의 숲 심층',
    baseSpecies: 'wolf', variant: 'ice',
    img: 'images/pets/323.svg',
    initStatCoeff: 12,
    hpCoeff: 24, atkCoeff: 28, defCoeff: 24, spdCoeff: 16,
    // 합계 ≈ 4.8
    growStats: { hp: 1.3, atk: 1.8, def: 1.5, spd: 1.5, var: 0.45 },
    desc: '늑대형. 청백색 털 사이사이에 얼음 결정이 굳어 있는 중형 늑대. 숨을 내쉴 때마다 하얀 냉기가 서린다.',
  },

  // ── 식물 (plant) 계열 — T1~T3 ─────────────────────────────────────────────
  331: {
    petId: 331,
    name: '씨앗 요정', emoji: '🌱', type: 'SPD형',
    rarity: '일반', habitat: '초보 던전',
    baseSpecies: 'plant', variant: 'seed',
    img: 'images/pets/331.svg',
    initStatCoeff: 9,
    hpCoeff: 18, atkCoeff: 18, defCoeff: 14, spdCoeff: 24,
    // 합계 ≈ 4.0
    growStats: { hp: 1.0, atk: 1.3, def: 1.0, spd: 1.7, var: 0.4 },
    desc: '식물형. 둥근 연두색 씨앗 몸체 위에 새싹 두 가닥이 돋아난 소형 정령. 발 대신 작은 뿌리 다발로 달린다.',
  },
  332: {
    petId: 332,
    name: '덩굴 괴물', emoji: '🌿', type: 'HP/DEF형',
    rarity: '일반', habitat: '어두운 숲',
    baseSpecies: 'plant', variant: 'vine',
    img: 'images/pets/332.svg',
    initStatCoeff: 10,
    hpCoeff: 30, atkCoeff: 14, defCoeff: 26, spdCoeff: 10,
    // 합계 ≈ 4.0
    growStats: { hp: 1.2, atk: 0.8, def: 1.8, spd: 1.0, var: 0.4 },
    desc: '식물형. 짙은 녹색 덩굴이 뭉쳐 인형을 이룬 중형 마물. 몸통에 날카로운 가시가 돋아 있고 잎이 방패처럼 펼쳐진다.',
  },
  333: {
    petId: 333,
    name: '고목 수호자', emoji: '🌳', type: 'HP/DEF형',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'plant', variant: 'ancient',
    img: 'images/pets/333.svg',
    initStatCoeff: 12,
    hpCoeff: 36, atkCoeff: 18, defCoeff: 32, spdCoeff: 8,
    // 합계 ≈ 4.8
    growStats: { hp: 1.6, atk: 0.9, def: 2.3, spd: 0.8, var: 0.4 },
    desc: '고목형. 거칠게 갈라진 흑갈색 수피를 가진 대형 고목 마물. 눈은 이끼 낀 구멍 속에 황금 빛점 두 개로 표현된다.',
  },

  // ── 물고기 (fish) 계열 — T1~T3 ────────────────────────────────────────────
  341: {
    petId: 341,
    name: '빛나는 물고기', emoji: '🐟', type: 'SPD형',
    rarity: '일반', habitat: '어두운 숲',
    baseSpecies: 'fish', variant: 'glow',
    img: 'images/pets/341.svg',
    initStatCoeff: 9,
    hpCoeff: 14, atkCoeff: 18, defCoeff: 10, spdCoeff: 32,
    // 합계 ≈ 4.0
    growStats: { hp: 0.9, atk: 1.2, def: 0.8, spd: 2.0, var: 0.4 },
    desc: '어류형. 은청색 비늘에서 청록 형광빛이 새어 나오는 소형 물고기. 꼬리지느러미가 넓고 투명하게 빛난다.',
  },
  342: {
    petId: 342,
    name: '심해 물고기', emoji: '🐠', type: 'HP/DEF형',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'fish', variant: 'deep',
    img: 'images/pets/342.svg',
    initStatCoeff: 12,
    hpCoeff: 30, atkCoeff: 18, defCoeff: 28, spdCoeff: 16,
    // 합계 ≈ 4.8
    growStats: { hp: 1.4, atk: 1.0, def: 2.0, spd: 1.5, var: 0.4 },
    desc: '어류형. 짙은 남색-검정 비늘로 무장한 중형 심해어. 옆선을 따라 희미한 생물 발광 줄기가 흐른다.',
  },
  343: {
    petId: 343,
    name: '전기 장어', emoji: '🐍', type: 'ATK/SPD',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'fish', variant: 'electric',
    img: 'images/pets/343.svg',
    initStatCoeff: 12,
    hpCoeff: 18, atkCoeff: 34, defCoeff: 14, spdCoeff: 26,
    // 합계 ≈ 4.9
    growStats: { hp: 1.0, atk: 2.1, def: 0.9, spd: 1.8, var: 0.45 },
    desc: '장어형. 황-청색 줄무늬가 교차하는 세장형 장어 마물. 몸통 전체가 정전기로 지글거리며 끝 꼬리에서 번개가 튄다.',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ── 신규 파생 종 페트 (401~499: 조류/곤충/영령) ───────────────────────────
  // ════════════════════════════════════════════════════════════════════════════

  // ── 조류 (bird) 계열 — T2~T5 ──────────────────────────────────────────────
  401: {
    petId: 401,
    name: '불새', emoji: '🦅', type: 'ATK/SPD',
    rarity: '희귀', habitat: '어두운 숲',
    baseSpecies: 'bird', variant: 'fire',
    img: 'images/pets/401.svg',
    initStatCoeff: 12,
    hpCoeff: 16, atkCoeff: 34, defCoeff: 12, spdCoeff: 30,
    // 합계 ≈ 4.9
    growStats: { hp: 1.0, atk: 2.1, def: 0.8, spd: 2.0, var: 0.45 },
    desc: '조류형. 주홍-황금빛 깃털을 가진 중형 맹금류. 날개를 펼치면 불꽃 형상의 열기가 흘러나온다.',
  },
  402: {
    petId: 402,
    name: '폭풍새', emoji: '🦅', type: 'ATK/DEF',
    rarity: '희귀', habitat: '어둠의 숲 심층',
    baseSpecies: 'bird', variant: 'storm',
    img: 'images/pets/402.svg',
    initStatCoeff: 12,
    hpCoeff: 22, atkCoeff: 28, defCoeff: 22, spdCoeff: 18,
    // 합계 ≈ 4.8
    growStats: { hp: 1.2, atk: 1.8, def: 1.5, spd: 1.5, var: 0.45 },
    desc: '조류형. 짙은 회청색 깃털과 날카로운 강철빛 부리를 가진 대형 새. 날개 끝에 회오리 기류가 항상 감돈다.',
  },
  403: {
    petId: 403,
    name: '빛의 봉황', emoji: '🦅', type: 'ATK/SPD',
    rarity: '전설', habitat: '심연의 구렁',
    baseSpecies: 'bird', variant: 'phoenix',
    img: 'images/pets/403.svg',
    initStatCoeff: 14,
    hpCoeff: 22, atkCoeff: 44, defCoeff: 18, spdCoeff: 38,
    // 합계 ≈ 5.4
    growStats: { hp: 1.5, atk: 2.4, def: 1.1, spd: 2.2, var: 0.5 },
    desc: '봉황형. 눈부신 백금-황금 빛으로 이루어진 대형 불사조. 깃털 하나하나에서 빛 입자가 흩날리며 선명한 빛 궤적을 남긴다.',
  },

  // ── 곤충 (insect) 계열 — T1~T2 ────────────────────────────────────────────
  411: {
    petId: 411,
    name: '독 벌레', emoji: '🐛', type: 'ATK형',
    rarity: '일반', habitat: '초보 던전',
    baseSpecies: 'insect', variant: 'poison',
    img: 'images/pets/411.svg',
    initStatCoeff: 9,
    hpCoeff: 16, atkCoeff: 28, defCoeff: 10, spdCoeff: 20,
    // 합계 ≈ 4.0
    growStats: { hp: 0.9, atk: 1.8, def: 0.7, spd: 1.5, var: 0.4 },
    desc: '곤충형. 황록색 체절 마디가 이어진 소형 지네형 벌레. 머리 앞의 한 쌍 독침이 보랏빛으로 빛난다.',
  },
  412: {
    petId: 412,
    name: '강철 딱정벌레', emoji: '🪲', type: 'DEF형',
    rarity: '일반', habitat: '초보 던전',
    baseSpecies: 'insect', variant: 'steel',
    img: 'images/pets/412.svg',
    initStatCoeff: 9,
    hpCoeff: 24, atkCoeff: 14, defCoeff: 28, spdCoeff: 12,
    // 합계 ≈ 4.0
    growStats: { hp: 1.1, atk: 0.8, def: 2.0, spd: 1.0, var: 0.4 },
    desc: '곤충형. 금속성 광택을 내는 은회색 딱지 날개를 가진 소형 딱정벌레. 날개 표면에 리벳 문양이 새겨져 있다.',
  },
  413: {
    petId: 413,
    name: '번개 나방', emoji: '🦋', type: 'SPD/ATK',
    rarity: '희귀', habitat: '어두운 숲',
    baseSpecies: 'insect', variant: 'thunder',
    img: 'images/pets/413.svg',
    initStatCoeff: 11,
    hpCoeff: 14, atkCoeff: 28, defCoeff: 12, spdCoeff: 32,
    // 합계 ≈ 4.7
    growStats: { hp: 0.9, atk: 1.8, def: 0.8, spd: 2.1, var: 0.45 },
    desc: '곤충형. 황-청색 번개 무늬가 새겨진 대형 날개를 가진 나방. 날개짓 때마다 황금 전기 가루가 뿌려진다.',
  },

  // ── 영령 (spirit) 계열 — T4~T6 ────────────────────────────────────────────
  421: {
    petId: 421,
    name: '불꽃 영령', emoji: '👻', type: 'ATK형',
    rarity: '희귀', habitat: '어둠의 숲 심층',
    baseSpecies: 'spirit', variant: 'fire',
    img: 'images/pets/421.svg',
    initStatCoeff: 12,
    hpCoeff: 18, atkCoeff: 38, defCoeff: 14, spdCoeff: 22,
    // 합계 ≈ 4.9
    growStats: { hp: 1.1, atk: 2.3, def: 0.9, spd: 1.7, var: 0.45 },
    desc: '영령형. 붉은-주황 화염으로 이루어진 반투명 유령 형상. 눈은 두 개의 새하얀 불꽃점이며 불꽃 꼬리가 공중에 흩어진다.',
  },
  422: {
    petId: 422,
    name: '얼음 영령', emoji: '👻', type: 'DEF/SPD',
    rarity: '희귀', habitat: '어둠의 숲 심층',
    baseSpecies: 'spirit', variant: 'ice',
    img: 'images/pets/422.svg',
    initStatCoeff: 12,
    hpCoeff: 20, atkCoeff: 20, defCoeff: 28, spdCoeff: 24,
    // 합계 ≈ 4.8
    growStats: { hp: 1.2, atk: 1.2, def: 2.0, spd: 1.8, var: 0.45 },
    desc: '영령형. 청백색 얼음 결정으로 이루어진 반투명 유령 형상. 몸 주위로 육각 얼음 파편이 천천히 회전한다.',
  },
  423: {
    petId: 423,
    name: '번개 영령', emoji: '👻', type: 'ATK/SPD',
    rarity: '전설', habitat: '그림자 영역',
    baseSpecies: 'spirit', variant: 'thunder',
    img: 'images/pets/423.svg',
    initStatCoeff: 14,
    hpCoeff: 20, atkCoeff: 42, defCoeff: 18, spdCoeff: 36,
    // 합계 ≈ 5.3
    growStats: { hp: 1.3, atk: 2.5, def: 1.0, spd: 2.2, var: 0.5 },
    desc: '영령형. 황-백 번개 에너지로 이루어진 반투명 유령 형상. 형체가 번개처럼 지그재그로 흔들리며 주위에 전호가 튄다.',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ── 신규 파생 종 페트 (501~599: 드래곤/골렘/마물) ────────────────────────
  // ════════════════════════════════════════════════════════════════════════════

  // ── 드래곤 (dragon) 계열 — T5~T7 ──────────────────────────────────────────
  501: {
    petId: 501,
    name: '불도마뱀', emoji: '🦎', type: 'ATK형',
    rarity: '희귀', habitat: '심연의 구렁',
    baseSpecies: 'dragon', variant: 'salamander',
    img: 'images/pets/501.svg',
    initStatCoeff: 13,
    hpCoeff: 24, atkCoeff: 44, defCoeff: 18, spdCoeff: 24,
    // 합계 ≈ 5.0
    growStats: { hp: 1.3, atk: 2.5, def: 1.1, spd: 1.7, var: 0.5 },
    desc: '소형 드래곤형. 주홍-주황 비늘로 덮인 도마뱀 형상의 소형 드래곤. 입에서 연속으로 화염 구슬을 뱉어낸다.',
  },
  502: {
    petId: 502,
    name: '암룡', emoji: '🐉', type: 'HP/DEF형',
    rarity: '전설', habitat: '그림자 영역',
    baseSpecies: 'dragon', variant: 'dark',
    img: 'images/pets/502.svg',
    initStatCoeff: 15,
    hpCoeff: 40, atkCoeff: 30, defCoeff: 44, spdCoeff: 16,
    // 합계 ≈ 5.4
    growStats: { hp: 2.0, atk: 1.5, def: 2.5, spd: 1.2, var: 0.5 },
    desc: '용형. 흑자색-암회색 비늘이 판금처럼 겹친 대형 용. 뿔과 등 척추판이 짙은 보라색으로 빛나며 짙은 어둠 기운이 몸을 감싼다.',
  },
  503: {
    petId: 503,
    name: '별의 용', emoji: '🐉', type: '전체형',
    rarity: '신화', habitat: '암흑성',
    baseSpecies: 'dragon', variant: 'star',
    img: 'images/pets/503.svg',
    initStatCoeff: 17,
    hpCoeff: 36, atkCoeff: 44, defCoeff: 36, spdCoeff: 30,
    // 합계 ≈ 5.9 (신화)
    growStats: { hp: 2.0, atk: 2.2, def: 1.8, spd: 1.8, var: 0.5 },
    desc: '용형. 은하수 빛깔의 청람-은백 비늘로 뒤덮인 대형 신화 용. 날개와 꼬리에 별빛 입자가 흩날려 이동 경로마다 은하 흔적이 남는다.',
  },

  // ── 골렘 (golem) 계열 — T3~T5 ─────────────────────────────────────────────
  511: {
    petId: 511,
    name: '돌 골렘', emoji: '🗿', type: 'HP/DEF형',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'golem', variant: 'stone',
    img: 'images/pets/511.svg',
    initStatCoeff: 12,
    hpCoeff: 38, atkCoeff: 20, defCoeff: 34, spdCoeff: 6,
    // 합계 ≈ 4.8
    growStats: { hp: 1.8, atk: 1.0, def: 2.5, spd: 0.6, var: 0.4 },
    desc: '골렘형. 회갈색 거친 암석으로 이루어진 대형 인형 마물. 관절 틈새에 이끼가 끼어 있고 눈은 주황빛 마석이 박혀 있다.',
  },
  512: {
    petId: 512,
    name: '철 골렘', emoji: '🤖', type: 'HP/DEF/ATK',
    rarity: '전설', habitat: '심연의 구렁',
    baseSpecies: 'golem', variant: 'iron',
    img: 'images/pets/512.svg',
    initStatCoeff: 15,
    hpCoeff: 44, atkCoeff: 36, defCoeff: 40, spdCoeff: 8,
    // 합계 ≈ 5.3
    growStats: { hp: 2.2, atk: 1.8, def: 2.5, spd: 0.8, var: 0.5 },
    desc: '골렘형. 정련된 흑철 판금이 맞물린 대형 인형 마물. 흉부 중앙의 붉은 마석이 동력원이며 주먹이 땅에 닿으면 충격파가 퍼진다.',
  },

  // ── 마물 (demon) 계열 — T5~T7 ─────────────────────────────────────────────
  521: {
    petId: 521,
    name: '소형 악마', emoji: '😈', type: 'ATK/SPD',
    rarity: '희귀', habitat: '심연의 구렁',
    baseSpecies: 'demon', variant: 'imp',
    img: 'images/pets/521.svg',
    initStatCoeff: 13,
    hpCoeff: 20, atkCoeff: 38, defCoeff: 16, spdCoeff: 28,
    // 합계 ≈ 4.9
    growStats: { hp: 1.1, atk: 2.2, def: 0.9, spd: 1.8, var: 0.45 },
    desc: '마물형. 짙은 자주-적갈색 피부에 뒤틀린 작은 뿔 두 개와 박쥐형 날개를 가진 소형 악마. 꼬리 끝에 갈고리 가시가 달려 있다.',
  },
  522: {
    petId: 522,
    name: '대악마', emoji: '👿', type: 'ATK/DEF',
    rarity: '전설', habitat: '그림자 영역',
    baseSpecies: 'demon', variant: 'greater',
    img: 'images/pets/522.svg',
    initStatCoeff: 15,
    hpCoeff: 30, atkCoeff: 46, defCoeff: 30, spdCoeff: 22,
    // 합계 ≈ 5.4
    growStats: { hp: 1.8, atk: 2.6, def: 1.5, spd: 1.5, var: 0.5 },
    desc: '마물형. 흑자색 갑옷 같은 피부와 두 쌍의 굽은 뿔을 가진 대형 악마. 눈이 황금색으로 빛나며 어깨에서 어둠 화염이 타오른다.',
  },
  523: {
    petId: 523,
    name: '심연의 지배자', emoji: '🔱', type: '전체형',
    rarity: '신화', habitat: '암흑성',
    baseSpecies: 'demon', variant: 'overlord',
    img: 'images/pets/523.svg',
    initStatCoeff: 18,
    hpCoeff: 38, atkCoeff: 52, defCoeff: 38, spdCoeff: 26,
    // 합계 ≈ 6.0 (신화)
    growStats: { hp: 2.1, atk: 2.8, def: 1.8, spd: 1.8, var: 0.5 },
    desc: '마왕형. 심연의 어둠 그 자체로 이루어진 거대 마왕. 갑옷처럼 겹친 검-자주 비늘과 세 쌍의 날개를 지니며 눈은 붉은 별처럼 빛난다.',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ── 기존 종 파생 추가 (901~910: 슬라임/해골/요정/쥐/박쥐 변종) ──────────
  // ════════════════════════════════════════════════════════════════════════════

  // ── 쥐 (rat) 파생 ─────────────────────────────────────────────────────────
  901: {
    petId: 901,
    name: '붉은 쥐', emoji: '🐀', type: 'ATK형',
    rarity: '일반', habitat: '초보 던전',
    baseSpecies: 'rat', variant: 'red',
    img: 'images/pets/901.svg',
    initStatCoeff: 9,
    hpCoeff: 14, atkCoeff: 28, defCoeff: 10, spdCoeff: 24,
    // 합계 ≈ 4.0
    growStats: { hp: 0.9, atk: 1.8, def: 0.7, spd: 1.5, var: 0.4 },
    desc: '쥐형. 붉은 눈과 주홍빛 털을 가진 소형 돌연변이 쥐. 앞니가 유독 발달해 주황빛으로 빛난다.',
  },
  902: {
    petId: 902,
    name: '암흑 쥐', emoji: '🐀', type: 'SPD/ATK',
    rarity: '희귀', habitat: '어두운 숲',
    baseSpecies: 'rat', variant: 'dark',
    img: 'images/pets/902.svg',
    initStatCoeff: 11,
    hpCoeff: 16, atkCoeff: 30, defCoeff: 12, spdCoeff: 30,
    // 합계 ≈ 4.7
    growStats: { hp: 1.0, atk: 1.9, def: 0.8, spd: 2.0, var: 0.45 },
    desc: '쥐형. 칠흑색 털에 어둠 기운이 스며든 소형 쥐. 꼬리와 발끝에 자주색 마력 잔광이 감돌고 눈이 보라색으로 빛난다.',
  },

  // ── 박쥐 (bat) 파생 ───────────────────────────────────────────────────────
  903: {
    petId: 903,
    name: '피의 박쥐', emoji: '🦇', type: 'ATK형',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'bat', variant: 'blood',
    img: 'images/pets/903.svg',
    initStatCoeff: 11,
    hpCoeff: 18, atkCoeff: 36, defCoeff: 14, spdCoeff: 24,
    // 합계 ≈ 4.8
    growStats: { hp: 1.1, atk: 2.2, def: 0.9, spd: 1.7, var: 0.45 },
    desc: '박쥐형. 선홍빛 눈과 핏빛 날개막을 가진 중형 흡혈 박쥐. 엄니가 특별히 길고 날카로우며 끝에 독이 맺혀 있다.',
  },
  904: {
    petId: 904,
    name: '천둥 박쥐', emoji: '🦇', type: 'ATK/SPD',
    rarity: '희귀', habitat: '어둠의 숲 심층',
    baseSpecies: 'bat', variant: 'thunder',
    img: 'images/pets/904.svg',
    initStatCoeff: 12,
    hpCoeff: 16, atkCoeff: 32, defCoeff: 12, spdCoeff: 32,
    // 합계 ≈ 4.9
    growStats: { hp: 1.0, atk: 2.0, def: 0.8, spd: 2.2, var: 0.45 },
    desc: '박쥐형. 짙은 회청색 날개막에 황금 번개 줄무늬가 그어진 중형 박쥐. 초음파 대신 전격파를 방출한다.',
  },

  // ── 슬라임 (slime) 파생 ───────────────────────────────────────────────────
  905: {
    petId: 905,
    name: '붉은 슬라임', emoji: '🔴', type: 'ATK형',
    rarity: '희귀', habitat: '마물의 동굴',
    baseSpecies: 'slime', variant: 'red',
    img: 'images/pets/905.svg',
    initStatCoeff: 12,
    hpCoeff: 24, atkCoeff: 34, defCoeff: 18, spdCoeff: 16,
    // 합계 ≈ 4.8
    growStats: { hp: 1.3, atk: 2.2, def: 1.1, spd: 1.4, var: 0.45 },
    desc: '슬라임형. 선명한 적-주홍색 젤리 구체. 표면에서 마그마 같은 열기 줄기가 용솟음치며 충격 시 산성 액체를 튀긴다.',
  },
  906: {
    petId: 906,
    name: '검은 슬라임', emoji: '⬛', type: 'ATK/DEF',
    rarity: '전설', habitat: '심연의 구렁',
    baseSpecies: 'slime', variant: 'black',
    img: 'images/pets/906.svg',
    initStatCoeff: 14,
    hpCoeff: 32, atkCoeff: 40, defCoeff: 32, spdCoeff: 18,
    // 합계 ≈ 5.4
    growStats: { hp: 1.8, atk: 2.4, def: 1.8, spd: 1.4, var: 0.5 },
    desc: '슬라임형. 광택 없는 심흑색 젤리 구체. 표면에 자주색 독소 줄기가 흐르며 모든 물질을 흡수하듯 빛을 빨아들인다.',
  },

  // ── 해골 (skeleton) 파생 ──────────────────────────────────────────────────
  907: {
    petId: 907,
    name: '해골 궁수', emoji: '💀', type: 'ATK형',
    rarity: '일반', habitat: '마물의 동굴',
    baseSpecies: 'skeleton', variant: 'archer',
    img: 'images/pets/907.svg',
    initStatCoeff: 10,
    hpCoeff: 16, atkCoeff: 30, defCoeff: 10, spdCoeff: 20,
    // 합계 ≈ 4.0
    growStats: { hp: 0.9, atk: 1.9, def: 0.7, spd: 1.4, var: 0.4 },
    desc: '해골형. 황갈색 뼈대로 이루어진 소형 해골 마물. 썩은 나무 활을 들고 있으며 눈구멍에서 녹색 귀화가 빛난다.',
  },
  908: {
    petId: 908,
    name: '저주받은 해골', emoji: '💀', type: 'ATK/DEF',
    rarity: '희귀', habitat: '어둠의 숲 심층',
    baseSpecies: 'skeleton', variant: 'cursed',
    img: 'images/pets/908.svg',
    initStatCoeff: 12,
    hpCoeff: 22, atkCoeff: 32, defCoeff: 24, spdCoeff: 14,
    // 합계 ≈ 4.8
    growStats: { hp: 1.2, atk: 2.0, def: 1.5, spd: 1.2, var: 0.45 },
    desc: '해골형. 흑자색 저주 문양이 새겨진 중형 해골 마물. 관절 틈에서 보라색 저주 기운이 흘러나오고 갈라진 뼈에 균열이 박혀 있다.',
  },

  // ── 요정 (fairy) 파생 ──────────────────────────────────────────────────────
  909: {
    petId: 909,
    name: '화염 요정', emoji: '🧚', type: 'ATK형',
    rarity: '희귀', habitat: '어둠의 숲 심층',
    baseSpecies: 'fairy', variant: 'fire',
    img: 'images/pets/909.svg',
    initStatCoeff: 12,
    hpCoeff: 14, atkCoeff: 38, defCoeff: 12, spdCoeff: 26,
    // 합계 ≈ 4.9
    growStats: { hp: 1.0, atk: 2.4, def: 0.8, spd: 1.8, var: 0.45 },
    desc: '요정형. 주홍-황금빛 날개와 불꽃 색 피부를 가진 소형 정령. 손끝에서 작은 화염 구슬이 끊임없이 생성되어 흩어진다.',
  },
  910: {
    petId: 910,
    name: '서리 요정', emoji: '🧚', type: 'SPD/DEF',
    rarity: '희귀', habitat: '그림자 영역',
    baseSpecies: 'fairy', variant: 'frost',
    img: 'images/pets/910.svg',
    initStatCoeff: 12,
    hpCoeff: 16, atkCoeff: 22, defCoeff: 26, spdCoeff: 28,
    // 합계 ≈ 4.8
    growStats: { hp: 1.1, atk: 1.3, def: 1.8, spd: 2.0, var: 0.45 },
    desc: '요정형. 빙청색 날개와 서리 결정으로 뒤덮인 피부를 가진 소형 정령. 날 때마다 육각형 얼음 결정이 궤적을 따라 맺힌다.',
  },
};

// ── 페트 도감 데이터 ──────────────────────────────────────────────────────────
// petId 있는 종류 = capturePool 통해 Lv.1로 출현 시 포획 가능
const COMPENDIUM_WILD = [
  // ── 기존 종 ────────────────────────────────────────────────────────────────
  { id:'rat',        name:'크리퍼',      emoji:'🐀', rarity:'일반', habitat:'초보 던전',   petId:101, baseSpecies:'rat',      desc:'쥐형. 회갈색 털에 긴 꼬리를 가진 소형 마물. 붉은 눈과 뾰족한 귀가 특징이다.' },
  { id:'slime',      name:'글로비',      emoji:'🟢', rarity:'일반', habitat:'초보 던전',   petId:201, baseSpecies:'slime',    desc:'슬라임형. 밝은 녹색 반투명 젤리 구체. 눈 두 개가 구체 중앙에 있으며 표면이 물결치듯 일렁인다.' },
  { id:'bat',        name:'쉐이드',      emoji:'🦇', rarity:'일반', habitat:'초보 던전',   petId:102, baseSpecies:'bat',      desc:'박쥐형. 짙은 회자색 날개막과 날카로운 송곳니를 가진 소형 박쥐 마물. 귀 안쪽이 분홍빛이다.' },
  { id:'fairy',      name:'네카',        emoji:'🧚', rarity:'희귀', habitat:'어두운 숲',   petId:202, baseSpecies:'fairy',    desc:'요정형. 보랏빛 반투명 날개와 에메랄드 녹색 피부를 가진 소형 정령. 손끝에서 독색 빛 입자가 흩날린다.' },
  { id:'goblin',     name:'그리블',      emoji:'👺', rarity:'희귀', habitat:'마물의 동굴', petId:203, baseSpecies:'goblin',   desc:'고블린형. 황록색 피부와 커다란 노란 눈을 가진 소형 마물. 머리에 뿔이 두 개 있고 가죽 조각을 걸치고 있다.' },
  { id:'skeleton',   name:'오소렉',      emoji:'💀', rarity:'일반', habitat:'마물의 동굴',             baseSpecies:'skeleton', desc:'해골형. 흰뼈와 녹슨 투구로 이루어진 소형 언데드 마물. 눈구멍에서 파란 귀화가 흔들린다.' },
  { id:'orc',        name:'오르가',      emoji:'🪓', rarity:'희귀', habitat:'마물의 동굴',             desc:'오크형. 회녹색 두꺼운 피부와 돌출된 아래 엄니를 가진 대형 마물. 도끼를 한 손에 들고 갑옷 조각을 두르고 있다.' },
  { id:'werewolf',   name:'루파르',      emoji:'🐺', rarity:'희귀', habitat:'암흑성·동굴', petId:204, baseSpecies:'werewolf', desc:'반수인형. 짙은 회흑색 털과 붉은 눈을 가진 직립 늑대. 길게 뻗은 발톱이 어둠 속에서 빛난다.' },
  { id:'darkKnight', name:'나이트셰이드', emoji:'🗡️', rarity:'전설', habitat:'암흑성',                 desc:'기사형. 칠흑 전신갑주를 두른 대형 기사 마물. 투구 틈새로 붉은 눈빛이 새어나오며 검 날에 어둠 기운이 감돈다.' },
  { id:'vampire',    name:'뱀피르',      emoji:'🧛', rarity:'전설', habitat:'암흑성',                  desc:'뱀파이어형. 창백한 피부와 핏빛 눈을 가진 인형 마물. 검은 망토를 두르고 긴 엄니가 달빛에 반짝인다.' },
  { id:'aeterna',    name:'아에테르나',  emoji:'🌟', rarity:'신화', habitat:'암흑성',      petId:205, baseSpecies:'aeterna',  desc:'성령형. 은백색 반투명 몸체에 황금 별빛 입자가 소용돌이치는 신화 생명체. 눈은 두 개의 빛나는 별 형태다.' },

  // ── 거북 계열 ──────────────────────────────────────────────────────────────
  { id:'turtleRed',  name:'붉은 거북',  emoji:'🐢', rarity:'일반', habitat:'어두운 숲',   petId:301, baseSpecies:'turtle', variant:'red',  desc:'거북형. 붉은 갑각과 주황빛 발톱을 가진 소형 거북. 등딱지에 방사형 빨간 무늬가 있다.' },
  { id:'turtleBlue', name:'푸른 거북',  emoji:'🐢', rarity:'일반', habitat:'어두운 숲',   petId:302, baseSpecies:'turtle', variant:'blue', desc:'거북형. 청록색 등딱지와 하늘빛 발에 물결 무늬가 새겨진 소형 거북. 헤엄칠 때 발 사이에 물막이 생긴다.' },
  { id:'turtleGold', name:'황금 거북',  emoji:'🐢', rarity:'희귀', habitat:'마물의 동굴', petId:303, baseSpecies:'turtle', variant:'gold', desc:'거북형. 황금빛 광택 갑각을 가진 희귀 거북. 등딱지 중앙에 태양 문양이 새겨져 빛을 받으면 반짝인다.' },

  // ── 여우 계열 ──────────────────────────────────────────────────────────────
  { id:'foxFire',    name:'불여우',  emoji:'🦊', rarity:'일반', habitat:'어두운 숲',      petId:311, baseSpecies:'fox', variant:'fire',  desc:'여우형. 주황-적색 털과 불꽃처럼 타오르는 꼬리를 가진 소형 여우. 발끝에서 작은 불씨가 흩날린다.' },
  { id:'foxSnow',    name:'설여우',  emoji:'🦊', rarity:'희귀', habitat:'어둠의 숲 심층', petId:312, baseSpecies:'fox', variant:'snow',  desc:'여우형. 순백 털과 얼음 결정이 박힌 꼬리를 가진 소형 여우. 발자국마다 서리 결정이 맺힌다.' },
  { id:'foxNine',    name:'구미호',  emoji:'🦊', rarity:'전설', habitat:'어둠의 숲 심층', petId:313, baseSpecies:'fox', variant:'nine',  desc:'구미호형. 금빛-흰빛이 뒤섞인 아홉 꼬리를 지닌 대형 여우. 꼬리 끝마다 다른 색의 불꽃이 타오른다.' },

  // ── 늑대 계열 ──────────────────────────────────────────────────────────────
  { id:'wolfGrey',   name:'회색 늑대', emoji:'🐺', rarity:'일반', habitat:'어두운 숲',      petId:321, baseSpecies:'wolf', variant:'grey',  desc:'늑대형. 회색-연갈색 털과 황색 눈을 가진 중형 야생 늑대. 귀와 꼬리 끝 털이 짙은 회색이다.' },
  { id:'wolfBlack',  name:'검은 늑대', emoji:'🐺', rarity:'희귀', habitat:'마물의 동굴',    petId:322, baseSpecies:'wolf', variant:'black', desc:'늑대형. 칠흑색 털과 핏빛 눈을 가진 중형 늑대. 어둠 속에서 눈만 붉게 빛나 형체를 알아보기 힘들다.' },
  { id:'wolfIce',    name:'얼음 늑대', emoji:'🐺', rarity:'희귀', habitat:'어둠의 숲 심층', petId:323, baseSpecies:'wolf', variant:'ice',   desc:'늑대형. 청백색 털 사이사이에 얼음 결정이 굳어 있는 중형 늑대. 숨을 내쉴 때마다 하얀 냉기가 서린다.' },

  // ── 식물 계열 ──────────────────────────────────────────────────────────────
  { id:'plantSeed',    name:'씨앗 요정',   emoji:'🌱', rarity:'일반', habitat:'초보 던전',   petId:331, baseSpecies:'plant', variant:'seed',   desc:'식물형. 둥근 연두색 씨앗 몸체 위에 새싹 두 가닥이 돋아난 소형 정령. 발 대신 작은 뿌리 다발로 달린다.' },
  { id:'plantVine',    name:'덩굴 괴물',   emoji:'🌿', rarity:'일반', habitat:'어두운 숲',   petId:332, baseSpecies:'plant', variant:'vine',   desc:'식물형. 짙은 녹색 덩굴이 뭉쳐 인형을 이룬 중형 마물. 몸통에 날카로운 가시가 돋아 있고 잎이 방패처럼 펼쳐진다.' },
  { id:'plantAncient', name:'고목 수호자', emoji:'🌳', rarity:'희귀', habitat:'마물의 동굴', petId:333, baseSpecies:'plant', variant:'ancient', desc:'고목형. 거칠게 갈라진 흑갈색 수피를 가진 대형 고목 마물. 눈은 이끼 낀 구멍 속에 황금 빛점 두 개로 표현된다.' },

  // ── 물고기 계열 ────────────────────────────────────────────────────────────
  { id:'fishGlow',     name:'빛나는 물고기', emoji:'🐟', rarity:'일반', habitat:'어두운 숲',   petId:341, baseSpecies:'fish', variant:'glow',     desc:'어류형. 은청색 비늘에서 청록 형광빛이 새어 나오는 소형 물고기. 꼬리지느러미가 넓고 투명하게 빛난다.' },
  { id:'fishDeep',     name:'심해 물고기',   emoji:'🐠', rarity:'희귀', habitat:'마물의 동굴', petId:342, baseSpecies:'fish', variant:'deep',     desc:'어류형. 짙은 남색-검정 비늘로 무장한 중형 심해어. 옆선을 따라 희미한 생물 발광 줄기가 흐른다.' },
  { id:'fishElectric', name:'전기 장어',     emoji:'🐍', rarity:'희귀', habitat:'마물의 동굴', petId:343, baseSpecies:'fish', variant:'electric', desc:'장어형. 황-청색 줄무늬가 교차하는 세장형 장어 마물. 몸통 전체가 정전기로 지글거리며 끝 꼬리에서 번개가 튄다.' },

  // ── 조류 계열 ──────────────────────────────────────────────────────────────
  { id:'birdFire',    name:'불새',      emoji:'🦅', rarity:'희귀', habitat:'어두운 숲',      petId:401, baseSpecies:'bird', variant:'fire',    desc:'조류형. 주홍-황금빛 깃털을 가진 중형 맹금류. 날개를 펼치면 불꽃 형상의 열기가 흘러나온다.' },
  { id:'birdStorm',   name:'폭풍새',    emoji:'🦅', rarity:'희귀', habitat:'어둠의 숲 심층', petId:402, baseSpecies:'bird', variant:'storm',   desc:'조류형. 짙은 회청색 깃털과 날카로운 강철빛 부리를 가진 대형 새. 날개 끝에 회오리 기류가 항상 감돈다.' },
  { id:'birdPhoenix', name:'빛의 봉황', emoji:'🦅', rarity:'전설', habitat:'심연의 구렁',    petId:403, baseSpecies:'bird', variant:'phoenix', desc:'봉황형. 눈부신 백금-황금 빛으로 이루어진 대형 불사조. 깃털 하나하나에서 빛 입자가 흩날리며 선명한 빛 궤적을 남긴다.' },

  // ── 곤충 계열 ──────────────────────────────────────────────────────────────
  { id:'insectPoison', name:'독 벌레',       emoji:'🐛', rarity:'일반', habitat:'초보 던전', petId:411, baseSpecies:'insect', variant:'poison', desc:'곤충형. 황록색 체절 마디가 이어진 소형 지네형 벌레. 머리 앞의 한 쌍 독침이 보랏빛으로 빛난다.' },
  { id:'insectSteel',  name:'강철 딱정벌레', emoji:'🪲', rarity:'일반', habitat:'초보 던전', petId:412, baseSpecies:'insect', variant:'steel',  desc:'곤충형. 금속성 광택을 내는 은회색 딱지 날개를 가진 소형 딱정벌레. 날개 표면에 리벳 문양이 새겨져 있다.' },
  { id:'insectThunder',name:'번개 나방',     emoji:'🦋', rarity:'희귀', habitat:'어두운 숲', petId:413, baseSpecies:'insect', variant:'thunder', desc:'곤충형. 황-청색 번개 무늬가 새겨진 대형 날개를 가진 나방. 날개짓 때마다 황금 전기 가루가 뿌려진다.' },

  // ── 영령 계열 ──────────────────────────────────────────────────────────────
  { id:'spiritFire',   name:'불꽃 영령', emoji:'👻', rarity:'희귀', habitat:'어둠의 숲 심층', petId:421, baseSpecies:'spirit', variant:'fire',   desc:'영령형. 붉은-주황 화염으로 이루어진 반투명 유령 형상. 눈은 두 개의 새하얀 불꽃점이며 불꽃 꼬리가 공중에 흩어진다.' },
  { id:'spiritIce',    name:'얼음 영령', emoji:'👻', rarity:'희귀', habitat:'어둠의 숲 심층', petId:422, baseSpecies:'spirit', variant:'ice',    desc:'영령형. 청백색 얼음 결정으로 이루어진 반투명 유령 형상. 몸 주위로 육각 얼음 파편이 천천히 회전한다.' },
  { id:'spiritThunder',name:'번개 영령', emoji:'👻', rarity:'전설', habitat:'그림자 영역',   petId:423, baseSpecies:'spirit', variant:'thunder', desc:'영령형. 황-백 번개 에너지로 이루어진 반투명 유령 형상. 형체가 번개처럼 지그재그로 흔들리며 주위에 전호가 튄다.' },

  // ── 드래곤 계열 ────────────────────────────────────────────────────────────
  { id:'dragonSalamander', name:'불도마뱀', emoji:'🦎', rarity:'희귀', habitat:'심연의 구렁', petId:501, baseSpecies:'dragon', variant:'salamander', desc:'소형 드래곤형. 주홍-주황 비늘로 덮인 도마뱀 형상의 소형 드래곤. 입에서 연속으로 화염 구슬을 뱉어낸다.' },
  { id:'dragonDark',       name:'암룡',     emoji:'🐉', rarity:'전설', habitat:'그림자 영역', petId:502, baseSpecies:'dragon', variant:'dark',       desc:'용형. 흑자색-암회색 비늘이 판금처럼 겹친 대형 용. 뿔과 등 척추판이 짙은 보라색으로 빛나며 짙은 어둠 기운이 몸을 감싼다.' },
  { id:'dragonStar',       name:'별의 용',  emoji:'🐉', rarity:'신화', habitat:'암흑성',       petId:503, baseSpecies:'dragon', variant:'star',       desc:'용형. 은하수 빛깔의 청람-은백 비늘로 뒤덮인 대형 신화 용. 날개와 꼬리에 별빛 입자가 흩날려 이동 경로마다 은하 흔적이 남는다.' },

  // ── 골렘 계열 ──────────────────────────────────────────────────────────────
  { id:'golemStone', name:'돌 골렘', emoji:'🗿', rarity:'희귀', habitat:'마물의 동굴', petId:511, baseSpecies:'golem', variant:'stone', desc:'골렘형. 회갈색 거친 암석으로 이루어진 대형 인형 마물. 관절 틈새에 이끼가 끼어 있고 눈은 주황빛 마석이 박혀 있다.' },
  { id:'golemIron',  name:'철 골렘', emoji:'🤖', rarity:'전설', habitat:'심연의 구렁', petId:512, baseSpecies:'golem', variant:'iron',  desc:'골렘형. 정련된 흑철 판금이 맞물린 대형 인형 마물. 흉부 중앙의 붉은 마석이 동력원이며 주먹이 땅에 닿으면 충격파가 퍼진다.' },

  // ── 마물 계열 ──────────────────────────────────────────────────────────────
  { id:'demonImp',      name:'소형 악마',    emoji:'😈', rarity:'희귀', habitat:'심연의 구렁', petId:521, baseSpecies:'demon', variant:'imp',      desc:'마물형. 짙은 자주-적갈색 피부에 뒤틀린 작은 뿔 두 개와 박쥐형 날개를 가진 소형 악마. 꼬리 끝에 갈고리 가시가 달려 있다.' },
  { id:'demonGreater',  name:'대악마',       emoji:'👿', rarity:'전설', habitat:'그림자 영역', petId:522, baseSpecies:'demon', variant:'greater',  desc:'마물형. 흑자색 갑옷 같은 피부와 두 쌍의 굽은 뿔을 가진 대형 악마. 눈이 황금색으로 빛나며 어깨에서 어둠 화염이 타오른다.' },
  { id:'demonOverlord', name:'심연의 지배자',emoji:'🔱', rarity:'신화', habitat:'암흑성',       petId:523, baseSpecies:'demon', variant:'overlord', desc:'마왕형. 심연의 어둠 그 자체로 이루어진 거대 마왕. 갑옷처럼 겹친 검-자주 비늘과 세 쌍의 날개를 지니며 눈은 붉은 별처럼 빛난다.' },

  // ── 기존 종 파생 ───────────────────────────────────────────────────────────
  { id:'ratRed',         name:'붉은 쥐',      emoji:'🐀', rarity:'일반', habitat:'초보 던전',      petId:901, baseSpecies:'rat',      variant:'red',    desc:'쥐형. 붉은 눈과 주홍빛 털을 가진 소형 돌연변이 쥐. 앞니가 유독 발달해 주황빛으로 빛난다.' },
  { id:'ratDark',        name:'암흑 쥐',       emoji:'🐀', rarity:'희귀', habitat:'어두운 숲',      petId:902, baseSpecies:'rat',      variant:'dark',   desc:'쥐형. 칠흑색 털에 어둠 기운이 스며든 소형 쥐. 꼬리와 발끝에 자주색 마력 잔광이 감돌고 눈이 보라색으로 빛난다.' },
  { id:'batBlood',       name:'피의 박쥐',     emoji:'🦇', rarity:'희귀', habitat:'마물의 동굴',    petId:903, baseSpecies:'bat',      variant:'blood',  desc:'박쥐형. 선홍빛 눈과 핏빛 날개막을 가진 중형 흡혈 박쥐. 엄니가 특별히 길고 날카로우며 끝에 독이 맺혀 있다.' },
  { id:'batThunder',     name:'천둥 박쥐',     emoji:'🦇', rarity:'희귀', habitat:'어둠의 숲 심층', petId:904, baseSpecies:'bat',      variant:'thunder',desc:'박쥐형. 짙은 회청색 날개막에 황금 번개 줄무늬가 그어진 중형 박쥐. 초음파 대신 전격파를 방출한다.' },
  { id:'slimeRed',       name:'붉은 슬라임',   emoji:'🔴', rarity:'희귀', habitat:'마물의 동굴',    petId:905, baseSpecies:'slime',    variant:'red',    desc:'슬라임형. 선명한 적-주홍색 젤리 구체. 표면에서 마그마 같은 열기 줄기가 용솟음치며 충격 시 산성 액체를 튀긴다.' },
  { id:'slimeBlack',     name:'검은 슬라임',   emoji:'⬛', rarity:'전설', habitat:'심연의 구렁',    petId:906, baseSpecies:'slime',    variant:'black',  desc:'슬라임형. 광택 없는 심흑색 젤리 구체. 표면에 자주색 독소 줄기가 흐르며 모든 물질을 흡수하듯 빛을 빨아들인다.' },
  { id:'skeletonArcher', name:'해골 궁수',     emoji:'💀', rarity:'일반', habitat:'마물의 동굴',    petId:907, baseSpecies:'skeleton', variant:'archer', desc:'해골형. 황갈색 뼈대로 이루어진 소형 해골 마물. 썩은 나무 활을 들고 있으며 눈구멍에서 녹색 귀화가 빛난다.' },
  { id:'skeletonCursed', name:'저주받은 해골', emoji:'💀', rarity:'희귀', habitat:'어둠의 숲 심층', petId:908, baseSpecies:'skeleton', variant:'cursed', desc:'해골형. 흑자색 저주 문양이 새겨진 중형 해골 마물. 관절 틈에서 보라색 저주 기운이 흘러나오고 갈라진 뼈에 균열이 박혀 있다.' },
  { id:'fairyFire',      name:'화염 요정',     emoji:'🧚', rarity:'희귀', habitat:'어둠의 숲 심층', petId:909, baseSpecies:'fairy',    variant:'fire',   desc:'요정형. 주홍-황금빛 날개와 불꽃 색 피부를 가진 소형 정령. 손끝에서 작은 화염 구슬이 끊임없이 생성되어 흩어진다.' },
  { id:'fairyFrost',     name:'서리 요정',     emoji:'🧚', rarity:'희귀', habitat:'그림자 영역',    petId:910, baseSpecies:'fairy',    variant:'frost',  desc:'요정형. 빙청색 날개와 서리 결정으로 뒤덮인 피부를 가진 소형 정령. 날 때마다 육각형 얼음 결정이 궤적을 따라 맺힌다.' },
];
