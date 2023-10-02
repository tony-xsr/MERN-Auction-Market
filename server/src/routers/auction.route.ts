import express from 'express';
import { createAuctionHandler, getAllUserAuction,changeAuctionHandler, getAllPublishAuction } from '../controllers/auction.controller';


const auctionRouter = express.Router();
 
auctionRouter.post('/create', createAuctionHandler);
auctionRouter.post('/myAuctions', getAllUserAuction);
auctionRouter.post('/update', changeAuctionHandler);
auctionRouter.get('/getAllAuction', getAllPublishAuction);

export default auctionRouter;
