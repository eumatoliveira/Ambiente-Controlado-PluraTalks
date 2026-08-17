import { useEffect, type ReactNode } from 'react';

import { Breadcrumbs, PageHeader } from '../../../components/ui/AppPrimitives';
import { RHLayout } from '../../rh/components/RHLayout';
import '../pages/settings.css';

export function SettingsPageShell({
  title,
  description,
  children,
  actions,
  hub = true,
}: {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
  hub?: boolean;
}) {
  useEffect(() => {
    document.title = `${title} | PluraTalks`;
  }, [title]);

  const items: Array<{ label: string; to?: string }> = [{ label: 'Visão geral', to: '/rh' }];
  if (hub && title !== 'Configurações') items.push({ label: 'Configurações', to: '/rh/configuracoes' });
  items.push({ label: title, to: undefined });

  return (
    <RHLayout>
      <Breadcrumbs items={items} />
      <PageHeader eyebrow="Ambiente B2B" title={title} description={description} actions={actions} />
      {children}
    </RHLayout>
  );
}
