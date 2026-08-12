import {
  AcademicCapIcon,
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  HomeIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';
import { Link } from 'react-router-dom';

type NavigationItem = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: 'Início', icon: HomeIcon, active: true },
  { label: 'Responda', icon: ClipboardDocumentListIcon },
  { label: 'RH Comunica', icon: ChatBubbleLeftRightIcon },
  { label: 'Trilhas', icon: AcademicCapIcon },
  { label: 'Minha Jornada', icon: MapIcon },
  { label: 'Configurações', icon: Cog6ToothIcon },
];

export function CollaboratorSidebar() {
  return (
    <aside className="collaborator-sidebar">
      <div className="collaborator-profile">
        <div className="collaborator-avatar" aria-hidden="true">
          LM
        </div>
        <div className="collaborator-profile-copy">
          <strong>Lucas Martins</strong>
          <span>Colaborador</span>
        </div>
      </div>

      <nav
        className="collaborator-navigation"
        aria-label="Portal do colaborador"
      >
        {navigationItems.map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={`collaborator-nav-item${
              active ? ' collaborator-nav-item--active' : ''
            }`}
            aria-current={active ? 'page' : undefined}
            aria-disabled={active ? undefined : true}
            title={active ? label : `${label} — disponível em uma próxima ronda`}
          >
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </nav>

      <div className="collaborator-sidebar-footer">
        <Link className="collaborator-nav-item" to="/">
          <ArrowRightStartOnRectangleIcon aria-hidden="true" />
          Sair
        </Link>
      </div>
    </aside>
  );
}
