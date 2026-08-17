import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard } from '../../../components/ui/AppPrimitives';
import { profileSchema, type ProfileFormValues } from '../../settings/schemas';
import { CollaboratorPageShell } from '../components/CollaboratorPageShell';

export function CollaboratorSettingsPage() {
  const { state, saveCollaboratorProfile, saveCollaboratorPreferences } = useMockApp();
  const [saved, setSaved] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(state.collaboratorPreferences.emailNotifications);
  const [reducedMotion, setReducedMotion] = useState(state.collaboratorPreferences.reducedMotion);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema), defaultValues: state.collaboratorProfile });
  async function onSubmit(values: ProfileFormValues) { await saveCollaboratorProfile({ ...state.collaboratorProfile, ...values }); await saveCollaboratorPreferences({ ...state.collaboratorPreferences, emailNotifications, reducedMotion }); setSaved(true); }
  return <CollaboratorPageShell title="Configurações" description="Atualize dados não sensíveis e preferências desta sessão."><SectionCard>{saved ? <p className="portal-success" role="status">Preferências atualizadas nesta sessão.</p> : null}<form className="portal-settings-form" onSubmit={handleSubmit(onSubmit)} noValidate><label><span>Nome</span><input {...register('name')} />{errors.name ? <small role="alert">{errors.name.message}</small> : null}</label><label><span>E-mail</span><input value={state.collaboratorProfile.email} readOnly /><small>O e-mail não pode ser alterado nesta demonstração.</small></label><label><span>Cargo</span><input {...register('roleTitle')} />{errors.roleTitle ? <small role="alert">{errors.roleTitle.message}</small> : null}</label><label><span>Telefone</span><input type="tel" {...register('phone')} />{errors.phone ? <small role="alert">{errors.phone.message}</small> : null}</label><fieldset><legend>Preferências</legend><label className="portal-checkbox"><input type="checkbox" checked={emailNotifications} onChange={(event) => setEmailNotifications(event.target.checked)} /> Receber lembretes demonstrativos por e-mail</label><label className="portal-checkbox"><input type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} /> Reduzir movimentos da interface</label></fieldset><div className="portal-form-actions"><button className="portal-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Salvando…' : 'Salvar preferências'}</button></div></form></SectionCard></CollaboratorPageShell>;
}
