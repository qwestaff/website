import { useNavigate } from 'react-router-dom';

export default function TestCard({ test }) {
  const navigate = useNavigate();

  const colorMap = {
    primary: { dot: 'bg-primary', btn: 'bg-primary hover:bg-[#005a95]' },
    purple: { dot: 'bg-purple', btn: 'bg-purple hover:brightness-110' },
    orange: { dot: 'bg-orange', btn: 'bg-orange hover:brightness-110' },
    red: { dot: 'bg-red', btn: 'bg-red hover:brightness-110' },
  };
  const colors = colorMap[test.color] ?? colorMap.primary;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/test/${test.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/test/${test.slug}`)}
      className={`group flex cursor-pointer flex-col rounded-2xl bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
        test.recommended ? 'border-2 border-orange' : 'border-2 border-transparent'
      }`}
    >
      <div className="flex items-start justify-between">
        <span className={`h-10 w-10 shrink-0 rounded-full ${colors.dot}`} />
        {test.recommended && (
          <span className="rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white">
            Рекомендуем
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-text-dark">
        {test.title}
      </h3>

      <p className="mt-1 text-sm text-text-muted">Автор: {test.author}</p>

      <p className="mt-3 flex items-center gap-2 text-sm text-text-muted">
        <svg
          className="h-4 w-4 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {test.questions} вопросов
      </p>

      <div className="mt-auto pt-6">
        <button
          type="button"
          className={`w-full rounded-xl px-6 py-3 font-medium text-white transition active:scale-95 ${colors.btn}`}
        >
          Пройти
        </button>
      </div>
    </div>
  );
}
