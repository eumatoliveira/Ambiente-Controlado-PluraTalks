import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { MockAppProvider } from '../../../app/providers/MockAppProvider';
import { CollaboratorCommunicationsPage } from '../pages/CollaboratorCommunicationsPage';
import { CommunicationsPage } from '../pages/CommunicationsPage';
import { ConversationDetailPage } from '../pages/ConversationDetailPage';
import { MessagingInboxPage } from '../pages/MessagingInboxPage';
import { NewCommunicationPage } from '../pages/NewCommunicationPage';
import { NewConversationPage } from '../pages/NewConversationPage';

function TestNavigation() {
  return <nav aria-label="Navegação do teste"><Link to="/rh/mensagens">Caixa do RH</Link><Link to="/colaborador/rh-comunica">Portal do colaborador</Link><Link to="/rh/comunicados/novo">Criar comunicado</Link></nav>;
}

function renderFlow(initialPath: string) {
  return render(<MemoryRouter initialEntries={[initialPath]}><MockAppProvider><TestNavigation /><Routes><Route path="/colaborador/rh-comunica" element={<CollaboratorCommunicationsPage />} /><Route path="/colaborador/rh-comunica/nova" element={<NewConversationPage />} /><Route path="/colaborador/rh-comunica/:conversationId" element={<ConversationDetailPage context="collaborator" />} /><Route path="/rh/mensagens" element={<MessagingInboxPage />} /><Route path="/rh/mensagens/:conversationId" element={<ConversationDetailPage context="rh" />} /><Route path="/rh/comunicados" element={<CommunicationsPage />} /><Route path="/rh/comunicados/novo" element={<NewCommunicationPage />} /></Routes></MockAppProvider></MemoryRouter>);
}

describe('estado compartilhado de mensagens', () => {
  it('sincroniza envio, caixa do RH, resposta e leitura do colaborador', async () => {
    const user = userEvent.setup();
    renderFlow('/colaborador/rh-comunica/nova');

    await user.type(screen.getByLabelText('Assunto'), 'Acesso ao benefício');
    await user.selectOptions(screen.getByLabelText('Categoria'), 'Benefícios');
    await user.type(screen.getByLabelText('Mensagem'), 'Preciso confirmar como atualizo meu benefício fictício.');
    await user.click(screen.getByRole('button', { name: 'Enviar ao RH' }));
    expect(await screen.findByRole('heading', { name: 'Acesso ao benefício' })).toBeVisible();

    await user.click(screen.getByRole('link', { name: 'Caixa do RH' }));
    const inboxLink = await screen.findByRole('link', { name: /Acesso ao benefício/ });
    expect(inboxLink).toHaveTextContent('Lucas Martins');
    await user.click(inboxLink);
    await user.type(screen.getByLabelText('Responder'), 'Olá, Lucas. O ajuste demonstrativo foi orientado.');
    await user.click(screen.getByRole('button', { name: 'Enviar resposta' }));
    expect(await screen.findByText('Conversa atualizada nesta sessão.')).toBeVisible();

    await user.click(screen.getByRole('link', { name: 'Portal do colaborador' }));
    await user.click(screen.getByRole('link', { name: /Acesso ao benefício/ }));
    expect(await screen.findByText('Olá, Lucas. O ajuste demonstrativo foi orientado.')).toBeVisible();
  });

  it('publica comunicado segmentado e o mostra ao colaborador elegível', async () => {
    const user = userEvent.setup();
    renderFlow('/rh/comunicados/novo');

    await user.type(screen.getByLabelText('Título'), 'Oficina do time de Produto');
    await user.selectOptions(screen.getByLabelText('Público'), 'departments');
    await user.click(screen.getByLabelText('Produto'));
    await user.type(screen.getByLabelText('Conteúdo'), 'Encontro fictício marcado para a próxima quinta-feira.');
    await user.click(screen.getByLabelText('Publicar imediatamente'));
    await user.click(screen.getByRole('button', { name: 'Salvar comunicado' }));

    expect(await screen.findByText('Oficina do time de Produto')).toBeVisible();
    await user.click(screen.getByRole('link', { name: 'Portal do colaborador' }));
    const section = screen.getByRole('heading', { name: 'Comunicados para você' }).closest('section');
    expect(section).not.toBeNull();
    expect(within(section as HTMLElement).getByText('Oficina do time de Produto')).toBeVisible();
  });
});
