import { Link } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { CollaboratorPageShell } from '../components/CollaboratorPageShell';

export function CollaboratorShellPage() {
  const { state } = useMockApp();
  const pending = state.assessments.filter((item) => item.status !== 'completed');
  const published = state.communications.filter((item) => item.status === 'published');
  const trails = state.trails.filter((item) => item.progress < 100);

  return (
    <CollaboratorPageShell title={`Olá, ${state.collaboratorProfile.name.split(' ')[0]}`} description="Acompanhe suas atividades pessoais e comunicações demonstrativas em um só lugar." eyebrow="Visão pessoal">
      <div className="portal-summary-grid"><Link to="/colaborador/responda"><span>Avaliações pendentes</span><strong>{pending.length}</strong><small>Respostas analíticas são anônimas</small></Link><Link to="/colaborador/trilhas"><span>Trilhas em andamento</span><strong>{trails.length}</strong><small>Progresso somente desta sessão</small></Link><Link to="/colaborador/rh-comunica"><span>Comunicados disponíveis</span><strong>{published.length}</strong><small>Conteúdo fictício do RH</small></Link></div>
      <section className="portal-welcome-card">
        <div className="portal-welcome-copy">
          <p className="collaborator-eyebrow">Próxima atividade</p>
          <h2>{pending[0]?.title ?? 'Tudo em dia'}</h2>
          <p>{pending[0]?.description ?? 'Não há avaliações pendentes neste cenário.'}</p>
          {pending[0] ? <Link className="portal-primary-link" to={`/colaborador/responda/${pending[0].id}`}>Começar</Link> : null}
        </div>
        <img
          className="portal-welcome-illustration"
          src="/brand/plura-connection-illustration.png"
          alt=""
          aria-hidden="true"
        />
      </section>
    </CollaboratorPageShell>
  );
}

export default CollaboratorShellPage;
