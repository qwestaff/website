import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  fmtPct,
  fmtNum,
  joinList,
  TRAIT_GENITIVE,
} from '../../lib/resultLogic.js';

export default function TypeSpectrum({ spectrum, profile }) {
  const chartData = spectrum.map((item) => ({
    type: item.type,
    share: item.share,
  }));

  const top4 = spectrum.slice(0, 4).map((item) => `${item.type} (${fmtPct(item.share)})`);
  const topTypes = spectrum.slice(0, 4).map((item) => item.type);

  const pairs = [
    { key: 'Ив', opposite: 'Эв' },
    { key: 'М', opposite: 'Ч' },
    { key: 'С', opposite: 'И' },
    { key: 'Р', opposite: 'В' },
  ];

  const traitDescriptions = pairs.map(({ key, opposite }) => {
    const diff = Math.abs(profile[key] - profile[opposite]);
    const dominant = profile[key] > profile[opposite] ? key : opposite;
    const dominated = dominant === key ? opposite : key;
    const hasDominatedInTop4 = topTypes.some((type) => type.includes(dominated));

    let degree;
    if (diff >= 0.4 && !hasDominatedInTop4) {
      degree = 'ярко выраженное преобладание';
    } else if (diff >= 0.2) {
      degree = 'заметное преобладание';
    } else if (diff > 0) {
      degree = 'небольшое преобладание';
    } else {
      return null;
    }

    return `${degree} ${TRAIT_GENITIVE[dominant]}`;
  }).filter(Boolean);

  const text =
    `Ключевыми базисными типами интеллекта выступают ${joinList(top4)}. ` +
    (traitDescriptions.length > 0
      ? `Что указывает на ${joinList(traitDescriptions)}.`
      : 'Выраженное преобладание каких-либо признаков не выявлено.');

  return (
    <section className="border-b border-gray-200 py-10">
      <h2 className="mb-6 text-3xl font-bold text-purple">Типологический спектр</h2>

      <div className="table-wrapper overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="bg-primary-light">
              <th className="border border-gray-200 px-4 py-2 font-semibold">Тип</th>
              <th className="border border-gray-200 px-4 py-2 font-semibold">Расчёт</th>
              <th className="border border-gray-200 px-4 py-2 font-semibold">Доля</th>
            </tr>
          </thead>
          <tbody>
            {spectrum.map((item) => (
              <tr key={item.type} className="transition hover:bg-primary-light">
                <td className="border border-gray-200 px-4 py-2 font-semibold text-text-dark">
                  {item.type}
                </td>
                <td className="border border-gray-200 px-4 py-2 font-mono text-sm">
                  {item.factors.map((v) => fmtNum(v)).join(' × ')}
                </td>
                <td className="border border-gray-200 px-4 py-2">{fmtNum(item.share)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-box mt-8 h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="type"
              interval={0}
              angle={-40}
              textAnchor="end"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              domain={[0, 0.25]}
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => Number(v).toFixed(2)}
            />
            <Tooltip formatter={(value) => fmtNum(value)} />
            <Bar
              dataKey="share"
              name="Доля"
              fill="#0072BC"
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-6 leading-relaxed text-text-muted">{text}</p>
    </section>
  );
}
