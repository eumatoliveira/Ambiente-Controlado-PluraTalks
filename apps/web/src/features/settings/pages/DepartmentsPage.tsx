import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { MockValidationError } from '../../../app/mockRules';
import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { Department } from '../../../types/domain';
import { SettingsPageShell } from '../components/SettingsPageShell';
import { departmentSchema, type DepartmentFormValues } from '../schemas';

const emptyDepartment: DepartmentFormValues = {
  name: '',
  description: '',
  managerName: '',
  colorToken: 'purple',
};

export function DepartmentsPage() {
  const { state, createDepartment, updateDepartment, setDepartmentStatus } = useMockApp();
  const [editing, setEditing] = useState<Department | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: emptyDepartment,
  });

  function openCreate() {
    setEditing(null);
    reset(emptyDepartment);
    setFeedback(null);
    setFormOpen(true);
  }

  function openEdit(department: Department) {
    setEditing(department);
    reset(department);
    setFeedback(null);
    setFormOpen(true);
  }

  async function onSubmit(values: DepartmentFormValues) {
    try {
      if (editing) await updateDepartment({ ...editing, ...values });
      else await createDepartment(values);
      setFeedback({ tone: 'success', message: editing ? 'Área atualizada nesta sessão.' : 'Área criada nesta sessão.' });
      setFormOpen(false);
      setEditing(null);
      reset(emptyDepartment);
    } catch (error) {
      setFeedback({ tone: 'error', message: error instanceof MockValidationError ? error.message : 'Não foi possível salvar a área.' });
    }
  }

  return (
    <SettingsPageShell
      title="Áreas"
      description="Organize a estrutura demonstrativa e mantenha um responsável por área."
      hub={false}
      actions={<button className="settings-primary-button" type="button" onClick={openCreate}>Nova área</button>}
    >
      {feedback ? <p className={`settings-feedback settings-feedback--${feedback.tone}`} role={feedback.tone === 'error' ? 'alert' : 'status'}>{feedback.message}</p> : null}
      {formOpen ? (
        <SectionCard className="settings-form-card">
          <div className="settings-section-title"><h2>{editing ? 'Editar área' : 'Nova área'}</h2></div>
          <form className="settings-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="settings-field"><span>Nome</span><input {...register('name')} />{errors.name ? <small role="alert">{errors.name.message}</small> : null}</label>
            <label className="settings-field"><span>Responsável</span><input {...register('managerName')} />{errors.managerName ? <small role="alert">{errors.managerName.message}</small> : null}</label>
            <label className="settings-field settings-field--wide"><span>Descrição</span><textarea {...register('description')} />{errors.description ? <small role="alert">{errors.description.message}</small> : null}</label>
            <label className="settings-field"><span>Identidade visual</span><select {...register('colorToken')}><option value="purple">Roxo</option><option value="orange">Laranja</option><option value="slate">Cinza</option></select></label>
            <div className="settings-form-actions"><button className="settings-secondary-button" type="button" onClick={() => setFormOpen(false)}>Cancelar</button><button className="settings-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Salvando…' : 'Salvar área'}</button></div>
          </form>
        </SectionCard>
      ) : null}
      <div className="settings-entity-grid">
        {state.departments.map((department) => (
          <article className="settings-entity-card" key={department.id}>
            <header><div><h3>{department.name}</h3><p className="settings-entity-meta">Responsável: {department.managerName}</p></div><StatusBadge tone={department.status === 'active' ? 'success' : 'neutral'}>{department.status === 'active' ? 'Ativa' : 'Arquivada'}</StatusBadge></header>
            <p>{department.description}</p>
            <span className="settings-entity-meta">{department.memberCount} pessoas vinculadas</span>
            <div className="settings-card-actions">
              {department.status === 'active' ? <Link className="settings-link-button" to={`/rh/areas/${department.id}`}>Ver indicadores</Link> : null}
              <button className="settings-link-button" type="button" onClick={() => openEdit(department)}>Editar</button>
              <button className={department.status === 'active' ? 'settings-danger-button' : 'settings-secondary-button'} type="button" onClick={() => setDepartmentStatus(department.id, department.status === 'active' ? 'archived' : 'active')}>{department.status === 'active' ? 'Arquivar' : 'Reativar'}</button>
            </div>
          </article>
        ))}
      </div>
    </SettingsPageShell>
  );
}
