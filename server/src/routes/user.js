import express from 'express'

import  { getUser, getUserFriends, addRemoveFriend } from '../controller/user.js'
import { verifyToken } from '../middleware/auth.js'

const userRoutes = express.Router();
 
userRoutes.get('/:id', verifyToken, getUser);
userRoutes.get('/:id/friends', verifyToken, getUserFriends)

userRoutes.patch('/:id/:friendId',  verifyToken, addRemoveFriend)

export default userRoutes;