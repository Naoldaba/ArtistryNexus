import express from 'express';
import { forgotPassword, googleAuth, resetPassword, signin, signup, verifyOTP } from '../controllers/auth.js';
import upload from '../middleware/fileUpload.js';
import passport from 'passport';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth managment API
 */


/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/signin', signin);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username
 *               fullName:
 *                 type: string
 *                 description: full name
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth in YYYY-MM-DD format
 *     responses:
 *       201:
 *         description: User signed up successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/signup', upload.single('profilePicture'), signup);


/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Google OAuth endopoint
 *     tags: [Auth]
 *     description: >
 *       Endpoint for Google OAuth. After successful authentication, this endpoint provides a JWT token for the authenticated user.
 *     responses:
 *       '200':
 *         description: Successfully authenticated user and returned a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for further authentication.
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID.
 *                     username:
 *                       type: string
 *                       description: Username.
 *                     email:
 *                       type: string
 *                       description: Email address.
 *                     googleId:
 *                       type: string
 *                       description: Google ID.
 *                     profilePicture:
 *                       type: string
 *                       description: URL of the user's profile picture.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/authenticated', passport.authenticate('google'), googleAuth);


/**
 * @swagger
 * /auth/forgot-password:
 *   patch:
 *     summary: Request a password reset OTP
 *     tags: [Auth]
 *     description: This endpoint allows users to request an OTP for password reset. The OTP is sent to the user's email and is valid for 1 hour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user requesting the password reset.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully to the user's email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: email sent successfully
 *       404:
 *         description: User not found or error occurred while sending email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: something went wrong
 */
router.patch('/forgot-password', forgotPassword);

/**
 * @swagger
 * /auth/verify-otp:
 *   patch:
 *     summary: Verify OTP for password reset
 *     tags: [Auth]
 *     description: Verifies the OTP sent to the user's email for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the user's email.
 *                 example: 1a2b3c
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired OTP
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.patch('/verify-otp', verifyOTP);


/**
 * @swagger
 * /auth/reset-password:
 *   patch:
 *     summary: Reset user password
 *     tags: [Auth]
 *     description: This endpoint allows users to reset their password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.patch('/reset-password', resetPassword);


export default router;