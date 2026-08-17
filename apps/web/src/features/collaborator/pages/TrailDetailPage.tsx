import { Link, useParams } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState } from '../../../components/ui/AppPrimitives';
import { CollaboratorPageShell } from '../components/CollaboratorPageShell';

export function TrailDetailPage() {
  const { trailId = '' } = useParams();
  const { state, setTrailModuleCompleted } = useMockApp();
  const trail = state.trails.find((item) => item.id === trailId);
  if (!trail) return <CollaboratorPageShell title="Trilha não encontrada" description="O conteúdo informado não existe."><EmptyState title="Trilha indisponível" description="Volte para a biblioteca." action={<Link to="/colaborador/trilhas">Ver trilhas</Link>} /></CollaboratorPageShell>;
  return <CollaboratorPageShell title={trail.title} description={`${trail.description} · ${trail.duration}`}><div className="portal-progress portal-progress--large" role="progressbar" aria-label={`Progresso de ${trail.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={trail.progress}><span style={{ width: `${trail.progress}%` }} /></div><section className="portal-module-list"><h2>Módulos</h2>{trail.modules.map((module, index) => <label key={module.id}><input type="checkbox" checked={module.completed} onChange={(event) => setTrailModuleCompleted(trail.id, module.id, event.target.checked)} /><span><strong>{index + 1}. {module.title}</strong><small>{module.completed ? 'Concluído' : 'Pendente'}</small></span></label>)}</section>{trail.progress === 100 ? <p className="portal-complete-inline" role="status">Trilha concluída nesta sessão.</p> : null}</CollaboratorPageShell>;
}
