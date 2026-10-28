import { profileFromFkr, profileFromSliderAnswers } from './calc.js';
import kregerQuestions from '../data/questions.kreger.json';
import sedyhQuestions from '../data/questions.sedyh.json';
import filatovaQuestions from '../data/questions.filatova.json';

export const fmtPct = (value, digits = 1) =>
  (value * 100).toFixed(digits).replace('.', ',') + '%';

export const fmtNum = (value, digits = 3) =>
  value.toFixed(digits).replace('.', ',');

export const joinList = (items) => {
  if (items.length <= 1) return items.join('');
  return items.slice(0, -1).join(', ') + ' и ' + items[items.length - 1];
};

export const PROFILE_PAIRS = [
  { left: 'Ив', right: 'Эв', leftLabel: 'Ив (интроверт)', rightLabel: 'Эв (экстраверт)' },
  { left: 'М', right: 'Ч', leftLabel: 'М (мыслительный)', rightLabel: 'Ч (чувствующий)' },
  { left: 'И', right: 'С', leftLabel: 'И (интуит)', rightLabel: 'С (сенсорик)' },
  { left: 'Р', right: 'В', leftLabel: 'Р (решающий)', rightLabel: 'В (воспринимающий)' },
];

export const TRAIT_NAMES = {
  Ив: 'интроверсия',
  Эв: 'экстраверсия',
  М: 'мыслительный компонент',
  Ч: 'чувствующий компонент',
  И: 'интуиция',
  С: 'сенсорика',
  Р: 'решающий тип',
  В: 'воспринимающий тип',
};

export const TRAIT_GENITIVE = {
  Ив: 'интроверсии',
  Эв: 'экстраверсии',
  М: 'мыслительного компонента',
  Ч: 'чувствующего компонента',
  И: 'интуиции',
  С: 'сенсорики',
  Р: 'решающего типа',
  В: 'воспринимающего типа',
};

const traitVerb = (key) =>
  ['М', 'Ч', 'Р', 'В'].includes(key) ? 'выражен' : 'выражена';

export const OBJECT_NAMES_SHORT = [
  'Индив.-чел.', 'Коллектив.-чел.', 'Природные', 'Технические',
  'Человеко-техн.', 'Содерж. мод.-обр.', 'Формализ. мод.-знак.', 'Натурно-мод.',
];
export const OBJECT_NAMES = [
  'индивидуально-человеческие', 'коллективно-человеческие', 'природные', 'технические',
  'человеко-технические', 'содержательные модельно-образные',
  'формализованные модельно-знаковые', 'натурно-модельные',
];

export const FUNCTION_NAMES = [
  'Контроль', 'Исследование', 'Прогнозирование', 'Исполнение', 'Управление',
  'Создание', 'Обслуживание', 'Эксплуатация', 'Обучение', 'Развитие',
];

export const SUPPORT_NAMES = [
  'Концептуальное', 'Образовательно-кадровое', 'Организационное', 'Правовое',
  'Финансовое', 'Социопсихологическое', 'Лингвистическое', 'Информационное',
  'Методическое', 'Алгоритмическое', 'Программное', 'Техническое',
];

export const SUPPORT_NAMES_SHORT = [
  'Концептуальное', 'Образов.-кадр.', 'Организационное', 'Правовое',
  'Финансовое', 'Социопсих.', 'Лингвистич.', 'Информационное',
  'Методическое', 'Алгоритмич.', 'Программное', 'Техническое',
];

function questionnaireProfile(sourceQuestions, questions, sliders) {
  const globalIdByText = new Map(
    questions.filter((q) => q.type === 'slider').map((q) => [q.text, q.id])
  );
  const localSliders = {};
  for (const q of sourceQuestions) {
    const globalId = globalIdByText.get(q.text);
    localSliders[q.id] =
      globalId != null && sliders[globalId] != null ? sliders[globalId] : 0.5;
  }
  return profileFromSliderAnswers(sourceQuestions, localSliders);
}

export function buildProfile(slug, questions, answers = {}, sliders = {}) {
  if (slug === 'fkr') return profileFromFkr(answers);
  if (slug !== 'all') return profileFromSliderAnswers(questions, sliders);

  const dOpros = {};
  const counts = {};
  for (const source of [kregerQuestions, sedyhQuestions, filatovaQuestions]) {
    const questionnaire = questionnaireProfile(source, questions, sliders);
    for (const key of Object.keys(questionnaire)) {
      dOpros[key] = (dOpros[key] ?? 0) + questionnaire[key];
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }
  for (const key of Object.keys(dOpros)) dOpros[key] /= counts[key];

  const dTest = profileFromFkr(answers);
  const profile = {};
  for (const key of Object.keys(dTest)) {
    profile[key] =
      dOpros[key] != null ? (dOpros[key] + dTest[key]) / 2 : dTest[key];
  }
  return profile;
}

export function calcTypeSpectrum(profile) {
  const spectrum = [];
  for (const ext of ['Ив', 'Эв']) {
    for (const per of ['С', 'И']) {
      for (const cog of ['М', 'Ч']) {
        for (const jud of ['Р', 'В']) {
          const factors = [ext, per, cog, jud].map((k) => profile[k]);
          const share = factors.reduce((a, b) => a * b, 1);
          spectrum.push({ type: ext + per + cog + jud, share, factors });
        }
      }
    }
  }
  return spectrum.sort((a, b) => b.share - a.share);
}

export const getTopTypes = (typeSpectrum, n) => typeSpectrum.slice(0, n);

export const toWeights = (entries) =>
  Object.fromEntries(entries.map((e) => [e.type, e.share]));

export const dominantTraits = (profile) =>
  PROFILE_PAIRS.map((p) => (profile[p.left] >= profile[p.right] ? p.left : p.right));
