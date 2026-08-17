export type NavigationEntry = {
  label: string;
  to: string;
  end?: boolean;
};

export const rhNavigation: NavigationEntry[] = [
  { label: 'Visão Geral', to: '/rh', end: true },
  { label: 'Pessoas', to: '/rh/pessoas' },
  { label: 'Áreas', to: '/rh/areas' },
  { label: 'Pesquisas', to: '/rh/pesquisas' },
  { label: 'Testes', to: '/rh/testes' },
  { label: 'Alertas', to: '/rh/alertas' },
  { label: 'Mensagens', to: '/rh/mensagens' },
  { label: 'Comunicados', to: '/rh/comunicados' },
  { label: 'Relatórios', to: '/rh/relatorios' },
  { label: 'Playbooks', to: '/rh/playbooks' },
  { label: 'Compliance', to: '/rh/compliance' },
];

export const collaboratorNavigation: NavigationEntry[] = [
  { label: 'Início', to: '/colaborador', end: true },
  { label: 'Responda', to: '/colaborador/responda' },
  { label: 'RH Comunica', to: '/colaborador/rh-comunica' },
  { label: 'Trilhas', to: '/colaborador/trilhas' },
  { label: 'Minha Jornada', to: '/colaborador/jornada' },
  { label: 'Configurações', to: '/colaborador/configuracoes' },
];
