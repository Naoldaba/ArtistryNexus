import express from 'express';
import { googleAuth, signin, signup } from '../controllers/auth.js';
import { uploadSizeLimit } from '../middleware/fileSizeLimit.js';
import upload from '../middleware/fileUpload.js';
import passport from 'passport';

console.log('secreting', process.env.SECRET_KEY);

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
 *               firstName:
 *                 type: string
 *                 description: User first name
 *               lastName:
 *                 type: string
 *                 description: User last name
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: User profile picture
 *     responses:
 *       201:
 *         description: User signed up successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/signup', uploadSizeLimit, upload.single('profilePicture'), signup);


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


export default router;