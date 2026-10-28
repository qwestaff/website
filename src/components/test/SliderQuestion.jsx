export default function SliderQuestion({ question, value, onChange }) {
  const leftPercent = Math.round(value * 100);
  const rightPercent = Math.round((1 - value) * 100);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <p className="text-xl font-medium text-text-dark">{question.text}</p>

      <div className="mt-6 flex justify-between gap-6 text-sm text-text-muted">
        <p className="max-w-[48%]">{question.leftLabel}</p>
        <p className="max-w-[48%] text-right">{question.rightLabel}</p>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-4 min-h-[40px] w-full accent-primary"
        aria-label={question.text}
      />


      <div className="mt-2 flex justify-between font-mono text-sm font-semibold text-text-dark">
        <span>
          {question.leftKey} = {leftPercent}%
        </span>
        <span>
          {question.rightKey} = {rightPercent}%
        </span>
      </div>
    </div>
  );
}
