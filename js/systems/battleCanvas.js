// ── Battle Canvas — Pixel Art Renderer ─────────────────────────────────────
// Sprite format: rows of strings, each char = 1 pixel, '.' = transparent
// Rendered at PX_SCALE × scale for crisp pixel look

const PX = 4; // 1 game pixel = 4 CSS pixels → 16×16 sprite = 64×64 px

// ── Colour Palettes ─────────────────────────────────────────────────────────
const COL = {
  // Player knight
  p1:'#6688cc', p2:'#334499', p3:'#ffd4a0', p4:'#333', p5:'#8899dd', p6:'#445566',
  // Fire (이그니스)
  f1:'#ff4400', f2:'#ff8800', f3:'#ffcc00', f4:'#cc2200',
  // Water (아쿠론)
  w1:'#0088cc', w2:'#00bbee', w3:'#004488', w4:'#aaddff',
  // Thunder (볼팡)
  e1:'#cccc00', e2:'#ffff44', e3:'#888800', e4:'#ffffff',
  // Slime (글로비)
  s1:'#44bb44', s2:'#22aa22', s3:'#88ff88', s4:'#006600',
  // Fairy (네카)
  n1:'#aa44cc', n2:'#dd88ff', n3:'#440066', n4:'#ff44aa',
  // Goblin (그리블)
  g1:'#449944', g2:'#226622', g3:'#cc8833', g4:'#885500',
  // Werewolf (루파르)
  u1:'#776655', u2:'#998877', u3:'#553322', u4:'#ccbbaa',
  // Skeleton (오소렉)
  k1:'#ccccaa', k2:'#aaaaaa', k3:'#888877', k4:'#eeeedd',
  // Orc (오르가)
  o1:'#556633', o2:'#889944', o3:'#334411', o4:'#ccaa44',
  // Bat (쉐이드)
  b1:'#443355', b2:'#221133', b3:'#7755aa', b4:'#ccaaee',
  // Rat (크리퍼)
  r1:'#998877', r2:'#776655', r3:'#cc9966', r4:'#554433',
  // DarkKnight (나이트셰이드)
  d1:'#221133', d2:'#440055', d3:'#8844cc', d4:'#4422aa',
  // Vampire (뱀피르)
  v1:'#220011', v2:'#880033', v3:'#ffaaaa', v4:'#cc0044',
  // Aeterna (아에테르나 — 신화)
  a1:'#fffacc', a2:'#ffdd55', a3:'#ffaa00', a4:'#ffffff',
};

// ── Sprite Definitions (16×16) ──────────────────────────────────────────────
// Row format: '.'=1 transparent px, 'XX'=2-char COL key = 1 coloured px
const DEF = {};

// ── Extra colours ─────────────────────────────────────────────────────────
Object.assign(COL, {
  p7:'#ffd700', p8:'#c0c0c0',  // gold/silver highlight for knight
  f5:'#fff0aa',                 // bright flame core
  w5:'#ccf5ff', w6:'#003366',  // highlight / deep blue
  e5:'#ddddff', e6:'#6666ff',  // lightning accent
  s5:'#aaffaa', s6:'#004400',  // slime bright/dark
  n5:'#ffccff', n6:'#cc00cc',  // fairy light/dark
  g5:'#ccdd88', g6:'#223300',  // goblin highlight/shadow
  u5:'#eeddcc', u6:'#331100',  // werewolf highlight/shadow
  k5:'#fffdf0', k6:'#555544',  // skeleton white/shadow
  o5:'#aabb66', o6:'#112200',  // orc highlight/shadow
  b5:'#ccbbff', b6:'#110022',  // bat highlight/shadow
  r5:'#ffddcc', r6:'#220000',  // rat nose/shadow
  d5:'#cc88ff', d6:'#08000f',  // dark knight accent/shadow
  v5:'#ffccdd', v6:'#0d0005',  // vampire glow/shadow
  a5:'#ffee00', a6:'#ff8800',  // aeterna star burst
});

DEF.player = { // 기사 — blue knight with helmet & sword
  r:[
    '.....p5p5p5p5p5.....', // helmet dome
    '....p1p5p8p5p8p1....', // helmet top with rivets
    '...p2p1p1p5p1p1p2...', // mid helmet
    '...p2p4p4p4p4p4p2...', // visor (dark)
    '...p2p1p8p1p8p1p2...', // lower helmet shine
    '....p4p3p3p3p4p4....', // neck
    '.p2p2p5p2p2p2p5p2p2.', // shoulder pauldrons
    '.p1p2p2p2p2p2p2p2p1.', // upper chest
    '.p1p2p8p2p2p2p8p2p1.', // chest plate highlights
    '.p1p2p2p6p2p6p2p2p1.', // belt buckles
    '.p6p6p7p2p2p2p7p6p6.', // gold belt
    '....p2p6....p6p2....', // upper greaves
    '....p1p6....p6p1....', // greave highlight
    '....p2p6....p6p2....', // lower greave
    '....p4p6....p6p4....', // boot top
    '...p4p6p6..p6p6p4...', // boots
  ],
};

DEF.ignis = { // 이그니스 — fire elemental
  r:[
    '.......f3f3f3.......', // flame tip
    '......f3f2f3f3......', // upper flame
    '.....f2f3f5f3f2.....', // bright flame core
    '....f2f1f5f5f1f2....', // head top
    '...f1f1f5f3f5f1f1...', // head upper
    '..f1f2f4f4f4f4f2f1..', // eyes (dark pupils)
    '..f1f5f4f5f5f4f5f1..', // eye glow
    '..f1f1f5f3f3f5f1f1..', // face
    '..f1f1f4f4f4f4f1f1..', // mouth
    '.f2f1f1f1f1f1f1f1f2.', // chin
    '.f2f1f3f1f1f3f1f1f2.', // neck flame
    '..f1f2f1f1f1f1f2f1..', // body
    '..f4f1f3f1f1f3f4....', // base flicker
    '.f4f4f2......f2f4f4.', // base spread
    'f4f4f3.......f3f4f4f4', // outer base flames
    '..f4f3.........f4f4.', // bottom flame wisps
  ],
};

