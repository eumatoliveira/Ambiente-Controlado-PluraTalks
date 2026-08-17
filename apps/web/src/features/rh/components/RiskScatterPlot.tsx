import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

import type { ChartStatus, RiskPoint } from '../data/dashboardMockData';
import { chartPalette } from '../../../styles/chartPalette';
import { ChartState } from './ChartState';

type RiskScatterPlotProps = {
  data: RiskPoint[];
  status?: ChartStatus;
};

export function RiskScatterPlot({
  data,
  status = 'success',
}: RiskScatterPlotProps) {
  return (
    <section className="analytics-card analytics-card--risk">
      <div className="analytics-card-header">
        <div>
          <p className="analytics-eyebrow">Risco demonstrativo</p>
          <h2>Matriz de risco</h2>
        </div>
      </div>

      <ChartState status={data.length === 0 ? 'empty' : status}>
        <div className="risk-chart-label risk-chart-label--top">
          Impacto nas pessoas
        </div>
        <div className="risk-chart-canvas">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 18, right: 22, bottom: 20, left: 0 }}>
              <CartesianGrid stroke={chartPalette.grid} strokeDasharray="3 3" />
              <XAxis type="number" dataKey="workRelation" domain={[0, 100]} name="Relação com trabalho" axisLine={false} tickLine={false} tick={{ fill: chartPalette.muted, fontSize: 11 }} />
              <YAxis type="number" dataKey="peopleImpact" domain={[0, 100]} name="Impacto" axisLine={false} tickLine={false} tick={{ fill: chartPalette.muted, fontSize: 11 }} />
              <ZAxis type="number" dataKey="score" range={[80, 200]} name="Score" />
              <ReferenceLine x={50} stroke={chartPalette.purpleSoft} />
              <ReferenceLine y={50} stroke={chartPalette.purpleSoft} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Departamentos" data={data} fill={chartPalette.purple} isAnimationActive={false} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="risk-axis-caption">Relação com ambiente de trabalho</div>
        <ul className="sr-only">
          {data.map((point) => (
            <li key={point.department}>
              {point.department}: impacto {point.peopleImpact}, relação com trabalho{' '}
              {point.workRelation}, score {point.score}
            </li>
          ))}
        </ul>
      </ChartState>
    </section>
  );
}
