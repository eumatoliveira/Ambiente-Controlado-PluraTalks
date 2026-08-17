import { useEffect, type ReactNode } from 'react';

import { Breadcrumbs, PageHeader } from '../../../components/ui/AppPrimitives';
import { CollaboratorLayout } from '../../collaborator/components/CollaboratorLayout';
import { RHLayout } from '../../rh/components/RHLayout';
import '../pages/messaging.css';

export function MessagingPageShell({ context, title, description, children, actions, rhSection }: { context: 'rh' | 'collaborator'; title: string; description: string; children: ReactNode; actions?: ReactNode; rhSection?: 'Mensagens' | 'Comunicados' }) {
  useEffect(() => { document.title = `${title} | PluraTalks`; }, [title]);
  if (context === 'collaborator') return <CollaboratorLayout><div className="message-collaborator-heading"><div><p className="collaborator-eyebrow">RH Comunica</p><h1>{title}</h1><p>{description}</p></div>{actions}</div>{children}</CollaboratorLayout>;
  const section = rhSection ?? (title.toLocaleLowerCase('pt-BR').includes('comunicado') ? 'Comunicados' : 'Mensagens');
  return <RHLayout><Breadcrumbs items={[{ label: 'Visão geral', to: '/rh' }, { label: section, to: section === 'Mensagens' ? '/rh/mensagens' : '/rh/comunicados' }, ...(title === section ? [] : [{ label: title }])]} /><PageHeader eyebrow={section === 'Mensagens' ? 'Atendimento identificado' : 'Comunicação interna'} title={title} description={description} actions={actions} />{children}</RHLayout>;
}
