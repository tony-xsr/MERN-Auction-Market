import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import compressFilter from './utils/compressFilter.util';
import config from './config/config';
import logger from './middleware/logger';
import authRouter from './routers/auth.route';
import auctionRouter from './routers/auction.route';

const app: Express = express();

// 1. Body Parser
app.use(express.json({ limit: '9kb' }));

app.use(
  cors({
    // origin is given a array if we want to have multiple origins later
    origin: [config.cors_origin],
    credentials: true,
  })
);

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// Compression is used to reduce the size of the response body
app.use(compression({ filter: compressFilter }));

app.use(express.static('public'))

app.use('/api/auth', authRouter);
app.use('/api/auction', auctionRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello From Server!');
});


// UnKnown Routes
app.all('*', (req: Request, _: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  logger.error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, _: Request, res: Response, _next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
   
  logger.error(`Error Handler ${err.statusCode}`);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;