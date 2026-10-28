import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore.js';
import {
  buildProfile,
  calcTypeSpectrum,
  getTopTypes,
  toWeights,
} from '../lib/resultLogic.js';
import { calcIndividualSpectrum, getProfessions } from '../lib/calc.js';
import typeMapping from '../data/typeMapping.json';
import professionsData from '../data/professions.json';
import ResultHeader from '../components/result/ResultHeader.jsx';
import ProfileTable from '../components/result/ProfileTable.jsx';
import TypeSpectrum from '../components/result/TypeSpectrum.jsx';
import IndividualSpectra from '../components/result/IndividualSpectra.jsx';
import ProfessionsBlock from '../components/result/ProfessionsBlock.jsx';

export default function ResultPage() {
  const navigate = useNavigate();

  const answers = useTestStore((s) => s.answers);
  const sliders = useTestStore((s) => s.sliders);
  const questions = useTestStore((s) => s.questions);
  const testSlug = useTestStore((s) => s.testSlug);
  const fio = useTestStore((s) => s.fio);
  const reset = useTestStore((s) => s.reset);
  const lastResult = useTestStore((s) => s.lastResult);
  const loadLastResult = useTestStore((s) => s.loadLastResult);


  const hasData = Boolean(testSlug && questions.length && fio);

  const canShow = hasData || lastResult !== null;


  useEffect(() => {
    if (!canShow) navigate('/', { replace: true });
  }, [canShow, navigate]);

  useEffect(() => {
    if (!hasData && lastResult) loadLastResult();
  }, [hasData, lastResult, loadLastResult]);


  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);


  const profile = useMemo(
    () =>
      hasData ? buildProfile(testSlug, questions, answers, sliders) : null,
    [hasData, testSlug, questions, answers, sliders]
  );
  const typeSpectrum = useMemo(
    () => (profile ? calcTypeSpectrum(profile) : []),
    [profile]
  );
  const top4 = getTopTypes(typeSpectrum, 4);
  const spectra = useMemo(
    () => calcIndividualSpectrum(toWeights(typeSpectrum), typeMapping),
    [typeSpectrum]
  );
  const professionItems = useMemo(
    () => getProfessions(toWeights(top4), professionsData, 4),
    [top4]
  );


  const [showPdfModal, setShowPdfModal] = useState(false);


  if (!hasData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-light text-text-muted">
        Загрузка…
      </div>
    );
  }

  const handleRestart = () => {
    const slug = testSlug ?? lastResult?.testSlug;
    reset();
    navigate(slug ? `/test/${slug}` : '/');
  };

  return (
    <div className="min-h-screen bg-primary-light pb-12">
      <ResultHeader fio={fio} />

      <main className="mx-auto max-w-[1000px] px-6">
        <ProfileTable profile={profile} />

        <TypeSpectrum spectrum={typeSpectrum} profile={profile} />

        <IndividualSpectra spectra={spectra} />

        <ProfessionsBlock items={professionItems} />

        <div className="no-print flex flex-col gap-4 py-10 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-[#005a95] active:scale-95"
          >
            Пройти заново
          </button>
          <button
            type="button"
            onClick={() => setShowPdfModal(true)}
            className="rounded-xl border-2 border-primary bg-white px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-white"
          >
            Сохранить в PDF
          </button>
        </div>


        {showPdfModal && (
          <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold text-text-dark">
                Сохранение в PDF
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Откроется окно печати браузера. В поле{' '}
                <span className="font-semibold text-text-dark">
                  «Место назначения» («Принтер»)
                </span>{' '}
                выберите{' '}
                <span className="font-semibold text-text-dark">
                  «Сохранить как PDF»
                </span>{' '}
                и нажмите «Сохранить» — файл сохранится на диск, печатать на
                бумагу не нужно.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPdfModal(false)}
                  className="rounded-xl border-2 border-gray-200 px-6 py-3 font-medium text-text-muted transition hover:border-gray-300"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPdfModal(false);
                    window.print();
                  }}
                  className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-[#005a95] active:scale-95"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