DEF.aquron = { // 아쿠론 — water dragon
  r:[
    '..w3w3w6........w3..', // dorsal horn left
    '..w3w1w3......w6w3..', // horn base
    '.w3w1w1w3w3w3w1w1w3.', // head wide
    'w6w1w5w1w1w1w1w5w1w6', // head highlight
    'w3w1w4w4w1w1w4w4w1w3', // eyes (dark)
    'w3w1w5w1w1w1w5w1w1w3', // eye shine
    '.w3w1w1w1w1w1w1w1w3.', // snout
    '..w3w2w2w2w2w2w2w3..', // jaw
    '...w3w1w5w1w5w1w3...', // scales
    '...w6w1w1w1w1w1w6...', // neck
    '....w3w2w2w2w2w3....', // upper body
    '...w3w1w5w1w1w3w3...', // body scales
    '....w6w1w1w1w1w6....', // lower body
    '...w3w3.w2w2.w3w3...', // legs
    '..w6....w3w3....w6..', // feet
    '.w3w3..........w3w3.', // tail tip
  ],
};

DEF.wolfang = { // 볼팡 — thunder wolf
  r:[
    '.e3e3..........e3e3.', // ears tips
    'e1e1e3e3......e3e3e1', // inner ears
    'e1e1e1e3e3..e3e3e1e1', // ear base
    '.e3e1e1e1e1e1e1e3e3.', // head top
    '.e3e1e5e5e1e5e5e1e3.', // face highlight
    '..e3e4e4e1e1e4e4e3..', // eyes (dark)
    '..e3e1e5e1e1e5e1e3..', // eye shine
    '..e3e2e1e6e6e1e2e3..', // snout / nose
    '.e3e2e1e1e1e1e1e2e3.', // jaw
    'e2e2e2e2e2e2e2e2e2e2', // chest fur
    '..e2e6....e6e2......', // upper legs
    '..e3e2....e2e3......', // legs
    '..e3e2....e2e3......', // legs
    '..e3e6....e6e3......', // lower legs
    '..e3e3....e3e3......', // ankles
    '...e4e4....e4e4.....', // paws
  ],
};

DEF.globby = { // 글로비 — green slime (friendly)
  r:[
    '......s2s2s2s2......', // top
    '....s2s1s5s1s5s2....', // shine highlight
    '...s1s5s1s1s1s5s1...', // head top
    '..s1s1s1s1s1s1s1s1..', // head
    '..s1s4s4s1s1s4s4s1..', // cute eyes
    '..s1s5s1s1s1s5s1s1..', // eye shine
    '..s1s1s1s1s1s1s1s1..', // face
    '..s1s6s1s1s1s1s6s1..', // smile corners
    '..s2s1s6s6s6s1s2s1..', // smile
    '..s2s1s1s1s1s1s1s2..', // chin
    '...s2s2s1s1s1s2s2...', // neck
    '..s3s3s1s1s1s1s3s3..', // drip start
    's3s3................s3', // drip wide
    's3..................s3', // drip
    '.s3s3..............s3', // drip narrow
    '..s3s3s3s3s3s3s3s3..', // drip bottom
  ],
};

DEF.neca = { // 네카 — poison fairy
  r:[
    'n4n4n4n4....n4n4n4n4', // wing tips
    'n3n4n4n4....n4n4n4n3', // wings upper
    'n2n3n4n4....n4n4n3n2', // wings mid
    '....n3n3n3n3n3n3....', // wing join / head top
    '....n1n5n1n5n1n1....', // face highlight
    '....n1n4n1n1n4n1....', // eyes
    '....n1n5n1n1n5n1....', // eye shine
    '....n3n1n1n1n1n3....', // face
    '....n3n6n6n6n6n3....', // mouth
    '.n4n4n1n1n1n1n4n4...', // wing base / body
    'n4n4n4n1n1n4n4n4n4..', // wings lower spread
    '..n4n4n1n1n1n4n4....', // wing taper
    '....n4n1n1n1n4......', // body
    '.....n3n5n5n3.......', // body glow
    '....n3n3..n3n3......', // legs
    '...n3n6....n6n3.....', // feet
  ],
};

DEF.gribble = { // 그리블 — goblin warrior
  r:[
    '....g4g6g4g6g4......', // pointy hair
    '...g4g1g1g1g1g4.....', // head top
    '..g4g1g5g1g5g1g4....', // head highlight
    '..g2g4g1g4g1g1g2....', // goblin eyes (dark)
    '..g2g1g5g1g5g1g2....', // eye shine
    '..g2g4g4g4g4g1g2....', // nose area
    '...g4g1g1g1g1g4.....', // jaw
    '..g4g1g3g1g3g1g4....', // tusks
    '..g4g3g1g3g3g3g4....', // neck
    '..g4g4g4g4g4g4g4....', // collar
    '..g4g1g5g1g5g1g4....', // chest
    '..g4g1g1g1g1g1g4....', // torso
    '..g4g6g1g1g1g6g4....', // belt
    '...g4g4....g4g4.....', // upper legs
    '...g4g2....g2g4.....', // legs
    '...g6g2....g2g6.....', // boots
  ],
};

