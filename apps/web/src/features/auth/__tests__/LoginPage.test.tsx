import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { LoginPage } from '../pages/LoginPage';

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );
}

describe('LoginPage', () => {
  it('renderiza os campos e a ação de entrada habilitados', () => {
    renderLoginPage();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Login' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeEnabled();
    expect(screen.getByLabelText('Senha')).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeEnabled();
  });

  it('mantém a ordem de foco esperada no formulário', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.tab();
    expect(screen.getByLabelText('E-mail')).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText('Senha')).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole('button', { name: 'Mostrar senha' }),
    ).toHaveFocus();
  });

  it('notifica e identifica os campos obrigatórios ao tentar entrar vazio', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Revise os campos indicados.',
    );
    expect(screen.getByText('Informe seu e-mail.')).toBeInTheDocument();
    expect(screen.getByText('Informe sua senha.')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByLabelText('Senha')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByLabelText('E-mail')).toHaveFocus();
  });
});
