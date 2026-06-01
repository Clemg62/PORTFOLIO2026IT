/**
 * AUTH ROUTES
 * Endpoints for auth management.
 */

import { Router } from 'express';
import { signinUser } from '../controllers/authController';
import { signinUserSchema } from '../schemas/user.schema';
import validate from '../middlewares/validateResource';

const router = Router();

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in a user
 *     description: Authenticate a user and return a token object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Signin successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Signin successful
 *                 token:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: User ID as string (converted from bigint)
 *                       example: "42"
 *                     expiry:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-14T12:34:56.000Z"
 *                     scope:
 *                       type: string
 *                       description: Token scope
 *                       example: AUTHENTICATION
 *                     plaintext:
 *                       type: string
 *                       description: Raw token value
 *                       example: "D7DBX5NVNQLZOZELZ7SRVDPQ7Y"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', validate(signinUserSchema), signinUser);

export default router;