import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { MockAppProvider } from '../../../app/providers/MockAppProvider';
import { CollaboratorShellPage } from '../pages/CollaboratorShellPage';

function renderPortal() {
  return render(
    <MemoryRouter initialEntries={['/colaborador']}>
      <MockAppProvider><CollaboratorShellPage /></MockAppProvider>
    </MemoryRouter>,
  );
}

describe('CollaboratorShellPage', () => {
  it('apresenta identidade e navegação pessoal com links reais', () => {
    renderPortal();
    expect(screen.getByText('Lucas Martins')).toBeInTheDocument();
    expect(screen.getByText('Analista de Produto')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Portal do colaborador' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Responda' })).toHaveAttribute('href', '/colaborador/responda');
    expect(screen.getByRole('link', { name: 'RH Comunica' })).toHaveAttribute('href', '/colaborador/rh-comunica');
    expect(screen.getByRole('link', { name: 'Trilhas' })).toHaveAttribute('href', '/colaborador/trilhas');
    expect(screen.getByRole('link', { name: 'Minha Jornada' })).toHaveAttribute('href', '/colaborador/jornada');
    expect(screen.getByRole('link', { name: 'Configurações' })).toHaveAttribute('href', '/colaborador/configuracoes');
  });

  it('mantém ações futuras indisponíveis e permite voltar ao login', () => {
    renderPortal();
    expect(screen.getByRole('searchbox', { name: 'Buscar no portal' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Notificações' })).toBeDisabled();
    expect(screen.getByRole('link', { name: 'Sair' })).toHaveAttribute('href', '/');
  });

  it('apresenta o resumo pessoal do portal', () => {
    renderPortal();
    expect(screen.getByRole('heading', { level: 1, name: 'Olá, Lucas' })).toBeInTheDocument();
    expect(screen.getByText('Avaliações pendentes')).toBeInTheDocument();
  });
});
