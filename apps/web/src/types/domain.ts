export type EntityStatus = 'active' | 'inactive' | 'archived';
export type PersonStatus = 'active' | 'inactive' | 'invited';
export type ConversationStatus = 'new' | 'in_progress' | 'resolved' | 'archived';
export type CommunicationStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type ReportStatus = 'draft' | 'ready';

export type Organization = {
  id: string;
  tradeName: string;
  legalName: string;
  segment: string;
  size: string;
  domain: string;
  timezone: string;
};

export type UserProfile = {
  name: string;
  email: string;
  roleTitle: string;
  phone: string;
  avatarUrl?: string;
};

export type CollaboratorPreferences = {
  emailNotifications: boolean;
  reducedMotion: boolean;
  language: 'pt-BR';
};

export type Department = {
  id: string;
  name: string;
  description: string;
  managerName: string;
  colorToken: 'purple' | 'orange' | 'slate';
  status: EntityStatus;
  memberCount: number;
};

export type Person = {
  id: string;
  name: string;
  email: string;
  roleTitle: string;
  departmentId: string;
  status: PersonStatus;
  invitationStatus: 'accepted' | 'pending' | 'expired' | 'not_applicable';
  avatarUrl?: string;
};

export type Plan = {
  id: string;
  name: string;
  seatLimit: number;
  contractType: string;
  externalSalesContact: string;
};

export type Assessment = {
  id: string;
  kind: 'survey' | 'test';
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  estimatedMinutes: number;
};

export type AssessmentAggregate = {
  assessmentId: string;
  departmentId?: string;
  respondents: number;
  eligible: number;
  score: number;
  factors: Array<{ label: string; value: number }>;
  scoreBands: Array<{ label: string; count: number }>;
};

export type Message = {
  id: string;
  authorRole: 'rh' | 'collaborator';
  authorName: string;
  body: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  protocol: string;
  subject: string;
  category: string;
  urgency: 'low' | 'normal' | 'high';
  status: ConversationStatus;
  personId: string;
  departmentId: string;
  assignee?: string;
  unreadByRh: boolean;
  messages: Message[];
};

export type Communication = {
  id: string;
  title: string;
  body: string;
  priority: 'normal' | 'important' | 'urgent';
  targetType: 'all' | 'departments';
  departmentIds: string[];
  status: CommunicationStatus;
  expiresAt?: string;
  readCount: number;
  publishedAt?: string;
};

export type Playbook = {
  id: string;
  title: string;
  category: 'overload' | 'leadership' | 'autonomy' | 'conflict' | 'recognition';
  effort: 'low' | 'medium' | 'high';
  duration: string;
  context: string;
  steps: string[];
  indicators: string[];
};

export type Report = {
  id: string;
  title: string;
  scope: 'organization' | 'department';
  departmentId?: string;
  period: string;
  assessmentIds: string[];
  status: ReportStatus;
  metrics: Array<{ label: string; value: string }>;
  playbookIds: string[];
  author: string;
};

export type LearningTrail = {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  modules: Array<{ id: string; title: string; completed: boolean }>;
};

export type JourneyEvent = {
  id: string;
  type: 'assessment' | 'learning' | 'communication';
  title: string;
  description: string;
  date: string;
  status: string;
};

export type MockAppState = {
  organization: Organization;
  rhProfile: UserProfile;
  collaboratorProfile: UserProfile;
  collaboratorPreferences: CollaboratorPreferences;
  departments: Department[];
  people: Person[];
  plan: Plan;
  assessments: Assessment[];
  aggregates: AssessmentAggregate[];
  conversations: Conversation[];
  communications: Communication[];
  reports: Report[];
  playbooks: Playbook[];
  trails: LearningTrail[];
  journey: JourneyEvent[];
};
