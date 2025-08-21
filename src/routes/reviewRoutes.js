import express from 'express';
import { addReview, getReviewsByMess } from '../controllers/reviewController.js';

export const reviewRouter = express.Router();

reviewRouter.post("/add", addReview);
reviewRouter.get("/mess/:messId", getReviewsByMess);