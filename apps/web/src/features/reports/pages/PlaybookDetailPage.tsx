import { Link, useParams } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import { ReportPageShell } from '../components/ReportPageShell';

export function PlaybookDetailPage() {
  const { playbookId = '' } = useParams();
  const { state } = useMockApp();
  const playbook = state.playbooks.find((item) => item.id === playbookId);
  if (!playbook) return <ReportPageShell section="Playbooks" title="Playbook não encontrado" description="A recomendação informada não existe."><EmptyState title="Playbook indisponível" description="Volte para a biblioteca." action={<Link to="/rh/playbooks">Ver playbooks</Link>} /></ReportPageShell>;
  return <ReportPageShell section="Playbooks" title={playbook.title} description={playbook.context} actions={<div className="report-header-actions"><StatusBadge tone="info">{playbook.duration}</StatusBadge><StatusBadge tone="neutral">Esforço {playbook.effort}</StatusBadge></div>}><div className="playbook-detail-grid"><SectionCard><h2>Como aplicar</h2><ol className="playbook-steps">{playbook.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></SectionCard><SectionCard><h2>Indicadores de acompanhamento</h2><ul className="playbook-indicators">{playbook.indicators.map((indicator) => <li key={indicator}>{indicator}</li>)}</ul><p className="report-disclaimer">Use apenas como orientação organizacional. Este conteúdo não diagnostica pessoas nem prescreve tratamento.</p></SectionCard></div></ReportPageShell>;
}
