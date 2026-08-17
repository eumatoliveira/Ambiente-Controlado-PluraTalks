import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, StatusBadge } from '../../../components/ui/AppPrimitives';
import { CollaboratorPageShell } from '../components/CollaboratorPageShell';

export function AssessmentsPage() {
  const { state } = useMockApp();
  return <CollaboratorPageShell title="Responda" description="Participe de pesquisas e testes demonstrativos com transparência sobre anonimato."><section className="portal-privacy-card"><strong>Suas respostas analíticas são anônimas</strong><p>O RH recebe apenas resultados agregados quando há pelo menos cinco respostas válidas. Mensagens ao RH são identificadas e ficam em outro canal.</p></section>{state.assessments.length === 0 ? <EmptyState title="Nenhuma avaliação" description="Você não possui atividades atribuídas agora." /> : <div className="portal-card-grid">{state.assessments.map((assessment) => <article className="portal-activity-card" key={assessment.id}><div><StatusBadge tone={assessment.status === 'completed' ? 'success' : assessment.status === 'in_progress' ? 'warning' : 'info'}>{assessment.status === 'completed' ? 'Concluída' : assessment.status === 'in_progress' ? 'Em andamento' : 'Pendente'}</StatusBadge><span>{assessment.kind === 'survey' ? 'Pesquisa' : 'Teste'} · {assessment.estimatedMinutes} min</span></div><h2>{assessment.title}</h2><p>{assessment.description}</p>{assessment.dueDate ? <small>Prazo: {new Intl.DateTimeFormat('pt-BR').format(new Date(`${assessment.dueDate}T12:00:00`))}</small> : null}<Link to={`/colaborador/responda/${assessment.id}`}>{assessment.status === 'completed' ? 'Ver confirmação' : assessment.status === 'in_progress' ? 'Continuar' : 'Começar'}</Link></article>)}</div>}</CollaboratorPageShell>;
}
