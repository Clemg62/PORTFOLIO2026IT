/**
 * USER ROUTES
 * Endpoints for user management.
 */

import { Router } from 'express';
import { registerUser, getAllUsers, getUserById, softDeleteUser, updateUser } from '../controllers/userController';
import validate from '../middlewares/validateResource';
import { registerUserSchema, updateUserSchema } from '../schemas/user.schema';
import { requireAuth } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *                 example: Jean
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *                 example: Dupont
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: StrongPass123
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur enregistré avec succès."
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/register', validate(registerUserSchema), registerUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve all active users
 *     description: Returns the list of all active users. Access restricted to ADMIN role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "42"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: admin@example.com
 *                   firstName:
 *                     type: string
 *                     example: Jean
 *                   lastName:
 *                     type: string
 *                     example: Dupont
 *                   role:
 *                     type: string
 *                     example: ADMIN
 *       401:
 *         description: Unauthorized (not authenticated)
 *       403:
 *         description: Forbidden (not an admin)
 *       500:
 *         description: Server error
 */
router.get('/', requireAuth, checkRole('ADMIN'), getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve specific user profile
 *     description: Returns a user profile by its ID. Accessible by ADMIN or USER.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: "42"
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "42"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                 firstName:
 *                   type: string
 *                   example: Jean
 *                 lastName:
 *                   type: string
 *                   example: Dupont
 *                 role:
 *                   type: string
 *                   example: USER
 *       401:
 *         description: Unauthorized (not authenticated)
 *       403:
 *         description: Forbidden (insufficient permissions)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:id', requireAuth, checkRole(['ADMIN', 'USER']), getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user profile
 *     description: Updates user information. Users can update their own profile, admins can update any profile.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: "42"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *                 example: Jean
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *                 example: Dupont
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newemail@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: NewStrongPass123
 *     responses:
 *       200:
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "42"
 *                     email:
 *                       type: string
 *                       example: newemail@example.com
 *                     firstName:
 *                       type: string
 *                       example: Jean
 *                     lastName:
 *                       type: string
 *                       example: Dupont
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (not authenticated)
 *       403:
 *         description: Forbidden (insufficient permissions)
 *       404:
 *         description: User not found
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */
router.patch('/:id', requireAuth, checkRole(['ADMIN', 'USER']), validate(updateUserSchema), updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Soft delete a user
 *     description: Marks a user as deleted by setting deleted_at to the current date. Accessible by ADMIN or USER.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: "42"
 *     responses:
 *       200:
 *         description: User successfully soft deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       401:
 *         description: Unauthorized (not authenticated)
 *       403:
 *         description: Forbidden (insufficient permissions)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, checkRole(['ADMIN', 'USER']), softDeleteUser);

export default router;