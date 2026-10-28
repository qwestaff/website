import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../../store/testStore.js';
import { tests } from '../../data/tests.js';

export default function TestHeader({ slug }) {
  const navigate = useNavigate();

  const answers = useTestStore((s) => s.answers);
  const touchedSliders = useTestStore((s) => s.touchedSliders);
  const reset = useTestStore((s) => s.reset);

  const [showExitModal, setShowExitModal] = useState(false);

  const test = tests.find((t) => t.slug === slug);


  const hasAnswers =
    Object.keys(answers).length > 0 || touchedSliders.size > 0;

  const handleExitClick = () => {
    if (hasAnswers) setShowExitModal(true);
    else navigate('/');
  };

  const handleConfirmExit = () => {
    reset();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="mx-auto flex max-w-[900px] items-center justify-between gap-4 px-6 py-4">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-text-dark">
            {test?.title ?? 'Тест'}
          </h1>
          <p className="truncate text-sm text-text-muted">
            Автор: {test?.author ?? '—'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleExitClick}
          className="shrink-0 rounded-xl border-2 border-gray-200 px-6 py-3 font-medium text-text-muted transition hover:border-red hover:text-red"
        >
          Выйти
        </button>
      </div>


      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-text-dark">
              Выйти из теста?
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Прогресс не сохранится, если вы не завершите тест.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="rounded-xl border-2 border-gray-200 px-6 py-3 font-medium text-text-muted transition hover:border-gray-300"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleConfirmExit}
                className="rounded-xl bg-red px-6 py-3 font-medium text-white transition hover:brightness-110 active:scale-95"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
