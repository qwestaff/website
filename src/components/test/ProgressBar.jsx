export default function ProgressBar({ percent }) {
  const p = Math.round(percent);

  return (
    <div className="flex items-center gap-4">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-primary-light">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${p}%` }}
        />
      </div>

      <span className="w-12 shrink-0 text-right text-sm font-semibold text-primary">
        {p}%
      </span>
    </div>
  );
}
