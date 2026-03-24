const fs = require('fs');
const d = 'C:/Users/admin/Desktop/AI_Code/rpg_proto/images/pets';

function quad(name, ec, bc, bl, lc, ey, ns, tt) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="3"  y="0"  width="6"  height="2"/><rect x="3"  y="2"  width="2"  height="6"/>
    <rect x="7"  y="2"  width="2"  height="6"/><rect x="13" y="0"  width="6"  height="2"/>
    <rect x="13" y="2"  width="2"  height="6"/><rect x="17" y="2"  width="2"  height="6"/>
    <rect x="2"  y="8"  width="18" height="2"/><rect x="2"  y="8"  width="2"  height="10"/>
    <rect x="18" y="8"  width="2"  height="10"/><rect x="2"  y="18" width="18" height="2"/>
    <rect x="0"  y="18" width="22" height="2"/><rect x="0"  y="20" width="2"  height="8"/>
    <rect x="20" y="20" width="2"  height="8"/><rect x="2"  y="26" width="4"  height="2"/>
    <rect x="8"  y="26" width="4"  height="2"/><rect x="14" y="26" width="4"  height="2"/>
    <rect x="18" y="26" width="4"  height="2"/><rect x="2"  y="28" width="4"  height="2"/>
    <rect x="8"  y="28" width="4"  height="2"/><rect x="14" y="28" width="4"  height="2"/>
    <rect x="18" y="28" width="4"  height="2"/><rect x="22" y="18" width="2"  height="4"/>
    <rect x="24" y="16" width="2"  height="4"/><rect x="26" y="14" width="2"  height="4"/>
    <rect x="28" y="12" width="2"  height="4"/><rect x="30" y="10" width="2"  height="4"/>
  </g>
  <g fill="${ec}"><rect x="5" y="2" width="2" height="6"/><rect x="15" y="2" width="2" height="6"/></g>
  <g fill="${bc}">
    <rect x="4"  y="8"  width="14" height="10"/><rect x="2"  y="20" width="18" height="6"/>
    <rect x="24" y="18" width="2"  height="2"/><rect x="26" y="16" width="2"  height="2"/>
    <rect x="28" y="14" width="2"  height="2"/>
  </g>
  <g fill="${tt||bc}"><rect x="30" y="12" width="2" height="2"/></g>
  <g fill="${bl}"><rect x="6" y="22" width="8" height="4"/></g>
  <g fill="${lc}">
    <rect x="4"  y="26" width="2"  height="2"/><rect x="10" y="26" width="2"  height="2"/>
    <rect x="16" y="26" width="2"  height="2"/><rect x="20" y="26" width="2"  height="2"/>
  </g>
  <g fill="${ey}"><rect x="6" y="12" width="2" height="2"/><rect x="14" y="12" width="2" height="2"/></g>
  <g fill="${ns}"><rect x="10" y="14" width="4" height="2"/></g>
</svg>`;
}

function drg(name, hn, bc, bl, lc, ey) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="2"  y="0"  width="4"  height="2"/><rect x="2"  y="0"  width="2"  height="8"/>
    <rect x="4"  y="2"  width="2"  height="6"/><rect x="14" y="0"  width="4"  height="2"/>
    <rect x="14" y="0"  width="2"  height="8"/><rect x="16" y="2"  width="2"  height="6"/>
    <rect x="2"  y="8"  width="18" height="2"/><rect x="2"  y="8"  width="2"  height="10"/>
    <rect x="18" y="8"  width="2"  height="10"/><rect x="2"  y="18" width="18" height="2"/>
    <rect x="0"  y="18" width="22" height="2"/><rect x="0"  y="20" width="2"  height="8"/>
    <rect x="20" y="20" width="2"  height="8"/><rect x="2"  y="26" width="4"  height="2"/>
    <rect x="8"  y="26" width="4"  height="2"/><rect x="14" y="26" width="4"  height="2"/>
    <rect x="18" y="26" width="4"  height="2"/><rect x="2"  y="28" width="4"  height="2"/>
    <rect x="8"  y="28" width="4"  height="2"/><rect x="14" y="28" width="4"  height="2"/>
    <rect x="18" y="28" width="4"  height="2"/><rect x="22" y="18" width="2"  height="4"/>
    <rect x="24" y="16" width="2"  height="4"/><rect x="26" y="14" width="4"  height="4"/>
    <rect x="28" y="12" width="4"  height="4"/><rect x="30" y="10" width="2"  height="4"/>
  </g>
  <g fill="${hn}"><rect x="3" y="2" width="2" height="6"/><rect x="15" y="2" width="2" height="6"/></g>
  <g fill="${bc}">
    <rect x="4"  y="8"  width="14" height="10"/><rect x="2"  y="20" width="18" height="6"/>
    <rect x="24" y="18" width="2"  height="2"/><rect x="26" y="16" width="2"  height="2"/>
    <rect x="28" y="14" width="2"  height="2"/><rect x="30" y="12" width="2"  height="2"/>
  </g>
  <g fill="${bl}"><rect x="6" y="22" width="8" height="4"/></g>
  <g fill="${lc}">
    <rect x="4"  y="26" width="2"  height="2"/><rect x="10" y="26" width="2"  height="2"/>
    <rect x="16" y="26" width="2"  height="2"/><rect x="20" y="26" width="2"  height="2"/>
  </g>
  <g fill="${ey}"><rect x="6" y="12" width="2" height="2"/><rect x="14" y="12" width="2" height="2"/></g>
  <g fill="${bl}"><rect x="10" y="14" width="4" height="2"/></g>
</svg>`;
}

