import type { MockAppState } from '../types/domain';

export const initialMockState: MockAppState = {
  organization: {
    id: 'org-plura-demo',
    tradeName: 'Plura Talks Demo',
    legalName: 'Plura Talks Tecnologia Ltda.',
    segment: 'Tecnologia e serviços',
    size: '201–500 pessoas',
    domain: 'pluratalks.demo',
    timezone: 'America/Sao_Paulo',
  },
  rhProfile: {
    name: 'Carolina Souza',
    email: 'carolina@pluratalks.demo',
    roleTitle: 'Gestora de RH',
    phone: '(11) 99999-0101',
  },
  collaboratorProfile: {
    name: 'Lucas Martins',
    email: 'lucas@demo.test',
    roleTitle: 'Analista de Produto',
    phone: '(11) 98888-0202',
  },
  collaboratorPreferences: {
    emailNotifications: true,
    reducedMotion: false,
    language: 'pt-BR',
  },
  departments: [
    {
      id: 'produto',
      name: 'Produto',
      description: 'Produto, design e pesquisa.',
      managerName: 'Mariana Costa',
      colorToken: 'purple',
      status: 'active',
      memberCount: 12,
    },
    {
      id: 'vendas',
      name: 'Vendas',
      description: 'Operação comercial e relacionamento.',
      managerName: 'Rafael Lima',
      colorToken: 'orange',
      status: 'active',
      memberCount: 8,
    },
    {
      id: 'juridico',
      name: 'Jurídico',
      description: 'Jurídico e governança.',
      managerName: 'Ana Ribeiro',
      colorToken: 'slate',
      status: 'active',
      memberCount: 4,
    },
  ],
  people: [
    { id: 'p-lucas', name: 'Lucas Martins', email: 'lucas@demo.test', roleTitle: 'Analista de Produto', departmentId: 'produto', status: 'active', invitationStatus: 'accepted' },
    { id: 'p-marina', name: 'Marina Alves', email: 'marina@demo.test', roleTitle: 'Designer', departmentId: 'produto', status: 'active', invitationStatus: 'accepted' },
    { id: 'p-joao', name: 'João Mendes', email: 'joao@demo.test', roleTitle: 'Executivo de contas', departmentId: 'vendas', status: 'active', invitationStatus: 'accepted' },
    { id: 'p-bia', name: 'Beatriz Rocha', email: 'bia@demo.test', roleTitle: 'Analista jurídico', departmentId: 'juridico', status: 'invited', invitationStatus: 'pending' },
    { id: 'p-caio', name: 'Caio Nunes', email: 'caio@demo.test', roleTitle: 'Analista', departmentId: 'vendas', status: 'inactive', invitationStatus: 'not_applicable' },
  ],
  plan: {
    id: 'plan-business',
    name: 'Plura Business 50',
    seatLimit: 50,
    contractType: 'Contrato anual',
    externalSalesContact: 'comercial@pluratalks.demo',
  },
  assessments: [
    { id: 'clima-2026', kind: 'survey', title: 'Pesquisa de clima', description: 'Percepções sobre ambiente e trabalho.', status: 'pending', dueDate: '2026-09-15', estimatedMinutes: 8 },
    { id: 'energia-2026', kind: 'test', title: 'Check-in de energia', description: 'Reflexão breve sobre a rotina.', status: 'completed', estimatedMinutes: 4 },
  ],
  aggregates: [
    { assessmentId: 'clima-2026', departmentId: 'produto', respondents: 12, eligible: 12, score: 76, factors: [{ label: 'Autonomia', value: 82 }, { label: 'Reconhecimento', value: 70 }], scoreBands: [{ label: 'Positivo', count: 8 }, { label: 'Estável', count: 4 }] },
    { assessmentId: 'clima-2026', departmentId: 'vendas', respondents: 5, eligible: 8, score: 61, factors: [{ label: 'Autonomia', value: 58 }, { label: 'Reconhecimento', value: 64 }], scoreBands: [{ label: 'Positivo', count: 2 }, { label: 'Estável', count: 3 }] },
    { assessmentId: 'clima-2026', departmentId: 'juridico', respondents: 4, eligible: 4, score: 0, factors: [], scoreBands: [] },
  ],
  conversations: [
    {
      id: 'conv-1', protocol: 'PT-2026-001', subject: 'Dúvida sobre benefício', category: 'Benefícios', urgency: 'normal', status: 'new', personId: 'p-lucas', departmentId: 'produto', unreadByRh: true,
      messages: [{ id: 'msg-1', authorRole: 'collaborator', authorName: 'Lucas Martins', body: 'Gostaria de entender o prazo de atualização do benefício.', createdAt: '2026-08-15T13:30:00.000Z' }],
    },
  ],
  communications: [
    { id: 'comm-1', title: 'Encontro mensal', body: 'Nosso próximo encontro será na sexta-feira.', priority: 'normal', targetType: 'all', departmentIds: [], status: 'published', readCount: 18, publishedAt: '2026-08-12T12:00:00.000Z' },
    { id: 'comm-2', title: 'Oficina de produto', body: 'Inscrições abertas para a oficina.', priority: 'important', targetType: 'departments', departmentIds: ['produto'], status: 'draft', readCount: 0 },
  ],
  reports: [
    { id: 'report-1', title: 'Panorama organizacional — Agosto', scope: 'organization', period: 'Agosto de 2026', assessmentIds: ['clima-2026'], status: 'ready', metrics: [{ label: 'Participação', value: '72%' }, { label: 'Score', value: '74' }], playbookIds: ['pb-recognition'], author: 'Carolina Souza' },
  ],
  playbooks: [
    { id: 'pb-overload', title: 'Reequilíbrio de prioridades', category: 'overload', effort: 'medium', duration: '4 semanas', context: 'Quando o volume de demandas supera a capacidade percebida do time.', steps: ['Mapear demandas em andamento', 'Definir critérios de prioridade', 'Revisar carga semanalmente'], indicators: ['Demandas simultâneas', 'Percepção de clareza'] },
    { id: 'pb-recognition', title: 'Ritual de reconhecimento', category: 'recognition', effort: 'low', duration: '2 semanas', context: 'Quando o time percebe pouca visibilidade das contribuições.', steps: ['Definir exemplos observáveis', 'Criar ritual quinzenal', 'Recolher feedback do time'], indicators: ['Participação no ritual', 'Percepção de reconhecimento'] },
  ],
  trails: [
    { id: 'trail-1', title: 'Comunicação saudável', description: 'Práticas para conversas claras e respeitosas.', duration: '45 min', progress: 50, modules: [{ id: 'm1', title: 'Escuta ativa', completed: true }, { id: 'm2', title: 'Feedback claro', completed: false }] },
    { id: 'trail-2', title: 'Organização pessoal', description: 'Ferramentas leves para priorizar a semana.', duration: '30 min', progress: 0, modules: [{ id: 'm1', title: 'Mapa da semana', completed: false }] },
  ],
  journey: [
    { id: 'journey-1', type: 'communication', title: 'Encontro mensal', description: 'Comunicado recebido do RH.', date: '2026-08-12', status: 'Lido' },
    { id: 'journey-2', type: 'learning', title: 'Comunicação saudável', description: 'Trilha iniciada.', date: '2026-08-10', status: 'Em andamento' },
    { id: 'journey-3', type: 'assessment', title: 'Check-in de energia', description: 'Avaliação concluída.', date: '2026-08-02', status: 'Concluída' },
  ],
};
