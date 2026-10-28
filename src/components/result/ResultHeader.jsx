import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../../store/testStore.js';

export default function ResultHeader({ fio }) {
  const navigate = useNavigate();
  const reset = useTestStore((s) => s.reset);

  const handleExit = () => {
    reset();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-4 px-6 py-4">
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-text-dark">Результат теста</h1>
          <p className="truncate text-sm text-text-muted">
            {fio || 'ФИО не указано'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleExit}
          className="no-print shrink-0 rounded-xl border-2 border-gray-200 px-6 py-3 font-medium text-text-muted transition hover:border-red hover:text-red"
        >
          Выйти
        </button>
      </div>
    </header>
  );
}
