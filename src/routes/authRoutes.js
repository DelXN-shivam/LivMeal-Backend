import express from 'express';
import { unifiedLoginByContact } from '../controllers/unifiedLoginController.js';

const authRouter = express.Router();

// Unified login route for both students and mess
authRouter.post("/login/:contact", unifiedLoginByContact);

export default authRouter;