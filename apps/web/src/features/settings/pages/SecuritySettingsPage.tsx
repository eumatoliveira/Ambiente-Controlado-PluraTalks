import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard } from '../../../components/ui/AppPrimitives';
import { SettingsPageShell } from '../components/SettingsPageShell';
import { securitySchema, type SecurityFormValues } from '../schemas';

export function SecuritySettingsPage() {
  const { state } = useMockApp();
  const [saved, setSaved] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SecurityFormValues>({ resolver: zodResolver(securitySchema), defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' } });

  async function onSubmit() {
    await new Promise((resolve) => window.setTimeout(resolve, 80));
    reset();
    setSaved(true);
  }

  const inputType = showPasswords ? 'text' : 'password';

  return (
    <SettingsPageShell title="Segurança" description="Demonstre a troca de senha sem registrar ou transmitir credenciais.">
      <SectionCard>
        <p className="settings-feedback settings-feedback--info">Ambiente demonstrativo: nenhum valor de senha é persistido no navegador.</p>
        {saved ? <p className="settings-feedback settings-feedback--success" role="status">Senha atualizada apenas para fins de demonstração. Os campos foram limpos.</p> : null}
        <form className="settings-form settings-form--single" onSubmit={handleSubmit(onSubmit)} noValidate>
          <input className="sr-only" type="email" name="username" autoComplete="username" value={state.rhProfile.email} readOnly aria-label="Usuário da conta" />
          <label className="settings-field"><span>Senha atual</span><input autoComplete="current-password" type={inputType} {...register('currentPassword')} />{errors.currentPassword ? <small role="alert">{errors.currentPassword.message}</small> : null}</label>
          <label className="settings-field"><span>Nova senha</span><input autoComplete="new-password" type={inputType} {...register('newPassword')} />{errors.newPassword ? <small role="alert">{errors.newPassword.message}</small> : null}</label>
          <label className="settings-field"><span>Confirmar nova senha</span><input autoComplete="new-password" type={inputType} {...register('confirmPassword')} />{errors.confirmPassword ? <small role="alert">{errors.confirmPassword.message}</small> : null}</label>
          <label className="settings-inline-actions"><input type="checkbox" checked={showPasswords} onChange={(event) => setShowPasswords(event.target.checked)} /> Mostrar senhas</label>
          <div className="settings-form-actions"><button className="settings-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Atualizando…' : 'Atualizar senha'}</button></div>
        </form>
      </SectionCard>
    </SettingsPageShell>
  );
}