function bat(name, hc, wc, bc, ey) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="10" y="2"  width="2"  height="4"/><rect x="16" y="2"  width="2"  height="4"/>
    <rect x="8"  y="6"  width="12" height="2"/><rect x="8"  y="6"  width="2"  height="8"/>
    <rect x="18" y="6"  width="2"  height="8"/><rect x="8"  y="14" width="12" height="2"/>
    <rect x="0"  y="8"  width="8"  height="2"/><rect x="0"  y="8"  width="2"  height="8"/>
    <rect x="2"  y="16" width="6"  height="2"/><rect x="22" y="8"  width="8"  height="2"/>
    <rect x="28" y="8"  width="2"  height="8"/><rect x="22" y="16" width="6"  height="2"/>
    <rect x="10" y="14" width="8"  height="2"/><rect x="10" y="14" width="2"  height="8"/>
    <rect x="16" y="14" width="2"  height="8"/><rect x="10" y="22" width="8"  height="2"/>
    <rect x="10" y="24" width="4"  height="2"/><rect x="14" y="24" width="4"  height="2"/>
    <rect x="10" y="26" width="2"  height="2"/><rect x="16" y="26" width="2"  height="2"/>
  </g>
  <g fill="${hc}"><rect x="10" y="8" width="8" height="6"/></g>
  <g fill="${wc}"><rect x="2" y="10" width="6" height="6"/><rect x="22" y="10" width="6" height="6"/></g>
  <g fill="${bc}"><rect x="12" y="16" width="4" height="6"/></g>
  <g fill="${ey}"><rect x="10" y="10" width="2" height="2"/><rect x="16" y="10" width="2" height="2"/></g>
  <g fill="${wc}"><rect x="12" y="12" width="4" height="2"/></g>
</svg>`;
}

function slime(name, bc, cc, ey, mo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="12" y="6"  width="4"  height="2"/><rect x="10" y="8"  width="2"  height="2"/>
    <rect x="16" y="8"  width="2"  height="2"/><rect x="8"  y="10" width="10" height="2"/>
    <rect x="6"  y="12" width="2"  height="8"/><rect x="18" y="12" width="2"  height="8"/>
    <rect x="8"  y="20" width="10" height="2"/><rect x="6"  y="22" width="14" height="2"/>
    <rect x="4"  y="22" width="2"  height="4"/><rect x="20" y="22" width="2"  height="4"/>
    <rect x="6"  y="24" width="4"  height="2"/><rect x="14" y="24" width="4"  height="2"/>
    <rect x="6"  y="26" width="4"  height="2"/><rect x="14" y="26" width="4"  height="2"/>
  </g>
  <g fill="${bc}">
    <rect x="10" y="8"  width="8"  height="2"/><rect x="8"  y="10" width="10" height="10"/>
    <rect x="6"  y="12" width="2"  height="6"/><rect x="18" y="12" width="2"  height="6"/>
    <rect x="8"  y="20" width="10" height="2"/>
  </g>
  <g fill="${cc}"><rect x="10" y="12" width="6" height="4"/></g>
  <g fill="${ey}"><rect x="10" y="14" width="2" height="2"/><rect x="14" y="14" width="2" height="2"/></g>
  <g fill="${mo}"><rect x="12" y="17" width="4" height="2"/></g>
</svg>`;
}

