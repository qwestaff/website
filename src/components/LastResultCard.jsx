import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore.js';
import { tests } from '../data/tests.js';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

function ChartIcon({ className }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </svg>
  );
}

export default function LastResultCard() {
  const navigate = useNavigate();
  const lastResult = useTestStore((s) => s.lastResult);
  const loadLastResult = useTestStore((s) => s.loadLastResult);

  const hasResult = lastResult !== null;
  const testTitle = hasResult
    ? tests.find((t) => t.slug === lastResult.testSlug)?.title ?? 'Тест'
    : '';

  const handleOpenLastResult = () => {
    loadLastResult();
    navigate('/result');
  };

  if (hasResult) {
    return (
      <article className="flex h-full flex-col rounded-2xl border-2 border-primary bg-primary-light p-6">
        <div className="mb-4 flex items-center gap-3">
          <ChartIcon className="text-primary" />
          <h3 className="text-lg font-semibold">Результаты предыдущего теста</h3>
        </div>
        <p className="mb-2 text-sm text-text-muted">{testTitle}</p>
        <p className="mb-4 text-xs text-text-muted">
          от {formatDate(lastResult.completedAt)}
        </p>
        <button
          type="button"
          onClick={handleOpenLastResult}
          className="mt-auto w-full rounded-xl bg-primary py-3 font-medium text-white transition hover:bg-primary/90 active:scale-95"
        >
          Открыть результат
        </button>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6">
      <div className="mb-4 flex items-center gap-3">
        <ChartIcon className="text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-400">
          Результаты предыдущего теста
        </h3>
      </div>
      <p className="flex-1 text-sm text-gray-400">
        Пройдите любой тест, чтобы увидеть результат здесь
      </p>
      <button
        type="button"
        disabled
        className="mt-auto w-full cursor-not-allowed rounded-xl bg-gray-200 py-3 text-gray-400"
      >
        Недоступно
      </button>
    </article>
  );
}
