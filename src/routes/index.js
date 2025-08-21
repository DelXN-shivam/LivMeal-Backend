import express from 'express'
import userRouter from './user.js';
import messRouter from './messRoutes.js';
import { studentRouter } from './studentRoutes.js';
import { adminRouter } from './adminRoutes.js';
import { messMenuRouter } from './messMenuRoutes.js';
import authRouter from './authRoutes.js';
import { reviewRouter } from './reviewRoutes.js';


const rootRouter = express.Router();


//routes
rootRouter.use("/mess" , messRouter);
rootRouter.use("/student" , studentRouter);
rootRouter.use("/admin" , adminRouter);
rootRouter.use('/messMenu' , messMenuRouter);
rootRouter.use('/auth' , authRouter);
rootRouter.use('/review' , reviewRouter);

export default rootRouter;