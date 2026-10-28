const dichotomies = [
  {
    pair: 'Интровертный (Ив) / Экстравертный (Эв)',
    desc: 'источник жизненной энергии: внутренний мир или внешний.',
    color: 'bg-primary',
  },
  {
    pair: 'Сенсорный (С) / Интуитивный (И)',
    desc: 'способ сбора информации: конкретика и факты или общность и теория.',
    color: 'bg-purple',
  },
  {
    pair: 'Мыслительный (М) / Чувствующий (Ч)',
    desc: 'способ принятия решений: объективная логика или субъективная согласованность.',
    color: 'bg-orange',
  },
  {
    pair: 'Решающий (Р) / Воспринимающий (В)',
    desc: 'стиль взаимодействия с миром: планомерная реализация или гибкая адаптация.',
    color: 'bg-red',
  },
];

export default function TheorySection() {
  return (
    <section id="theory" className="bg-white py-20">
      <div className="mx-auto max-w-theory px-6">
        <h2 className="mb-6 text-3xl font-bold text-purple">Как это работает</h2>

        <p className="mb-8 text-lg leading-relaxed text-text-muted">
          Многовариантная профориентация (МвПРОР) — это подход к профессиональному
          самоопределению, основанный на количественной оценке долевых признаковых
          показателей интеллекта. В отличие от традиционного одновариантного типирования,
          где человеку приписывается один тип, здесь строится многовариантная
          типологическая модель — спектр из 16 базисных типов интеллекта с их долями.
          Такой подход даёт более полные и детальные количественные характеристики
          личности, чем однозначная классификация.
        </p>

        <p className="mb-4 font-medium text-text-dark">
          Четыре пары классификационных признаков-предпочтений:
        </p>

        <ul className="mb-8 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
          {dichotomies.map((d) => (
            <li
              key={d.pair}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-200 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span className={`h-4 w-4 shrink-0 rounded-full ${d.color}`} />
                <strong className="font-semibold text-text-dark">{d.pair}</strong>
              </div>
              <p className="mt-3 text-text-muted">{d.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mb-8 rounded-xl bg-primary-light p-6 font-mono text-sm text-text-dark">
          <p className="mb-3">
            Показатели в каждой паре дополняют друг друга до единицы:
          </p>
          <p>D(Эв) + D(Ив) = 1</p>
          <p>D(С) + D(И) = 1</p>
          <p>D(М) + D(Ч) = 1</p>
          <p>D(Р) + D(В) = 1</p>
          <p className="mt-3">
            Все доли оцениваются в пределах от 0 до 1 (или от 0 % до 100 %).
          </p>
        </div>

        <p className="mb-6 leading-relaxed text-text-muted">
          Для повышения точности и воспроизводимости оценок применяется многовариантный
          эвристический блок — совокупность нескольких вопросников, детальных тестов и
          образных представлений от разных авторов (Филатова, Крегер, Седых,
          Филатова–Накрохина). Получаемые вариантные оценки усредняются арифметически,
          медианно или комбинированно, а также могут использоваться в интервальной форме с
          предельными значениями.
        </p>

        <p className="mb-6 leading-relaxed text-text-muted">
          На основе усреднённого признакового профиля вычисляется долевой результирующий
          показатель для каждого из 16 базисных типов интеллекта по формуле:
        </p>

        <div className="mb-6 rounded-xl bg-primary-light p-6 font-mono text-sm text-text-dark">
          <p>D(Тип) = D(Ив|Эв) × D(С|И) × D(М|Ч) × D(Р|В)</p>
        </div>

        <p className="leading-relaxed text-text-muted">
          Полученное типологическое распределение (типологический спектр) ранжируется по
          убыванию доли. Далее для каждого типа определяются предпочтительные объекты
          деятельности, функции и виды обеспечения, а также рекомендуемые профессии (по
          Крегеру и Седых).
        </p>
      </div>
    </section>
  );
}
