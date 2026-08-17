import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState } from '../../../components/ui/AppPrimitives';
import { CollaboratorPageShell } from '../components/CollaboratorPageShell';

export function TrailsPage() {
  const { state } = useMockApp();
  return <CollaboratorPageShell title="Trilhas" description="Conteúdos breves para apoiar seu desenvolvimento no trabalho.">{state.trails.length === 0 ? <EmptyState title="Nenhuma trilha" description="Não há conteúdos atribuídos nesta sessão." /> : <div className="portal-card-grid">{state.trails.map((trail) => <article className="portal-trail-card" key={trail.id}><span>{trail.duration}</span><h2>{trail.title}</h2><p>{trail.description}</p><div className="portal-progress" role="progressbar" aria-label={`Progresso de ${trail.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={trail.progress}><span style={{ width: `${trail.progress}%` }} /></div><small>{trail.progress}% concluído</small><Link to={`/colaborador/trilhas/${trail.id}`}>{trail.progress === 0 ? 'Começar trilha' : trail.progress === 100 ? 'Revisar trilha' : 'Continuar trilha'}</Link></article>)}</div>}</CollaboratorPageShell>;
}
