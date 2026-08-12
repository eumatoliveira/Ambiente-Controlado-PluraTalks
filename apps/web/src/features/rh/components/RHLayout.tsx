import {
  BellAlertIcon,
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, ReactNode, SVGProps } from 'react';

type NavigationItem = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: 'Visão Geral', icon: ChartBarSquareIcon, active: true },
  { label: 'Pessoas', icon: UserGroupIcon },
  { label: 'Pesquisas', icon: ClipboardDocumentCheckIcon },
  { label: 'Testes', icon: DocumentChartBarIcon },
  { label: 'Alertas', icon: BellAlertIcon },
  { label: 'Relatórios', icon: DocumentChartBarIcon },
  { label: 'Compliance', icon: ShieldCheckIcon },
  { label: 'Comunicados', icon: ChatBubbleLeftRightIcon },
];

type RHLayoutProps = {
  children: ReactNode;
};

export function RHLayout({ children }: RHLayoutProps) {
  return (
    <div className="rh-layout">
      <aside className="rh-sidebar" aria-label="Navegação do RH">
        <div className="rh-profile">
          <div className="rh-avatar" aria-hidden="true">
            CS
          </div>
          <div className="rh-profile-copy">
            <strong>Carolina</strong>
            <span>Gestora de RH</span>
          </div>
        </div>

        <nav className="rh-navigation">
          {navigationItems.map(({ label, icon: Icon, active }) => (
            <span
              key={label}
              className={`rh-nav-item${active ? ' rh-nav-item--active' : ''}`}
              aria-current={active ? 'page' : undefined}
              aria-disabled={active ? undefined : true}
              title={label}
            >
              <Icon aria-hidden="true" />
              <span className="rh-nav-label">{label}</span>
            </span>
          ))}
        </nav>

        <div className="rh-sidebar-footer">
          <span className="rh-nav-item" aria-disabled="true">
            <Cog6ToothIcon aria-hidden="true" />
            <span className="rh-nav-label">Configurações</span>
          </span>
        </div>
      </aside>

      <main className="rh-main">{children}</main>
    </div>
  );
}
