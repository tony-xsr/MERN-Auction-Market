import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import AuctionModel  from '../models/auction.model';
import { verifyJwt } from '../utils/jwt';

 
export const createAuctionHandler = async (
  req: Request<{}, {}>,
  res: Response
) => {
  try {

    const { itemName, description, image, startingBid, status,accessToken } = req.body;
    // Verify the access token and extract the user ID
    const decodedAccessToken = verifyJwt<{ sub: string }>(accessToken, 'JWT_ACCESS_TOKEN_PUBLIC_KEY');

    if (!decodedAccessToken) {
      return res.status(401).json({
        error: 'Invalid access token',
      });
    }

    const sellerId = decodedAccessToken.sub; // Get the user ID from the access token

    // Create a new auction
    const auction = new AuctionModel({
      itemName,
      description,
      image,
      startingBid,
      seller: sellerId, // Assign the seller's ID to the auction
      status, // Set the status based on your requirements
    });

    // Save the auction to the database
    await auction.save();

    //I wish i could use foreignField for 
    //the user's createdAuctions array will contain a reference to the newly 
    //created auction . But i got bugs , so wi decided to not using on this demo
    //@prop({ ref: () => AuctionModel, foreignField: 'seller' })
    // Update the user's createdAuctions field
    const user = await UserModel.findById(sellerId);
    if (user) {
      if(!user.createdAuctions){
        user.createdAuctions = [auction._id]
      }else {
        user.createdAuctions?.push(auction._id); // Add the auction ID to the user's createdAuctions array
        await user.save();
      }
    }
    // Return a success response
    return res.status(201).json({
      message: 'Auction created successfully',
      auction,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};


export const getAllPublishAuction = async (
  _: Request<{}, {}>,
  res: Response
) => {
  try {
      // Get the current timestamp
      const currentTime = new Date();
      // Find all published auctions where the current time is within the bidStart and bidEnd range
      const auctions = await AuctionModel.find({
        status: 'published',
        bidStart: { $lte: currentTime },
        bidEnd: { $gte: currentTime },
      }); 
    return res.status(200).json({ auctions });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getAllUserAuction = async (
  req: Request<{}, {}>,
  res: Response
) => {
  try {
   
    const { accessToken } = req.body;
    // Verify the access token and extract the user ID
    const decodedAccessToken = verifyJwt<{ sub: string }>(accessToken, 'JWT_ACCESS_TOKEN_PUBLIC_KEY');

    if (!decodedAccessToken) {
      return res.status(401).json({
        error: 'Invalid access token',
      });
    }

    const userId = decodedAccessToken.sub; // Get the user ID from the access token

    // Find all auctions where the seller ID matches the specified user ID
    const auctions = await AuctionModel.find({ seller: userId });
    return res.status(200).json({ auctions });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const joinAuctionHandle = async (
  req: Request<{}, {}>,
  res: Response
) => {
  try {
   
    const { accessToken, auctionId, money } = req.body;
    // Verify the access token and extract the user ID
    const decodedAccessToken = verifyJwt<{ sub: string }>(accessToken, 'JWT_ACCESS_TOKEN_PUBLIC_KEY');

    if (!decodedAccessToken) {
      return res.status(401).json({
        error: 'Invalid access token',
      });
    }

    const userId = decodedAccessToken.sub;
    
      // Check if the user has sufficient balance to join the auction
      const user = await UserModel.findById(userId);
      const auction = await AuctionModel.findById(auctionId);
  
      if (!user || !auction) {
        return res.status(404).json({
          error: 'User or auction not found',
        });
      }
  
      const bidAmount = 100; // Change this to the actual bid amount
  
      if (user.availableBalance < bidAmount) {
        return res.status(400).json({
          error: 'Insufficient balance to join the auction',
        });
      }
  
      // Add the user to the currentBid array of the auction
      // auction.bid.push(userId);

      if( user.currentBid){
        user.currentBid?.push(auction._id);
      } else {
        user.currentBid = [auction._id];
      }
  
      // Deduct the bid amount from the user's available balance
      user.availableBalance -= bidAmount;
  
      // Save the updated user and auction documents
      await user.save();
      await auction.save();
  
      return res.status(200).json({
        message: 'Joined the auction successfully',
      });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getAuctionUserHasJoined = async (
  req: Request<{}, {}>,
  res: Response
) => {
  try {
   
    const { accessToken } = req.body;
    // Verify the access token and extract the user ID
    const decodedAccessToken = verifyJwt<{ sub: string }>(accessToken, 'JWT_ACCESS_TOKEN_PUBLIC_KEY');

    if (!decodedAccessToken) {
      return res.status(401).json({
        error: 'Invalid access token',
      });
    }

    const userId = decodedAccessToken.sub; // Get the user ID from the access token

    // Find all auctions where the user's ID is in the currentBid array
    const auctions = await AuctionModel.find({ currentBid: userId });
    return res.status(200).json({ auctions });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};




export const changeAuctionHandler = async (
  req: Request<{}, {}>,
  res: Response
) => {
  try {
   
    const {auctionId, status,accessToken } = req.body;
    // Verify the access token and extract the user ID
    const decodedAccessToken = verifyJwt<{ sub: string }>(accessToken, 'JWT_ACCESS_TOKEN_PUBLIC_KEY');

    if (!decodedAccessToken) {
      return res.status(401).json({
        error: 'Invalid access token',
      });
    }
    // Find the auction by ID
    const auction = await AuctionModel.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    } else if (status === auction.status ) {
     return res.status(200).json({ message: 'Auction status updated successfully' });
    }
   
    // Update the auction's status
    auction.status = status;
    await auction.save();

    return res.status(200).json({ message: 'Auction status updated successfully' });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};


