import { describe, expect, it } from 'vitest';

import { loginSchema } from '../schemas/loginSchema';

describe('loginSchema', () => {
  it('rejeita e-mail vazio', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'senha',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toEqual([
        'Informe seu e-mail.',
      ]);
    }
  });

  it('rejeita e-mail com formato inválido', () => {
    const result = loginSchema.safeParse({
      email: 'email-invalido',
      password: 'senha',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toEqual([
        'Digite um e-mail válido.',
      ]);
    }
  });

  it('rejeita senha vazia', () => {
    const result = loginSchema.safeParse({
      email: 'pessoa@empresa.com',
      password: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password).toEqual([
        'Informe sua senha.',
      ]);
    }
  });

  it('aceita credenciais localmente válidas', () => {
    const credentials = {
      email: 'pessoa@empresa.com',
      password: 'senha',
    };

    const result = loginSchema.safeParse(credentials);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(credentials);
    }
  });
});
