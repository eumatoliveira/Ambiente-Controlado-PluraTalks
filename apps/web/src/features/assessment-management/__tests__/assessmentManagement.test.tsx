import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { MockAppProvider } from '../../../app/providers/MockAppProvider';
import { AlertsPage } from '../pages/AlertsPage';
import { AssessmentDetailPage } from '../pages/AssessmentDetailPage';
import { CompliancePage } from '../pages/CompliancePage';

function withProvider(node: React.ReactNode, path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><MockAppProvider>{node}</MockAppProvider></MemoryRouter>);
}

describe('acompanhamento agregado do RH', () => {
  it('oculta score da área com quatro respostas no detalhe', () => {
    withProvider(<Routes><Route path="/rh/pesquisas/:surveyId" element={<AssessmentDetailPage kind="survey" />} /></Routes>, '/rh/pesquisas/clima-2026');
    const legalRow = screen.getByRole('cell', { name: 'Jurídico' }).closest('tr');
    expect(legalRow).not.toBeNull();
    expect(within(legalRow as HTMLTableRowElement).getByText('Oculto')).toBeVisible();
    expect(within(legalRow as HTMLTableRowElement).getByText('Dados insuficientes')).toBeVisible();
    expect(screen.queryByText('lucas@demo.test')).not.toBeInTheDocument();
    expect(screen.queryByText('Lucas Martins')).not.toBeInTheDocument();
  });

  it('gera alertas apenas de coortes elegíveis e usa linguagem não diagnóstica', () => {
    withProvider(<AlertsPage />);
    expect(screen.getByRole('heading', { name: 'Vendas' })).toBeVisible();
    expect(screen.getByText(/não representa diagnóstico médico/i)).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Jurídico' })).not.toBeInTheDocument();
  });

  it('expõe os controles demonstrativos de compliance', () => {
    withProvider(<CompliancePage />);
    expect(screen.getByText('6 de 6')).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Anonimato analítico' })).toBeVisible();
    expect(screen.getByText(/não constitui auditoria, certificação ou parecer jurídico/)).toBeVisible();
  });
});
