/**
 * CONTACT ROUTES
 * Endpoints for contact management.
 */

import { Router } from 'express';
import { submitContactForm } from '../controllers/contactController';
import { contactSchema } from '../schemas/contact.schema';
import validate from '../middlewares/validateResource';

const router = Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags:
 *       - Contact
 *     summary: Submit a contact form
 *     description: Send a contact request through the public contact form.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - telephone
 *               - subject
 *               - agreePolicy
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean.dupont@example.com"
 *               telephone:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 15
 *                 pattern: "^[0-9+\\-\\s()]+$"
 *                 example: "+33 6 12 34 56 78"
 *               subject:
 *                 type: string
 *                 minLength: 5
 *                 example: "Demande de devis"
 *               agreePolicy:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 minLength: 10
 *                 example: "Bonjour, je souhaiterais avoir plus d'informations."
 *     responses:
 *       200:
 *         description: Contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message sent successfully"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', validate(contactSchema), submitContactForm);

export default router;