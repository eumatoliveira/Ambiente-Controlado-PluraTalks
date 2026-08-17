import { useEffect, type ReactNode } from 'react';

import { Breadcrumbs, PageHeader } from '../../../components/ui/AppPrimitives';
import { RHLayout } from '../../rh/components/RHLayout';
import '../pages/reports.css';

export function ReportPageShell({ title, description, children, actions, section = 'Relatórios' }: { title: string; description: string; children: ReactNode; actions?: ReactNode; section?: 'Relatórios' | 'Playbooks' }) {
  useEffect(() => { document.title = `${title} | PluraTalks`; }, [title]);
  const base = section === 'Relatórios' ? '/rh/relatorios' : '/rh/playbooks';
  return <RHLayout><Breadcrumbs items={[{ label: 'Visão geral', to: '/rh' }, { label: section, to: base }, ...(title === section ? [] : [{ label: title }])]} /><PageHeader eyebrow="Dados demonstrativos" title={title} description={description} actions={actions} />{children}</RHLayout>;
}
