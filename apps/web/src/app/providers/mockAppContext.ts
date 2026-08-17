import { createContext } from 'react';

import type {
  ConversationStatus,
  Communication,
  CollaboratorPreferences,
  Department,
  MockAppState,
  Organization,
  Person,
  Report,
  Assessment,
  UserProfile,
} from '../../types/domain';

export type MockAppContextValue = {
  state: MockAppState;
  invitePerson: (input: Omit<Person, 'id' | 'status' | 'invitationStatus'>) => Promise<Person>;
  saveOrganization: (organization: Organization) => Promise<void>;
  createDepartment: (input: Omit<Department, 'id' | 'status' | 'memberCount'>) => Promise<Department>;
  updateDepartment: (department: Department) => Promise<void>;
  setDepartmentStatus: (departmentId: string, status: Department['status']) => Promise<void>;
  updatePerson: (person: Person) => Promise<void>;
  setPersonStatus: (personId: string, status: Person['status']) => Promise<void>;
  saveRhProfile: (profile: UserProfile) => Promise<void>;
  createConversation: (input: {
    subject: string;
    category: string;
    urgency: 'low' | 'normal' | 'high';
    body: string;
  }) => Promise<string>;
  replyToConversation: (
    conversationId: string,
    body: string,
    authorRole: 'rh' | 'collaborator',
    status?: ConversationStatus,
  ) => Promise<void>;
  createCommunication: (input: Omit<Communication, 'id' | 'readCount' | 'publishedAt'>) => Promise<string>;
  setCommunicationStatus: (communicationId: string, status: Communication['status']) => Promise<void>;
  createReport: (input: Omit<Report, 'id' | 'status' | 'metrics' | 'author'>) => Promise<string>;
  setAssessmentStatus: (assessmentId: string, status: Assessment['status']) => Promise<void>;
  setTrailModuleCompleted: (trailId: string, moduleId: string, completed: boolean) => Promise<void>;
  saveCollaboratorProfile: (profile: UserProfile) => Promise<void>;
  saveCollaboratorPreferences: (preferences: CollaboratorPreferences) => Promise<void>;
  resetDemo: () => void;
};

export const MockAppContext = createContext<MockAppContextValue | null>(null);
