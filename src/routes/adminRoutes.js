import express from 'express'
import { adminLogin, adminRegister, getAdmin, getAdminConfig, setGSTAndFee, updateAdminConfig } from '../controllers/adminController.js';

export const adminRouter = express.Router();

adminRouter.post("/register" , adminRegister)
adminRouter.post("/login" , adminLogin)
// adminRouter.get("/:adminId" , getAdmin)
// adminRouter.patch('/:adminId/set-gst-fee', setGSTAndFee);


adminRouter.patch('/config', updateAdminConfig);
adminRouter.get('/config', getAdminConfig); 