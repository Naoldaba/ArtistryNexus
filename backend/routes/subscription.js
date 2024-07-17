import express from 'express';
import { subscribe } from '../controllers/subscription.js';
import auth from '../middleware/auth.js';

const router = express.Router();


/**
 * @swagger
 * /subscribe:
 *   patch:
 *     summary: Subscribe to Premium Service
 *     tags:
 *       - Subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *                 description: ID of the premium service plan
 *     responses:
 *       '200':
 *         description: Subscription successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                     username:
 *                       type: string
 *                       description: Username
 *                     email:
 *                       type: string
 *                       description: User email
 *                     isSubscribed:
 *                       type: boolean
 *                       description: Premium status
 *                     premiumExpiry:
 *                       type: string
 *                       format: date-time
 *                       description: Premium subscription expiry date
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date of user creation
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date of last user update
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.patch('/', auth, subscribe);

export default router;