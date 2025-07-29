import express from 'express'
import { loginByContact, registerContact, studentRegister, updateById } from '../controllers/studentController.js';


export const studentRouter = express.Router();

studentRouter.post("/register" , studentRegister);
studentRouter.post("/login" , loginByContact);
studentRouter.patch("/update/:id" , updateById)
//studentRouter.post("/contact/register" , registerContact);