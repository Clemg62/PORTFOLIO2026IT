import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { RegisterUserInput } from "../schemas/user.schema";

export const registerUser = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const defaultRoleName = "USER";

    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        roles: {
          create: {
            role: {
              connect: { name: defaultRoleName },
            },
          },
        },
      },
    });

    res.status(201).json({ message: "Utilisateur enregistré avec succès." });
  } catch (error: any) {
    // Gestion basique de l'erreur "Email unique déjà pris" (code P2002 pour Prisma)
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Cet email existe déjà." });
    }
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de l'enregistrement de l'utilisateur.",
      });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      omit: {
        password: true,
      }
    });

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de la récupération des utilisateurs.",
      });
  }
};

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "Non authentifié" });
  }

  // Check if user has ADMIN role
  const isAdmin = user.roles && user.roles.some((role) => role.role.name === "ADMIN");

  if (isAdmin) {
    const userData = {
      ...user,
      id: user.id.toString(),
      roles: user.roles.map((role) => role.role.name),
    };
    return res.json({ user: userData });
  }

  if (user.id.toString() !== id.toString()) {
    return res.status(403).json({ message: "Accès refusé." });
  }

  return res.json({
    user: {
      ...user,
      id: user.id.toString(),
      roles: user.roles ? user.roles.map((role) => role.role.name) : [],
    },
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = req.user;
  const { firstName, lastName } = req.body;

  if (isNaN(id)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
  }

  if (!user || user.id.toString() !== id.toString()) {
    return res.status(403).json({ message: "Non autorisé" });
  }

  try {
    // Check if user exists before update to prevent 404 from Prisma or handle P2025
    const existingUser = await prisma.user.findUnique({ where: { id: BigInt(id) } });
    if (!existingUser) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: BigInt(id) },
      data: {
        firstName,
        lastName
      }
    });

    const userData = {
      ...updatedUser,
      id: updatedUser.id.toString(),
    };

    res.json({ message: "Profil mis à jour", user: userData });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
};

export const softDeleteUser = async (req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented yet." });
};