function ghost(name, bc, ic, ey) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="10" y="4"  width="6"  height="2"/><rect x="8"  y="6"  width="2"  height="2"/>
    <rect x="16" y="6"  width="2"  height="2"/><rect x="8"  y="6"  width="10" height="2"/>
    <rect x="6"  y="8"  width="2"  height="12"/><rect x="18" y="8"  width="2"  height="12"/>
    <rect x="4"  y="14" width="2"  height="8"/><rect x="20" y="14" width="2"  height="8"/>
    <rect x="6"  y="12" width="12" height="2"/><rect x="4"  y="22" width="4"  height="2"/>
    <rect x="10" y="22" width="6"  height="2"/><rect x="18" y="22" width="4"  height="2"/>
    <rect x="4"  y="24" width="2"  height="4"/><rect x="10" y="24" width="2"  height="4"/>
    <rect x="16" y="24" width="2"  height="4"/><rect x="20" y="24" width="2"  height="4"/>
    <rect x="6"  y="26" width="2"  height="2"/><rect x="12" y="26" width="2"  height="2"/>
    <rect x="18" y="26" width="2"  height="2"/>
  </g>
  <g fill="${bc}">
    <rect x="8"  y="8"  width="10" height="14"/><rect x="6"  y="10" width="2"  height="10"/>
    <rect x="18" y="10" width="2"  height="10"/><rect x="10" y="6"  width="6"  height="2"/>
    <rect x="6"  y="20" width="14" height="2"/>
  </g>
  <g fill="${ic}"><rect x="10" y="10" width="6" height="8"/></g>
  <g fill="${ey}"><rect x="8" y="10" width="2" height="2"/><rect x="16" y="10" width="2" height="2"/></g>
</svg>`;
}

function plant(name, lc, bk, rt, ey, mo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="4"  y="2"  width="16" height="2"/><rect x="2"  y="4"  width="2"  height="8"/>
    <rect x="20" y="4"  width="2"  height="8"/><rect x="4"  y="12" width="16" height="2"/>
    <rect x="8"  y="12" width="2"  height="6"/><rect x="16" y="12" width="2"  height="6"/>
    <rect x="8"  y="18" width="10" height="2"/><rect x="10" y="18" width="2"  height="8"/>
    <rect x="14" y="18" width="2"  height="8"/><rect x="10" y="26" width="6"  height="2"/>
    <rect x="4"  y="24" width="4"  height="2"/><rect x="18" y="24" width="4"  height="2"/>
    <rect x="2"  y="26" width="6"  height="2"/><rect x="18" y="26" width="6"  height="2"/>
    <rect x="2"  y="28" width="6"  height="2"/><rect x="18" y="28" width="6"  height="2"/>
  </g>
  <g fill="${lc}"><rect x="4" y="4" width="16" height="8"/></g>
  <g fill="${bk}">
    <rect x="10" y="14" width="6"  height="4"/><rect x="12" y="20" width="2"  height="6"/>
  </g>
  <g fill="${rt}">
    <rect x="4"  y="26" width="4"  height="2"/><rect x="18" y="26" width="4"  height="2"/>
  </g>
  <g fill="${ey}"><rect x="9" y="6" width="2" height="2"/><rect x="15" y="6" width="2" height="2"/></g>
  <g fill="${mo}"><rect x="11" y="8" width="4" height="2"/></g>
</svg>`;
}

function fish(name, bc, fc, ey, belly) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="22" y="6"  width="2"  height="18"/><rect x="24" y="4"  width="2"  height="22"/>
    <rect x="26" y="2"  width="2"  height="26"/><rect x="4"  y="10" width="18" height="2"/>
    <rect x="4"  y="10" width="2"  height="10"/><rect x="20" y="10" width="2"  height="10"/>
    <rect x="4"  y="20" width="18" height="2"/><rect x="2"  y="12" width="2"  height="6"/>
    <rect x="0"  y="14" width="2"  height="4"/><rect x="8"  y="8"  width="8"  height="2"/>
    <rect x="8"  y="8"  width="2"  height="2"/><rect x="14" y="8"  width="2"  height="2"/>
    <rect x="8"  y="18" width="4"  height="4"/>
  </g>
  <g fill="${bc}">
    <rect x="4"  y="12" width="16" height="8"/><rect x="6"  y="10" width="14" height="2"/>
    <rect x="6"  y="20" width="14" height="2"/>
  </g>
  <g fill="${belly}"><rect x="6" y="14" width="10" height="4"/></g>
  <g fill="${fc}">
    <rect x="24" y="6"  width="2"  height="18"/><rect x="26" y="4"  width="2"  height="22"/>
    <rect x="10" y="8"  width="4"  height="2"/>
  </g>
  <g fill="${ey}"><rect x="4" y="12" width="2" height="2"/></g>
