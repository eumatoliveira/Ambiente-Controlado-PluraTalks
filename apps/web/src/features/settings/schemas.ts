import { z } from 'zod';

export const organizationSchema = z.object({
  tradeName: z.string().trim().min(2, 'Informe o nome fantasia.'),
  legalName: z.string().trim(),
  segment: z.string().trim().min(2, 'Informe o segmento.'),
  size: z.string().trim().min(1, 'Selecione o porte.'),
  domain: z.string().trim().regex(/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i, 'Informe um domínio válido.'),
  timezone: z.string().trim().min(1, 'Selecione o fuso horário.'),
});

export const departmentSchema = z.object({
  name: z.string().trim().min(2, 'Informe um nome com pelo menos 2 caracteres.'),
  description: z.string().trim().min(8, 'Descreva brevemente a área.'),
  managerName: z.string().trim().min(2, 'Informe a pessoa responsável.'),
  colorToken: z.enum(['purple', 'orange', 'slate']),
});

export const personSchema = z.object({
  name: z.string().trim().min(2, 'Informe o nome.'),
  email: z.email('Informe um e-mail válido.'),
  roleTitle: z.string().trim().min(2, 'Informe o cargo.'),
  departmentId: z.string().trim().min(1, 'Selecione uma área.'),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, 'Informe o nome.'),
  roleTitle: z.string().trim().min(2, 'Informe o cargo.'),
  phone: z.string().trim().min(10, 'Informe um telefone válido.'),
});

export const securitySchema = z
  .object({
    currentPassword: z.string().min(1, 'Informe a senha atual.'),
    newPassword: z.string().min(8, 'A nova senha deve ter pelo menos 8 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirme a nova senha.'),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem.',
  });

export type OrganizationFormValues = z.infer<typeof organizationSchema>;
export type DepartmentFormValues = z.infer<typeof departmentSchema>;
export type PersonFormValues = z.infer<typeof personSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type SecurityFormValues = z.infer<typeof securitySchema>;
