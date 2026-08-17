import { Link, useParams } from 'react-router-dom';

import { canDisplayAggregate } from '../../../app/mockRules';
import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { Assessment } from '../../../types/domain';
import { AnalyticsPageShell } from '../components/AnalyticsPageShell';

export function AssessmentDetailPage({ kind }: { kind: Assessment['kind'] }) {
  const params = useParams();
  const id = kind === 'survey' ? params.surveyId : params.testId;
  const { state } = useMockApp();
  const assessment = state.assessments.find((item) => item.id === id && item.kind === kind);
  const section = kind === 'survey' ? 'Pesquisas' : 'Testes';
  if (!assessment) return <AnalyticsPageShell section={section} title={`${kind === 'survey' ? 'Pesquisa' : 'Teste'} não encontrado`} description="A atividade informada não existe."><EmptyState title="Atividade indisponível" description="Volte para a lista." action={<Link to={kind === 'survey' ? '/rh/pesquisas' : '/rh/testes'}>Voltar</Link>} /></AnalyticsPageShell>;
  const aggregates = state.aggregates.filter((item) => item.assessmentId === assessment.id);
  const visible = aggregates.filter((item) => canDisplayAggregate(item.respondents));
  const respondents = aggregates.reduce((sum, item) => sum + item.respondents, 0);
  const eligible = aggregates.reduce((sum, item) => sum + item.eligible, 0);
  const visibleRespondents = visible.reduce((sum, item) => sum + item.respondents, 0);
  const score = visibleRespondents ? Math.round(visible.reduce((sum, item) => sum + item.score * item.respondents, 0) / visibleRespondents) : 0;
  return <AnalyticsPageShell section={section} title={assessment.title} description={assessment.description} actions={<StatusBadge tone="info">Dados demonstrativos</StatusBadge>}><section className="analytics-privacy-banner"><strong>Somente resultados agregados</strong><p>Coortes menores que cinco continuam ocultas mesmo quando a participação geral é suficiente.</p></section><div className="analytics-kpi-grid"><article><span>Participação geral</span><strong>{eligible ? Math.round((respondents / eligible) * 100) : 0}%</strong><small>{respondents} de {eligible} respostas</small></article><article><span>Score agregado exibível</span><strong>{score || '—'}</strong><small>Exclui coortes insuficientes</small></article><article><span>Áreas protegidas</span><strong>{aggregates.length - visible.length}</strong><small>Com menos de cinco respostas</small></article></div><SectionCard><h2 className="analytics-section-title">Resultados por área</h2>{aggregates.length === 0 ? <EmptyState title="Sem resultados" description="Ainda não há respostas agregadas para esta atividade." /> : <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Área</th><th>Participação</th><th>Score</th><th>Privacidade</th></tr></thead><tbody>{aggregates.map((aggregate) => { const department = state.departments.find((item) => item.id === aggregate.departmentId); const allowed = canDisplayAggregate(aggregate.respondents); return <tr key={aggregate.departmentId}><td>{department?.name}</td><td>{aggregate.respondents} de {aggregate.eligible}</td><td>{allowed ? aggregate.score : 'Oculto'}</td><td><StatusBadge tone={allowed ? 'success' : 'warning'}>{allowed ? 'Coorte elegível' : 'Dados insuficientes'}</StatusBadge></td></tr>; })}</tbody></table></div>}</SectionCard></AnalyticsPageShell>;
}
