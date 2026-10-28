import { fmtPct } from '../../lib/resultLogic.js';

export default function ProfessionsBlock({ items }) {
  return (
    <section className="border-b border-gray-200 py-10">
      <h2 className="mb-6 text-3xl font-bold text-purple">
        Профессии для наиболее значимых типов
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item.type}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md"
          >
            <h3 className="text-lg font-bold text-text-dark">
              Тип {index + 1}: {item.type}{' '}
              <span className="font-normal text-text-muted">
                (доля {fmtPct(item.share)})
              </span>
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              <span className="font-semibold text-text-dark">По Крегеру:</span>{' '}
              {item.kreger.join(', ')}
            </p>

            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              <span className="font-semibold text-text-dark">По Седых:</span>{' '}
              {item.sedyh.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
