import express from 'express'
import { messRegister } from '../controllers/messController.js';

const messRouter = express.Router();


messRouter.post("/register" , messRegister )

messRouter.use("/" , (req, res) => {
    res.json({
        message : "Inside mess Router"
    })
    
})

export default messRouter;