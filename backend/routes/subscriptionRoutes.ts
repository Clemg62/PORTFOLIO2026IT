/**
 * SUBSCRIPTION ROUTES
 * Endpoints for plans, subscriptions, and billing.
 */

import { Router } from 'express';
import { cancelSubscription, createSubscription, getMySubscription } from '../controllers/subscriptionController';
import { requireAuth } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = Router();

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     tags:
 *       - Subscriptions
 *     summary: Create a subscription
 *     description: Subscribe the authenticated user to a plan.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: number
 *                 description: ID of the subscription plan
 *                 example: 1
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscription created successfully"
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     userId:
 *                       type: string
 *                       example: "42"
 *                     planId:
 *                       type: number
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-12T20:00:00.000Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2027-01-12T20:00:00.000Z"
 *       400:
 *         description: Invalid plan ID or user already has an active subscription
 *       401:
 *         description: Unauthorized (not authenticated)
 *       403:
 *         description: Forbidden (insufficient permissions)
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, checkRole(['USER']), createSubscription);

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     tags:
 *       - Subscriptions
 *     summary: Create a subscription
 *     description: Subscribe the authenticated user to a plan.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: number
 *                 description: ID of the subscription plan
 *                 example: 1
 *     responses:
 *       201:
 *         description: Subscription created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid plan ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, checkRole(['USER']), createSubscription);

/**
 * @swagger
 * /api/subscriptions/cancel:
 *   post:
 *     tags:
 *       - Subscriptions
 *     summary: Cancel the current subscription
 *     description: Cancel the active subscription of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: number
 *                 description: ID of the subscription plan to cancel
 *                 example: 1
 *     responses:
 *       200:
 *         description: Subscription canceled
 *       400:
 *         description: Invalid plan ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post('/cancel', requireAuth, checkRole(['USER']), cancelSubscription);

/**
 * @swagger
 * /api/subscriptions/me:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get current user's subscription
 *     description: Retrieve the active subscription details of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User subscription details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 userId:
 *                   type: string
 *                   example: "42"
 *                 planId:
 *                   type: number
 *                   example: 1
 *                 status:
 *                   type: string
 *                   enum: [active, cancelled, past_due, trialing]
 *                   example: "active"
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-12T20:00:00.000Z"
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2027-01-12T20:00:00.000Z"
 *                 plan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Premium"
 *                     priceCents:
 *                       type: number
 *                       example: 1999
 *                     interval:
 *                       type: string
 *                       enum: [month, year]
 *                       example: "month"
 *       401:
 *         description: Unauthorized (not authenticated)
 *       403:
 *         description: Forbidden (insufficient permissions)
 *       404:
 *         description: No active subscription found
 *       500:
 *         description: Server error
 */
router.get('/me', requireAuth, checkRole(['USER']), getMySubscription);

export default router;