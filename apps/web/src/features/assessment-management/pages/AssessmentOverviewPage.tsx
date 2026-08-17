import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { Assessment } from '../../../types/domain';
import { AnalyticsPageShell } from '../components/AnalyticsPageShell';

export function AssessmentOverviewPage({ kind }: { kind: Assessment['kind'] }) {
  const { state } = useMockApp();
  const assessments = state.assessments.filter((item) => item.kind === kind);
  const title = kind === 'survey' ? 'Pesquisas' : 'Testes';
  return <AnalyticsPageShell title={title} description={`Acompanhe ${kind === 'survey' ? 'pesquisas' : 'testes'} fictícios e resultados exclusivamente agregados.`}><section className="analytics-privacy-banner"><strong>Anonimato protegido</strong><p>Áreas com menos de cinco respostas válidas permanecem ocultas. Esta visão não contém nomes, e-mails, cargos ou rankings.</p></section>{assessments.length === 0 ? <EmptyState title={`Nenhum ${kind === 'survey' ? 'pesquisa' : 'teste'}`} description="Não há atividades deste tipo no cenário demonstrativo." /> : <div className="analytics-card-grid">{assessments.map((assessment) => { const aggregates = state.aggregates.filter((item) => item.assessmentId === assessment.id); const respondents = aggregates.reduce((sum, item) => sum + item.respondents, 0); const eligible = aggregates.reduce((sum, item) => sum + item.eligible, 0); return <Link to={`/rh/${kind === 'survey' ? 'pesquisas' : 'testes'}/${assessment.id}`} key={assessment.id}><div><StatusBadge tone={assessment.status === 'completed' ? 'success' : 'info'}>{assessment.status === 'completed' ? 'Concluído' : 'Em coleta'}</StatusBadge><span>{respondents} de {eligible || '—'} respostas</span></div><h2>{assessment.title}</h2><p>{assessment.description}</p><small>{assessment.dueDate ? `Prazo ${new Intl.DateTimeFormat('pt-BR').format(new Date(`${assessment.dueDate}T12:00:00`))}` : 'Sem prazo definido'}</small></Link>; })}</div>}</AnalyticsPageShell>;
}
