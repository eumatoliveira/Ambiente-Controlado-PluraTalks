import { useEffect, type ReactNode } from 'react';

import { CollaboratorLayout } from './CollaboratorLayout';
import '../pages/portal.css';

export function CollaboratorPageShell({ title, description, children, actions, eyebrow = 'Meu Portal' }: { title: string; description: string; children: ReactNode; actions?: ReactNode; eyebrow?: string }) {
  useEffect(() => { document.title = `${title} | PluraTalks`; }, [title]);
  return <CollaboratorLayout><header className="portal-page-heading"><div><p className="collaborator-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{actions}</header>{children}</CollaboratorLayout>;
}
