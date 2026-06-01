import { z } from 'zod';

export const contactSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.email("L'adresse email doit être valide"),
    telephone: z.string().min(6, "Le numéro de téléphone doit contenir au moins 6 caractères").max(15, "Le numéro de téléphone ne doit pas dépasser 15 caractères").regex(/^[0-9+\-\s()]+$/, "Le numéro de téléphone ne peut contenir que des chiffres et caractères spéciaux autorisés"),
    subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
    agreePolicy: z.boolean().refine((value) => value === true, {message: "Vous devez accepter la politique de confidentialité"}),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères")
  })
});

export type contactSchema = z.infer<typeof contactSchema>['body'];