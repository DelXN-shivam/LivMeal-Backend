import express from 'express'

const userRouter = express.Router();

userRouter.use("/" , (req, res) => {
    res.json({
        message : "Inside user Router"
    })
    
})

export default userRouter;