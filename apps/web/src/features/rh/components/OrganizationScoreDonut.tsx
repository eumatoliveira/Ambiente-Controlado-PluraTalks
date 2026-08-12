import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import type { ChartStatus } from '../data/dashboardMockData';
import { ChartState } from './ChartState';

type ScoreData = {
  score: number;
  delta: string;
  label: string;
  segments: Array<{ label: string; value: number; color: string }>;
};

type OrganizationScoreDonutProps = {
  data: ScoreData;
  status?: ChartStatus;
};

export function OrganizationScoreDonut({
  data,
  status = 'success',
}: OrganizationScoreDonutProps) {
  return (
    <section className="analytics-card analytics-card--donut">
      <div className="analytics-card-header">
        <div>
          <p className="analytics-eyebrow">Índice geral</p>
          <h2>Score organizacional</h2>
        </div>
      </div>

      <ChartState status={data.segments.length === 0 ? 'empty' : status}>
        <div className="donut-layout">
          <div className="donut-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.segments} dataKey="value" nameKey="label" innerRadius="70%" outerRadius="92%" paddingAngle={2} stroke="none" isAnimationActive={false}>
                  {data.segments.map((segment) => (
                    <Cell key={segment.label} fill={segment.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center" aria-label={`Score ${data.score} de 100`}>
              <strong>{data.score}</strong>
              <span>de 100</span>
            </div>
          </div>
          <div className="score-summary">
            <strong>{data.label}</strong>
            <span>{data.delta} vs. período anterior</span>
          </div>
          <ul className="chart-legend-list" aria-label="Distribuição do score">
            {data.segments.map((segment) => (
              <li key={segment.label}>
                <span className="legend-swatch" style={{ backgroundColor: segment.color }} />
                <span>{segment.label}</span>
                <strong>{segment.value}%</strong>
              </li>
            ))}
          </ul>
        </div>
      </ChartState>
    </section>
  );
}
