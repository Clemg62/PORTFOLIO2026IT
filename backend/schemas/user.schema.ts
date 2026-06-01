import { z } from 'zod';

export const registerUserSchema = z.object({
  body: z.object({
    email: z.email("L'adresse email doit être valide"),
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    password: z
      .string()
      .min(8, "Le mot de passe doit faire au moins 8 caractères")
  })
});

export const signinUserSchema = z.object({
  body: z.object({
    email: z.email("L'adresse email doit être valide"),
    password: z.string()
  })
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "L'ID doit être valide")
  }),
  body: z.object({
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères")
  })
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>['body'];
export type SigninUserInput = z.infer<typeof signinUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];