</svg>`;
}

function bird(name, bc, wc, bk, ey) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="10" y="4"  width="8"  height="2"/><rect x="8"  y="6"  width="2"  height="6"/>
    <rect x="18" y="6"  width="2"  height="6"/><rect x="10" y="12" width="8"  height="2"/>
    <rect x="12" y="12" width="4"  height="4"/><rect x="6"  y="14" width="2"  height="8"/>
    <rect x="20" y="14" width="2"  height="8"/><rect x="6"  y="14" width="16" height="2"/>
    <rect x="6"  y="22" width="16" height="2"/><rect x="4"  y="16" width="2"  height="6"/>
    <rect x="22" y="16" width="2"  height="6"/><rect x="10" y="22" width="4"  height="4"/>
    <rect x="14" y="22" width="4"  height="4"/><rect x="10" y="26" width="4"  height="2"/>
    <rect x="14" y="26" width="4"  height="2"/><rect x="8"  y="28" width="4"  height="2"/>
    <rect x="16" y="28" width="4"  height="2"/>
  </g>
  <g fill="${bc}">
    <rect x="10" y="6"  width="8"  height="6"/><rect x="8"  y="14" width="12" height="8"/>
  </g>
  <g fill="${wc}">
    <rect x="6"  y="16" width="2"  height="4"/><rect x="22" y="16" width="2"  height="4"/>
    <rect x="12" y="22" width="2"  height="4"/><rect x="16" y="22" width="2"  height="2"/>
  </g>
  <g fill="${bk}"><rect x="13" y="13" width="2" height="2"/></g>
  <g fill="${ey}"><rect x="10" y="8" width="2" height="2"/><rect x="16" y="8" width="2" height="2"/></g>
</svg>`;
}

function insect(name, hc, bc, lc, ey) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="10" y="0"  width="2"  height="6"/><rect x="16" y="0"  width="2"  height="6"/>
    <rect x="8"  y="0"  width="2"  height="2"/><rect x="18" y="0"  width="2"  height="2"/>
    <rect x="10" y="6"  width="8"  height="2"/><rect x="8"  y="8"  width="2"  height="4"/>
    <rect x="18" y="8"  width="2"  height="4"/><rect x="10" y="12" width="8"  height="2"/>
    <rect x="8"  y="12" width="10" height="2"/><rect x="6"  y="14" width="2"  height="4"/>
    <rect x="20" y="14" width="2"  height="4"/><rect x="8"  y="18" width="10" height="2"/>
    <rect x="6"  y="18" width="2"  height="6"/><rect x="20" y="18" width="2"  height="6"/>
    <rect x="8"  y="24" width="10" height="2"/><rect x="2"  y="14" width="4"  height="2"/>
    <rect x="2"  y="16" width="2"  height="2"/><rect x="22" y="14" width="4"  height="2"/>
    <rect x="24" y="16" width="2"  height="2"/><rect x="2"  y="18" width="4"  height="2"/>
    <rect x="22" y="18" width="4"  height="2"/><rect x="2"  y="20" width="4"  height="2"/>
    <rect x="22" y="20" width="4"  height="2"/>
  </g>
  <g fill="${hc}"><rect x="10" y="8" width="8" height="4"/></g>
  <g fill="${bc}">
    <rect x="8"  y="14" width="10" height="4"/><rect x="8"  y="20" width="10" height="4"/>
  </g>
  <g fill="${lc}">
    <rect x="4"  y="14" width="2"  height="4"/><rect x="22" y="14" width="2"  height="4"/>
    <rect x="2"  y="18" width="4"  height="2"/><rect x="22" y="18" width="4"  height="2"/>
  </g>
  <g fill="${ey}"><rect x="10" y="8" width="2" height="2"/><rect x="16" y="8" width="2" height="2"/></g>
</svg>`;
}

function golem(name, bc, ic, ey) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="8"  y="2"  width="12" height="2"/><rect x="6"  y="4"  width="2"  height="8"/>
    <rect x="18" y="4"  width="2"  height="8"/><rect x="8"  y="12" width="12" height="2"/>
    <rect x="4"  y="12" width="2"  height="12"/><rect x="22" y="12" width="2"  height="12"/>
    <rect x="4"  y="12" width="20" height="2"/><rect x="4"  y="24" width="20" height="2"/>
    <rect x="0"  y="14" width="4"  height="10"/><rect x="24" y="14" width="4"  height="10"/>
    <rect x="6"  y="24" width="6"  height="6"/><rect x="16" y="24" width="6"  height="6"/>
  </g>
  <g fill="${bc}">
    <rect x="8"  y="4"  width="12" height="8"/><rect x="6"  y="14" width="16" height="10"/>
    <rect x="2"  y="16" width="2"  height="6"/><rect x="24" y="16" width="2"  height="6"/>
  </g>
  <g fill="${ic}">
    <rect x="10" y="6"  width="8"  height="4"/><rect x="8"  y="16" width="12" height="6"/>
  </g>
  <g fill="${ey}"><rect x="8" y="6" width="2" height="2"/><rect x="14" y="6" width="2" height="2"/></g>
  <g fill="${bc}"><rect x="8" y="26" width="4" height="2"/><rect x="18" y="26" width="4" height="2"/></g>
</svg>`;
}

