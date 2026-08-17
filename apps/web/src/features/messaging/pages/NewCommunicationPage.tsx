import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard } from '../../../components/ui/AppPrimitives';
import { MessagingPageShell } from '../components/MessagingPageShell';
import { communicationSchema, type CommunicationFormValues } from '../schemas';

export function NewCommunicationPage() {
  const { state, createCommunication } = useMockApp();
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<CommunicationFormValues>({ resolver: zodResolver(communicationSchema), defaultValues: { title: '', body: '', priority: 'normal', targetType: 'all', departmentIds: [], expiresAt: '', publishNow: false } });
  const targetType = useWatch({ control, name: 'targetType' });
  async function onSubmit(values: CommunicationFormValues) { await createCommunication({ title: values.title, body: values.body, priority: values.priority, targetType: values.targetType, departmentIds: values.targetType === 'all' ? [] : values.departmentIds, status: values.publishNow ? 'published' : 'draft', expiresAt: values.expiresAt || undefined }); navigate('/rh/comunicados'); }
  return <MessagingPageShell context="rh" title="Novo comunicado" description="Crie um rascunho ou publique imediatamente para uma audiência demonstrativa."><SectionCard><form className="message-form" onSubmit={handleSubmit(onSubmit)} noValidate><label><span>Título</span><input {...register('title')} />{errors.title ? <small role="alert">{errors.title.message}</small> : null}</label><label><span>Prioridade</span><select {...register('priority')}><option value="normal">Normal</option><option value="important">Importante</option><option value="urgent">Urgente</option></select></label><label><span>Público</span><select {...register('targetType')}><option value="all">Toda a organização</option><option value="departments">Áreas selecionadas</option></select></label><label><span>Expira em (opcional)</span><input type="date" {...register('expiresAt')} /></label>{targetType === 'departments' ? <fieldset className="message-field-wide message-check-grid"><legend>Áreas</legend>{state.departments.filter((item) => item.status === 'active').map((item) => <label key={item.id}><input type="checkbox" value={item.id} {...register('departmentIds')} /> {item.name}</label>)}{errors.departmentIds ? <small role="alert">{errors.departmentIds.message}</small> : null}</fieldset> : null}<label className="message-field-wide"><span>Conteúdo</span><textarea {...register('body')} />{errors.body ? <small role="alert">{errors.body.message}</small> : null}</label><label className="message-field-wide message-checkbox"><input type="checkbox" {...register('publishNow')} /> Publicar imediatamente</label><div className="message-form-actions"><button type="button" className="message-secondary-button" onClick={() => navigate('/rh/comunicados')}>Cancelar</button><button className="message-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Salvando…' : 'Salvar comunicado'}</button></div></form></SectionCard></MessagingPageShell>;
}
