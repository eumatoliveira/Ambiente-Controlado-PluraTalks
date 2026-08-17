import { describe, expect, it } from 'vitest';

import { initialMockState } from '../../mocks/seed';
import {
  assertUniqueDepartmentName,
  canDisplayAggregate,
  canInvite,
  remainingSeats,
  usedSeats,
} from '../mockRules';

describe('regras demonstrativas compartilhadas', () => {
  it('calcula assentos usando ativos e convites pendentes', () => {
    expect(usedSeats(initialMockState.people)).toBe(4);
    expect(remainingSeats(initialMockState.plan, initialMockState.people)).toBe(46);
    expect(canInvite(initialMockState.plan, initialMockState.people)).toBe(true);
  });

  it('bloqueia novos convites quando o plano está esgotado', () => {
    expect(
      canInvite({ ...initialMockState.plan, seatLimit: 4 }, initialMockState.people),
    ).toBe(false);
  });

  it('protege grupos com quatro respostas e libera grupos com cinco', () => {
    expect(canDisplayAggregate(4)).toBe(false);
    expect(canDisplayAggregate(5)).toBe(true);
  });

  it('bloqueia nomes de área duplicados sem diferenciar caixa ou espaços', () => {
    expect(() =>
      assertUniqueDepartmentName(initialMockState.departments, '  PRODUTO '),
    ).toThrow('Já existe uma área com este nome.');
  });
});
