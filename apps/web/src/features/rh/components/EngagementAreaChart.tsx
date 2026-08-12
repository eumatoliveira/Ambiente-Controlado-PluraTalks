import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type {
  ChartStatus,
  ParticipationHistoryPoint,
} from '../data/dashboardMockData';
import { ChartState } from './ChartState';

const periods = ['Semanal', 'Mensal', 'Trimestral', 'Anual'] as const;

type EngagementAreaChartProps = {
  data: ParticipationHistoryPoint[];
  status?: ChartStatus;
};

export function EngagementAreaChart({
  data,
  status = 'success',
}: EngagementAreaChartProps) {
  const [period, setPeriod] = useState<(typeof periods)[number]>('Mensal');

  return (
    <section className="analytics-card analytics-card--area">
      <div className="analytics-card-header">
        <div>
          <p className="analytics-eyebrow">Tendência</p>
          <h2>Evolução de participação e engajamento</h2>
        </div>
        <div className="period-selector" aria-label="Período do gráfico">
          {periods.map((periodOption) => (
            <button
              type="button"
              key={periodOption}
              aria-pressed={period === periodOption}
              onClick={() => setPeriod(periodOption)}
            >
              {periodOption}
            </button>
          ))}
        </div>
      </div>

      <ChartState status={data.length === 0 ? 'empty' : status}>
        <div className="chart-canvas" aria-label="Gráfico de participação e engajamento">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 16, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#E1E4E8" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#566274', fontSize: 12 }} />
              <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: '#8C96A5', fontSize: 12 }} />
              <Tooltip />
              <Legend iconType="circle" />
              <Area type="monotone" dataKey="participation" name="Participação" stroke="#3F4959" strokeWidth={2.5} fill="#C7CFD9" fillOpacity={0.42} isAnimationActive={false} />
              <Area type="monotone" dataKey="engagement" name="Engajamento" stroke="#929EAD" strokeWidth={2.5} fill="transparent" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartState>
    </section>
  );
}
