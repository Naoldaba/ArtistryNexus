import auth from '../middleware/auth.js';
import express from 'express';
import upload from '../middleware/fileUpload.js';
import {createArtWork, search, myArtWork, updateArtWork, deleteArtWork, like, report, allArtWorks} from '../controllers/artWork.js';
import { createComment, deleteComment, editComment } from '../controllers/comment.js';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ArtWorks
 *   description: ArtWorks managing API
 */


/**
 * @swagger
 * /artwork/all:
 *   get:
 *     tags: [ArtWorks]
 *     summary: Get all artworks
 *     responses:
 *       200:
 *         description: Successfully retrieved all artworks       
 *       500:
 *         description: Server error
 */
router.get('/all', allArtWorks);


/**
 * @swagger
 * /artwork:
 *   post:
 *     summary: Create a new artwork
 *     tags: [ArtWorks]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               arts:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: The created artwork
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', auth, upload.fields([{ name: 'arts', maxCount: 3 }]), createArtWork);

/**
 * @swagger
 * /artwork/search:
 *   get:
 *     summary: Search for artworks
 *     tags: [ArtWorks]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search term
 *     responses:
 *       200:
 *         description: The list of artworks
 *       500:
 *         description: Internal server error
 */
router.get('/search', search);

/**
 * @swagger
 * /artwork/my_artwork:
 *   get:
 *     summary: Get my artworks
 *     tags: [ArtWorks]
 *     responses:
 *       200:
 *         description: The list of my artworks
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/my_artwork', auth, myArtWork);

/**
 * @swagger
 * /artwork/{id}:
 *   patch:
 *     summary: Update an artwork
 *     tags: [ArtWorks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artwork id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               arts:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: The updated artwork
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Artwork not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', auth, upload.fields([{ name: 'arts', maxCount: 3 }]), updateArtWork);

/**
 * @swagger
 * /artwork/{id}:
 *   delete:
 *     summary: Delete an artwork
 *     tags: [ArtWorks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artwork id
 *     responses:
 *       204:
 *         description: Artwork deleted
 *       400:
 *         description: Invalid ID or artwork not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', auth, deleteArtWork);

/**
 * @swagger
 * /artwork/{id}/like:
 *   patch:
 *     summary: Like/ Dislike an artwork
 *     tags: [ArtWorks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artwork id
 *     responses:
 *       200:
 *         description: Artwork liked
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */
router.patch('/:id/like', auth, like);

/**
 * @swagger
 * /artwork/{id}/report:
 *   post:
 *     summary: Report an artwork
 *     tags: [ArtWorks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artwork id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: The reason for reporting
 *     responses:
 *       200:
 *         description: Artwork reported
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */
router.post('/:id/report', auth, report);

/**
 * @swagger
 * /artwork/{id}/comment:
 *   post:
 *     summary: Add a comment to an artwork
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artwork id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The comment content
 *     responses:
 *       200:
 *         description: Comment added
 *       404:
 *         description: Artwork not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/comment', auth, createComment);

/**
 * @swagger
 * /artwork/comments/{id}:
 *   patch:
 *     summary: Edit a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The comment content
 *     responses:
 *       200:
 *         description: Comment edited
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.patch('/comments/:id', auth, editComment);

/**
 * @swagger
 * /artwork/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       204:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.delete('/comments/:id', auth, deleteComment);

export default router;
