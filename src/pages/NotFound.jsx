import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[600px] px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-purple">
        404 — страница не найдена
      </h1>
      <p className="mt-4 text-text-muted">Такой страницы не существует.</p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-8 rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-[#005a95] active:scale-95"
      >
        На главную
      </button>
    </div>
  );
}
