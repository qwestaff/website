export default function QuestionNav({
  total,
  currentIndex,
  answeredIds,
  onSelect,
}) {
  return (
    <nav className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {Array.from({ length: total }, (_, index) => {
        const isCurrent = index === currentIndex;
        const isAnswered = answeredIds.has(index + 1);

        let colorClasses = 'bg-gray-200 text-text-muted hover:bg-gray-300';
        if (isAnswered) colorClasses = 'bg-primary text-white';
        if (isCurrent) colorClasses = 'bg-orange text-white';

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isCurrent ? 'step' : undefined}
            className={`min-h-[36px] min-w-[36px] rounded-lg px-1 py-2 text-sm font-semibold transition ${colorClasses}`}
          >
            {index + 1}
          </button>
        );
      })}
    </nav>
  );
}