function demon(name, sk, ic, ey, hn, wc) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="8"  y="0"  width="2"  height="6"/><rect x="18" y="0"  width="2"  height="6"/>
    <rect x="6"  y="0"  width="4"  height="2"/><rect x="18" y="0"  width="4"  height="2"/>
    <rect x="8"  y="6"  width="12" height="2"/><rect x="8"  y="6"  width="2"  height="8"/>
    <rect x="18" y="6"  width="2"  height="8"/><rect x="8"  y="14" width="12" height="2"/>
    <rect x="8"  y="14" width="2"  height="10"/><rect x="18" y="14" width="2"  height="10"/>
    <rect x="10" y="14" width="8"  height="2"/><rect x="10" y="24" width="8"  height="2"/>
    <rect x="0"  y="14" width="8"  height="2"/><rect x="0"  y="14" width="2"  height="8"/>
    <rect x="2"  y="22" width="6"  height="2"/><rect x="22" y="14" width="8"  height="2"/>
    <rect x="28" y="14" width="2"  height="8"/><rect x="22" y="22" width="6"  height="2"/>
    <rect x="10" y="24" width="4"  height="6"/><rect x="16" y="24" width="4"  height="6"/>
    <rect x="16" y="22" width="2"  height="4"/><rect x="18" y="20" width="2"  height="2"/>
    <rect x="20" y="18" width="2"  height="4"/>
  </g>
  <g fill="${hn}"><rect x="9" y="2" width="2" height="4"/><rect x="19" y="2" width="2" height="4"/></g>
  <g fill="${sk}">
    <rect x="10" y="8"  width="8"  height="6"/><rect x="10" y="16" width="8"  height="8"/>
  </g>
  <g fill="${ic}"><rect x="12" y="10" width="4" height="2"/></g>
  <g fill="${wc}"><rect x="2" y="16" width="6" height="6"/><rect x="22" y="16" width="6" height="6"/></g>
  <g fill="${ey}"><rect x="10" y="8" width="2" height="2"/><rect x="16" y="8" width="2" height="2"/></g>
  <g fill="${sk}"><rect x="12" y="26" width="2" height="2"/><rect x="18" y="26" width="2" height="2"/></g>
</svg>`;
}

function turtle(name, sc, hc, ey, st) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="6"  y="4"  width="16" height="2"/><rect x="4"  y="6"  width="2"  height="14"/>
    <rect x="20" y="6"  width="2"  height="14"/><rect x="6"  y="20" width="16" height="2"/>
    <rect x="2"  y="8"  width="2"  height="10"/><rect x="22" y="8"  width="2"  height="10"/>
    <rect x="2"  y="12" width="6"  height="2"/><rect x="2"  y="20" width="6"  height="2"/>
    <rect x="4"  y="20" width="4"  height="4"/><rect x="16" y="20" width="4"  height="4"/>
    <rect x="4"  y="22" width="4"  height="4"/><rect x="16" y="22" width="4"  height="4"/>
    <rect x="20" y="18" width="4"  height="2"/><rect x="22" y="20" width="2"  height="2"/>
  </g>
  <g fill="${sc}">
    <rect x="6"  y="6"  width="16" height="14"/><rect x="4"  y="8"  width="2"  height="10"/>
    <rect x="20" y="8"  width="2"  height="10"/>
  </g>
  <g fill="${st}">
    <rect x="8"  y="6"  width="2"  height="14"/><rect x="14" y="6"  width="2"  height="14"/>
  </g>
  <g fill="${hc}">
    <rect x="2"  y="14" width="6"  height="6"/><rect x="4"  y="22" width="2"  height="2"/>
    <rect x="16" y="22" width="2"  height="2"/>
  </g>
  <g fill="${ey}"><rect x="2" y="14" width="2" height="2"/></g>
</svg>`;
}

