import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MockAppProvider } from './app/providers/MockAppProvider';
import { AlertsPage } from './features/assessment-management/pages/AlertsPage';
import { AssessmentDetailPage } from './features/assessment-management/pages/AssessmentDetailPage';
import { AssessmentOverviewPage } from './features/assessment-management/pages/AssessmentOverviewPage';
import { CompliancePage } from './features/assessment-management/pages/CompliancePage';
import { ForgotPasswordPage } from './features/auth/pages/ForgotPasswordPage';
import { LoginPage } from './features/auth/pages/LoginPage';
import { AssessmentRunnerPage } from './features/collaborator/pages/AssessmentRunnerPage';
import { AssessmentsPage } from './features/collaborator/pages/AssessmentsPage';
import { CollaboratorSettingsPage } from './features/collaborator/pages/CollaboratorSettingsPage';
import { JourneyPage } from './features/collaborator/pages/JourneyPage';
import { TrailDetailPage } from './features/collaborator/pages/TrailDetailPage';
import { TrailsPage } from './features/collaborator/pages/TrailsPage';
import { CollaboratorCommunicationsPage } from './features/messaging/pages/CollaboratorCommunicationsPage';
import { CommunicationsPage } from './features/messaging/pages/CommunicationsPage';
import { ConversationDetailPage } from './features/messaging/pages/ConversationDetailPage';
import { MessagingInboxPage } from './features/messaging/pages/MessagingInboxPage';
import { NewCommunicationPage } from './features/messaging/pages/NewCommunicationPage';
import { NewConversationPage } from './features/messaging/pages/NewConversationPage';
import { DepartmentsPage } from './features/settings/pages/DepartmentsPage';
import { OrganizationSettingsPage } from './features/settings/pages/OrganizationSettingsPage';
import { PeoplePage } from './features/settings/pages/PeoplePage';
import { PlanPage } from './features/settings/pages/PlanPage';
import { ProfileSettingsPage } from './features/settings/pages/ProfileSettingsPage';
import { SecuritySettingsPage } from './features/settings/pages/SecuritySettingsPage';
import { SettingsHubPage } from './features/settings/pages/SettingsHubPage';
import { NewReportPage } from './features/reports/pages/NewReportPage';
import { PlaybookDetailPage } from './features/reports/pages/PlaybookDetailPage';
import { PlaybooksPage } from './features/reports/pages/PlaybooksPage';
import { ReportPreviewPage } from './features/reports/pages/ReportPreviewPage';
import { ReportsPage } from './features/reports/pages/ReportsPage';
import { NotFoundPage } from './features/shared/pages/NotFoundPage';

const RHDashboardPage = lazy(() => import('./features/rh/pages/RHDashboardPage'));
const AreaDashboardPage = lazy(() => import('./features/area-analytics/pages/AreaDashboardPage'));
const CollaboratorShellPage = lazy(
  () => import('./features/collaborator/pages/CollaboratorShellPage'),
);

function Loading({ label }: { label: string }) {
  return <div className="app-loading" role="status">{label}</div>;
}

export function App() {
  return (
    <MockAppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/esqueci-minha-senha" element={<ForgotPasswordPage />} />
          <Route path="/rh" element={<Suspense fallback={<Loading label="Carregando dashboard..." />}><RHDashboardPage /></Suspense>} />
          <Route path="/colaborador" element={<Suspense fallback={<Loading label="Carregando portal..." />}><CollaboratorShellPage /></Suspense>} />
          <Route path="/rh/pessoas" element={<PeoplePage />} />
          <Route path="/rh/areas" element={<DepartmentsPage />} />
          <Route path="/rh/areas/:areaId" element={<Suspense fallback={<Loading label="Carregando indicadores agregados..." />}><AreaDashboardPage /></Suspense>} />
          <Route path="/rh/configuracoes" element={<SettingsHubPage />} />
          <Route path="/rh/configuracoes/organizacao" element={<OrganizationSettingsPage />} />
          <Route path="/rh/configuracoes/perfil" element={<ProfileSettingsPage />} />
          <Route path="/rh/configuracoes/seguranca" element={<SecuritySettingsPage />} />
          <Route path="/rh/configuracoes/plano" element={<PlanPage />} />
          <Route path="/rh/mensagens" element={<MessagingInboxPage />} />
          <Route path="/rh/mensagens/:conversationId" element={<ConversationDetailPage context="rh" />} />
          <Route path="/rh/comunicados" element={<CommunicationsPage />} />
          <Route path="/rh/comunicados/novo" element={<NewCommunicationPage />} />
          <Route path="/colaborador/rh-comunica" element={<CollaboratorCommunicationsPage />} />
          <Route path="/colaborador/rh-comunica/nova" element={<NewConversationPage />} />
          <Route path="/colaborador/rh-comunica/:conversationId" element={<ConversationDetailPage context="collaborator" />} />
          <Route path="/rh/relatorios" element={<ReportsPage />} />
          <Route path="/rh/relatorios/novo" element={<NewReportPage />} />
          <Route path="/rh/relatorios/:reportId" element={<ReportPreviewPage />} />
          <Route path="/rh/playbooks" element={<PlaybooksPage />} />
          <Route path="/rh/playbooks/:playbookId" element={<PlaybookDetailPage />} />
          <Route path="/colaborador/responda" element={<AssessmentsPage />} />
          <Route path="/colaborador/responda/:assessmentId" element={<AssessmentRunnerPage />} />
          <Route path="/colaborador/trilhas" element={<TrailsPage />} />
          <Route path="/colaborador/trilhas/:trailId" element={<TrailDetailPage />} />
          <Route path="/colaborador/jornada" element={<JourneyPage />} />
          <Route path="/colaborador/configuracoes" element={<CollaboratorSettingsPage />} />
          <Route path="/rh/pesquisas" element={<AssessmentOverviewPage kind="survey" />} />
          <Route path="/rh/pesquisas/:surveyId" element={<AssessmentDetailPage kind="survey" />} />
          <Route path="/rh/testes" element={<AssessmentOverviewPage kind="test" />} />
          <Route path="/rh/testes/:testId" element={<AssessmentDetailPage kind="test" />} />
          <Route path="/rh/alertas" element={<AlertsPage />} />
          <Route path="/rh/compliance" element={<CompliancePage />} />
          <Route path="/rh/configuracoes/areas" element={<Navigate to="/rh/areas" replace />} />
          <Route path="/rh/configuracoes/pessoas" element={<Navigate to="/rh/pessoas" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MockAppProvider>
  );
}
