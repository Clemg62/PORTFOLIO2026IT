import { Request, Response } from "express";
import {prisma} from "../lib/prisma";
import { contactSchema } from "../schemas/contact.schema";

export const submitContactForm = async (req: Request<{}, {}, contactSchema>, res: Response) => {
  const { name, email, telephone, subject, agreePolicy, message } = req.body;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        telephone,
        subject,
        agreePolicy,
        message
      }
    });

    res.status(201).json({ message: "Formulaire de contact soumis avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la soumission du formulaire de contact", error });
  }
};