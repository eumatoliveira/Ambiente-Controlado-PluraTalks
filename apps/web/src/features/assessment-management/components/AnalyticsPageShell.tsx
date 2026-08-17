import { useEffect, type ReactNode } from 'react';

import { Breadcrumbs, PageHeader } from '../../../components/ui/AppPrimitives';
import { RHLayout } from '../../rh/components/RHLayout';
import '../pages/assessment-management.css';

export function AnalyticsPageShell({ title, description, children, actions, section = title }: { title: string; description: string; children: ReactNode; actions?: ReactNode; section?: string }) {
  useEffect(() => { document.title = `${title} | PluraTalks`; }, [title]);
  const base = section === 'Pesquisas' ? '/rh/pesquisas' : section === 'Testes' ? '/rh/testes' : section === 'Alertas' ? '/rh/alertas' : '/rh/compliance';
  return <RHLayout><Breadcrumbs items={[{ label: 'Visão geral', to: '/rh' }, { label: section, to: base }, ...(title === section ? [] : [{ label: title }])]} /><PageHeader eyebrow="Resultados agregados" title={title} description={description} actions={actions} />{children}</RHLayout>;
}
