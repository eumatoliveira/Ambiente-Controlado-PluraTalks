import type { ChartStatus, HeatmapStatus } from '../data/dashboardMockData';
import { ChartState } from './ChartState';

type HeatmapData = {
  departments: string[];
  rows: Array<{
    factor: string;
    cells: Array<{ value: number; status: HeatmapStatus }>;
  }>;
};

type OrganizationalHeatmapProps = {
  data: HeatmapData;
  status?: ChartStatus;
};

export function OrganizationalHeatmap({
  data,
  status = 'success',
}: OrganizationalHeatmapProps) {
  return (
    <section className="analytics-card analytics-card--heatmap">
      <div className="analytics-card-header analytics-card-header--heatmap">
        <div>
          <p className="analytics-eyebrow">Comparação departamental</p>
          <h2>Matriz por área</h2>
        </div>
        <ul className="heatmap-legend" aria-label="Legenda da matriz">
          {(['Favorável', 'Moderado', 'Desfavorável'] as const).map((statusLabel) => (
            <li key={statusLabel}>
              <span className={`heatmap-dot heatmap-dot--${statusLabel.toLowerCase()}`} />
              {statusLabel}
            </li>
          ))}
        </ul>
      </div>

      <ChartState status={data.rows.length === 0 ? 'empty' : status}>
        <div className="heatmap-scroll" tabIndex={0} aria-label="Matriz organizacional rolável">
          <table className="heatmap-table">
            <thead>
              <tr>
                <th scope="col">Fator</th>
                {data.departments.map((department) => (
                  <th scope="col" key={department}>
                    {department}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.factor}>
                  <th scope="row">{row.factor}</th>
                  {row.cells.map((cell, index) => {
                    const department = data.departments[index];
                    return (
                      <td
                        key={department}
                        className={`heatmap-cell heatmap-cell--${cell.status.toLowerCase()}`}
                        aria-label={`${row.factor} em ${department}: ${cell.value.toFixed(1)}, ${cell.status}`}
                        title={`${row.factor} · ${department} · ${cell.status}`}
                      >
                        <strong>{cell.value.toFixed(1)}</strong>
                        <span>{cell.status}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartState>
    </section>
  );
}