function skel(name, bn, dk, ey, ac) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="10" y="2"  width="8"  height="2"/><rect x="8"  y="4"  width="2"  height="8"/>
    <rect x="18" y="4"  width="2"  height="8"/><rect x="10" y="12" width="8"  height="2"/>
    <rect x="8"  y="10" width="4"  height="2"/><rect x="16" y="10" width="4"  height="2"/>
    <rect x="12" y="14" width="4"  height="10"/><rect x="6"  y="15" width="6"  height="2"/>
    <rect x="16" y="15" width="6"  height="2"/><rect x="6"  y="19" width="6"  height="2"/>
    <rect x="16" y="19" width="6"  height="2"/><rect x="4"  y="14" width="6"  height="2"/>
    <rect x="4"  y="14" width="2"  height="6"/><rect x="4"  y="20" width="4"  height="2"/>
    <rect x="2"  y="22" width="4"  height="2"/><rect x="20" y="14" width="6"  height="2"/>
    <rect x="24" y="14" width="2"  height="6"/><rect x="22" y="20" width="4"  height="2"/>
    <rect x="24" y="22" width="4"  height="2"/><rect x="10" y="24" width="4"  height="6"/>
    <rect x="16" y="24" width="4"  height="6"/><rect x="8"  y="28" width="4"  height="2"/>
    <rect x="18" y="28" width="4"  height="2"/>
  </g>
  <g fill="${bn}">
    <rect x="10" y="4"  width="8"  height="6"/><rect x="8"  y="6"  width="2"  height="4"/>
    <rect x="18" y="6"  width="2"  height="4"/><rect x="12" y="15" width="2"  height="8"/>
    <rect x="12" y="24" width="2"  height="4"/><rect x="18" y="24" width="2"  height="4"/>
  </g>
  <g fill="${ey}"><rect x="10" y="8" width="2" height="2"/><rect x="16" y="8" width="2" height="2"/></g>
  <g fill="${ac}"><rect x="12" y="10" width="4" height="2"/></g>
</svg>`;
}

function fairy(name, bc, wc, ey, hc, gl) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- ${name} -->
  <g fill="#111111">
    <rect x="10" y="2"  width="8"  height="2"/><rect x="8"  y="4"  width="2"  height="2"/>
    <rect x="18" y="4"  width="2"  height="2"/><rect x="8"  y="6"  width="12" height="2"/>
    <rect x="8"  y="6"  width="2"  height="8"/><rect x="18" y="6"  width="2"  height="8"/>
    <rect x="8"  y="14" width="12" height="2"/><rect x="10" y="14" width="2"  height="8"/>
    <rect x="16" y="14" width="2"  height="8"/><rect x="10" y="14" width="8"  height="2"/>
    <rect x="10" y="22" width="8"  height="2"/><rect x="0"  y="10" width="8"  height="2"/>
    <rect x="0"  y="10" width="2"  height="6"/><rect x="2"  y="16" width="8"  height="2"/>
    <rect x="22" y="10" width="8"  height="2"/><rect x="28" y="10" width="2"  height="6"/>
    <rect x="22" y="16" width="8"  height="2"/><rect x="8"  y="22" width="2"  height="4"/>
    <rect x="18" y="22" width="2"  height="4"/><rect x="8"  y="26" width="12" height="2"/>
    <rect x="10" y="28" width="4"  height="2"/><rect x="14" y="28" width="4"  height="2"/>
  </g>
  <g fill="${hc}">
    <rect x="10" y="4"  width="8"  height="2"/><rect x="8"  y="6"  width="2"  height="2"/>
    <rect x="18" y="6"  width="2"  height="2"/>
  </g>
  <g fill="${bc}">
    <rect x="10" y="8"  width="8"  height="6"/><rect x="12" y="16" width="4"  height="6"/>
  </g>
  <g fill="${wc}"><rect x="2" y="12" width="6" height="4"/><rect x="22" y="12" width="6" height="4"/></g>
  <g fill="${gl}"><rect x="10" y="24" width="8" height="2"/></g>
  <g fill="${ey}"><rect x="10" y="10" width="2" height="2"/><rect x="16" y="10" width="2" height="2"/></g>
  <g fill="${bc}"><rect x="12" y="12" width="4" height="2"/></g>
</svg>`;
}

