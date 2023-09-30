import mongoose from 'mongoose'; 
import logger from '../middleware/logger';
const dbUrl = `mongodb://${process.env['MONGODB_USERNAME']}:${ process.env['MONGODB_PASSWORD']}@${process.env['MONGODB_IP_ADDRESS']}:${process.env['MONGO_PORT']}/${process.env['MONGODB_DATABASE_NAME']}?authSource=admin`;

let urlConnect = process.env['MONGODB_URI']? process.env['MONGODB_URI'] : dbUrl;
const connectDB = async () => {
  try {
    
    logger.info('Database connect to...' +(urlConnect));
    await mongoose.connect(urlConnect );
    logger.info('Database connected...');
  } catch (error: any) {
    logger.error(error.message);
    logger.error('Database connect error...' +(urlConnect));
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
