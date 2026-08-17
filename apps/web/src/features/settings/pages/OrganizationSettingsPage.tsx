import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard } from '../../../components/ui/AppPrimitives';
import { SettingsPageShell } from '../components/SettingsPageShell';
import { organizationSchema, type OrganizationFormValues } from '../schemas';

export function OrganizationSettingsPage() {
  const { state, saveOrganization } = useMockApp();
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: state.organization,
  });

  async function onSubmit(values: OrganizationFormValues) {
    await saveOrganization({ ...state.organization, ...values });
    setSaved(true);
  }

  return (
    <SettingsPageShell title="Organização" description="Edite dados demonstrativos usados nos resumos do ambiente.">
      <SectionCard>
        {saved ? <p className="settings-feedback settings-feedback--success" role="status">Organização atualizada nesta sessão.</p> : null}
        <form className="settings-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField label="Nome fantasia" error={errors.tradeName?.message}><input {...register('tradeName')} /></FormField>
          <FormField label="Razão social (opcional)" error={errors.legalName?.message}><input {...register('legalName')} /></FormField>
          <FormField label="Segmento" error={errors.segment?.message}><input {...register('segment')} /></FormField>
          <FormField label="Porte" error={errors.size?.message}>
            <select {...register('size')}><option value="201–500 pessoas">201–500 pessoas</option><option value="51–200 pessoas">51–200 pessoas</option><option value="Mais de 500 pessoas">Mais de 500 pessoas</option></select>
          </FormField>
          <FormField label="Domínio" error={errors.domain?.message}><input {...register('domain')} /></FormField>
          <FormField label="Fuso horário" error={errors.timezone?.message}>
            <select {...register('timezone')}><option value="America/Sao_Paulo">Brasília (UTC−3)</option><option value="America/Manaus">Manaus (UTC−4)</option></select>
          </FormField>
          <div className="settings-form-actions"><button className="settings-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Salvando…' : 'Salvar alterações'}</button></div>
        </form>
      </SectionCard>
    </SettingsPageShell>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="settings-field"><span>{label}</span>{children}{error ? <small role="alert">{error}</small> : null}</label>;
}