// Fire blob (94 - Ignis)
const fireBlob = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- 이그니스 (Ignis) — fire blob -->
  <g fill="#DD2200">
    <rect x="12" y="0"  width="4"  height="2"/><rect x="10" y="2"  width="2"  height="2"/>
    <rect x="16" y="2"  width="2"  height="2"/><rect x="8"  y="4"  width="2"  height="2"/>
    <rect x="18" y="4"  width="2"  height="2"/><rect x="6"  y="6"  width="2"  height="2"/>
    <rect x="20" y="6"  width="2"  height="2"/><rect x="4"  y="8"  width="16" height="2"/>
    <rect x="4"  y="8"  width="2"  height="12"/><rect x="18" y="8"  width="2"  height="12"/>
    <rect x="4"  y="20" width="16" height="2"/><rect x="2"  y="20" width="2"  height="6"/>
    <rect x="20" y="20" width="2"  height="6"/><rect x="4"  y="24" width="4"  height="2"/>
    <rect x="14" y="24" width="4"  height="2"/><rect x="4"  y="26" width="4"  height="2"/>
    <rect x="14" y="26" width="4"  height="2"/>
  </g>
  <g fill="#FF6600">
    <rect x="6"  y="8"  width="12" height="12"/><rect x="12" y="2"  width="4"  height="2"/>
    <rect x="10" y="4"  width="2"  height="2"/><rect x="16" y="4"  width="2"  height="2"/>
    <rect x="8"  y="6"  width="2"  height="2"/><rect x="18" y="6"  width="2"  height="2"/>
    <rect x="4"  y="22" width="16" height="2"/>
  </g>
  <g fill="#FFEE00">
    <rect x="8"  y="10" width="8"  height="6"/><rect x="12" y="4"  width="2"  height="2"/>
    <rect x="10" y="6"  width="2"  height="2"/><rect x="16" y="6"  width="2"  height="2"/>
  </g>
  <g fill="#FFAA00">
    <rect x="8"  y="12" width="2"  height="2"/><rect x="14" y="12" width="2"  height="2"/>
  </g>
</svg>`;

// Goblin (203)
const goblin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">
  <!-- 고블린 (Goblin) -->
  <g fill="#111111">
    <rect x="6"  y="2"  width="16" height="2"/><rect x="4"  y="4"  width="2"  height="10"/>
    <rect x="20" y="4"  width="2"  height="10"/><rect x="6"  y="14" width="16" height="2"/>
    <rect x="2"  y="4"  width="2"  height="4"/><rect x="22" y="4"  width="2"  height="4"/>
    <rect x="2"  y="8"  width="2"  height="4"/><rect x="22" y="8"  width="2"  height="4"/>
    <rect x="2"  y="6"  width="2"  height="2"/><rect x="24" y="6"  width="2"  height="2"/>
    <rect x="10" y="14" width="2"  height="10"/><rect x="16" y="14" width="2"  height="10"/>
    <rect x="10" y="14" width="8"  height="2"/><rect x="10" y="24" width="8"  height="2"/>
    <rect x="10" y="24" width="4"  height="6"/><rect x="16" y="24" width="4"  height="6"/>
  </g>
  <g fill="#66AA33">
    <rect x="6"  y="4"  width="16" height="10"/><rect x="4"  y="6"  width="2"  height="6"/>
    <rect x="20" y="6"  width="2"  height="6"/>
  </g>
  <g fill="#44881A">
    <rect x="4"  y="6"  width="2"  height="2"/><rect x="22" y="6"  width="2"  height="2"/>
  </g>
  <g fill="#99BB44">
    <rect x="12" y="16" width="4"  height="8"/>
  </g>
  <g fill="#BB1111">
    <rect x="8"  y="8"  width="2"  height="2"/><rect x="18" y="8"  width="2"  height="2"/>
  </g>
  <g fill="#EEEEBB">
    <rect x="10" y="10" width="8"  height="2"/>
  </g>
  <g fill="#66AA33">
    <rect x="12" y="26" width="2"  height="2"/><rect x="18" y="26" width="2"  height="2"/>
  </g>
</svg>`;

