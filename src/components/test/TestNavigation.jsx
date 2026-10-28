export default function TestNavigation({
  onPrev,
  onNext,
  onFinish,
  isFirst,
  isLast,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className="rounded-xl border-2 border-primary px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-transparent disabled:text-gray-400"
      >
        ← Предыдущий
      </button>


      {isLast ? (
        <button
          type="button"
          onClick={onFinish}
          className="rounded-xl bg-orange px-6 py-3 font-medium text-white shadow-md transition hover:brightness-110 active:scale-95"
        >
          Завершить тест
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-[#005a95] active:scale-95"
        >
          Следующий →
        </button>
      )}
    </div>
  );
}
