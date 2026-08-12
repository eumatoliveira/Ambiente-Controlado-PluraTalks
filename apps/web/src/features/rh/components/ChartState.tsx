import type { ReactNode } from 'react';

import type { ChartStatus } from '../data/dashboardMockData';

type ChartStateProps = {
  status?: ChartStatus;
  children: ReactNode;
  onRetry?: () => void;
};

export function ChartState({
  status = 'success',
  children,
  onRetry,
}: ChartStateProps) {
  if (status === 'loading') {
    return (
      <div
        className="chart-state chart-state--loading"
        role="status"
        aria-label="Carregando gráfico"
      >
        <span className="chart-skeleton" />
        <span className="sr-only">Carregando gráfico.</span>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="chart-state">
        <p>Ainda não existem dados suficientes para este período.</p>
      </div>
    );
  }

  if (status === 'insufficient') {
    return (
      <div className="chart-state">
        <p>
          Amostra insuficiente para exibir este segmento preservando a
          privacidade.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="chart-state" role="alert">
        <p>Não foi possível carregar os dados.</p>
        {onRetry ? (
          <button type="button" onClick={onRetry}>
            Tentar novamente
          </button>
        ) : null}
      </div>
    );
  }

  return children;
}
