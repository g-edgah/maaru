import express from 'express';

import { getFeedPosts, getUserPosts, likePost } from  '../controller/post.js';
import { verifyToken } from  '../middleware/auth.js';


const postRoutes = express.Router();

postRoutes.get('/', verifyToken, getFeedPosts);
postRoutes.get('/:userId', verifyToken, getUserPosts);

postRoutes.patch('/:id/like', verifyToken, likePost)

export default postRoutes;