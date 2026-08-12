import type { ReactNode } from 'react';

import { CollaboratorHeader } from './CollaboratorHeader';
import { CollaboratorSidebar } from './CollaboratorSidebar';

type CollaboratorLayoutProps = {
  children: ReactNode;
};

export function CollaboratorLayout({ children }: CollaboratorLayoutProps) {
  return (
    <div className="collaborator-layout">
      <a className="collaborator-skip-link" href="#collaborator-content">
        Ir para o conteúdo
      </a>
      <CollaboratorSidebar />
      <div className="collaborator-workspace">
        <CollaboratorHeader />
        <main id="collaborator-content" className="collaborator-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
