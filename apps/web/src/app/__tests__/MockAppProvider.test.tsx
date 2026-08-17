import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { MockAppProvider } from '../providers/MockAppProvider';
import { useMockApp } from '../providers/useMockApp';

function ProviderHarness() {
  const { state, createConversation, replyToConversation } = useMockApp();
  const newest = state.conversations[0];

  return (
    <div>
      <span>Conversas: {state.conversations.length}</span>
      <span>Mensagens: {newest?.messages.length ?? 0}</span>
      <button type="button" onClick={() => void createConversation({ subject: 'Nova solicitação', category: 'Pessoas', urgency: 'normal', body: 'Preciso de uma orientação.' })}>
        Criar conversa
      </button>
      <button type="button" onClick={() => void replyToConversation(newest.id, 'Retorno do RH.', 'rh', 'in_progress')}>
        Responder
      </button>
    </div>
  );
}

describe('MockAppProvider', () => {
  it('compartilha conversas e respostas na mesma sessão', async () => {
    const user = userEvent.setup();
    render(<MockAppProvider><ProviderHarness /></MockAppProvider>);

    expect(screen.getByText('Conversas: 1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Criar conversa' }));
    expect(await screen.findByText('Conversas: 2')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Responder' }));
    expect(await screen.findByText('Mensagens: 2')).toBeInTheDocument();
  });
});
