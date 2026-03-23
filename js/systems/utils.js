function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distributePoints() {
  const result = [0, 0, 0, 0];
  for (let i = 0; i < 5; i++) result[randInt(0, 3)]++;
  return result;
}
