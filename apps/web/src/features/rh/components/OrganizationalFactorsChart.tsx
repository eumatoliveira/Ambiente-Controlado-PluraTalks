import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type {
  ChartStatus,
  OrganizationalFactor,
} from '../data/dashboardMockData';
import { ChartState } from './ChartState';

type OrganizationalFactorsChartProps = {
  data: OrganizationalFactor[];
  status?: ChartStatus;
};

export function OrganizationalFactorsChart({
  data,
  status = 'success',
}: OrganizationalFactorsChartProps) {
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);

  return (
    <section className="analytics-card analytics-card--factors">
      <div className="analytics-card-header">
        <div>
          <p className="analytics-eyebrow">Comparação</p>
          <h2>Fatores organizacionais</h2>
        </div>
      </div>

      <ChartState status={data.length === 0 ? 'empty' : status}>
        <div className="factor-chart-canvas">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, left: 16, bottom: 0 }}>
              <CartesianGrid stroke="#E1E4E8" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 4]} axisLine={false} tickLine={false} tick={{ fill: '#8C96A5', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={104} axisLine={false} tickLine={false} tick={{ fill: '#566274', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" name="Score demonstrativo" fill="#657184" radius={[0, 6, 6, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="factor-selector" aria-label="Selecionar fator">
          {data.map((factor) => (
            <button
              type="button"
              key={factor.name}
              aria-label={`Selecionar ${factor.name}`}
              aria-pressed={selectedFactor === factor.name}
              onClick={() => setSelectedFactor(factor.name)}
            >
              <span>{factor.name}</span>
              <strong>{factor.value.toFixed(1)}</strong>
            </button>
          ))}
        </div>
      </ChartState>
    </section>
  );
}