const files = {
  '311': quad('여우 (Fox)',         '#FFCC88','#CC6610','#FF9944','#AA4400','#884400','#DD8866','#FFFFFF'),
  '312': quad('은여우 (Silver Fox)',  '#DDCCCC','#9999BB','#CCCCDD','#777799','#4466AA','#CC9999','#FFFFFF'),
  '313': quad('구미호 (Nine-Tail)',   '#FFDDAA','#CCAA22','#FFEEAA','#AA8800','#2244CC','#FF8844'),
  '321': quad('늑대 (Wolf)',          '#CCBBBB','#8899AA','#BBCCDD','#6677AA','#DDAA00','#888899'),
  '322': quad('빙하 늑대 (Glacier Wolf)','#BBDDFF','#88CCEE','#CCEEFF','#4488AA','#2266CC','#AACCEE','#FFFFFF'),
  '323': quad('뇌전 늑대 (Thunder Wolf)','#FFEEAA','#CCCC22','#EEFF88','#AAAA00','#0044FF','#FFFF44'),
  '7':   quad('검은 늑대 (Black Wolf)', '#443344','#222233','#334455','#1A1A22','#CC0000','#333344'),
  '204': quad('웨어울프 (Werewolf)',   '#998866','#887766','#BBAA88','#665544','#DDAA00','#998877'),
  '102': bat('쉐이드 (Shade Bat)',    '#554477','#332244','#443366','#CC2222'),
  '903': bat('흡혈 박쥐 (Vampire Bat)','#662222','#441111','#551111','#FF8800'),
  '904': bat('빛의 박쥐 (Light Bat)', '#EEDDBB','#CCCCEE','#DDEEBB','#44CC44'),
  '201': slime('슬라임 (Slime)',       '#44BB44','#66DD66','#111111','#228822'),
  '905': slime('독 슬라임 (Poison)',   '#8833BB','#AA55DD','#FFEE00','#551188'),
  '906': slime('강철 슬라임 (Steel)',  '#8899AA','#AABBCC','#3366CC','#667788'),
  '421': ghost('유령 (Ghost)',         '#EEEEFF','#FFFFFF','#22CCCC'),
  '422': ghost('악령 (Evil Spirit)',   '#333344','#222233','#FF2222'),
  '423': ghost('사신 (Death Reaper)', '#222233','#333355','#8822BB'),
  '331': plant('나무 정령 (Tree)',     '#336622','#664422','#4A3318','#CCBB00','#224411'),
  '332': plant('덩굴 정령 (Vine)',     '#448833','#225511','#334422','#00CC44','#22AA44'),
  '333': plant('고목 정령 (Ancient)', '#667755','#443322','#33221A','#CC8800','#445533'),
  '341': fish('물고기 (Fish)',         '#4499CC','#66BBEE','#111111','#88CCFF'),
  '342': fish('전기 뱀장어 (Eel)',     '#4466AA','#FFDD00','#FFAA00','#6688CC'),
  '343': fish('심해 물고기 (Deep)',    '#222244','#8844FF','#AA44FF','#333366'),
  '401': bird('새 (Bird)',             '#4499CC','#66BBEE','#FFAA22','#111111'),
  '402': bird('불새 (Fire Bird)',      '#FF6600','#FF2200','#FFDD00','#FFAA00'),
  '403': bird('뇌조 (Thunder Bird)',   '#CCCC00','#2233AA','#FFFFFF','#0044FF'),
  '411': insect('벌레 (Bug)',          '#446611','#44AA22','#336600','#CC0000'),
  '412': insect('독 벌레 (Poison Bug)','#662288','#8833BB','#441166','#FFEE00'),
  '413': insect('강철 벌레 (Steel)',   '#556677','#7788AA','#334455','#CC2200'),
  '501': drg('드래곤 (Dragon)',        '#CCBB22','#335522','#557733','#224411','#CCAA22'),
  '502': drg('화염 드래곤 (Fire)',     '#FF4400','#882200','#CC4400','#661100','#FFAA00'),
  '503': drg('빙하 드래곤 (Ice)',      '#88CCFF','#2255AA','#4488CC','#1133AA','#00CCFF'),
  '12':  drg('황금 드래곤 (Gold)',     '#FFCC00','#BB8800','#DDAA22','#885500','#CC2200'),
  '511': golem('골렘 (Golem)',         '#8899AA','#AABBCC','#4466FF'),
  '512': golem('철 골렘 (Iron Golem)', '#556677','#7788AA','#CC2200'),
  '521': demon('악마 (Demon)',         '#882222','#441111','#FFAA00','#CC2200','#551111'),
  '522': demon('마왕 (Demon Lord)',    '#222233','#111122','#FF6600','#442266','#1A1A2A'),
  '523': demon('타락 천사 (Fallen)',   '#EEEEFF','#FFFFFF','#440044','#CCAADD','#662288'),
  '301': turtle('거북이 (Turtle)',     '#448844','#336633','#111111','#55AA55'),
  '302': turtle('해룡 (Sea Turtle)',   '#224488','#336688','#DDBB00','#4466AA'),
  '303': turtle('갑주 거북 (Armored)','#334433','#335544','#BB2222','#556644'),
  '907': skel('해골 전사 (Skeleton)', '#EEDDCC','#887766','#CC0000','#AABBCC'),
  '908': skel('암흑 기사 해골 (Dark)','#DDCCBB','#334455','#8822FF','#223344'),
  '202': fairy('요정 (Fairy)',         '#FF88BB','#FFBBDD','#7722FF','#FFCC44','#FFEEAA'),
  '909': fairy('꽃 요정 (Flower)',     '#FF88AA','#FFAACC','#33CC33','#FFEE44','#FFCCDD'),
  '910': fairy('달빛 요정 (Moonlight)','#AACCEE','#CCDDFF','#4488CC','#EEEEFF','#AADDFF'),
  '94':  fireBlob,
  '203': goblin,
};

let count = 0;
for (const [id, svg] of Object.entries(files)) {
  fs.writeFileSync(`${d}/${id}.svg`, svg);
  count++;
  console.log(`[${count}/${Object.keys(files).length}] ${id}.svg`);
}
console.log('Done!');
