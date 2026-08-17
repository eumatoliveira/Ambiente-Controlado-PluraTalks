import {
  BuildingOffice2Icon,
  CreditCardIcon,
  KeyIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { remainingSeats, usedSeats } from '../../../app/mockRules';
import { useMockApp } from '../../../app/providers/useMockApp';
import { StatusBadge } from '../../../components/ui/AppPrimitives';
import { SettingsPageShell } from '../components/SettingsPageShell';

const cards = [
  { to: '/rh/configuracoes/organizacao', title: 'Organização', description: 'Dados corporativos e fuso horário.', icon: BuildingOffice2Icon },
  { to: '/rh/areas', title: 'Áreas', description: 'Estrutura, responsáveis e status.', icon: Squares2X2Icon },
  { to: '/rh/pessoas', title: 'Pessoas', description: 'Colaboradores e convites demonstrativos.', icon: UserGroupIcon },
  { to: '/rh/configuracoes/perfil', title: 'Perfil', description: 'Dados da pessoa gestora.', icon: UserCircleIcon },
  { to: '/rh/configuracoes/seguranca', title: 'Segurança', description: 'Simulação sem persistência de senha.', icon: KeyIcon },
  { to: '/rh/configuracoes/plano', title: 'Plano', description: 'Capacidade e contato comercial.', icon: CreditCardIcon },
];

export function SettingsHubPage() {
  const { state } = useMockApp();
  const used = usedSeats(state.people);
  const remaining = remainingSeats(state.plan, state.people);

  return (
    <SettingsPageShell title="Configurações" description="Centralize a estrutura e as preferências do ambiente demonstrativo.">
      <div className="settings-summary-grid" aria-label="Resumo das configurações">
        <article><span>Organização</span><strong>{state.organization.tradeName}</strong></article>
        <article><span>Áreas ativas</span><strong>{state.departments.filter((item) => item.status === 'active').length}</strong></article>
        <article><span>Uso do plano</span><strong>{used} de {state.plan.seatLimit}</strong><small>{remaining} vagas restantes</small></article>
      </div>
      <div className="settings-card-grid">
        {cards.map(({ to, title, description, icon: Icon }) => (
          <Link className="settings-hub-card" to={to} key={to}>
            <span className="settings-card-icon"><Icon aria-hidden="true" /></span>
            <div><strong>{title}</strong><p>{description}</p></div>
            <StatusBadge tone={title === 'Plano' && remaining < 5 ? 'warning' : 'info'}>{title === 'Plano' ? `${remaining} vagas` : 'Configurado'}</StatusBadge>
          </Link>
        ))}
      </div>
    </SettingsPageShell>
  );
}
