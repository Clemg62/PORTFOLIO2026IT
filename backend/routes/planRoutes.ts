/**
 * PLANS ROUTES
 * Endpoints for plan management.
 */

import { Router } from 'express';
import { createPlan, disablePlan, getAllPlans, getPlanById, updatePlan } from '../controllers/planController';
import { requireAuth } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = Router();

/**
 * @swagger
 * /api/plans:
 *   get:
 *     tags:
 *       - Plans
 *     summary: Retrieve all subscription plans
 *     description: Returns a list of all subscription plans.
 *     responses:
 *       200:
 *         description: List of plans
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Basic Monthly"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-01-14T13:00:00.000Z"
 *                       price:
 *                         type: number
 *                         example: 9.99
 *                       currency:
 *                         type: string
 *                         example: "EUR"
 *                       intervalUnit:
 *                         type: string
 *                         description: Unit of the subscription interval (e.g., "month", "year")
 *                         example: "month"
 *                       intervalCount:
 *                         type: number
 *                         example: 1
 *                       active:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Server error
 */
router.get('/', getAllPlans);

/**
 * @swagger
 * /api/plans/{id}:
 *   get:
 *     tags:
 *       - Plans
 *     summary: Retrieve a specific subscription plan
 *     description: Returns a subscription plan by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the subscription plan
 *         example: 1
 *     responses:
 *       200:
 *         description: Plan details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Basic Monthly"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-14T13:00:00.000Z"
 *                 price:
 *                   type: number
 *                   example: 9.99
 *                 currency:
 *                   type: string
 *                   example: "EUR"
 *                 intervalUnit:
 *                   type: string
 *                   description: Unit of the subscription interval (e.g., "month", "year")
 *                   example: "month"
 *                 intervalCount:
 *                   type: number
 *                   example: 1
 *                 active:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getPlanById);

/**
 * @swagger
 * /api/plans:
 *   post:
 *     tags:
 *       - Plans
 *     summary: Create a new subscription plan
 *     description: Create a new subscription plan. Accessible only by ADMIN or STAFF.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - currency
 *               - interval_unit
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: "Premium Monthly"
 *               price:
 *                 type: integer
 *                 minimum: 0
 *                 example: 2999
 *               currency:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 2
 *                 example: "EUR"
 *               interval_unit:
 *                 type: string
 *                 enum:
 *                   - day
 *                   - week
 *                   - month
 *                   - year
 *                 example: "month"
 *               interval_count:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *                 example: 1
 *     responses:
 *       201:
 *         description: Plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Premium Monthly"
 *                     price:
 *                       type: number
 *                       example: 29
 *                     currency:
 *                       type: string
 *                       example: "EUR"
 *                     intervalUnit:
 *                       type: string
 *                       enum:
 *                         - day
 *                         - week
 *                         - month
 *                         - year
 *                       example: "month"
 *                     intervalCount:
 *                       type: number
 *                       example: 1
 *                     active:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-14T13:00:00.000Z"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, checkRole(['ADMIN', 'STAFF']), createPlan);

/**
 * @swagger
 * /api/plans/{id}:
 *   patch:
 *     tags:
 *       - Plans
 *     summary: Update an existing subscription plan
 *     description: Update one or more fields of a subscription plan. Accessible only by ADMIN or STAFF.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the subscription plan to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: "Premium Monthly Updated"
 *               price:
 *                 type: integer
 *                 minimum: 0
 *                 example: 39
 *               currency:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 2
 *                 example: "USD"
 *               interval_unit:
 *                 type: string
 *                 enum:
 *                   - day
 *                   - week
 *                   - month
 *                   - year
 *                 example: "month"
 *               interval_count:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *     responses:
 *       200:
 *         description: Plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Premium Monthly Updated"
 *                     price:
 *                       type: number
 *                       example: 39
 *                     currency:
 *                       type: string
 *                       example: "USD"
 *                     intervalUnit:
 *                       type: string
 *                       enum:
 *                         - day
 *                         - week
 *                         - month
 *                         - year
 *                       example: "month"
 *                     intervalCount:
 *                       type: number
 *                       example: 1
 *                     active:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-14T13:00:00.000Z"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', requireAuth, checkRole(['ADMIN', 'STAFF']), updatePlan);

/**
 * @swagger
 * /api/plans/{id}:
 *   delete:
 *     tags:
 *       - Plans
 *     summary: Disable a subscription plan
 *     description: Marks a subscription plan as inactive. Accessible only by ADMIN or STAFF.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the plan to disable
 *         example: 1
 *     responses:
 *       200:
 *         description: Plan disabled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Plan désactivé avec succès"
 *                 plan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Premium Monthly"
 *                     price:
 *                       type: number
 *                       example: 29
 *                     currency:
 *                       type: string
 *                       example: "EUR"
 *                     intervalUnit:
 *                       type: string
 *                       enum:
 *                         - day
 *                         - week
 *                         - month
 *                         - year
 *                       example: "month"
 *                     intervalCount:
 *                       type: number
 *                       example: 1
 *                     active:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-14T13:00:00.000Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Error disabling the plan
 */
router.delete('/:id', requireAuth, checkRole(['ADMIN', 'STAFF']), disablePlan);


export default router;