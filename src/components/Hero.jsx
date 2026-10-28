export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-b from-primary-light to-white pt-16 md:pt-20">
      <div className="mx-auto max-w-content px-6 py-20 md:py-28 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-text-dark">
          Многовариантная{' '}
          <span className="text-primary">профориентация</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-text-muted leading-relaxed">
          Информационная система профессионального самоопределения на основе
          количественной оценки структуры интеллекта
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo('tests')}
            className="rounded-xl bg-orange px-6 py-3 font-medium text-white shadow-md transition hover:brightness-110 active:scale-95"
          >
            Пройти тест
          </button>
          <button
            type="button"
            onClick={() => scrollTo('theory')}
            className="rounded-xl border-2 border-primary bg-transparent px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-white"
          >
            Узнать больше
          </button>
        </div>
      </div>
    </section>
  );
}
