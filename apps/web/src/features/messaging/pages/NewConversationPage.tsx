import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard } from '../../../components/ui/AppPrimitives';
import { MessagingPageShell } from '../components/MessagingPageShell';
import { conversationSchema, type ConversationFormValues } from '../schemas';

export function NewConversationPage() {
  const navigate = useNavigate();
  const { createConversation } = useMockApp();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ConversationFormValues>({ resolver: zodResolver(conversationSchema), defaultValues: { subject: '', category: '', urgency: 'normal', body: '' } });
  async function onSubmit(values: ConversationFormValues) { const id = await createConversation(values); navigate(`/colaborador/rh-comunica/${id}`); }
  return <MessagingPageShell context="collaborator" title="Nova solicitação" description="Este canal é identificado. Pesquisas e testes continuam anônimos."><SectionCard><p className="message-identification-notice">Você está falando como <strong>Lucas Martins</strong>. O RH verá sua identidade e o conteúdo desta solicitação.</p><form className="message-form" onSubmit={handleSubmit(onSubmit)} noValidate><label><span>Assunto</span><input {...register('subject')} />{errors.subject ? <small role="alert">{errors.subject.message}</small> : null}</label><label><span>Categoria</span><select {...register('category')}><option value="">Selecione</option><option value="Benefícios">Benefícios</option><option value="Políticas internas">Políticas internas</option><option value="Apoio do RH">Apoio do RH</option><option value="Outro">Outro</option></select>{errors.category ? <small role="alert">{errors.category.message}</small> : null}</label><label><span>Urgência</span><select {...register('urgency')}><option value="low">Baixa</option><option value="normal">Normal</option><option value="high">Alta</option></select></label><label className="message-field-wide"><span>Mensagem</span><textarea {...register('body')} />{errors.body ? <small role="alert">{errors.body.message}</small> : null}</label><div className="message-form-actions"><button type="button" className="message-secondary-button" onClick={() => navigate('/colaborador/rh-comunica')}>Cancelar</button><button className="message-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Enviando…' : 'Enviar ao RH'}</button></div></form></SectionCard></MessagingPageShell>;
}
