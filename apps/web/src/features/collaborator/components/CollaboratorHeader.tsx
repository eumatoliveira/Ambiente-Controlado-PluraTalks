import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useMockApp } from '../../../app/providers/useMockApp';

export function CollaboratorHeader({ onMenuToggle, menuOpen }: { onMenuToggle: () => void; menuOpen: boolean }) {
  const { state } = useMockApp();
  const firstName = state.collaboratorProfile.name.split(/\s+/)[0];
  const initials = state.collaboratorProfile.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  return (
    <header className="collaborator-header">
      <div className="collaborator-header-brand">
        <button
          type="button"
          className="collaborator-menu-button"
          aria-controls="collaborator-sidebar"
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          <Bars3Icon aria-hidden="true" />
          <span className="sr-only">Abrir menu</span>
        </button>
        <p className="collaborator-brand">PluraTalks</p>
      </div>

      <div className="collaborator-header-actions">
        <label className="collaborator-search">
          <span className="sr-only">Buscar no portal</span>
          <MagnifyingGlassIcon aria-hidden="true" />
          <input type="search" placeholder="Buscar no portal" aria-label="Buscar no portal" disabled />
        </label>
        <button className="collaborator-notifications" type="button" aria-label="Notificações" disabled>
          <BellIcon aria-hidden="true" />
        </button>
        <div className="collaborator-header-profile" aria-label={state.collaboratorProfile.name}>
          <span aria-hidden="true">{initials}</span>
          <strong>{firstName}</strong>
        </div>
      </div>
    </header>
  );
}
