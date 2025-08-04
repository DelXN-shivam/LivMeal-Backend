import express from 'express'
import userRouter from './user.js';
import messRouter from './messRoutes.js';
import { studentRouter } from './studentRoutes.js';
import { adminRouter } from './adminRoutes.js';


const rootRouter = express.Router();


//routes
rootRouter.use("/mess" , messRouter);
rootRouter.use("/student" , studentRouter);
rootRouter.use("/admin" , adminRouter);


export default rootRouter;