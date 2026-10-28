import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import TestPage from './pages/TestPage.jsx';
import NotFound from './pages/NotFound.jsx';

const ResultPage = lazy(() => import('./pages/ResultPage.jsx'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-text-muted">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-light border-t-primary" />
            <span>Загрузка...</span>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/:slug" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
