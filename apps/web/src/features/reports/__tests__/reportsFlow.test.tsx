import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { MockAppProvider } from '../../../app/providers/MockAppProvider';
import { initialMockState } from '../../../mocks/seed';
import { NewReportPage } from '../pages/NewReportPage';
import { ReportPreviewPage } from '../pages/ReportPreviewPage';
import { reportHasSufficientData } from '../reportRules';

describe('regras de relatório', () => {
  it('bloqueia quatro respostas e permite cinco', () => {
    expect(reportHasSufficientData({ scope: 'department', departmentId: 'juridico', assessmentIds: ['clima-2026'] }, initialMockState.aggregates)).toBe(false);
    expect(reportHasSufficientData({ scope: 'department', departmentId: 'vendas', assessmentIds: ['clima-2026'] }, initialMockState.aggregates)).toBe(true);
  });
});

describe('fluxo de relatórios', () => {
  it('bloqueia o preview por área quando a coorte é insuficiente', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><MockAppProvider><NewReportPage /></MockAppProvider></MemoryRouter>);
    await user.selectOptions(screen.getByLabelText('Escopo'), 'department');
    await user.selectOptions(screen.getByLabelText('Área'), 'juridico');
    await user.click(screen.getByLabelText(/Pesquisa de clima/));
    expect(screen.getByText(/Dados insuficientes para preservar o anonimato neste escopo/)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Gerar preview' })).toBeDisabled();
  });

  it('gera um preview seguro e usa a impressão do navegador', async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    render(<MemoryRouter initialEntries={['/rh/relatorios/novo']}><MockAppProvider><Routes><Route path="/rh/relatorios/novo" element={<NewReportPage />} /><Route path="/rh/relatorios/:reportId" element={<ReportPreviewPage />} /></Routes></MockAppProvider></MemoryRouter>);
    await user.type(screen.getByLabelText('Título'), 'Relatório de Vendas');
    await user.selectOptions(screen.getByLabelText('Escopo'), 'department');
    await user.selectOptions(screen.getByLabelText('Área'), 'vendas');
    await user.click(screen.getByLabelText(/Pesquisa de clima/));
    await user.click(screen.getByRole('button', { name: 'Gerar preview' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Relatório de Vendas' })).toBeVisible();
    expect(screen.getByText('Score agregado')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Imprimir / salvar como PDF' }));
    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
  });
});
