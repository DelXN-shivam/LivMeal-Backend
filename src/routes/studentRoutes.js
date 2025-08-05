import express from 'express'
//import { loginByContact, registerContact, studentRegister, updateById } from '../controllers/studentController.js';
import { getStudentById, loginByContact, studentRegister, updateById } from '../controllers/studentController.js';
import { addSubscriptionToStudent } from '../controllers/subscriptionController.js';


export const studentRouter = express.Router();

studentRouter.post("/register" , studentRegister);
studentRouter.post("/login" , loginByContact);
studentRouter.patch("/update/:id" , updateById);
studentRouter.get("/:id" , getStudentById);
studentRouter.patch("/addSubscription" , addSubscriptionToStudent);
//studentRouter.post("/contact/register" , registerContact);