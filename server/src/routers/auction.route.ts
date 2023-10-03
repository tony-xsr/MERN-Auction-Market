import express from 'express';
import { createAuctionHandler, getAllUserAuction,changeAuctionHandler, getAllPublishAuction, joinAuctionHandle,addMoneyForTest } from '../controllers/auction.controller';


const auctionRouter = express.Router();
auctionRouter.post('/create', createAuctionHandler);
auctionRouter.post('/myAuctions', getAllUserAuction);
auctionRouter.post('/update', changeAuctionHandler);
auctionRouter.post('/joinAuction', joinAuctionHandle);
auctionRouter.get('/getAllAuction', getAllPublishAuction);
if( process.env['NODE_ENV'] == "development") {
    auctionRouter.post('/addmoney', addMoneyForTest);
}



export default auctionRouter;
