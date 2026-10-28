export default function Footer() {
  return (
    <footer className="no-print bg-[#2C2C2C] py-8 text-white">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} СибГИУ. Информационная система многовариантной профориентации
        </p>
        <nav className="flex gap-6 text-sm">
          <a href="#theory" className="text-gray-300 transition hover:text-white">
            О проекте
          </a>
          <a href="#" className="text-gray-300 transition hover:text-white">
            Контакты
          </a>
        </nav>
      </div>
    </footer>
  );
}
