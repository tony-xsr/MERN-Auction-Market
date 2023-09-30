import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});
 
const config = {
  env: process.env['NODE_ENV'] || 'development',
  port: process.env['PORT'] || 3000,
  cors_origin: process.env['CORS_ORIGIN'],
  jwtSecret: process.env['JWT_SECRET'],
  mongoUri: process.env['MONGODB_URI'] ||
    process.env['MONGO_HOST'] ||
    'mongodb://' + (process.env['MONGODB_IP_ADDRESS'] || 'localhost') + ':' +
    (process.env['MONGO_PORT'] || '27017') +
    '/' + process.env['MONGODB_DATABASE_NAME'],
  stripe_connect_test_client_id: '',
  stripe_test_secret_key: '',
  stripe_test_api_key: '' 
}


export default config;
