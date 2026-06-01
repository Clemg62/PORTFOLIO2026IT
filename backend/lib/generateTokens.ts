import crypto from 'crypto';
import base32 from 'hi-base32';
import { TokenScope } from '../../generated/prisma/client';

/**
 * Génère un token d'authentification.
 * @param {number|string} userId - L'ID de l'utilisateur.
 * @param {number} ttlSeconds - Durée de vie en secondes.
 * @param {TokenScope} scope - Le scope du token.
 * @returns {Object} Le token contenant le plaintext et le hash.
 */
function generateToken(userId: bigint, ttlSeconds: number, scope: TokenScope) {
    // 1. Calcul de l'expiration
    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + ttlSeconds);

    // 2. Création des bytes aléatoires
    const randomBytes = crypto.randomBytes(16);

    // 3. Encodage en Base32
    const plaintext = base32.encode(randomBytes).replace(/=/g, '');

    // 4. Hachage SHA-256
    const hash = crypto.createHash('sha256').update(plaintext).digest();

    // Retourne l'objet Token
    return {
        userId: userId,
        expiry: expiry,
        scope: scope,
        plaintext: plaintext,
        hash: hash
    };
}

export { generateToken };
