import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  OBJECT_NAMES,
  OBJECT_NAMES_SHORT,
  FUNCTION_NAMES,
  SUPPORT_NAMES,
  SUPPORT_NAMES_SHORT,
  fmtNum,
  joinList,
} from '../../lib/resultLogic.js';

const COLORS = { objects: '#0072BC', functions: '#7B4FA8', supports: '#F58220' };

const makeData = (values, names) =>
  values.map((value, i) => ({ name: names[i], S: value }));

const topN = (values, names, n) => {
  const indexes = values
    .map((value, i) => i)
    .sort((a, b) => values[b] - values[a])
    .slice(0, n);
  return joinList(indexes.map((i) => `${names[i]} (${fmtNum(values[i])})`));
};

function SpectrumLine({ title, values, names, color }) {
  const data = makeData(values, names);

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold text-text-dark">{title}</h3>
      <div className="chart-box h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-40}
              textAnchor="end"
              tick={{ fontSize: 10 }}
            />
            <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value) => fmtNum(value)} />
            <Line
              type="monotone"
              dataKey="S"
              name="S"
              stroke={color}
              strokeWidth={2}
              dot
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function IndividualSpectra({ spectra }) {
  const { objects, functions, supports } = spectra;

  const text =
    'Анализ полученных индивидуальных спектров показал, что среди объектов ' +
    `деятельности наиболее предпочтительными являются ${topN(objects, OBJECT_NAMES, 3)}. ` +
    `Среди функций деятельности лидирующие позиции занимают ${topN(functions, FUNCTION_NAMES, 3)}. ` +
    `Что касается видов обеспечения, то наиболее высокие значения получены для ${topN(supports, SUPPORT_NAMES, 3)}. ` +
    'Таким образом, профессиональная деятельность данной личности должна быть ' +
    `ориентирована на работу с объектами «${OBJECT_NAMES[objects.indexOf(Math.max(...objects))]}», ` +
    `с преобладанием функции «${FUNCTION_NAMES[functions.indexOf(Math.max(...functions))]}» ` +
    `и упором на ${SUPPORT_NAMES[supports.indexOf(Math.max(...supports))].toLowerCase()} обеспечение.`;

  return (
    <section className="border-b border-gray-200 py-10">
      <h2 className="mb-6 text-3xl font-bold text-purple">Индивидуальные спектры</h2>

      <SpectrumLine
        title="Объекты деятельности"
        values={objects}
        names={OBJECT_NAMES_SHORT}
        color={COLORS.objects}
      />
      <SpectrumLine
        title="Функции деятельности"
        values={functions}
        names={FUNCTION_NAMES}
        color={COLORS.functions}
      />
      <SpectrumLine
        title="Виды обеспечения"
        values={supports}
        names={SUPPORT_NAMES_SHORT}
        color={COLORS.supports}
      />

      <p className="mt-6 leading-relaxed text-text-muted">{text}</p>
    </section>
  );
}
