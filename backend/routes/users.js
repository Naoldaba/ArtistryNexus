import { follow, deleteProfile, editProfile, blockUser, myProfile, searchUser } from '../controllers/users.js';
import auth from '../middleware/auth.js';
import express from 'express';
import upload from '../middleware/fileUpload.js';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /user/follow/{id}:
 *   patch:
 *     summary: Follow/ Unfollow a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id to follow
 *     responses:
 *       200:
 *         description: User followed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.patch('/follow/:id', auth, follow);

/**
 * @swagger
 * /user/edit_profile:
 *   patch:
 *     summary: Edit user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *               password:
 *                 type: string
 *                 description: User's password
 *               bio:
 *                 type: string
 *                 description: User's bio
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth in YYYY-MM-DD format
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture file
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newUser:
 *                   type: object
 *                   description: The updated user object
 *       400:
 *         description: Invalid input or user not found
 *       500:
 *         description: Internal server error
 */
router.patch('/edit_profile', auth, upload.single('profilePicture'), editProfile);

/**
 * @swagger
 * /user/my_profile:
 *   get:
 *     summary: Get the profile of the logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The updated user object
 *               
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get('/my_profile',auth, myProfile);

/**
 * @swagger
 * /user/search:
 *   get:
 *     summary: Search users by username
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: false
 *         description: Username to search for. Case insensitive search using regex.
 *     responses:
 *       200:
 *         description: A list of users matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Invalid request, missing username query parameter
 *       404:
 *         description: No users found matching the search criteria
 *       500:
 *         description: Internal server error
 */
router.get('/search', searchUser);

/**
 * @swagger
 * /user/delete_profile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Profile deleted successfully
 *       400:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete_profile', auth, deleteProfile);

/**
 * @swagger
 * /user/{id}/block:
 *   patch:
 *     summary: Block a follower
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to block
 *     responses:
 *       200:
 *         description: User blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newProfile:
 *                   type: object
 *                   description: The updated user profile
 *       400:
 *         description: Invalid ID, user not found, artist not found, or user is not your follower
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
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
router.patch('/:id/block', auth, blockUser);

export default router;
