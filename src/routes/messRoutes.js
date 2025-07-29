import express from 'express'
import { fetchAllMess, fetchById, loginByContact, messRegister, updateById } from '../controllers/messController.js';

const messRouter = express.Router();


messRouter.post("/register" , messRegister )
messRouter.post("/login" , loginByContact)
messRouter.patch('/update/:id', updateById)
messRouter.get("/all" , fetchAllMess);
messRouter.get("/:id" , fetchById);



messRouter.use("/" , (req, res) => {
    res.json({
        message : "Inside mess Router"
    })
    
})

export default messRouter;