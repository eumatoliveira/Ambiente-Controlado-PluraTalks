import {
  AcademicCapIcon,
  Bars3Icon,
  BellAlertIcon,
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState, type ComponentType, type ReactNode, type SVGProps } from 'react';
import { NavLink } from 'react-router-dom';

import { rhNavigation } from '../../../app/navigation';
import { useMockApp } from '../../../app/providers/useMockApp';
import '../pages/rh-dashboard.css';

const navigationIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'Visão Geral': ChartBarSquareIcon,
  Pessoas: UserGroupIcon,
  Áreas: UserGroupIcon,
  Pesquisas: ClipboardDocumentCheckIcon,
  Testes: DocumentChartBarIcon,
  Alertas: BellAlertIcon,
  Mensagens: ChatBubbleLeftRightIcon,
  Comunicados: ChatBubbleLeftRightIcon,
  Relatórios: DocumentChartBarIcon,
  Playbooks: AcademicCapIcon,
  Compliance: ShieldCheckIcon,
};

export function RHLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state } = useMockApp();
  const initials = state.rhProfile.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="rh-layout">
      <a className="rh-skip-link" href="#rh-content">Ir para o conteúdo</a>
      <button
        type="button"
        className="rh-mobile-menu"
        aria-controls="rh-sidebar"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        <Bars3Icon aria-hidden="true" /> Menu
      </button>
      {menuOpen ? (
        <button
          type="button"
          className="rh-drawer-overlay"
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <aside
        id="rh-sidebar"
        className={`rh-sidebar${menuOpen ? ' rh-sidebar--open' : ''}`}
        aria-label="Navegação do RH"
      >
        <button
          type="button"
          className="rh-drawer-close"
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
        >
          <XMarkIcon aria-hidden="true" />
        </button>

        <div className="rh-profile">
          <div className="rh-avatar" aria-hidden="true">{initials}</div>
          <div className="rh-profile-copy">
            <strong>{state.rhProfile.name}</strong>
            <span>{state.rhProfile.roleTitle}</span>
          </div>
        </div>

        <nav className="rh-navigation">
          {rhNavigation.map(({ label, to, end }) => {
            const Icon = navigationIcons[label];
            return (
              <NavLink
                key={label}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rh-nav-item${isActive ? ' rh-nav-item--active' : ''}`
                }
                title={label}
              >
                <Icon aria-hidden="true" />
                <span className="rh-nav-label">{label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="rh-sidebar-footer">
          <NavLink
            className={({ isActive }) =>
              `rh-nav-item${isActive ? ' rh-nav-item--active' : ''}`
            }
            to="/rh/configuracoes"
            onClick={() => setMenuOpen(false)}
          >
            <Cog6ToothIcon aria-hidden="true" />
            <span className="rh-nav-label">Configurações</span>
          </NavLink>
        </div>
      </aside>

      <main id="rh-content" className="rh-main" tabIndex={-1}>{children}</main>
    </div>
  );
}
