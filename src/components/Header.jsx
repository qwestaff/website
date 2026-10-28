import { Link } from 'react-router-dom';
import logoSibsiu from '../assets/logo_sibsiu.png';

export default function Header() {
  const scrollToTests = () => {
    document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="no-print fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-content h-16 md:h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-extrabold text-primary tracking-tight">
              МвПРОР
            </span>
          </Link>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <a
            href="https://www.sibsiu.ru/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="СибГИУ — официальный сайт"
          >
            <img src={logoSibsiu} alt="СибГИУ" className="h-8 md:h-10 w-auto" />
          </a>
        </div>

        <button
          type="button"
          onClick={scrollToTests}
          className="rounded-xl bg-primary px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-medium text-white transition hover:bg-[#005a95] active:scale-95"
        >
          Выбрать тест
        </button>
      </div>
    </header>
  );
}
