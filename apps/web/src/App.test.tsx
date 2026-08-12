import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('navega para a página de recuperação e volta ao login', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/');

    render(<App />);

    await user.click(
      screen.getByRole('link', { name: 'Esqueci minha senha' }),
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Recuperar senha' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Esta funcionalidade ainda não está disponível.'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Voltar ao login' }));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Login' }),
    ).toBeInTheDocument();
  });

  it('renderiza o dashboard do RH pela rota dedicada', async () => {
    window.history.pushState({}, '', '/rh');

    render(<App />);

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Visão Geral' }),
    ).toBeInTheDocument();
    expect(await screen.findByText('Dados demonstrativos')).toBeInTheDocument();
  });

  it('renderiza a shell do colaborador pela rota dedicada', async () => {
    window.history.pushState({}, '', '/colaborador');

    render(<App />);

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Meu Portal' }),
    ).toBeInTheDocument();
    expect(await screen.findByText('Lucas Martins')).toBeInTheDocument();
  });
});
