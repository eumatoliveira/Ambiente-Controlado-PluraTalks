import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { ConversationStatus } from '../../../types/domain';
import { MessagingPageShell } from '../components/MessagingPageShell';

const labels: Record<ConversationStatus, string> = { new: 'Nova', in_progress: 'Em andamento', resolved: 'Resolvida', archived: 'Arquivada' };

export function MessagingInboxPage() {
  const { state } = useMockApp();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | ConversationStatus>('all');
  const filtered = useMemo(() => state.conversations.filter((conversation) => `${conversation.protocol} ${conversation.subject} ${conversation.category}`.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR')) && (status === 'all' || conversation.status === status)), [query, state.conversations, status]);
  return <MessagingPageShell context="rh" title="Mensagens" description="Caixa de entrada identificada para solicitações fictícias dos colaboradores.">
    <div className="message-summary-grid"><article><span>Não lidas</span><strong>{state.conversations.filter((item) => item.unreadByRh).length}</strong></article><article><span>Em atendimento</span><strong>{state.conversations.filter((item) => item.status === 'in_progress').length}</strong></article><article><span>Resolvidas</span><strong>{state.conversations.filter((item) => item.status === 'resolved').length}</strong></article></div>
    <SectionCard><div className="message-toolbar"><input aria-label="Buscar mensagens" placeholder="Buscar protocolo, assunto ou categoria" value={query} onChange={(event) => setQuery(event.target.value)} /><select aria-label="Filtrar mensagens por status" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="all">Todos os status</option><option value="new">Novas</option><option value="in_progress">Em andamento</option><option value="resolved">Resolvidas</option><option value="archived">Arquivadas</option></select></div>
      {filtered.length === 0 ? <EmptyState title="Nenhuma mensagem encontrada" description="Ajuste a busca ou o filtro de status." /> : <div className="message-list">{filtered.map((conversation) => { const person = state.people.find((item) => item.id === conversation.personId); return <Link className={`message-list-item${conversation.unreadByRh ? ' message-list-item--unread' : ''}`} to={`/rh/mensagens/${conversation.id}`} key={conversation.id}><div><span className="message-protocol">{conversation.protocol}</span><strong>{conversation.subject}</strong><p>{person?.name ?? 'Pessoa fictícia'} · {conversation.category}</p></div><div className="message-list-meta"><StatusBadge tone={conversation.status === 'resolved' ? 'success' : conversation.status === 'new' ? 'warning' : 'info'}>{labels[conversation.status]}</StatusBadge><span>{conversation.messages.length} mensagem(ns)</span></div></Link>; })}</div>}
    </SectionCard>
  </MessagingPageShell>;
}
