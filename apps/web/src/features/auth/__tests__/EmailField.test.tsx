import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { EmailField } from '../components/EmailField';

describe('EmailField', () => {
  it('aceita foco por teclado e digitação de e-mail', async () => {
    const user = userEvent.setup();

    render(<EmailField />);

    const emailInput = screen.getByRole('textbox', { name: 'E-mail' });

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');

    await user.tab();
    expect(emailInput).toHaveFocus();

    await user.type(emailInput, 'pessoa@empresa.com');
    expect(emailInput).toHaveValue('pessoa@empresa.com');
  });
});
