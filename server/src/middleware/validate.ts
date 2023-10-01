import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      // No validation errors, so continue processing the request
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          error: err.errors,
        });
      }
      // Handle other errors by passing them to the next middleware/handler
      return next(err);
    }
  };