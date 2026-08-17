import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('navega para a página de recuperação e volta ao login', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/');
    render(<App />);

    await user.click(screen.getByRole('link', { name: 'Esqueci minha senha' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Recuperar senha' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Voltar ao login' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeInTheDocument();
  });

  it('renderiza o dashboard do RH pela rota dedicada', async () => {
    window.history.pushState({}, '', '/rh');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Visão Geral' })).toBeInTheDocument();
    expect(await screen.findByText('Dados demonstrativos')).toBeInTheDocument();
  });

  it('renderiza a shell do colaborador pela rota dedicada', async () => {
    window.history.pushState({}, '', '/colaborador');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Olá, Lucas' })).toBeInTheDocument();
    expect(await screen.findByText('Lucas Martins')).toBeInTheDocument();
  });

  it('mantém rotas estruturais do RH navegáveis e marcadas como ativas', async () => {
    window.history.pushState({}, '', '/rh/pessoas');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Pessoas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pessoas' })).toHaveAttribute('aria-current', 'page');
  });

  it('mantém rotas estruturais do colaborador navegáveis', async () => {
    window.history.pushState({}, '', '/colaborador/trilhas');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Trilhas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Trilhas' })).toHaveAttribute('aria-current', 'page');
  });

  it('apresenta 404 contextual sem redirecionar silenciosamente', () => {
    window.history.pushState({}, '', '/rh/endereco-inexistente');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeInTheDocument();
    expect(screen.getByText('/rh/endereco-inexistente')).toBeInTheDocument();
  });
});
