// import express from 'express'
// import { addReviews, fetchAllMess, fetchById, loginByContact, messRegister, updateById } from '../controllers/messController.js';
// import { addSubscriptionMess } from '../controllers/subscriptionController.js';

// const messRouter = express.Router();


// messRouter.post("/register" , messRegister ) 
// messRouter.post("/login" , loginByContact)
// messRouter.patch('/update/:id', updateById)
// messRouter.get("/all" , fetchAllMess);
// messRouter.get("/:id" , fetchById);


// export default messRouter;


// routes/messRoutes.js
import express from 'express';
import { registerMess, getAllMesses, getMess, updateMess, deleteMess, addReviews, loginByContact } from '../controllers/messController.js';
import upload from '../middleware/upload.js';
import { addSubscriptionMess } from '../controllers/subscriptionController.js';

const messRouter = express.Router();

// Register a new mess (with file upload)
messRouter.post(
  '/register',
  upload.array('photos', 5), // Max 5 photos
  registerMess
);

// Get all messes
messRouter.get('/all', getAllMesses);

// Get single mess
messRouter.get('/:id', getMess);

// Update mess
messRouter.patch('/update/:id', updateMess);

messRouter.post('/login-by-contact' , loginByContact)
// Delete mess
messRouter.delete('/delete/:id', deleteMess);

messRouter.post("/addSubscription", addSubscriptionMess);

messRouter.patch("/addReviews/:messId" , addReviews)

export default messRouter;