DEF.lupar = { // 루파르 — werewolf
  r:[
    '.u3u3..........u3u3.', // wolf ears
    'u6u1u3u3......u3u3u6', // inner ear
    'u1u1u1u3u3..u3u3u1u1', // ear base
    '.u3u1u1u1u1u1u1u3u3.', // head
    '.u3u5u5u1u1u5u5u1u3.', // face highlight
    '..u3u6u4u1u1u4u6u3..', // eyes (dark + deep)
    '..u3u1u5u1u1u5u1u3..', // eye glow
    '..u3u2u1u6u6u1u2u3..', // snout/muzzle
    '.u3u2u1u1u1u1u1u2u3.', // jaw
    'u2u2u2u2u2u2u2u2u2u2', // chest fur
    '..u2u6....u6u2......', // upper legs
    '..u3u2....u2u3......', // legs
    '..u3u2....u2u3......', // legs
    '..u3u6....u6u3......', // claws
    '..u3u3....u3u3......', // ankles
    '...u6u4....u6u4.....', // paw claws
  ],
};

DEF.osorec = { // 오소렉 — skeleton
  r:[
    '....k2k2k2k2k2......', // skull dome
    '...k2k5k1k5k1k2.....', // skull highlight
    '...k2k1k1k1k1k2.....', // skull
    '...k2k4k1k4k1k2.....', // empty eye sockets
    '...k2k6k1k6k1k2.....', // eye depth
    '...k2k1k1k1k1k2.....', // cheekbones
    '....k4k2k2k2k4......', // jaw top
    '....k1k4k4k4k1......', // teeth top
    '....k1k1k1k1k1......', // teeth
    '....k6k2k2k2k6......', // jaw
    '....k2k2..k2k2......', // neck vertebrae
    '....k2k1..k1k2......', // spine
    '....k2k1..k1k2......', // ribs
    '....k6k1..k1k6......', // lower ribs
    '....k2k2..k2k2......', // hip
    '....k6k4..k4k6......', // leg bones
  ],
};

DEF.orga = { // 오르가 — orc
  r:[
    '.....o3o6o3o6o3.....', // spiked mohawk
    '....o3o1o1o1o1o3....', // head top
    '...o3o1o5o1o5o1o3...', // head highlight
    '..o3o1o4o4o4o4o1o3..', // brutal brow
    '..o3o1o4o5o5o4o1o3..', // eyes
    '..o3o1o1o4o4o1o1o3..', // snout
    '..o3o3o1o4o4o1o3o3..', // tusks (up)
    '..o3o3o3o3o3o3o3o3..', // neck
    '..o3o2o1o5o5o1o2o3..', // chest upper
    '..o3o1o1o1o1o1o1o3..', // chest
    '..o3o6o1o1o1o1o6o3..', // belt
    '...o3o1..o1o3.......', // upper legs
    '...o3o2..o2o3.......', // legs
    '...o3o2..o2o3.......', // legs
    '...o4o2..o2o4.......', // lower legs
    '...o6o2..o2o6.......', // heavy boots
  ],
};

DEF.shade = { // 쉐이드 — shadow bat
  r:[
    'b6b2b2........b2b2b6', // wing edge tips
    'b1b1b2b2......b2b2b1', // wings spread
    'b1b1b1b2b2..b2b2b1b1', // wings
    '.b2b1b1b1b1b1b1b2b3.', // wing base / body top
    '.b2b5b5b1b1b5b5b2b3.', // face shine
    '..b2b4b4b1b1b4b4b3..', // eyes
    '..b2b5b1b4b4b1b5b3..', // eye shine + fangs hint
    '..b2b2b2b2b2b2b2b3..', // body
    'b2b2b5b1b1b1b5b2b2b3', // belly lighter
    'b2b2b2b2b2b2b2b2b2b3', // lower body
    'b6b2..........b2b6b3', // wing roots
    'b2b2..........b2b2b3', // wings open lower
    '.b3b2b2b2b2b2b2b2b3.', // wingtips lower
    '..b3b3b2b2b2b3b3....', // wing taper
    '...b6b3b3b3b3b6.....', // claws
    '...b4..........b4...', // claw tips
  ],
};

DEF.creeper = { // 크리퍼 — rat (with whiskers implied)
  r:[
    '......r1r1r1........', // ear tops
    '...r4r2r1r1r2r4.....', // ear outer
    '..r4r1r5r1r5r1r4....', // head highlight
    '..r4r1r1r1r1r1r4....', // head
    '..r4r1r4r1r4r1r4....', // eyes
    '..r4r1r5r1r5r1r4....', // eye shine
    '..r4r2r6r6r6r2r4....', // nose dark
    '..r4r1r5r5r5r1r4....', // snout
    '..r4r2r1r1r1r2r4....', // jaw
    '...r4r1r2r2r1r4.....', // neck
    '....r4r1r1r1r4......', // body top
    '....r4r2r1r2r4......', // body
    '....r4r1..r1r4......', // mid body
    '....r2r2..r2r2......', // legs
    '..r4r2....r2r4......', // feet
    '..r6r4....r4r6......', // paws
  ],
};

DEF.nightshade = { // 나이트셰이드 — dark knight
  r:[
    '...d2d6d2d6d2d2.....', // crown spikes
    '..d2d1d1d1d1d1d2....', // helmet
    '..d2d5d1d5d1d5d2....', // helmet shine
    '.d2d1d1d4d4d4d1d2...', // visor dark
    '.d2d1d5d4d5d4d5d2...', // visor glow eyes
    '.d2d2d2d2d2d2d2d2...', // chin guard
    '.d2d1d5d1d1d5d1d2...', // collar glow
    '.d2d1d1d1d1d1d2d2...', // shoulder left
    '.d2d1d1d1d1d1d2d2...', // chest
    'd6d1d5d1d1d5d1d1d6.', // dark armor glow
    '..d2d2....d2d2......', // upper legs
    '..d2d1....d1d2......', // legs
    '..d2d5....d5d2......', // leg shine
    '..d2d2....d2d2......', // lower legs
    '..d6d2....d2d6......', // boots
    '..d4d6....d6d4......', // boot soles
  ],
};

