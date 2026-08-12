import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function CollaboratorHeader() {
  return (
    <header className="collaborator-header">
      <p className="collaborator-brand">PluraTalks</p>

      <div className="collaborator-header-actions">
        <label className="collaborator-search">
          <span className="sr-only">Buscar no portal</span>
          <MagnifyingGlassIcon aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar no portal"
            aria-label="Buscar no portal"
            title="Busca disponível em uma próxima ronda"
            disabled
          />
        </label>

        <button
          className="collaborator-notifications"
          type="button"
          aria-label="Notificações"
          title="Notificações disponíveis em uma próxima ronda"
          disabled
        >
          <BellIcon aria-hidden="true" />
        </button>

        <div className="collaborator-header-profile" aria-label="Lucas Martins">
          <span aria-hidden="true">LM</span>
          <strong>Lucas</strong>
        </div>
      </div>
    </header>
  );
}
