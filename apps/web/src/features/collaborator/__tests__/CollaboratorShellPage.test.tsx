import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { CollaboratorShellPage } from '../pages/CollaboratorShellPage';

describe('CollaboratorShellPage', () => {
  it('apresenta a identidade e a navegação pessoal do colaborador', () => {
    render(
      <MemoryRouter>
        <CollaboratorShellPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Lucas Martins')).toBeInTheDocument();
    expect(screen.getByText('Colaborador')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Portal do colaborador' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Início')).toHaveAttribute('aria-current', 'page');

    for (const item of [
      'Responda',
      'RH Comunica',
      'Trilhas',
      'Minha Jornada',
      'Configurações',
    ]) {
      expect(screen.getByText(item)).toHaveAttribute('aria-disabled', 'true');
    }
  });

  it('mantém ações futuras indisponíveis e permite voltar ao login', () => {
    render(
      <MemoryRouter>
        <CollaboratorShellPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('searchbox', { name: 'Buscar no portal' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Notificações' }),
    ).toBeDisabled();

    expect(screen.getByRole('link', { name: 'Sair' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renderiza somente o conteúdo de espera da primeira ronda', () => {
    render(
      <MemoryRouter>
        <CollaboratorShellPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Meu Portal' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Estrutura inicial do portal')).toBeInTheDocument();
    expect(screen.queryByText('Pesquisa de clima')).not.toBeInTheDocument();
    expect(screen.queryByText('Minhas solicitações')).not.toBeInTheDocument();
  });
});
