import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Informe seu e-mail.')
    .pipe(z.email('Digite um e-mail válido.')),
  password: z.string().min(1, 'Informe sua senha.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
