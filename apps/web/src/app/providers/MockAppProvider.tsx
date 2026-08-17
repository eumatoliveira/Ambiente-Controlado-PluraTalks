import {
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

import {
  assertUniqueDepartmentName,
  assertUniquePersonEmail,
  canInvite,
  PlanLimitError,
} from '../mockRules';
import { initialMockState } from '../../mocks/seed';
import type {
  ConversationStatus,
  Communication,
  CollaboratorPreferences,
  Department,
  Message,
  MockAppState,
  Organization,
  Person,
  Report,
  UserProfile,
} from '../../types/domain';
import { MockAppContext, type MockAppContextValue } from './mockAppContext';

type Action =
  | { type: 'organization/save'; organization: Organization }
  | { type: 'profile/save'; profile: UserProfile }
  | { type: 'department/create'; department: Department }
  | { type: 'department/update'; department: Department }
  | { type: 'department/status'; departmentId: string; status: Department['status'] }
  | { type: 'person/invite'; person: Person }
  | { type: 'person/update'; person: Person }
  | { type: 'person/status'; personId: string; status: Person['status'] }
  | { type: 'conversation/create'; conversation: MockAppState['conversations'][number] }
  | { type: 'conversation/reply'; conversationId: string; message: Message; status?: ConversationStatus }
  | { type: 'communication/create'; communication: Communication }
  | { type: 'communication/status'; communicationId: string; status: Communication['status']; publishedAt?: string }
  | { type: 'report/create'; report: Report }
  | { type: 'assessment/status'; assessmentId: string; status: MockAppState['assessments'][number]['status'] }
  | { type: 'trail/module'; trailId: string; moduleId: string; completed: boolean }
  | { type: 'collaborator/profile'; profile: UserProfile }
  | { type: 'collaborator/preferences'; preferences: CollaboratorPreferences }
  | { type: 'reset' };

function reducer(state: MockAppState, action: Action): MockAppState {
  switch (action.type) {
    case 'organization/save':
      return { ...state, organization: action.organization };
    case 'profile/save':
      return { ...state, rhProfile: action.profile };
    case 'department/create':
      return { ...state, departments: [...state.departments, action.department] };
    case 'department/update':
      return {
        ...state,
        departments: state.departments.map((department) =>
          department.id === action.department.id ? action.department : department,
        ),
      };
    case 'department/status':
      return {
        ...state,
        departments: state.departments.map((department) =>
          department.id === action.departmentId
            ? { ...department, status: action.status }
            : department,
        ),
      };
    case 'person/invite':
      return { ...state, people: [...state.people, action.person] };
    case 'person/update':
      return {
        ...state,
        people: state.people.map((person) =>
          person.id === action.person.id ? action.person : person,
        ),
      };
    case 'person/status':
      return {
        ...state,
        people: state.people.map((person) =>
          person.id === action.personId
            ? {
                ...person,
                status: action.status,
                invitationStatus:
                  action.status === 'active'
                    ? 'accepted'
                    : action.status === 'invited'
                      ? 'pending'
                      : 'not_applicable',
              }
            : person,
        ),
      };
    case 'conversation/create':
      return { ...state, conversations: [action.conversation, ...state.conversations] };
    case 'conversation/reply':
      return {
        ...state,
        conversations: state.conversations.map((conversation) =>
          conversation.id === action.conversationId
            ? {
                ...conversation,
                status: action.status ?? conversation.status,
                unreadByRh: action.message.authorRole === 'collaborator',
                messages: [...conversation.messages, action.message],
              }
            : conversation,
        ),
      };
    case 'communication/create':
      return { ...state, communications: [action.communication, ...state.communications] };
    case 'communication/status':
      return {
        ...state,
        communications: state.communications.map((communication) =>
          communication.id === action.communicationId
            ? { ...communication, status: action.status, publishedAt: action.publishedAt ?? communication.publishedAt }
            : communication,
        ),
      };
    case 'report/create':
      return { ...state, reports: [action.report, ...state.reports] };
    case 'assessment/status':
      return { ...state, assessments: state.assessments.map((assessment) => assessment.id === action.assessmentId ? { ...assessment, status: action.status } : assessment) };
    case 'trail/module':
      return { ...state, trails: state.trails.map((trail) => {
        if (trail.id !== action.trailId) return trail;
        const modules = trail.modules.map((module) => module.id === action.moduleId ? { ...module, completed: action.completed } : module);
        return { ...trail, modules, progress: Math.round((modules.filter((module) => module.completed).length / modules.length) * 100) };
      }) };
    case 'collaborator/profile':
      return { ...state, collaboratorProfile: action.profile };
    case 'collaborator/preferences':
      return { ...state, collaboratorPreferences: action.preferences };
    case 'reset':
      return structuredClone(initialMockState);
    default:
      return state;
  }
}

let sequence = 100;
function createId(prefix: string): string {
  sequence += 1;
  return `${prefix}-${sequence}`;
}

async function demoDelay(): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, 80));
}

