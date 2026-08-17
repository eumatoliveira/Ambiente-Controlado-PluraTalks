export type ChartStatus =
  | 'loading'
  | 'success'
  | 'empty'
  | 'insufficient'
  | 'error';

export type HeatmapStatus = 'Favorável' | 'Moderado' | 'Desfavorável';

export const dashboardMockData = {
  metrics: [
    {
      label: 'Participação',
      value: '74%',
      delta: '+4,2%',
      detail: '742 de 1.003 pessoas',
      tone: 'neutral',
    },
    {
      label: 'Engajamento',
      value: '78 / 100',
      delta: '+2,3',
      detail: 'Faixa demonstrativa: saudável',
      tone: 'neutral',
    },
    {
      label: 'Alertas ativos',
      value: '12',
      delta: '+3',
      detail: '3 críticos, 5 atenção',
      tone: 'attention',
    },
    {
      label: 'Pesquisas ativas',
      value: '4',
      delta: '82%',
      detail: 'Participação média',
      tone: 'neutral',
    },
  ],
  participationHistory: [
    { month: 'Set', participation: 68, engagement: 71 },
    { month: 'Out', participation: 65, engagement: 70 },
    { month: 'Nov', participation: 71, engagement: 73 },
    { month: 'Dez', participation: 73, engagement: 75 },
    { month: 'Jan', participation: 76, engagement: 79 },
    { month: 'Fev', participation: 74, engagement: 78 },
    { month: 'Mar', participation: 78, engagement: 80 },
  ],
  organizationScore: {
    score: 78,
    delta: '+2,3',
    label: 'Saudável',
    segments: [
      { label: 'Favorável', value: 44, color: '#977CEC' },
      { label: 'Neutro', value: 25, color: '#D5CBF4' },
      { label: 'Atenção', value: 20, color: '#FEA85B' },
      { label: 'Crítico', value: 11, color: '#9F3434' },
    ],
  },
  organizationalFactors: [
    { name: 'Sobrecarga', value: 3.2 },
    { name: 'Liderança', value: 2.6 },
    { name: 'Autonomia', value: 2.7 },
    { name: 'Conflito', value: 3.0 },
    { name: 'Reconhecimento', value: 2.4 },
  ],
  riskMatrix: [
    { department: 'Vendas', workRelation: 81, peopleImpact: 72, score: 3.4 },
    {
      department: 'Tecnologia',
      workRelation: 62,
      peopleImpact: 48,
      score: 2.2,
    },
    {
      department: 'Atendimento',
      workRelation: 76,
      peopleImpact: 68,
      score: 3.1,
    },
    { department: 'RH', workRelation: 38, peopleImpact: 35, score: 1.8 },
    {
      department: 'Operações',
      workRelation: 58,
      peopleImpact: 63,
      score: 2.9,
    },
  ],
  departmentHeatmap: {
    departments: ['Vendas', 'Tecnologia', 'Atendimento', 'RH', 'Operações'],
    rows: [
      {
        factor: 'Sobrecarga',
        cells: [
          { value: 3.0, status: 'Moderado' },
          { value: 2.0, status: 'Favorável' },
          { value: 3.4, status: 'Desfavorável' },
          { value: 1.5, status: 'Favorável' },
          { value: 3.0, status: 'Moderado' },
        ],
      },
      {
        factor: 'Conflito',
        cells: [
          { value: 2.8, status: 'Moderado' },
          { value: 1.7, status: 'Favorável' },
          { value: 2.5, status: 'Moderado' },
          { value: 1.9, status: 'Favorável' },
          { value: 2.1, status: 'Favorável' },
        ],
      },
      {
        factor: 'Liderança',
        cells: [
          { value: 2.1, status: 'Favorável' },
          { value: 1.9, status: 'Favorável' },
          { value: 2.1, status: 'Favorável' },
          { value: 2.6, status: 'Moderado' },
          { value: 2.0, status: 'Favorável' },
        ],
      },
      {
        factor: 'Autonomia',
        cells: [
          { value: 1.7, status: 'Favorável' },
          { value: 2.5, status: 'Moderado' },
          { value: 1.3, status: 'Favorável' },
          { value: 2.2, status: 'Favorável' },
          { value: 1.6, status: 'Favorável' },
        ],
      },
      {
        factor: 'Reconhecimento',
        cells: [
          { value: 1.5, status: 'Favorável' },
          { value: 2.0, status: 'Favorável' },
          { value: 1.6, status: 'Favorável' },
          { value: 2.4, status: 'Moderado' },
          { value: 1.8, status: 'Favorável' },
        ],
      },
    ] satisfies Array<{
      factor: string;
      cells: Array<{ value: number; status: HeatmapStatus }>;
    }>,
  },
};

export type ParticipationHistoryPoint =
  (typeof dashboardMockData.participationHistory)[number];
export type OrganizationalFactor =
  (typeof dashboardMockData.organizationalFactors)[number];
export type RiskPoint = (typeof dashboardMockData.riskMatrix)[number];
