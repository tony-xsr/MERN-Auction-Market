import express from 'express';
import { signoutHandler, signinHandler, signupHandler } from '../controllers/auth.controller'; 
import { validate } from '../middleware/validate'; 
import { loginUserSchema, createUserSchema } from '../schema/auth.schema';

const authRouter = express.Router();

authRouter.post('/signin', validate(loginUserSchema), signinHandler);
authRouter.post('/signup',validate(createUserSchema), signupHandler);
authRouter.post('/signout', signoutHandler);
 

export default authRouter;