export function MockAppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialMockState, structuredClone);

  const saveOrganization = useCallback<MockAppContextValue['saveOrganization']>(
    async (organization) => {
      await demoDelay();
      dispatch({ type: 'organization/save', organization });
    },
    [],
  );

  const createDepartment = useCallback<MockAppContextValue['createDepartment']>(
    async (input) => {
      assertUniqueDepartmentName(state.departments, input.name);
      await demoDelay();
      const department: Department = {
        ...input,
        id: createId('department'),
        status: 'active',
        memberCount: 0,
      };
      dispatch({ type: 'department/create', department });
      return department;
    },
    [state.departments],
  );

  const setDepartmentStatus = useCallback<MockAppContextValue['setDepartmentStatus']>(
    async (departmentId, status) => {
      await demoDelay();
      dispatch({ type: 'department/status', departmentId, status });
    },
    [],
  );

  const updateDepartment = useCallback<MockAppContextValue['updateDepartment']>(
    async (department) => {
      assertUniqueDepartmentName(state.departments, department.name, department.id);
      await demoDelay();
      dispatch({ type: 'department/update', department });
    },
    [state.departments],
  );

  const updatePerson = useCallback<MockAppContextValue['updatePerson']>(
    async (person) => {
      assertUniquePersonEmail(state.people, person.email, person.id);
      await demoDelay();
      dispatch({ type: 'person/update', person });
    },
    [state.people],
  );

  const setPersonStatus = useCallback<MockAppContextValue['setPersonStatus']>(
    async (personId, status) => {
      await demoDelay();
      dispatch({ type: 'person/status', personId, status });
    },
    [],
  );

  const saveRhProfile = useCallback<MockAppContextValue['saveRhProfile']>(
    async (profile) => {
      await demoDelay();
      dispatch({ type: 'profile/save', profile });
    },
    [],
  );

  const invitePerson = useCallback<MockAppContextValue['invitePerson']>(
    async (input) => {
      assertUniquePersonEmail(state.people, input.email);
      if (!canInvite(state.plan, state.people)) {
        throw new PlanLimitError('O plano não possui assentos disponíveis.');
      }
      await demoDelay();
      const person: Person = {
        ...input,
        id: createId('person'),
        status: 'invited',
        invitationStatus: 'pending',
      };
      dispatch({ type: 'person/invite', person });
      return person;
    },
    [state.people, state.plan],
  );

  const createConversation = useCallback<MockAppContextValue['createConversation']>(
    async ({ subject, category, urgency, body }) => {
      await demoDelay();
      const id = createId('conversation');
      const messageId = createId('message');
      dispatch({
        type: 'conversation/create',
        conversation: {
          id,
          protocol: `PT-2026-${String(sequence).padStart(3, '0')}`,
          subject,
          category,
          urgency,
          status: 'new',
          personId: 'p-lucas',
          departmentId: 'produto',
          unreadByRh: true,
          messages: [{ id: messageId, authorRole: 'collaborator', authorName: 'Lucas Martins', body, createdAt: new Date().toISOString() }],
        },
      });
      return id;
    },
    [],
  );

  const replyToConversation = useCallback<MockAppContextValue['replyToConversation']>(
    async (conversationId, body, authorRole, status) => {
      await demoDelay();
      dispatch({
        type: 'conversation/reply',
        conversationId,
        status,
        message: {
          id: createId('message'),
          authorRole,
          authorName: authorRole === 'rh' ? 'Carolina Souza' : 'Lucas Martins',
          body,
          createdAt: new Date().toISOString(),
        },
      });
    },
    [],
  );

  const createCommunication = useCallback<MockAppContextValue['createCommunication']>(
    async (input) => {
      await demoDelay();
      const id = createId('communication');
      dispatch({
        type: 'communication/create',
        communication: {
          ...input,
          id,
          readCount: 0,
          publishedAt: input.status === 'published' ? new Date().toISOString() : undefined,
        },
      });
      return id;
    },
    [],
  );

  const setCommunicationStatus = useCallback<MockAppContextValue['setCommunicationStatus']>(
    async (communicationId, status) => {
      await demoDelay();
      dispatch({ type: 'communication/status', communicationId, status, publishedAt: status === 'published' ? new Date().toISOString() : undefined });
    },
    [],
  );

  const createReport = useCallback<MockAppContextValue['createReport']>(
    async (input) => {
      await demoDelay();
      const id = createId('report');
      const aggregates = state.aggregates.filter((item) => input.assessmentIds.includes(item.assessmentId) && (input.scope === 'organization' || item.departmentId === input.departmentId) && item.respondents >= 5);
      const respondentTotal = aggregates.reduce((sum, item) => sum + item.respondents, 0);
      const score = respondentTotal === 0 ? 0 : Math.round(aggregates.reduce((sum, item) => sum + item.score * item.respondents, 0) / respondentTotal);
      dispatch({ type: 'report/create', report: { ...input, id, status: 'ready', author: state.rhProfile.name, metrics: [{ label: 'Respostas válidas', value: String(respondentTotal) }, { label: 'Score agregado', value: String(score) }] } });
      return id;
    },
    [state.aggregates, state.rhProfile.name],
  );

  const setAssessmentStatus = useCallback<MockAppContextValue['setAssessmentStatus']>(async (assessmentId, status) => { await demoDelay(); dispatch({ type: 'assessment/status', assessmentId, status }); }, []);
  const setTrailModuleCompleted = useCallback<MockAppContextValue['setTrailModuleCompleted']>(async (trailId, moduleId, completed) => { await demoDelay(); dispatch({ type: 'trail/module', trailId, moduleId, completed }); }, []);
  const saveCollaboratorProfile = useCallback<MockAppContextValue['saveCollaboratorProfile']>(async (profile) => { await demoDelay(); dispatch({ type: 'collaborator/profile', profile }); }, []);
  const saveCollaboratorPreferences = useCallback<MockAppContextValue['saveCollaboratorPreferences']>(async (preferences) => { await demoDelay(); dispatch({ type: 'collaborator/preferences', preferences }); }, []);

  const resetDemo = useCallback(() => dispatch({ type: 'reset' }), []);
  const value = useMemo(
    () => ({
      state,
      saveOrganization,
      createDepartment,
      updateDepartment,
      setDepartmentStatus,
      invitePerson,
      updatePerson,
      setPersonStatus,
      saveRhProfile,
      createConversation,
      replyToConversation,
      createCommunication,
      setCommunicationStatus,
      createReport,
      setAssessmentStatus,
      setTrailModuleCompleted,
      saveCollaboratorProfile,
      saveCollaboratorPreferences,
      resetDemo,
    }),
    [
      state,
      saveOrganization,
      createDepartment,
      updateDepartment,
      setDepartmentStatus,
      invitePerson,
      updatePerson,
      setPersonStatus,
      saveRhProfile,
      createConversation,
      replyToConversation,
      createCommunication,
      setCommunicationStatus,
      createReport,
      setAssessmentStatus,
      setTrailModuleCompleted,
      saveCollaboratorProfile,
      saveCollaboratorPreferences,
      resetDemo,
    ],
  );

  return <MockAppContext.Provider value={value}>{children}</MockAppContext.Provider>;
}
