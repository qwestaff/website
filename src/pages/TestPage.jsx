import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTestStore } from '../store/testStore.js';
import TestHeader from '../components/test/TestHeader.jsx';
import ProgressBar from '../components/test/ProgressBar.jsx';
import QuestionNav from '../components/test/QuestionNav.jsx';
import ChoiceQuestion from '../components/test/ChoiceQuestion.jsx';
import SliderQuestion from '../components/test/SliderQuestion.jsx';
import TestNavigation from '../components/test/TestNavigation.jsx';

export default function TestPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const questions = useTestStore((s) => s.questions);
  const currentIndex = useTestStore((s) => s.currentIndex);
  const answers = useTestStore((s) => s.answers);
  const sliders = useTestStore((s) => s.sliders);
  const touchedSliders = useTestStore((s) => s.touchedSliders);
  const fio = useTestStore((s) => s.fio);

  const loadTest = useTestStore((s) => s.loadTest);
  const setAnswer = useTestStore((s) => s.setAnswer);
  const setSlider = useTestStore((s) => s.setSlider);
  const next = useTestStore((s) => s.next);
  const prev = useTestStore((s) => s.prev);
  const goTo = useTestStore((s) => s.goTo);
  const setFio = useTestStore((s) => s.setFio);
  const saveLastResult = useTestStore((s) => s.saveLastResult);
  const reset = useTestStore((s) => s.reset);
  const getProgress = useTestStore((s) => s.getProgress);

  const [showFioModal, setShowFioModal] = useState(false);
  const [showFinishHint, setShowFinishHint] = useState(false);

  useEffect(() => {
    loadTest(slug);
  }, [slug, loadTest]);

  if (!questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-light text-text-muted">
        Загрузка…
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const percent = getProgress();

  const isAnswered = (q) =>
    q.type === 'choice'
      ? answers[q.id] != null
      : sliders[q.id] != null && sliders[q.id] !== 0.5;
  const answeredIds = new Set(questions.filter(isAnswered).map((q) => q.id));
  const allAnswered = answeredIds.size === questions.length;

  const handleFinish = () => {
    if (answeredIds.size < questions.length) {
      setShowFinishHint(true);
      return;
    }
    setShowFinishHint(false);
    setShowFioModal(true);
  };

  const handleFioConfirm = () => {
    if (!fio.trim()) return;
    saveLastResult();
    reset();
    navigate('/result');
  };

  return (
    <div className="min-h-screen bg-primary-light pb-10">
      <TestHeader slug={slug} />

      <main className="mx-auto max-w-[900px] space-y-8 px-6 py-8">
        <ProgressBar percent={percent} />

        <QuestionNav
          total={questions.length}
          currentIndex={currentIndex}
          answeredIds={answeredIds}
          onSelect={goTo}
        />

        {currentQuestion.type === 'choice' ? (
          <ChoiceQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={(value) => setAnswer(currentQuestion.id, value)}
            onAutoAdvance={() => {
              if (!isLast) next();
              else handleFinish();
            }}
          />
        ) : (
          <SliderQuestion
            question={currentQuestion}
            value={sliders[currentQuestion.id] ?? 0.5}
            onChange={(value) => setSlider(currentQuestion.id, value)}
          />
        )}

        <TestNavigation
          onPrev={prev}
          onNext={next}
          onFinish={handleFinish}
          isFirst={isFirst}
          isLast={isLast}
        />


        {showFinishHint && !allAnswered && (
          <p className="rounded-xl bg-red/10 px-4 py-3 text-sm font-medium text-red">
            Чтобы завершить тест, ответьте на все вопросы.{' '}
            {questions.some(
              (q) =>
                q.type === 'slider' && !(sliders[q.id] != null && sliders[q.id] !== 0.5)
            ) &&
              'Для ползунков установите разные доли — не 50%/50% (например, 51% и 49%).'}
          </p>
        )}
      </main>


      {showFioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-text-dark">
              Введите ваше ФИО
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Оно будет отображено на странице с результатом.
            </p>

            <input
              type="text"
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              placeholder="Иванов Иван Иванович"
              autoFocus
              className="mt-4 w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-primary"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowFioModal(false)}
                className="rounded-xl border-2 border-gray-200 px-6 py-3 font-medium text-text-muted transition hover:border-gray-300"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleFioConfirm}
                disabled={!fio.trim()}
                className="rounded-xl bg-orange px-6 py-3 font-medium text-white transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Завершить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