DEF.vampyr = { // 뱀피르 — vampire noble
  r:[
    '....v2v6v2v6v2v2....', // widow peak hair
    '....v2v1v1v1v1v2....', // head
    '....v2v5v1v5v1v2....', // face highlight
    '...v2v1v4v4v4v4v1v2.', // brow shadow
    '...v2v1v5v4v5v4v1v2.', // glowing red eyes
    '...v2v4v1v1v1v4v2...', // pale face
    '....v2v1v4v4v4v1v2..', // fangs (down)
    '....v2v5v1v1v5v2....', // chin
    '...v2v2v1v1v2v2.....', // cape collar
    '.v4v4v2v1v1v2v4v4...', // cape spread
    '.v4v4v4v1v1v4v4v4...', // cape mid
    '.v4v4v1v1v1v1v4v4...', // cape lower
    '..v2v2....v2v2......', // legs
    '..v2v5....v5v2......', // leg shine
    '..v6v2....v2v6......', // boots
    '..v4v6....v6v4......', // boot soles
  ],
};

DEF.aeterna = { // 아에테르나 — mythical star spirit
  r:[
    '......a5a5a5a5......', // star tip top
    '....a2a5a5a5a5a2....', // star rays
    '..a6a2a5a4a4a5a2a6..', // inner glow + core
    '..a2a5a4a1a1a4a5a2..', // core bright
    'a6a2a5a4a1a1a4a5a2a6', // full width core
    'a6a2a2a5a1a1a5a2a2a6', // star spread
    '..a2a5a1a1a1a1a5a2..', // body glow
    '..a2a1a5a1a1a5a1a2..', // inner detail
    '....a2a5a1a1a5a2....', // narrowing
    '....a5a4a1a1a4a5....', // star point left/right
    '..a2a5..a1a1..a5a2..', // legs/trailing light
    '..a2a6..a1a1..a6a2..', // deeper glow
    '..a6a2..a2a2..a2a6..', // fade
    '...a6a2.a2a2.a2a6...', // fading trail
    '....a6a6a2a2a6a6....', // tail
    '......a6a5a5a6......', // tail tip
  ],
};

// Map emoji → sprite key
const EMOJI_SPRITE = {
  '🔥':'ignis','💧':'aquron','⚡':'wolfang','🟢':'globby','🧚':'neca',
  '👺':'gribble','🐺':'lupar','💀':'osorec','🪓':'orga','🦇':'shade',
  '🐀':'creeper','🗡️':'nightshade','🧛':'vampyr','🌟':'aeterna',
};

// ── Map Backgrounds ──────────────────────────────────────────────────────────
const MAP_BG = {
  town:       { sky1:'#5599cc', sky2:'#88bbee', ground1:'#226622', ground2:'#334d1a',
                detail: drawTownBg },
  dungeon:    { sky1:'#111122', sky2:'#1a1a33', ground1:'#222233', ground2:'#1a1a22',
                detail: drawDungeonBg },
  forest:     { sky1:'#0a1a0a', sky2:'#142314', ground1:'#0d2a0d', ground2:'#0a1a0a',
                detail: drawForestBg },
  cave:       { sky1:'#080808', sky2:'#121212', ground1:'#1a1010', ground2:'#100808',
                detail: drawCaveBg },
  darkCastle: { sky1:'#030006', sky2:'#0d000f', ground1:'#120015', ground2:'#0a0010',
                detail: drawCastleBg },
};

