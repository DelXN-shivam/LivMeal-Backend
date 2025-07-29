import express from 'express'
import userRouter from './user.js';
import messRouter from './mess.js';

const rootRouter = express.Router();
// rootRouter.use("/user" , userRouter);




rootRouter.use("/mess" , messRouter);
rootRouter.get("/" , (req, res) => {
    res.json({
        message : "Inside root router"
    })
})
export default rootRouter;