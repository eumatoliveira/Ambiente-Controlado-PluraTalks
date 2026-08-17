import { canDisplayAggregate } from '../../../app/mockRules';
import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, StatusBadge } from '../../../components/ui/AppPrimitives';
import { AnalyticsPageShell } from '../components/AnalyticsPageShell';

export function AlertsPage() {
  const { state } = useMockApp();
  const signals = state.aggregates.filter((item) => canDisplayAggregate(item.respondents) && item.score > 0 && item.score < 70);
  return <AnalyticsPageShell title="Alertas" description="Sinais agregados para orientar revisão organizacional, sem diagnosticar pessoas."><section className="analytics-language-notice"><strong>Como interpretar</strong><p>Um alerta indica que uma métrica agregada merece atenção. Não representa diagnóstico médico, psicológico, desempenho individual ou conclusão sobre uma pessoa.</p></section>{signals.length === 0 ? <EmptyState title="Nenhum sinal ativo" description="Não há coortes elegíveis abaixo do limite demonstrativo." /> : <div className="analytics-signal-list">{signals.map((signal) => { const department = state.departments.find((item) => item.id === signal.departmentId); const assessment = state.assessments.find((item) => item.id === signal.assessmentId); return <article key={`${signal.assessmentId}-${signal.departmentId}`}><div><StatusBadge tone="warning">Atenção agregada</StatusBadge><span>{signal.respondents} respostas válidas</span></div><h2>{department?.name}</h2><p>O score agregado de <strong>{signal.score}</strong> em {assessment?.title} está abaixo da referência demonstrativa de 70.</p><small>Recomendação: revisar contexto e práticas organizacionais com a área, sem individualizar respostas.</small></article>; })}</div>}</AnalyticsPageShell>;
}
