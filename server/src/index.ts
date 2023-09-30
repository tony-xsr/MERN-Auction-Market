import app from './app';
import config from './config/config';
import logger from './middleware/logger';
import connectDB from './utils/connectDB';

const server = app.listen(config.port, () => {
  logger.log('info', `Server is running on Port: ${config.port}`);

  //Call the connectDB
  connectDB();
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server.');
  server.close((err) => {
    logger.info('Http server closed.');
    process.exit(err ? 1 : 0);
  });
});
