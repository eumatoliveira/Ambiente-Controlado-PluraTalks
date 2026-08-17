import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, StatusBadge } from '../../../components/ui/AppPrimitives';
import { MessagingPageShell } from '../components/MessagingPageShell';

export function CollaboratorCommunicationsPage() {
  const { state } = useMockApp();
  const myDepartment = state.people.find((person) => person.id === 'p-lucas')?.departmentId;
  const communications = state.communications.filter((item) => item.status === 'published' && (item.targetType === 'all' || item.departmentIds.includes(myDepartment ?? '')));
  const conversations = state.conversations.filter((item) => item.personId === 'p-lucas');
  return <MessagingPageShell context="collaborator" title="RH Comunica" description="Leia comunicados destinados a você e acompanhe suas solicitações identificadas." actions={<Link className="message-primary-link" to="/colaborador/rh-comunica/nova">Nova solicitação</Link>}>
    <section className="message-collaborator-section"><div className="message-section-heading"><h2>Comunicados para você</h2><span>{communications.length}</span></div>{communications.length === 0 ? <EmptyState title="Nenhum comunicado" description="Quando o RH publicar algo para você, aparecerá aqui." /> : <div className="message-announcement-grid">{communications.map((item) => <article key={item.id}><div><StatusBadge tone={item.priority === 'urgent' ? 'danger' : item.priority === 'important' ? 'warning' : 'info'}>{item.priority === 'urgent' ? 'Urgente' : item.priority === 'important' ? 'Importante' : 'Comunicado'}</StatusBadge><small>{item.publishedAt ? new Intl.DateTimeFormat('pt-BR').format(new Date(item.publishedAt)) : ''}</small></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>}</section>
    <section className="message-collaborator-section"><div className="message-section-heading"><h2>Minhas solicitações</h2><span>{conversations.length}</span></div>{conversations.length === 0 ? <EmptyState title="Nenhuma solicitação" description="Use o botão Nova solicitação para falar de forma identificada com o RH." /> : <div className="message-list">{conversations.map((item) => <Link className="message-list-item" to={`/colaborador/rh-comunica/${item.id}`} key={item.id}><div><span className="message-protocol">{item.protocol}</span><strong>{item.subject}</strong><p>{item.messages.at(-1)?.body}</p></div><StatusBadge tone={item.status === 'resolved' ? 'success' : 'info'}>{item.status === 'resolved' ? 'Resolvida' : 'Em atendimento'}</StatusBadge></Link>)}</div>}</section>
  </MessagingPageShell>;
}
