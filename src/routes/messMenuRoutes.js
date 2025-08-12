
import express from 'express'
import { registerMessMenu } from '../controllers/messMenuController.js';

export const messMenuRouter = express.Router();

messMenuRouter.post("/create" , registerMessMenu)
