import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard } from '../../../components/ui/AppPrimitives';
import { ReportPageShell } from '../components/ReportPageShell';
import { reportHasSufficientData } from '../reportRules';
import { reportSchema, type ReportFormValues } from '../schemas';

export function NewReportPage() {
  const { state, createReport } = useMockApp();
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<ReportFormValues>({ resolver: zodResolver(reportSchema), defaultValues: { title: '', scope: 'organization', departmentId: '', period: 'Agosto de 2026', assessmentIds: [], playbookIds: [] } });
  const values = useWatch({ control });
  const privacyAllowed = !values.assessmentIds?.length || reportHasSufficientData({ scope: values.scope ?? 'organization', departmentId: values.departmentId, assessmentIds: values.assessmentIds }, state.aggregates);
  async function onSubmit(input: ReportFormValues) { if (!reportHasSufficientData(input, state.aggregates)) return; const id = await createReport({ ...input, departmentId: input.scope === 'organization' ? undefined : input.departmentId }); navigate(`/rh/relatorios/${id}`); }
  return <ReportPageShell title="Novo relatório" description="Selecione escopo, avaliações e recomendações organizacionais."><SectionCard><form className="report-form" onSubmit={handleSubmit(onSubmit)} noValidate><label><span>Título</span><input {...register('title')} />{errors.title ? <small role="alert">{errors.title.message}</small> : null}</label><label><span>Período</span><input {...register('period')} />{errors.period ? <small role="alert">{errors.period.message}</small> : null}</label><label><span>Escopo</span><select {...register('scope')}><option value="organization">Toda a organização</option><option value="department">Área específica</option></select></label>{values.scope === 'department' ? <label><span>Área</span><select {...register('departmentId')}><option value="">Selecione</option>{state.departments.filter((item) => item.status === 'active').map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{errors.departmentId ? <small role="alert">{errors.departmentId.message}</small> : null}</label> : null}<fieldset className="report-fieldset"><legend>Avaliações</legend>{state.assessments.map((item) => <label key={item.id}><input type="checkbox" value={item.id} {...register('assessmentIds')} /> <span><strong>{item.title}</strong><small>{item.kind === 'survey' ? 'Pesquisa' : 'Teste'}</small></span></label>)}{errors.assessmentIds ? <small role="alert">{errors.assessmentIds.message}</small> : null}</fieldset><fieldset className="report-fieldset"><legend>Playbooks vinculados (opcional)</legend>{state.playbooks.map((item) => <label key={item.id}><input type="checkbox" value={item.id} {...register('playbookIds')} /> <span><strong>{item.title}</strong><small>{item.duration} · esforço {item.effort}</small></span></label>)}</fieldset>{!privacyAllowed ? <p className="report-privacy-block" role="status">Dados insuficientes para preservar o anonimato neste escopo. Escolha outra área ou avaliação.</p> : null}<div className="report-form-actions"><button type="button" className="report-secondary-button" onClick={() => navigate('/rh/relatorios')}>Cancelar</button><button className="report-primary-button" disabled={isSubmitting || !privacyAllowed}>{isSubmitting ? 'Gerando…' : 'Gerar preview'}</button></div></form></SectionCard></ReportPageShell>;
}
