import { Request, Response, NextFunction } from 'express';

/**
 * Vérifie si l'utilisateur possède l'un des rôles requis.
 * @param allowedRoles - Un rôle unique (string) ou un tableau de rôles (string[])
 */
export const checkRole = (allowedRoles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Sécurité : On s'assure que l'utilisateur est bien connecté
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    // 2. Normalisation : On transforme en tableau pour gérer le cas d'un seul rôle
    const rolesRequired = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    // 3. Vérification : Est-ce que l'utilisateur possède au moins un des rôles requis ?
    const hasPermission = user.roles.some((userRole) => {
        return rolesRequired.includes(userRole.role.name);
    });

    if (!hasPermission) {
      // 403 Forbidden = Tu es connecté, mais tu n'as pas le droit d'être là
      return res.status(403).json({ error: "Accès refusé" });
    }

    next();
  };
};