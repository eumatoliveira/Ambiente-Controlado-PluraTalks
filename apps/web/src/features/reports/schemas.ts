import { z } from 'zod';

export const reportSchema = z.object({
  title: z.string().trim().min(4, 'Informe um título.'),
  scope: z.enum(['organization', 'department']),
  departmentId: z.string(),
  period: z.string().trim().min(1, 'Informe o período.'),
  assessmentIds: z.array(z.string()).min(1, 'Selecione ao menos uma avaliação.'),
  playbookIds: z.array(z.string()),
}).refine((value) => value.scope === 'organization' || Boolean(value.departmentId), { path: ['departmentId'], message: 'Selecione uma área.' });

export type ReportFormValues = z.infer<typeof reportSchema>;
