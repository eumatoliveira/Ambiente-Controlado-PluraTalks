import { EngagementAreaChart } from '../components/EngagementAreaChart';
import { OrganizationalFactorsChart } from '../components/OrganizationalFactorsChart';
import { OrganizationalHeatmap } from '../components/OrganizationalHeatmap';
import { OrganizationScoreDonut } from '../components/OrganizationScoreDonut';
import { RHLayout } from '../components/RHLayout';
import { RiskScatterPlot } from '../components/RiskScatterPlot';
import { dashboardMockData } from '../data/dashboardMockData';
import './rh-dashboard.css';

export function RHDashboardPage() {
  return (
    <RHLayout>
      <header className="rh-page-header">
        <div>
          <div className="rh-title-row">
            <h1>Visão Geral</h1>
            <span className="demo-data-badge">Dados demonstrativos</span>
          </div>
          <p>Acompanhe os principais indicadores da organização.</p>
        </div>
        <div className="rh-period-summary">
          <span>Período demonstrado</span>
          <strong>Setembro a março</strong>
        </div>
      </header>

      <section className="metric-grid" aria-label="Indicadores principais">
        {dashboardMockData.metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <div className="metric-card-topline">
              <span>{metric.label}</span>
              <strong className={`metric-delta metric-delta--${metric.tone}`}>
                {metric.delta}
              </strong>
            </div>
            <strong className="metric-value">{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>

      <div className="analytics-grid">
        <EngagementAreaChart data={dashboardMockData.participationHistory} />
        <OrganizationScoreDonut data={dashboardMockData.organizationScore} />
        <OrganizationalFactorsChart data={dashboardMockData.organizationalFactors} />
        <RiskScatterPlot data={dashboardMockData.riskMatrix} />
        <OrganizationalHeatmap data={dashboardMockData.departmentHeatmap} />
      </div>

      <p className="dashboard-data-note">
        Os valores desta tela são fixtures de interface e não representam medições
        reais da organização.
      </p>
    </RHLayout>
  );
}

export default RHDashboardPage;
