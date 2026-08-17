import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard } from '../../../components/ui/AppPrimitives';
import { SettingsPageShell } from '../components/SettingsPageShell';
import { profileSchema, type ProfileFormValues } from '../schemas';

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export function ProfileSettingsPage() {
  const { state, saveRhProfile } = useMockApp();
  const [preview, setPreview] = useState(state.rhProfile.avatarUrl);
  const [avatarError, setAvatarError] = useState('');
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema), defaultValues: state.rhProfile });

  function chooseAvatar(file?: File) {
    setAvatarError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setAvatarError('Escolha um arquivo de imagem.');
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setAvatarError('A imagem deve ter no máximo 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(typeof reader.result === 'string' ? reader.result : undefined);
    reader.readAsDataURL(file);
  }

  async function onSubmit(values: ProfileFormValues) {
    await saveRhProfile({ ...state.rhProfile, ...values, avatarUrl: preview });
    setSaved(true);
  }

  const initials = state.rhProfile.name.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase();

  return (
    <SettingsPageShell title="Perfil" description="Atualize as informações visuais da pessoa gestora nesta sessão.">
      <SectionCard>
        {saved ? <p className="settings-feedback settings-feedback--success" role="status">Perfil atualizado nesta sessão.</p> : null}
        <form className="settings-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="settings-avatar-editor">
            {preview ? <img className="settings-avatar" src={preview} alt="Prévia do avatar" /> : <span className="settings-avatar" aria-label={`Iniciais ${initials}`}>{initials}</span>}
            <label className="settings-field settings-file-input"><span>Foto de perfil</span><input type="file" accept="image/*" onChange={(event) => chooseAvatar(event.target.files?.[0])} /><span className="settings-helper">Prévia local, PNG ou JPG de até 2 MB. Nenhum upload é realizado.</span>{avatarError ? <small role="alert">{avatarError}</small> : null}</label>
          </div>
          <label className="settings-field"><span>Nome</span><input {...register('name')} />{errors.name ? <small role="alert">{errors.name.message}</small> : null}</label>
          <label className="settings-field"><span>E-mail</span><input value={state.rhProfile.email} readOnly aria-describedby="profile-email-helper" /><span id="profile-email-helper" className="settings-helper">O e-mail não pode ser alterado nesta demonstração.</span></label>
          <label className="settings-field"><span>Cargo</span><input {...register('roleTitle')} />{errors.roleTitle ? <small role="alert">{errors.roleTitle.message}</small> : null}</label>
          <label className="settings-field"><span>Telefone</span><input type="tel" {...register('phone')} />{errors.phone ? <small role="alert">{errors.phone.message}</small> : null}</label>
          <div className="settings-form-actions"><button className="settings-primary-button" disabled={isSubmitting}>{isSubmitting ? 'Salvando…' : 'Salvar perfil'}</button></div>
        </form>
      </SectionCard>
    </SettingsPageShell>
  );
}
