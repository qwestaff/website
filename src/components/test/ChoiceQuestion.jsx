import { useEffect, useRef } from 'react';

const LETTERS = ['А', 'Б', 'В'];

const AUTO_ADVANCE_MS = 350;

export default function ChoiceQuestion({ question, value, onChange, onAutoAdvance }) {
  const circleColors = {
    1: 'bg-primary',
    5: 'bg-gray-500',
    9: 'bg-purple',
  };

  const timerRef = useRef(null);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleClick = (option) => {
    onChange(option.value);

    if (option.value === value) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      if (onAutoAdvance) onAutoAdvance();
    }, AUTO_ADVANCE_MS);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <p className="text-xl font-medium text-text-dark">{question.text}</p>

      <div className="mt-6 flex flex-col gap-3">
        {question.options.map((option, index) => {
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleClick(option)}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-200 ${
                isActive
                  ? 'bg-primary text-white'
                  : 'border-2 border-gray-200 bg-white text-text-dark hover:border-primary'
              }`}
            >

              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  isActive
                    ? 'bg-white text-primary'
                    : `text-white ${circleColors[option.value] ?? 'bg-gray-500'}`
                }`}
              >
                {LETTERS[index]}
              </span>


              <span className="flex-1 font-medium">{option.label}</span>


              <span
                className={`shrink-0 text-sm font-medium ${
                  isActive ? 'text-white/80' : 'text-text-muted'
                }`}
              >
                → {option.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
