import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { Playbook } from '../../../types/domain';
import { ReportPageShell } from '../components/ReportPageShell';

const categories: Record<Playbook['category'], string> = { overload: 'Sobrecarga', leadership: 'Liderança', autonomy: 'Autonomia', conflict: 'Conflitos', recognition: 'Reconhecimento' };

export function PlaybooksPage() {
  const { state } = useMockApp();
  const [category, setCategory] = useState<'all' | Playbook['category']>('all');
  const [effort, setEffort] = useState<'all' | Playbook['effort']>('all');
  const list = useMemo(() => state.playbooks.filter((item) => (category === 'all' || item.category === category) && (effort === 'all' || item.effort === effort)), [category, effort, state.playbooks]);
  return <ReportPageShell section="Playbooks" title="Playbooks" description="Biblioteca de ações organizacionais práticas e não clínicas."><div className="report-toolbar"><select aria-label="Filtrar playbooks por categoria" value={category} onChange={(event) => setCategory(event.target.value as typeof category)}><option value="all">Todas as categorias</option>{Object.entries(categories).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><select aria-label="Filtrar playbooks por esforço" value={effort} onChange={(event) => setEffort(event.target.value as typeof effort)}><option value="all">Todos os esforços</option><option value="low">Baixo</option><option value="medium">Médio</option><option value="high">Alto</option></select></div>{list.length === 0 ? <EmptyState title="Nenhum playbook encontrado" description="Ajuste os filtros para ver outras recomendações." /> : <div className="playbook-grid">{list.map((item) => <Link to={`/rh/playbooks/${item.id}`} key={item.id}><div><StatusBadge tone="info">{categories[item.category]}</StatusBadge><StatusBadge tone="neutral">Esforço {item.effort}</StatusBadge></div><h2>{item.title}</h2><p>{item.context}</p><span>{item.duration}</span></Link>)}</div>}<p className="report-disclaimer">Playbooks são recomendações organizacionais e não substituem avaliação profissional, clínica ou jurídica.</p></ReportPageShell>;
}
