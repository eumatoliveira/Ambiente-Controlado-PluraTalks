import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import { ReportPageShell } from '../components/ReportPageShell';

export function ReportsPage() {
  const { state } = useMockApp();
  const [scope, setScope] = useState<'all' | 'organization' | 'department'>('all');
  const reports = useMemo(() => state.reports.filter((item) => scope === 'all' || item.scope === scope), [scope, state.reports]);
  return <ReportPageShell title="Relatórios" description="Crie e revise previews agregados com proteção de anonimato." actions={<Link className="report-primary-link" to="/rh/relatorios/novo">Novo relatório</Link>}><SectionCard><div className="report-toolbar"><select aria-label="Filtrar relatórios por escopo" value={scope} onChange={(event) => setScope(event.target.value as typeof scope)}><option value="all">Todos os escopos</option><option value="organization">Organização</option><option value="department">Por área</option></select></div>{reports.length === 0 ? <EmptyState title="Nenhum relatório" description="Crie um relatório ou altere o filtro." /> : <div className="report-list">{reports.map((report) => <Link to={`/rh/relatorios/${report.id}`} className="report-list-item" key={report.id}><div><span>{report.period}</span><strong>{report.title}</strong><p>{report.scope === 'organization' ? 'Toda a organização' : state.departments.find((item) => item.id === report.departmentId)?.name}</p></div><StatusBadge tone={report.status === 'ready' ? 'success' : 'warning'}>{report.status === 'ready' ? 'Pronto' : 'Rascunho'}</StatusBadge></Link>)}</div>}</SectionCard></ReportPageShell>;
}
