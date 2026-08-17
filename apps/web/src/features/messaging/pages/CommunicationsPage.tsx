import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { CommunicationStatus } from '../../../types/domain';
import { MessagingPageShell } from '../components/MessagingPageShell';

const labels: Record<CommunicationStatus, string> = { draft: 'Rascunho', scheduled: 'Agendado', published: 'Publicado', archived: 'Arquivado' };

export function CommunicationsPage() {
  const { state, setCommunicationStatus } = useMockApp();
  const [status, setStatus] = useState<'all' | CommunicationStatus>('all');
  const list = useMemo(() => state.communications.filter((item) => status === 'all' || item.status === status), [state.communications, status]);
  return <MessagingPageShell context="rh" title="Comunicados" description="Publique conteúdo fictício para toda a organização ou áreas selecionadas." actions={<Link className="message-primary-link" to="/rh/comunicados/novo">Novo comunicado</Link>}><SectionCard><div className="message-toolbar"><select aria-label="Filtrar comunicados por status" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="all">Todos os status</option><option value="draft">Rascunhos</option><option value="published">Publicados</option><option value="archived">Arquivados</option></select></div>{list.length === 0 ? <EmptyState title="Nenhum comunicado" description="Não há itens com o status selecionado." /> : <div className="message-list">{list.map((item) => <article className="message-list-item" key={item.id}><div><span className="message-protocol">{item.targetType === 'all' ? 'Toda a organização' : `${item.departmentIds.length} área(s)`}</span><strong>{item.title}</strong><p>{item.body}</p></div><div className="message-list-meta"><StatusBadge tone={item.status === 'published' ? 'success' : item.status === 'draft' ? 'warning' : 'neutral'}>{labels[item.status]}</StatusBadge><div>{item.status === 'draft' ? <button className="message-link-button" type="button" onClick={() => setCommunicationStatus(item.id, 'published')}>Publicar</button> : null}{item.status !== 'archived' ? <button className="message-link-button" type="button" onClick={() => setCommunicationStatus(item.id, 'archived')}>Arquivar</button> : null}</div></div></article>)}</div>}</SectionCard></MessagingPageShell>;
}
