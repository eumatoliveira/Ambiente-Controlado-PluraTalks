import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { ChartState } from '../components/ChartState';
import { RHDashboardPage } from '../pages/RHDashboardPage';

function renderDashboard() {
  return render(
    <MemoryRouter>
      <RHDashboardPage />
    </MemoryRouter>,
  );
}

describe('RHDashboardPage', () => {
  it('renderiza os cinco blocos analíticos com dados demonstrativos', () => {
    renderDashboard();

    expect(
      screen.getByRole('heading', {
        name: 'Evolução de participação e engajamento',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Score organizacional' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Fatores organizacionais' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Matriz de risco' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Matriz por área' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Dados demonstrativos')).toBeInTheDocument();
  });

  it('permite selecionar período e fator sem navegar para drill-down', async () => {
    const user = userEvent.setup();
    renderDashboard();

    const quarterlyButton = screen.getByRole('button', {
      name: 'Trimestral',
    });
    await user.click(quarterlyButton);
    expect(quarterlyButton).toHaveAttribute('aria-pressed', 'true');

    const overloadButton = screen.getByRole('button', {
      name: /Selecionar Sobrecarga/,
    });
    await user.click(overloadButton);
    expect(overloadButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('apresenta departamentos, fatores e valores no heatmap', () => {
    renderDashboard();

    expect(screen.getByRole('columnheader', { name: 'Vendas' })).toBeVisible();
    expect(
      screen.getByRole('columnheader', { name: 'Tecnologia' }),
    ).toBeVisible();
    expect(screen.getByRole('rowheader', { name: 'Sobrecarga' })).toBeVisible();
    expect(
      screen.getByRole('cell', { name: 'Sobrecarga em Atendimento: 3.4, Desfavorável' }),
    ).toBeVisible();
  });
});

describe('ChartState', () => {
  it('apresenta estados de loading, empty, amostra insuficiente e erro', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    const { rerender } = render(
      <ChartState status="loading">
        <span>Conteúdo</span>
      </ChartState>,
    );

    expect(screen.getByRole('status', { name: 'Carregando gráfico' })).toBeVisible();

    rerender(
      <ChartState status="empty">
        <span>Conteúdo</span>
      </ChartState>,
    );
    expect(
      screen.getByText('Ainda não existem dados suficientes para este período.'),
    ).toBeVisible();

    rerender(
      <ChartState status="insufficient">
        <span>Conteúdo</span>
      </ChartState>,
    );
    expect(
      screen.getByText(
        'Amostra insuficiente para exibir este segmento preservando a privacidade.',
      ),
    ).toBeVisible();

    rerender(
      <ChartState status="error" onRetry={onRetry}>
        <span>Conteúdo</span>
      </ChartState>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os dados.',
    );
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
