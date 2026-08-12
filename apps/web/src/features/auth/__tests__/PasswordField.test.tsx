import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PasswordField } from '../components/PasswordField';

describe('PasswordField', () => {
  it('mostra, oculta e preserva a senha informada', async () => {
    const user = userEvent.setup();

    render(<PasswordField />);

    const passwordInput = screen.getByLabelText('Senha');
    const visibilityButton = screen.getByRole('button', {
      name: 'Mostrar senha',
    });

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute(
      'autocomplete',
      'current-password',
    );

    await user.type(passwordInput, 'minhaSenha');
    await user.click(visibilityButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(passwordInput).toHaveValue('minhaSenha');
    expect(visibilityButton).toHaveAccessibleName('Ocultar senha');
    expect(visibilityButton).toHaveAttribute('aria-pressed', 'true');

    await user.click(visibilityButton);

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveValue('minhaSenha');
  });

  it('permite alternar a visibilidade usando o teclado', async () => {
    const user = userEvent.setup();

    render(<PasswordField />);

    const passwordInput = screen.getByLabelText('Senha');

    await user.tab();
    expect(passwordInput).toHaveFocus();

    await user.type(passwordInput, 'segredo');
    await user.tab();

    const visibilityButton = screen.getByRole('button', {
      name: 'Mostrar senha',
    });

    expect(visibilityButton).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(passwordInput).toHaveValue('segredo');
    expect(visibilityButton).toHaveFocus();
  });
});
