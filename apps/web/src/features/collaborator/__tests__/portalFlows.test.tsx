import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { MockAppProvider } from '../../../app/providers/MockAppProvider';
import { AssessmentRunnerPage } from '../pages/AssessmentRunnerPage';
import { CollaboratorSettingsPage } from '../pages/CollaboratorSettingsPage';
import { TrailDetailPage } from '../pages/TrailDetailPage';

function renderRoute(path: string, pattern: string, element: React.ReactNode) {
  return render(<MemoryRouter initialEntries={[path]}><MockAppProvider><Routes><Route path={pattern} element={element} /></Routes></MockAppProvider></MemoryRouter>);
}

describe('fluxos do portal do colaborador', () => {
  it('conclui avaliação sem exibir resultado individual', async () => {
    const user = userEvent.setup();
    renderRoute('/colaborador/responda/clima-2026', '/colaborador/responda/:assessmentId', <AssessmentRunnerPage />);
    await user.click(screen.getByRole('button', { name: 'Iniciar avaliação' }));
    for (let step = 0; step < 4; step += 1) {
      const radios = await screen.findAllByRole('radio');
      await user.click(radios[3]);
      await user.click(screen.getByRole('button', { name: step === 3 ? 'Enviar respostas' : 'Próxima' }));
    }
    expect(await screen.findByText('Respostas enviadas')).toBeVisible();
    expect(screen.getByText(/Nenhum resultado individual será exibido ao RH/)).toBeVisible();
    expect(screen.queryByText(/seu score/i)).not.toBeInTheDocument();
  });

  it('atualiza o progresso da trilha na mesma sessão', async () => {
    const user = userEvent.setup();
    renderRoute('/colaborador/trilhas/trail-1', '/colaborador/trilhas/:trailId', <TrailDetailPage />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
    await user.click(screen.getByLabelText(/2. Feedback claro/));
    expect(await screen.findByText('Trilha concluída nesta sessão.')).toBeVisible();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('salva perfil e reflete o nome no layout compartilhado', async () => {
    const user = userEvent.setup();
    renderRoute('/colaborador/configuracoes', '/colaborador/configuracoes', <CollaboratorSettingsPage />);
    const name = screen.getByLabelText('Nome');
    await user.clear(name);
    await user.type(name, 'Lucas Andrade');
    await user.click(screen.getByRole('button', { name: 'Salvar preferências' }));
    expect(await screen.findByText('Preferências atualizadas nesta sessão.')).toBeVisible();
    expect(screen.getByText('Lucas Andrade')).toBeVisible();
  });
});
