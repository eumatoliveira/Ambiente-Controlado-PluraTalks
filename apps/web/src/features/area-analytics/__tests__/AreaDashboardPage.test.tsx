import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { MockAppProvider } from '../../../app/providers/MockAppProvider';
import AreaDashboardPage from '../pages/AreaDashboardPage';

function renderArea(areaId: string) {
  return render(<MemoryRouter initialEntries={[`/rh/areas/${areaId}`]}><MockAppProvider><Routes><Route path="/rh/areas/:areaId" element={<AreaDashboardPage />} /></Routes></MockAppProvider></MemoryRouter>);
}

describe('AreaDashboardPage', () => {
  it('oculta todos os indicadores quando há quatro respostas', () => {
    renderArea('juridico');

    expect(screen.getByRole('heading', { name: 'Jurídico' })).toBeVisible();
    expect(screen.getByText('Dados insuficientes para preservar o anonimato')).toBeVisible();
    expect(screen.queryByText('Score agregado')).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /Fatores agregados/ })).not.toBeInTheDocument();
    expect(screen.getByLabelText('Período')).toBeDisabled();
    expect(screen.getByLabelText('Comparar com')).toBeDisabled();
  });

  it('exibe somente dados agregados quando há cinco respostas', async () => {
    const user = userEvent.setup();
    renderArea('vendas');

    expect(screen.getByText('Score agregado')).toBeVisible();
    expect(screen.getByText('61')).toBeVisible();
    expect(screen.getByText('5 de 8 respostas válidas')).toBeVisible();
    expect(screen.getByRole('img', { name: /Autonomia, 58/ })).toBeVisible();
    expect(screen.queryByText(/joao@demo.test/i)).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Comparar com'), 'juridico');
    expect(screen.getByText(/comparação selecionada não possui respostas suficientes/i)).toBeVisible();
    expect(screen.getByText(/referência agregada permitida/i)).toBeVisible();
  });

  it('apresenta estado previsível para uma área inválida', () => {
    renderArea('inexistente');
    expect(screen.getByRole('heading', { name: 'Área não encontrada' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Ver áreas' })).toHaveAttribute('href', '/rh/areas');
  });
});
