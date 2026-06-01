import { z } from 'zod';

export const createPlanSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    price: z.number().int().nonnegative("Le prix doit être un entier positif"),
    currency: z.string().length(2, "La devise doit contenir au moins 2 caractères"),
    interval_unit: z.enum(['day', 'week', 'month', 'year']),
    interval_count: z.number().int().positive("L'intervalle doit être un entier positif").default(1)
  })
});

export const updatePlanSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").optional(),
    price: z.number().int().nonnegative("Le prix doit être un entier positif").optional(),
    currency: z.string().length(2, "La devise doit contenir au moins 2 caractères").optional(),
    interval_unit: z.enum(['day', 'week', 'month', 'year']).optional(),
    interval_count: z.number().int().positive("L'intervalle doit être un entier positif").optional()
  })
});

export type createPlanSchema = z.infer<typeof createPlanSchema>['body'];
export type updatePlanSchema = z.infer<typeof updatePlanSchema>['body'];