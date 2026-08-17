import { z } from 'zod';

export const conversationSchema = z.object({
  subject: z.string().trim().min(4, 'Resuma o assunto em pelo menos 4 caracteres.'),
  category: z.string().trim().min(1, 'Selecione uma categoria.'),
  urgency: z.enum(['low', 'normal', 'high']),
  body: z.string().trim().min(10, 'Escreva uma mensagem com pelo menos 10 caracteres.').max(1200, 'Use no máximo 1.200 caracteres.'),
});

export const replySchema = z.object({ body: z.string().trim().min(2, 'Escreva uma resposta.').max(1200, 'Use no máximo 1.200 caracteres.') });

export const communicationSchema = z.object({
  title: z.string().trim().min(4, 'Informe um título.'),
  body: z.string().trim().min(10, 'Escreva o comunicado.'),
  priority: z.enum(['normal', 'important', 'urgent']),
  targetType: z.enum(['all', 'departments']),
  departmentIds: z.array(z.string()),
  expiresAt: z.string(),
  publishNow: z.boolean(),
}).refine((value) => value.targetType === 'all' || value.departmentIds.length > 0, { path: ['departmentIds'], message: 'Selecione ao menos uma área.' });

export type ConversationFormValues = z.infer<typeof conversationSchema>;
export type ReplyFormValues = z.infer<typeof replySchema>;
export type CommunicationFormValues = z.infer<typeof communicationSchema>;