function drawTownBg(ctx, W, H) {
  const gy = H * 0.62;
  // Cobblestone ground
  ctx.fillStyle = '#4a6a33';
  for (let x = 0; x < W; x += 10) ctx.fillRect(x, gy, 9, 2);
  ctx.fillStyle = '#3a5525';
  for (let x = 5; x < W; x += 10) ctx.fillRect(x, gy + 4, 9, 2);
  // Ground horizon line
  ctx.fillStyle = '#336622';
  ctx.fillRect(0, gy - 1, W, 2);

  // Buildings (left & right silhouettes)
  const houses = [
    { x:2,      w:40, h:38, roof:10, col:'#4455aa', rCol:'#223388' },
    { x:48,     w:28, h:28, roof:8,  col:'#556644', rCol:'#334422' },
    { x:W-82,   w:32, h:32, roof:9,  col:'#664433', rCol:'#442211' },
    { x:W-44,   w:36, h:42, roof:11, col:'#445566', rCol:'#223344' },
  ];
  houses.forEach(({ x, w, h, roof, col, rCol }) => {
    const by = gy - h;
    // Wall
    ctx.fillStyle = col;
    ctx.fillRect(x, by, w, h);
    // Pitched roof (3 rows → triangle)
    ctx.fillStyle = rCol;
    for (let i = 0; i < roof; i++) {
      const inset = Math.round(i * (w / 2) / roof);
      ctx.fillRect(x + inset, by - roof + i, w - inset * 2, 2);
    }
    // Windows
    ctx.fillStyle = 'rgba(255,230,100,0.6)';
    ctx.fillRect(x + 6, by + 6, 7, 6);
    ctx.fillRect(x + w - 14, by + 6, 7, 6);
    // Door
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(x + w/2 - 4, by + h - 10, 8, 10);
    // Chimney
    ctx.fillStyle = rCol;
    ctx.fillRect(x + w - 10, by - roof - 6, 6, 8);
    // Smoke
    ctx.fillStyle = 'rgba(200,200,200,0.2)';
    ctx.fillRect(x + w - 9, by - roof - 12, 4, 6);
    ctx.fillRect(x + w - 10, by - roof - 18, 6, 4);
  });

  // Fence posts
  ctx.fillStyle = '#8b6a3e';
  for (let fx = 80; fx < 170; fx += 14) {
    ctx.fillRect(fx, gy - 12, 3, 14);
    ctx.fillRect(fx + 3, gy - 9, 11, 2);
    ctx.fillRect(fx + 3, gy - 5, 11, 2);
  }

  // Clouds
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  [[40,10,30,7],[110,18,40,8],[230,8,26,7],[280,22,20,6]].forEach(([x,y,w,h]) => {
    ctx.fillRect(x, y, w, h);
    ctx.fillRect(x + 4, y - 3, w - 8, 4);
  });
}
function drawDungeonBg(ctx, W, H) {
  const gy = H * 0.62;
  // Stone brick wall pattern
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  for (let y = 0; y < gy; y += 12) {
    const offset = (Math.floor(y / 12) % 2) * 18;
    for (let x = offset - 18; x < W; x += 36) ctx.fillRect(x, y, 32, 10);
  }
  // Mortar lines
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  for (let y = 0; y < gy; y += 12) ctx.fillRect(0, y, W, 2);

  // Stone floor tiles
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  for (let x = 0; x < W; x += 24) ctx.fillRect(x, gy, 22, H - gy);
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  for (let x = 0; x < W; x += 24) ctx.fillRect(x, gy, 1, H - gy);

  // Stone pillars
  [[W*0.06, gy - 50],[W - W*0.06 - 14, gy - 50]].forEach(([px, py]) => {
    // Pillar shaft
    ctx.fillStyle = '#1e1e2e';
    ctx.fillRect(px, py, 14, 52);
    // Pillar cap (top)
    ctx.fillStyle = '#2a2a3e';
    ctx.fillRect(px - 3, py, 20, 6);
    ctx.fillRect(px - 3, py + gy - py - 6, 20, 6);
    // Pillar detail lines
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    for (let dy = py + 8; dy < gy - 8; dy += 10) ctx.fillRect(px + 2, dy, 10, 2);
    // Iron ring
    ctx.fillStyle = '#445';
    ctx.fillRect(px - 1, py + 20, 16, 3);
  });

  // Torches on pillars
  [[W*0.07, gy * 0.7],[W - W*0.07 - 4, gy * 0.7]].forEach(([tx, ty]) => {
    ctx.fillStyle = '#554433';
    ctx.fillRect(tx, ty, 4, 10);
    // Flame glow
    ctx.fillStyle = 'rgba(255,120,0,0.25)';
    ctx.fillRect(tx - 8, ty - 10, 20, 14);
    ctx.fillStyle = 'rgba(255,220,0,0.15)';
    ctx.fillRect(tx - 4, ty - 6, 12, 8);
    // Flame
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(tx, ty - 6, 4, 6);
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(tx + 1, ty - 8, 2, 4);
  });

  // Chains hanging from ceiling
  [[W*0.2, 0, 16],[W * 0.8, 0, 20]].forEach(([cx, cy, len]) => {
    ctx.fillStyle = '#334';
    for (let i = 0; i < len; i += 5) {
      ctx.fillRect(cx, cy + i, 3, 3);
      ctx.fillRect(cx + 2, cy + i + 3, 3, 3);
    }
  });

  // Ambient dungeon glow
  const glow = ctx.createRadialGradient(W/2, gy*0.4, 0, W/2, gy*0.4, W*0.4);
  glow.addColorStop(0, 'rgba(80,60,140,0.1)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, gy);
}
function drawForestBg(ctx, W, H) {
  const gy = H * 0.62;
  // Background tree layer (far, lighter)
  ctx.fillStyle = '#0d1a0d';
  [[0,H*0.15,16,gy],[22,H*0.08,20,gy],[48,H*0.12,14,gy],[68,H*0.05,22,gy],
   [180,H*0.1,18,gy],[208,H*0.06,24,gy],[238,H*0.08,16,gy],[262,H*0.04,20,gy],[288,H*0.1,16,gy]
  ].forEach(([x,y,w,h]) => ctx.fillRect(x, y, w, h));

  // Tree canopies (background, round blobs)
  ctx.fillStyle = '#091209';
  [[10,H*0.05,30],[50,H*0.02,36],[90,H*0.06,28],[140,H*0.03,34],
   [200,H*0.05,30],[240,H*0.02,32],[280,H*0.04,28]
  ].forEach(([cx, cy, r]) => {
    for (let dy = -r; dy <= r; dy += 2) {
      const rw = Math.round(Math.sqrt(r*r - dy*dy) * 2);
      ctx.fillRect(cx - rw/2, cy + dy, rw, 2);
    }
  });

  // Foreground tree trunks (thicker, closer)
  ctx.fillStyle = '#0a1208';
  [[30,H*0.2,10,gy],[75,H*0.18,12,gy],[155,H*0.22,8,gy],[220,H*0.19,10,gy],[275,H*0.21,12,gy]
  ].forEach(([x,y,w,h]) => ctx.fillRect(x, y, w, h));

  // Foreground canopies (darker, larger)
  ctx.fillStyle = '#060e06';
  [[35,H*0.07,38],[80,H*0.04,44],[158,H*0.1,34],[225,H*0.06,40],[280,H*0.08,38]
  ].forEach(([cx, cy, r]) => {
    for (let dy = -r; dy <= r; dy += 2) {
      const rw = Math.round(Math.sqrt(r*r - dy*dy) * 2);
      ctx.fillRect(cx - rw/2, cy + dy, rw, 2);
    }
  });

  // Roots & ground undergrowth
  ctx.fillStyle = '#0c1a0a';
  [[28,gy-6,14,6],[73,gy-8,16,8],[152,gy-5,12,5],[218,gy-7,14,7],[272,gy-6,16,6]
  ].forEach(([x,y,w,h]) => ctx.fillRect(x, y, w, h));

  // Glowing mushrooms
  [[110, gy-6],[165, gy-5],[245, gy-7]].forEach(([mx, my]) => {
    ctx.fillStyle = 'rgba(100,200,80,0.4)';
    ctx.fillRect(mx - 4, my - 4, 8, 4);
    ctx.fillStyle = 'rgba(80,180,60,0.6)';
    ctx.fillRect(mx - 2, my, 4, 6);
    ctx.fillStyle = 'rgba(120,255,100,0.2)';
    ctx.fillRect(mx - 6, my - 6, 12, 6);
  });

  // Fireflies (random dots)
  ctx.fillStyle = 'rgba(200,255,100,0.6)';
  [[52,H*0.3],[95,H*0.45],[148,H*0.25],[190,H*0.38],[260,H*0.3],[300,H*0.42]
  ].forEach(([x,y]) => ctx.fillRect(x, y, 2, 2));

  // Ground mist
  const mist = ctx.createLinearGradient(0, gy - 20, 0, H);
  mist.addColorStop(0, 'rgba(10,30,10,0)');
  mist.addColorStop(0.4, 'rgba(10,30,10,0.5)');
  mist.addColorStop(1, 'rgba(10,30,10,0.8)');
  ctx.fillStyle = mist;
  ctx.fillRect(0, gy - 20, W, H - gy + 20);
}
function drawCaveBg(ctx, W, H) {
  const gy = H * 0.62;
  // Cave wall texture (rough stone)
  ctx.fillStyle = 'rgba(60,20,20,0.1)';
  [[12,8,40,20],[60,15,30,12],[110,5,50,18],[170,10,35,15],[220,8,45,20],[270,12,40,16]
  ].forEach(([x,y,w,h]) => ctx.fillRect(x, y, w, h));

  // Stalactites (hanging from ceiling)
  const stalactites = [
    [5, 0, 16, 28],[32, 0, 10, 38],[55, 0, 18, 22],[82, 0, 12, 32],
    [108, 0, 20, 18],[138, 0, 10, 35],[162, 0, 16, 26],[192, 0, 14, 30],
    [218, 0, 12, 22],[244, 0, 18, 36],[272, 0, 10, 24],[292, 0, 16, 28],
  ];
  stalactites.forEach(([sx, sy, sw, sh]) => {
    // Tapered stalactite (wide at top, narrow at bottom)
    for (let i = 0; i < sh; i++) {
      const taper = Math.round((sw / 2) * (1 - i / sh));
      const rowW = Math.max(2, sw - taper * 2);
      ctx.fillStyle = i < 3 ? '#221515' : '#1a1010';
      ctx.fillRect(sx + taper, sy + i, rowW, 1);
    }
    // Crystal tip highlight
    ctx.fillStyle = '#443030';
    ctx.fillRect(sx + sw / 2 - 1, sy + sh - 2, 2, 2);
  });

  // Stalagmites (rising from floor)
  [[20,gy,8,18],[50,gy,6,12],[95,gy,10,22],[130,gy,7,15],[175,gy,9,20],
   [210,gy,6,14],[250,gy,10,18],[285,gy,7,16],[308,gy,8,20]
  ].forEach(([sx, sy, sw, sh]) => {
    for (let i = 0; i < sh; i++) {
      const taper = Math.round((sw / 2) * (i / sh));
      const rowW = Math.max(2, sw - taper * 2);
      ctx.fillStyle = i > sh - 4 ? '#331a1a' : '#1a1010';
      ctx.fillRect(sx + taper, sy - i, rowW, 1);
    }
  });

  // Underground crystal formations
  [[105, gy - 8],[195, gy - 6],[265, gy - 10]].forEach(([cx, cy]) => {
    ['#223344','#334466','#445577'].forEach((c, i) => {
      ctx.fillStyle = c + 'aa';
      ctx.fillRect(cx + i * 4, cy - i * 4, 4, i * 4 + 6);
    });
    ctx.fillStyle = 'rgba(100,150,255,0.3)';
    ctx.fillRect(cx, cy - 14, 12, 4);
  });

  // Underground pool/puddle
  ctx.fillStyle = 'rgba(0,30,50,0.5)';
  ctx.fillRect(135, gy, 60, H - gy);
  ctx.fillStyle = 'rgba(0,80,120,0.2)';
  ctx.fillRect(138, gy, 54, 3);

  // Dripping water
  ctx.fillStyle = 'rgba(100,180,220,0.4)';
  [[82, 38],[138, 32],[245, 36]].forEach(([x, y]) => {
    ctx.fillRect(x, y, 2, 6);
    ctx.fillRect(x, y + 6, 3, 2);
  });

  // Ambient cave glow (blue-tinted)
  const glow = ctx.createRadialGradient(W/2, H*0.3, 0, W/2, H*0.3, W*0.3);
  glow.addColorStop(0, 'rgba(20,40,60,0.15)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, gy);
}
function drawCastleBg(ctx, W, H) {
  const gy = H * 0.62;
  // Castle stone wall texture
  ctx.fillStyle = 'rgba(40,0,50,0.2)';
  for (let y = 0; y < gy; y += 10) {
    const offset = (Math.floor(y / 10) % 2) * 15;
    for (let x = offset - 15; x < W; x += 30) ctx.fillRect(x, y, 27, 8);
  }
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  for (let y = 0; y < gy; y += 10) ctx.fillRect(0, y, W, 2);

  // Battlements (crenellations) at top
  ctx.fillStyle = '#0d000f';
  for (let bx = 0; bx < W; bx += 20) {
    ctx.fillRect(bx, 0, 12, 14);  // merlon (raised part)
  }

  // Gothic stone pillars
  [[10, 4],[70, 4],[W/2 - 10, 4],[W - 78, 4],[W - 18, 4]].forEach(([px, py]) => {
    const pw = 16, ph = gy - py;
    // Pillar
    ctx.fillStyle = '#110015';
    ctx.fillRect(px, py, pw, ph);
    // Pillar border
    ctx.fillStyle = 'rgba(150,0,150,0.15)';
    ctx.fillRect(px, py, 2, ph);
    ctx.fillRect(px + pw - 2, py, 2, ph);
    // Capital (decorative top)
    ctx.fillStyle = '#1a0020';
    ctx.fillRect(px - 3, py + 12, pw + 6, 5);
    ctx.fillRect(px - 3, ph - 5, pw + 6, 5);
  });

  // Stained glass windows (between pillars)
  const winPanes = [
    { x: 28, colors: ['#330066','#660033','#003366'] },
    { x: 88, colors: ['#440044','#224400','#004444'] },
    { x: W - 90, colors: ['#330066','#880033','#003388'] },
    { x: W - 46, colors: ['#440066','#664400','#002244'] },
  ];
  winPanes.forEach(({ x, colors }) => {
    const wy = 16, wh = 30, ww = 38;
    // Arch top
    ctx.fillStyle = colors[0] + '55';
    for (let ai = 0; ai < 10; ai++) {
      const aw = ww - ai * 2;
      ctx.fillRect(x + ai, wy + ai, aw, 2);
    }
    // Panes
    colors.forEach((c, i) => {
      ctx.fillStyle = c + '88';
      ctx.fillRect(x + 2 + i * 12, wy + 10, 10, wh - 10);
    });
    // Lead lines
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x, wy, ww, 2);
    colors.forEach((_, i) => ctx.fillRect(x + 12 + i * 12, wy, 2, wh));
  });

  // Checkered floor tiles
  ctx.fillStyle = '#0d000f';
  for (let fx = 0; fx < W; fx += 20) {
    for (let fy = 0; fy < H - gy; fy += 14) {
      if ((Math.floor(fx/20) + Math.floor(fy/14)) % 2 === 0) ctx.fillRect(fx, gy + fy, 20, 14);
    }
  }
  ctx.fillStyle = 'rgba(100,0,100,0.08)';
  for (let fx = 0; fx < W; fx += 20) ctx.fillRect(fx, gy, 1, H - gy);
  for (let fy = gy; fy < H; fy += 14) ctx.fillRect(0, fy, W, 1);

  // Candle sconces on pillars
  [[W*0.07, gy * 0.6],[W - W*0.07, gy * 0.6]].forEach(([cx, cy]) => {
    ctx.fillStyle = '#554433';
    ctx.fillRect(cx - 2, cy, 4, 8);
    ctx.fillStyle = 'rgba(255,80,200,0.2)';
    ctx.fillRect(cx - 8, cy - 10, 16, 12);
    ctx.fillStyle = '#ff44aa';
    ctx.fillRect(cx - 1, cy - 6, 2, 6);
    ctx.fillStyle = '#ffaaee';
    ctx.fillRect(cx - 1, cy - 8, 2, 3);
  });

  // Purple mist at top and bottom
  const topMist = ctx.createLinearGradient(0, 0, 0, gy * 0.5);
  topMist.addColorStop(0, 'rgba(60,0,80,0.35)');
  topMist.addColorStop(1, 'rgba(60,0,80,0)');
  ctx.fillStyle = topMist;
  ctx.fillRect(0, 0, W, gy * 0.5);

  const floorMist = ctx.createLinearGradient(0, gy, 0, H);
  floorMist.addColorStop(0, 'rgba(40,0,60,0.2)');
  floorMist.addColorStop(1, 'rgba(20,0,40,0.5)');
  ctx.fillStyle = floorMist;
  ctx.fillRect(0, gy, W, H - gy);
}

// ── Parse & Draw Sprite ──────────────────────────────────────────────────────
// Row format: '.' = 1 transparent pixel, 'XX' = 2-char colour key
function _parseRows(def, px, flipX) {
  // Returns array of {dx, dy, color} paint commands
  const cmds = [];
  def.r.forEach((row, ry) => {
    let rx = 0, ci = 0;
    while (ci < row.length && rx < 16) {
      if (row[ci] === '.') { ci++; rx++; continue; }
      const k2 = row.slice(ci, ci + 2);
      if (!COL[k2]) { ci += 2; rx++; continue; }
      cmds.push({ rx, ry, color: COL[k2] });
      ci += 2; rx++;
    }
  });
  return cmds;
}

function drawSprite(ctx, key, x, y, scale, flipX, defeated) {
  const def = DEF[key] || DEF.globby;
  const px = Math.round(PX * scale);
  ctx.save();
  if (defeated) { ctx.globalAlpha = 0.3; ctx.filter = 'grayscale(1)'; }

  const cmds = _parseRows(def, px, flipX);

  // Pass 1: dark outline (1px outset in all 4 directions)
  if (!defeated) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    cmds.forEach(({ rx, ry, color }) => {
      const dx = flipX ? x + (15 - rx) * px : x + rx * px;
      const dy = y + ry * px;
      ctx.fillRect(dx - 1, dy, px + 2, px);
      ctx.fillRect(dx, dy - 1, px, px + 2);
    });
  }

  // Pass 2: actual sprite pixels
  cmds.forEach(({ rx, ry, color }) => {
    const dx = flipX ? x + (15 - rx) * px : x + rx * px;
    ctx.fillStyle = color;
    ctx.fillRect(dx, y + ry * px, px, px);
  });

  ctx.restore();
}

