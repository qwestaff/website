import { tests } from '../data/tests.js';
import TestCard from './TestCard.jsx';
import LastResultCard from './LastResultCard.jsx';

export default function TestsSection() {
  return (
    <section id="tests" className="bg-primary-light py-20">
      <div className="mx-auto max-w-content px-6">
        <h2 className="mb-6 text-3xl font-bold text-purple">Доступные тесты</h2>

        <p className="mb-10 text-text-muted">
          Выберите один из вопросников или пройдите комплексный тест
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.slug} test={test} />
          ))}
          <LastResultCard />
        </div>
      </div>
    </section>
  );
}
