import { Request, Response, NextFunction } from 'express';
import {prisma} from '../lib/prisma';
import crypto from 'crypto';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Récupérer le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant ou format invalide' });
    }

    // 2. Extraire le token brut (après "Bearer ")
    const tokenPlaintext = authHeader.split(' ')[1];

    if (!tokenPlaintext) {
      return res.status(401).json({ error: 'Token vide' });
    }

    // 3. Hacher le token reçu pour le comparer avec la BDD
    const tokenHash = crypto
      .createHash('sha256')
      .update(tokenPlaintext)
      .digest(); // Renvoie un Buffer

    // 4. Chercher le token en base
    const tokenFound = await prisma.token.findFirst({
      where: {
        hash: tokenHash,        // Correspondance du hash
        scope: 'AUTHENTICATION', // Vérification du scope
        expiry: {
          gt: new Date()        // Vérifie que la date d'expiration est > maintenant
        }
      },
      include: {
        user: {
          include: {
            roles: {
              include: {
                role: true
              }
            }
          },
          omit: {
            password: true,
            deletedAt: true,
          }
        }
      }
    });

    // 5. Si pas de token ou expiré
    if (!tokenFound) {
      return res.status(401).json({ error: 'Session invalide ou expirée' });
    }

    // 6. Attacher l'utilisateur à la requête
    req.user = tokenFound.user;

    next(); // On passe au contrôleur suivant

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ error: 'Erreur serveur lors de l\'authentification' });
  }
};