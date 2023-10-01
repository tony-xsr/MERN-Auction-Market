import type { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models/user.model';
import type { UserAuthToken } from '../schema/user.schema';
import type { CreateUserInput, LoginUserInput } from '../schema/auth.schema';
import { signJwt, verifyJwt } from '../utils/jwt';

// Sign-in controller
export const signinHandler = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    _: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          error: 'User not found',
        });
      }
  
      // Authenticate the user by comparing passwords
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password don't match.",
        });
      }
  
      // Generate access token and refresh token
      const accessToken = signJwt({ _id: user._id }, 'JWT_ACCESS_TOKEN_PRIVATE_KEY', {
        expiresIn: '24h', // Set expiration time
      });

      const refreshToken = signJwt({ _id: user._id }, 'JWT_REFRESH_TOKEN_PRIVATE_KEY', {
        expiresIn: '7d', // Set expiration time
      });
  
      // Store the refresh token in the User
      // I think it would be better to use redis or memcached to 
      // save refreshToken but it will not be included in this test. 
      user.refreshToken = refreshToken;
      await user.save();
  
      // Set the access token as a cookie
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        expires: new Date((Date.now() + 3600000)*24), // 24 hour expiration time
      });
  
      // Send the user info and access token in the response
      return res.json({
        token: accessToken,
        user: { _id: user._id, name: user.name, email: user.email, seller: user.seller },
      });
    } catch (error) {
      return res.status(401).json({
        error: 'Could not sign in',
      });
    }
  };
  
  // Sign-up controller
  export const signupHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    _: NextFunction
  ) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await UserModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({
          error: 'Email is already registered.',
        });
      }
  
      // Create a new user
      const user = new UserModel({ name, email, password });
  
      // Save the user to the database
      await user.save();
  
      // Generate access token and refresh token
      const accessToken = signJwt({ _id: user._id }, 'JWT_ACCESS_TOKEN_PRIVATE_KEY', {
        expiresIn: '24h', // Set your desired expiration time
      });
      const refreshToken = signJwt({ _id: user._id }, 'JWT_REFRESH_TOKEN_PRIVATE_KEY', {
        expiresIn: '7d', // Set your desired expiration time
      });
  
      // Store the refresh token in the user model (you'll need to implement this)
      user.refreshToken = refreshToken;
      const newUser = await user.save();
      if(newUser){
        // Set the access token as a cookie (you can also send it in the response body)
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            expires: new Date(Date.now() + 3600000), // 1 hour expiration time
        });

        // Send the user info and access token in the response
        return res.json({
            token: accessToken,
            user: { _id: user._id, name: user.name, email: user.email, seller: user.seller },
        });
      } else {
        return res.status(401).json({
            error: 'Could not sign up',
          });
      }
     
    } catch (error) {
      return res.status(401).json({
        error: 'Could not sign up',
      });
    }
  }; 
  
 export const signoutHandler = async (
    req: Request<{}, {}, UserAuthToken>,
    res: Response,
    _: NextFunction
  ) => {
    try {
      // Decode and verify the access token
      const { accessToken } = req.body;
            
      // Verify the access token and extract the user ID
      const decodedAccessToken = verifyJwt<{ _id: string }>(
            accessToken,
            'JWT_ACCESS_TOKEN_PUBLIC_KEY'
        );
        
      if (!decodedAccessToken) {
          return res.status(401).json({
            error: 'Invalid access token',
            });
      }
        

      const user = await UserModel.findById(decodedAccessToken._id);
  
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        });
      }
  
      // Revoke the refresh token by removing it from the user's record
      user.refreshToken = null; // Assuming you have a refreshToken field in your user model
      await user.save();
      return res.status(200).json({
        message: 'Signout successful',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
 