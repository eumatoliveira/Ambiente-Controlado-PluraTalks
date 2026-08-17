import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { ConversationStatus } from '../../../types/domain';
import { MessagingPageShell } from '../components/MessagingPageShell';
import { replySchema, type ReplyFormValues } from '../schemas';

const labels: Record<ConversationStatus, string> = { new: 'Nova', in_progress: 'Em andamento', resolved: 'Resolvida', archived: 'Arquivada' };

export function ConversationDetailPage({ context }: { context: 'rh' | 'collaborator' }) {
  const { conversationId = '' } = useParams();
  const { state, replyToConversation } = useMockApp();
  const [saved, setSaved] = useState(false);
  const conversation = state.conversations.find((item) => item.id === conversationId);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ReplyFormValues>({ resolver: zodResolver(replySchema), defaultValues: { body: '' } });
  if (!conversation) return <MessagingPageShell context={context} title="Conversa não encontrada" description="A solicitação informada não existe neste cenário."><EmptyState title="Conversa indisponível" description="Volte para a lista de mensagens." action={<Link to={context === 'rh' ? '/rh/mensagens' : '/colaborador/rh-comunica'}>Voltar</Link>} /></MessagingPageShell>;
  const person = state.people.find((item) => item.id === conversation.personId);
  async function sendReply(values: ReplyFormValues) { if (!conversation) return; await replyToConversation(conversation.id, values.body, context, context === 'rh' ? 'in_progress' : undefined); reset(); setSaved(true); }
  async function setStatus(status: ConversationStatus) { if (!conversation) return; await replyToConversation(conversation.id, status === 'resolved' ? 'Atendimento marcado como resolvido.' : 'Atendimento reaberto.', 'rh', status); setSaved(true); }
  return <MessagingPageShell context={context} title={conversation.subject} description={`${conversation.protocol} · ${conversation.category}`} actions={<StatusBadge tone={conversation.status === 'resolved' ? 'success' : 'info'}>{labels[conversation.status]}</StatusBadge>}>
    <div className="message-detail-grid"><SectionCard className="message-thread-card"><div className="message-thread-heading"><div><strong>{context === 'rh' ? person?.name : 'Conversa com o RH'}</strong><p>{conversation.urgency === 'high' ? 'Prioridade alta' : 'Prioridade normal'} · mensagem identificada</p></div></div><ol className="message-thread" aria-label="Histórico da conversa">{conversation.messages.map((message) => <li className={`message-bubble message-bubble--${message.authorRole}`} key={message.id}><div><strong>{message.authorName}</strong><time dateTime={message.createdAt}>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(message.createdAt))}</time></div><p>{message.body}</p></li>)}</ol>
      {saved ? <p className="message-feedback" role="status">Conversa atualizada nesta sessão.</p> : null}
      {conversation.status !== 'archived' ? <form className="message-reply-form" onSubmit={handleSubmit(sendReply)} noValidate><label><span>Responder</span><textarea {...register('body')} placeholder={context === 'rh' ? 'Escreva uma resposta do RH' : 'Escreva uma nova mensagem'} />{errors.body ? <small role="alert">{errors.body.message}</small> : null}</label><button className="message-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Enviando…' : 'Enviar resposta'}</button></form> : null}
    </SectionCard>{context === 'rh' ? <aside className="message-actions-card"><h2>Atendimento</h2><p>Altere o status sem registrar conteúdo fora desta sessão.</p><button type="button" className="message-secondary-button" onClick={() => setStatus(conversation.status === 'resolved' ? 'in_progress' : 'resolved')}>{conversation.status === 'resolved' ? 'Reabrir conversa' : 'Marcar como resolvida'}</button></aside> : null}</div>
  </MessagingPageShell>;
}
