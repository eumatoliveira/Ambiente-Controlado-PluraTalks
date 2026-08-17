import { useState, type ReactNode } from 'react';

import { CollaboratorHeader } from './CollaboratorHeader';
import { CollaboratorSidebar } from './CollaboratorSidebar';
import { useMockApp } from '../../../app/providers/useMockApp';
import '../pages/collaborator-shell.css';

export function CollaboratorLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state } = useMockApp();

  return (
    <div className="collaborator-layout" data-reduced-motion={state.collaboratorPreferences.reducedMotion || undefined}>
      <a className="collaborator-skip-link" href="#collaborator-content">Ir para o conteúdo</a>
      {menuOpen ? (
        <button
          type="button"
          className="collaborator-drawer-overlay"
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <CollaboratorSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="collaborator-workspace">
        <CollaboratorHeader onMenuToggle={() => setMenuOpen(true)} menuOpen={menuOpen} />
        <main id="collaborator-content" className="collaborator-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
