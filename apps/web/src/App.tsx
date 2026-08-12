import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ForgotPasswordPage } from './features/auth/pages/ForgotPasswordPage';
import { LoginPage } from './features/auth/pages/LoginPage';

const RHDashboardPage = lazy(
  () => import('./features/rh/pages/RHDashboardPage'),
);
const CollaboratorShellPage = lazy(
  () => import('./features/collaborator/pages/CollaboratorShellPage'),
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/esqueci-minha-senha"
          element={<ForgotPasswordPage />}
        />
        <Route
          path="/rh"
          element={
            <Suspense
              fallback={
                <div className="app-loading" role="status">
                  Carregando dashboard...
                </div>
              }
            >
              <RHDashboardPage />
            </Suspense>
          }
        />
        <Route
          path="/colaborador"
          element={
            <Suspense
              fallback={
                <div className="app-loading" role="status">
                  Carregando portal...
                </div>
              }
            >
              <CollaboratorShellPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
