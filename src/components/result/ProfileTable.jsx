import {
  PROFILE_PAIRS,
  TRAIT_NAMES,
  fmtPct,
  dominantTraits,
} from '../../lib/resultLogic.js';

export default function ProfileTable({ profile }) {
  const dominant = dominantTraits(profile);
  const [first, ...rest] = dominant;

  const verb = ['М', 'Ч', 'Р', 'В'].includes(first) ? 'выражен' : 'выражена';
  const restText = rest
    .map((key) => `${TRAIT_NAMES[key]} – ${fmtPct(profile[key])}`)
    .join(', ');
  const text =
    `Сформирован следующий признаковый профиль: ${TRAIT_NAMES[first]} ` +
    `${verb} на уровне ${fmtPct(profile[first])}, ${restText}.`;

  return (
    <section className="border-b border-gray-200 py-10">
      <h2 className="mb-6 text-3xl font-bold text-purple">Признаковый профиль</h2>

      <div className="table-wrapper overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="bg-primary-light">
              <th className="border border-gray-200 px-4 py-2 font-semibold">Признак</th>
              <th className="border border-gray-200 px-4 py-2 font-semibold">Доля</th>
              <th className="border border-gray-200 px-4 py-2 font-semibold">Признак</th>
              <th className="border border-gray-200 px-4 py-2 font-semibold">Доля</th>
            </tr>
          </thead>
          <tbody>
            {PROFILE_PAIRS.map((pair) => (
              <tr key={pair.left} className="transition hover:bg-primary-light">
                <td className="border border-gray-200 px-4 py-2 font-medium">
                  {pair.leftLabel}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {fmtPct(profile[pair.left])}
                </td>
                <td className="border border-gray-200 px-4 py-2 font-medium">
                  {pair.rightLabel}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {fmtPct(profile[pair.right])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 leading-relaxed text-text-muted">{text}</p>
    </section>
  );
}
