import {
  AcademicCapIcon,
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  HomeIcon,
  MapIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { collaboratorNavigation } from '../../../app/navigation';
import { useMockApp } from '../../../app/providers/useMockApp';

const navigationIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Início: HomeIcon,
  Responda: ClipboardDocumentListIcon,
  'RH Comunica': ChatBubbleLeftRightIcon,
  Trilhas: AcademicCapIcon,
  'Minha Jornada': MapIcon,
  Configurações: Cog6ToothIcon,
};

export function CollaboratorSidebar({ open = false, onClose = () => undefined }: { open?: boolean; onClose?: () => void }) {
  const { state } = useMockApp();
  const initials = state.collaboratorProfile.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  return (
    <aside
      id="collaborator-sidebar"
      className={`collaborator-sidebar${open ? ' collaborator-sidebar--open' : ''}`}
      aria-label="Portal do colaborador"
    >
      <button type="button" className="collaborator-drawer-close" aria-label="Fechar menu" onClick={onClose}>
        <XMarkIcon aria-hidden="true" />
      </button>
      <div className="collaborator-profile">
        <div className="collaborator-avatar" aria-hidden="true">{initials}</div>
        <div className="collaborator-profile-copy">
          <strong>{state.collaboratorProfile.name}</strong>
          <span>{state.collaboratorProfile.roleTitle}</span>
        </div>
      </div>

      <nav className="collaborator-navigation" aria-label="Portal do colaborador">
        {collaboratorNavigation.map(({ label, to, end }) => {
          const Icon = navigationIcons[label];
          return (
            <NavLink
              key={label}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `collaborator-nav-item${isActive ? ' collaborator-nav-item--active' : ''}`
              }
            >
              <Icon aria-hidden="true" />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="collaborator-sidebar-footer">
        <Link className="collaborator-nav-item" to="/" onClick={onClose}>
          <ArrowRightStartOnRectangleIcon aria-hidden="true" />
          Sair
        </Link>
      </div>
    </aside>
  );
}