// Drop shadow under sprite (simple ellipse approximation)
function drawGroundShadow(ctx, cx, cy, w) {
  const sw = Math.floor(w * 0.75);
  const sx = cx - sw / 2;
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(sx, cy - 2, sw, 4);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(sx + 2, cy - 4, sw - 4, 8);
}

// ── Target Indicator ─────────────────────────────────────────────────────────
function drawTargetArrow(ctx, cx, cy, color) {
  ctx.fillStyle = color;
  // Blinking handled by animation in JS; just draw static arrow
  ctx.beginPath();
  ctx.moveTo(cx, cy - 4);
  ctx.lineTo(cx - 6, cy - 12);
  ctx.lineTo(cx + 6, cy - 12);
  ctx.closePath();
  ctx.fill();
}

// ── HP Bar ───────────────────────────────────────────────────────────────────
function drawHpBar(ctx, x, y, w, pct, color, bg) {
  ctx.fillStyle = bg || '#222';
  ctx.fillRect(x, y, w, 3);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Math.floor(w * pct), 3);
}

// ── Main Render ──────────────────────────────────────────────────────────────
function drawBattleCanvas() {
  const canvas = document.getElementById('battle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const W = canvas.width, H = canvas.height;
  const mapId = (G.map ? G.map.id : null) || 'dungeon';
  const bg = MAP_BG[mapId] || MAP_BG.dungeon;

  // 1. Background
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.62);
  skyGrad.addColorStop(0, bg.sky1);
  skyGrad.addColorStop(1, bg.sky2);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H * 0.62);

  const groundGrad = ctx.createLinearGradient(0, H * 0.62, 0, H);
  groundGrad.addColorStop(0, bg.ground1);
  groundGrad.addColorStop(1, bg.ground2);
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, H * 0.62, W, H * 0.38);

  if (bg.detail) bg.detail(ctx, W, H);

  // Divider line
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, H * 0.62, W, 1);

  const b = G.battle;
  const partySize = G.party ? G.party.length : 1;
  // Scale down slightly when more party members
  const sprScale = partySize >= 3 ? 0.8 : partySize === 2 ? 0.9 : 1.0;
  const sprW = 16 * PX * sprScale;
  const sprH = 16 * PX * sprScale;

  const groundY = H * 0.32;

  // Ally X positions based on party size (player + up to 3 pets in left half W*0.44)
  const allySlots = [W * 0.02]; // player always first
  if (partySize === 1) allySlots.push(W * 0.24);
  else if (partySize === 2) { allySlots.push(W * 0.18); allySlots.push(W * 0.34); }
  else { allySlots.push(W * 0.15); allySlots.push(W * 0.26); allySlots.push(W * 0.37); }

  // 2. Player — LEFT side slot 0
  const playerX = allySlots[0];
  if (b.playerHp > 0) {
    drawGroundShadow(ctx, playerX + sprW/2, groundY + sprH, sprW);
    drawSprite(ctx, 'player', playerX, groundY, sprScale, false, b.playerHp <= 0);
    const pPct = b.playerMaxHp > 0 ? Math.max(0, b.playerHp / b.playerMaxHp) : 0;
    drawHpBar(ctx, playerX, groundY + sprH + 2, sprW, pPct, '#33cc55', '#111');
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(playerX, groundY + sprH + 7, sprW, 8);
    ctx.fillStyle = '#88ddff';
    ctx.font = '6px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Lv.${Player.level} 캐릭터`, playerX + 1, groundY + sprH + 14);
  }

  // 3. Party pets
  if (G.party) {
    G.party.forEach((pet, pi) => {
      const petX = allySlots[pi + 1];
      if (petX === undefined) return;
      const petKey = EMOJI_SPRITE[pet.emoji] || 'globby';
      const petDefeated = b.petsHp[pi] <= 0;
      drawGroundShadow(ctx, petX + sprW/2, groundY + sprH, sprW);
      drawSprite(ctx, petKey, petX, groundY, sprScale, false, petDefeated);
      const petPct = b.petsMaxHp[pi] > 0 ? Math.max(0, b.petsHp[pi] / b.petsMaxHp[pi]) : 0;
      drawHpBar(ctx, petX, groundY + sprH + 2, sprW, petPct, '#5599ff', '#111');
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(petX, groundY + sprH + 7, sprW, 8);
      ctx.fillStyle = '#f0c060';
      ctx.font = '6px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Lv.${pet.level} ${pet.name}`, petX + 1, groundY + sprH + 14);
    });
  }

  // 3. VS divider (center line)
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.fillRect(W * 0.44, 0, 1, H * 0.62);

  // 4. Enemies — spread across RIGHT half
  const enemyCount = b.monsters.length;
  const rightStart = W * 0.48;
  const rightW = W - rightStart;
  const spacing = rightW / (enemyCount + 1);
  b.monsters.forEach((m, i) => {
    const cx = rightStart + spacing * (i + 1) - sprW / 2;
    const cy = groundY;
    const sprKey = EMOJI_SPRITE[m.emoji] || 'creeper';
    const defeated = m.currentHp <= 0;
    const isTarget = (i === b.targetIdx) && !defeated;

    if (isTarget) {
      ctx.fillStyle = m.capturable ? 'rgba(255,200,0,0.3)' : 'rgba(255,60,80,0.3)';
      ctx.fillRect(cx - 4, cy - 4, sprW + 8, sprH + 8);
    }

    drawGroundShadow(ctx, cx + sprW/2, cy + sprH, sprW);
    drawSprite(ctx, sprKey, cx, cy, sprScale, true, defeated);

    const hpPct = m.hp > 0 ? Math.max(0, m.currentHp / m.hp) : 0;
    drawHpBar(ctx, cx, cy + sprH + 2, sprW, hpPct, '#cc3333', '#111');

    if (isTarget) drawTargetArrow(ctx, cx + sprW/2, cy - 4, m.capturable ? '#ffcc00' : '#ff4466');

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(cx, cy + sprH + 7, sprW, 8);
    ctx.fillStyle = m.capturable ? '#ffcc55' : '#ccc';
    ctx.font = '6px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Lv.${m.level} ${m.name}`, cx + 1, cy + sprH + 14);
  });
}
