const NEUTRAL = 5;

const FKR_GROUPS = {
  vr: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37],
  ive: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38],
  mc: [3, 7, 11, 15, 19, 23, 27, 31, 35, 39],
  si: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
};

const FKR_DIVISOR = 100;

export function profileFromFkr(answers = {}) {
  const sumOf = (ids) =>
    ids.reduce((sum, id) => sum + (answers[id] ?? NEUTRAL), 0);

  const vrSum = sumOf(FKR_GROUPS.vr);
  const iveSum = sumOf(FKR_GROUPS.ive);
  const mcSum = sumOf(FKR_GROUPS.mc);
  const siSum = sumOf(FKR_GROUPS.si);

  return {
    Ив: (FKR_DIVISOR - iveSum) / FKR_DIVISOR,
    Эв: iveSum / FKR_DIVISOR,
    М: mcSum / FKR_DIVISOR,
    Ч: (FKR_DIVISOR - mcSum) / FKR_DIVISOR,
    И: (FKR_DIVISOR - siSum) / FKR_DIVISOR,
    С: siSum / FKR_DIVISOR,
    В: vrSum / FKR_DIVISOR,
    Р: (FKR_DIVISOR - vrSum) / FKR_DIVISOR,
  };
}

const toProfileKey = (key) =>
  typeof key === 'string' && key.startsWith('D(') && key.endsWith(')')
    ? key.slice(2, -1)
    : key;

export function profileFromSliderAnswers(questions = [], sliders = {}) {
  const sums = {};
  const counts = {};

  for (const question of questions) {
    if (!question || question.type !== 'slider') continue;

    const leftKey = toProfileKey(question.leftKey);
    const rightKey = toProfileKey(question.rightKey);

    const leftShare = sliders[question.id] ?? 0.5;
    const rightShare = 1 - leftShare;

    sums[leftKey] = (sums[leftKey] ?? 0) + leftShare;
    counts[leftKey] = (counts[leftKey] ?? 0) + 1;

    sums[rightKey] = (sums[rightKey] ?? 0) + rightShare;
    counts[rightKey] = (counts[rightKey] ?? 0) + 1;
  }

  const profile = {};
  for (const key of Object.keys(sums)) {
    profile[key] = Math.round((sums[key] / counts[key]) * 10000) / 10000;
  }
  return profile;
}

export function calcIndividualSpectrum(typeWeights, mapping) {
  const spectrum = (field, size) => {
    const result = Array(size).fill(0);
    for (const [type, share] of Object.entries(typeWeights)) {
      const positions = mapping?.[type]?.[field];
      if (!positions) continue;
      for (const position of positions) {
        if (position >= 1 && position <= size) result[position - 1] += share;
      }
    }
    return result.map((value) => Math.round(value * 1000) / 1000);
  };

  return {
    objects: spectrum('objects', 8),
    functions: spectrum('functions', 10),
    supports: spectrum('supports', 12),
  };
}

export function getProfessions(typeWeights, professionsData, limit) {
  const ranked = Object.entries(typeWeights)
    .filter(([type]) => professionsData?.[type])
    .map(([type, share]) => ({
      type,
      share,
      kreger: professionsData[type].kreger ?? [],
      sedyh: professionsData[type].sedyh ?? [],
    }))
    .sort((a, b) => b.share - a.share);

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked;
}
