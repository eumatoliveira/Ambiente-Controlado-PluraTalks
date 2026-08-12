import { CollaboratorLayout } from '../components/CollaboratorLayout';
import './collaborator-shell.css';

export function CollaboratorShellPage() {
  return (
    <CollaboratorLayout>
      <section className="collaborator-shell-intro" aria-labelledby="portal-title">
        <div>
          <p className="collaborator-eyebrow">Estrutura inicial do portal</p>
          <h1 id="portal-title">Meu Portal</h1>
          <p>
            Este será seu espaço pessoal para acompanhar tarefas, desenvolvimento
            e comunicações com o RH.
          </p>
        </div>
        <span className="collaborator-round-badge">Ronda 1</span>
      </section>

      <div className="collaborator-shell-placeholder" role="status">
        <strong>Navegação pessoal preparada</strong>
        <p>Os conteúdos serão adicionados de forma incremental nas próximas rondas.</p>
      </div>
    </CollaboratorLayout>
  );
}

export default CollaboratorShellPage;
