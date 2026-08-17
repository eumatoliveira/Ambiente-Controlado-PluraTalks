import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { MockValidationError, PlanLimitError, remainingSeats, usedSeats } from '../../../app/mockRules';
import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { Person } from '../../../types/domain';
import { SettingsPageShell } from '../components/SettingsPageShell';
import { personSchema, type PersonFormValues } from '../schemas';

const emptyPerson: PersonFormValues = { name: '', email: '', roleTitle: '', departmentId: '' };

const statusLabels: Record<Person['status'], string> = { active: 'Ativa', inactive: 'Inativa', invited: 'Convidada' };

export function PeoplePage() {
  const { state, invitePerson, updatePerson, setPersonStatus } = useMockApp();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | Person['status']>('all');
  const [editing, setEditing] = useState<Person | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error' | 'info'; message: string } | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PersonFormValues>({ resolver: zodResolver(personSchema), defaultValues: emptyPerson });
  const used = usedSeats(state.people);
  const remaining = remainingSeats(state.plan, state.people);
  const departments = state.departments.filter((department) => department.status === 'active');
  const filtered = useMemo(() => state.people.filter((person) => {
    const matchesQuery = `${person.name} ${person.email} ${person.roleTitle}`.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR'));
    return matchesQuery && (status === 'all' || person.status === status);
  }), [query, state.people, status]);

  function openInvite() {
    setEditing(null);
    reset(emptyPerson);
    setFeedback(null);
    setFormOpen(true);
  }

  function openEdit(person: Person) {
    setEditing(person);
    reset(person);
    setFeedback(null);
    setFormOpen(true);
  }

  async function onSubmit(values: PersonFormValues) {
    try {
      if (editing) await updatePerson({ ...editing, ...values });
      else await invitePerson(values);
      setFeedback({ tone: 'success', message: editing ? 'Pessoa atualizada nesta sessão.' : 'Convite demonstrativo enviado.' });
      setFormOpen(false);
      setEditing(null);
      reset(emptyPerson);
    } catch (error) {
      const message = error instanceof MockValidationError || error instanceof PlanLimitError ? error.message : 'Não foi possível salvar a pessoa.';
      setFeedback({ tone: 'error', message });
    }
  }

  return (
    <SettingsPageShell title="Pessoas" description="Gerencie pessoas e convites respeitando a capacidade contratada." hub={false} actions={<button className="settings-primary-button" type="button" onClick={openInvite} disabled={remaining === 0}>Convidar pessoa</button>}>
      <div className="settings-summary-grid"><article><span>Uso do plano</span><strong>{used} de {state.plan.seatLimit}</strong></article><article><span>Vagas restantes</span><strong>{remaining}</strong></article><article><span>Convites pendentes</span><strong>{state.people.filter((person) => person.invitationStatus === 'pending').length}</strong></article></div>
      {feedback ? <p className={`settings-feedback settings-feedback--${feedback.tone}`} role={feedback.tone === 'error' ? 'alert' : 'status'}>{feedback.message}</p> : null}
      {formOpen ? (
        <SectionCard>
          <div className="settings-section-title"><h2>{editing ? 'Editar pessoa' : 'Convidar pessoa'}</h2></div>
          <form className="settings-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="settings-field"><span>Nome</span><input {...register('name')} />{errors.name ? <small role="alert">{errors.name.message}</small> : null}</label>
            <label className="settings-field"><span>E-mail corporativo</span><input type="email" {...register('email')} />{errors.email ? <small role="alert">{errors.email.message}</small> : null}</label>
            <label className="settings-field"><span>Cargo</span><input {...register('roleTitle')} />{errors.roleTitle ? <small role="alert">{errors.roleTitle.message}</small> : null}</label>
            <label className="settings-field"><span>Área</span><select {...register('departmentId')}><option value="">Selecione</option>{departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}</select>{errors.departmentId ? <small role="alert">{errors.departmentId.message}</small> : null}</label>
            <div className="settings-form-actions"><button className="settings-secondary-button" type="button" onClick={() => setFormOpen(false)}>Cancelar</button><button className="settings-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Salvando…' : editing ? 'Salvar pessoa' : 'Enviar convite'}</button></div>
          </form>
        </SectionCard>
      ) : null}
      <SectionCard>
        <div className="settings-toolbar"><div className="settings-toolbar__filters"><input className="settings-search-input" aria-label="Buscar pessoas" placeholder="Buscar por nome, e-mail ou cargo" value={query} onChange={(event) => setQuery(event.target.value)} /><select className="settings-filter-select" aria-label="Filtrar por status" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="all">Todos os status</option><option value="active">Ativas</option><option value="invited">Convidadas</option><option value="inactive">Inativas</option></select></div><span className="settings-entity-meta">{filtered.length} resultado(s)</span></div>
        {filtered.length === 0 ? <EmptyState title="Nenhuma pessoa encontrada" description="Ajuste os filtros ou convide uma nova pessoa." /> : <div className="settings-table-wrap"><table className="settings-table"><thead><tr><th>Pessoa</th><th>Área</th><th>Status</th><th>Convite</th><th>Ações</th></tr></thead><tbody>{filtered.map((person) => { const department = state.departments.find((item) => item.id === person.departmentId); return <tr key={person.id}><td><strong>{person.name}</strong><br /><span className="settings-entity-meta">{person.email} · {person.roleTitle}</span></td><td>{department?.name ?? 'Sem área'}</td><td><StatusBadge tone={person.status === 'active' ? 'success' : person.status === 'invited' ? 'warning' : 'neutral'}>{statusLabels[person.status]}</StatusBadge></td><td>{person.invitationStatus === 'pending' ? 'Pendente' : person.invitationStatus === 'accepted' ? 'Aceito' : '—'}</td><td><div className="settings-inline-actions"><button className="settings-link-button" type="button" onClick={() => openEdit(person)}>Editar</button>{person.status === 'invited' ? <button className="settings-link-button" type="button" onClick={() => setFeedback({ tone: 'info', message: `Convite reenviado para ${person.email}.` })}>Reenviar</button> : null}<button className={person.status === 'inactive' ? 'settings-secondary-button' : 'settings-danger-button'} type="button" onClick={() => setPersonStatus(person.id, person.status === 'inactive' ? 'active' : 'inactive')}>{person.status === 'inactive' ? 'Reativar' : person.status === 'invited' ? 'Cancelar convite' : 'Desativar'}</button></div></td></tr>; })}</tbody></table></div>}
      </SectionCard>
    </SettingsPageShell>
  );
}
