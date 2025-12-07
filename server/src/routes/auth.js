import express from 'express';
import { login } from '../controller/auth.js'

const authRoutes = express.Router();

app.post('/login', login)

export default authRoutes