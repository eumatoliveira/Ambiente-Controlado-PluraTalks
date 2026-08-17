import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { MockAppProvider } from '../../../app/providers/MockAppProvider';
import { PeoplePage } from '../pages/PeoplePage';
import { SecuritySettingsPage } from '../pages/SecuritySettingsPage';

function renderPage(page: React.ReactNode) {
  return render(
    <MemoryRouter>
      <MockAppProvider>{page}</MockAppProvider>
    </MemoryRouter>,
  );
}

describe('fluxos das configurações', () => {
  it('convida uma pessoa e atualiza a lista e a capacidade da sessão', async () => {
    const user = userEvent.setup();
    renderPage(<PeoplePage />);

    expect(screen.getByText('46')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Convidar pessoa' }));
    await user.type(screen.getByLabelText('Nome'), 'Renata Melo');
    await user.type(screen.getByLabelText('E-mail corporativo'), 'renata@demo.test');
    await user.type(screen.getByLabelText('Cargo'), 'Analista de pessoas');
    await user.selectOptions(screen.getByLabelText('Área'), 'produto');
    await user.click(screen.getByRole('button', { name: 'Enviar convite' }));

    expect(await screen.findByText('Convite demonstrativo enviado.')).toBeVisible();
    expect(screen.getByText('renata@demo.test · Analista de pessoas')).toBeVisible();
    expect(screen.getByText('45')).toBeVisible();
  });

  it('valida duplicidade de e-mail antes de criar convite', async () => {
    const user = userEvent.setup();
    renderPage(<PeoplePage />);

    await user.click(screen.getByRole('button', { name: 'Convidar pessoa' }));
    await user.type(screen.getByLabelText('Nome'), 'Outro Lucas');
    await user.type(screen.getByLabelText('E-mail corporativo'), 'lucas@demo.test');
    await user.type(screen.getByLabelText('Cargo'), 'Analista');
    await user.selectOptions(screen.getByLabelText('Área'), 'produto');
    await user.click(screen.getByRole('button', { name: 'Enviar convite' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Já existe uma pessoa com este e-mail.');
  });

  it('limpa credenciais e não grava a troca de senha no storage', async () => {
    const user = userEvent.setup();
    localStorage.clear();
    sessionStorage.clear();
    renderPage(<SecuritySettingsPage />);

    await user.type(screen.getByLabelText('Senha atual'), 'senha-atual');
    await user.type(screen.getByLabelText('Nova senha'), 'nova-senha-segura');
    await user.type(screen.getByLabelText('Confirmar nova senha'), 'nova-senha-segura');
    await user.click(screen.getByRole('button', { name: 'Atualizar senha' }));

    expect(await screen.findByText(/Os campos foram limpos/)).toBeVisible();
    await waitFor(() => expect(screen.getByLabelText('Senha atual')).toHaveValue(''));
    expect(localStorage).toHaveLength(0);
    expect(sessionStorage).toHaveLength(0);
  });
});
