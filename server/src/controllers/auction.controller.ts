import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import AuctionModel, { Bid }  from '../models/auction.model';
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



export const addMoneyForTest = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    // Add the specified amount to the user's balance
    user.availableBalance += amount;

    // Save the updated user
    await user.save();

    return res.json({
      user: { _id: user._id, name: user.name, email: user.email, seller: user.seller,
        availableBalance: user.availableBalance ,
        lockedBalance: user.lockedBalance },
    });
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
    const decodedAccessToken = verifyJwt<{ sub: string }>(
      accessToken,
      'JWT_ACCESS_TOKEN_PUBLIC_KEY'
    );

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
    if(!auction.bids){
      auction.bids = []
    }

    // Ensure that the auction is in the 'active' status (you can add this check)
    if (auction.status !== 'published') {
      return res.status(400).json({
        error: 'Auction is not active',
      });
    }  
    if (auction.seller?.toString() == user._id.toString()) {
      return res.status(400).json({
        error: 'Your can`t join your auction events',
      });
    }
    
    // Verify if the bid amount is greater than the current highest bid (if any)
    const highestBid = auction.bids?.reduce(
      (maxBid, bid) => (bid.money > maxBid ? bid.money : maxBid),
      0
    );

    if (money <= highestBid) {
      return res.status(400).json({
        error: 'Bid amount should be higher than the current highest bid',
      });
    }

        // Find the user's previous bid in this auction
    let previousBidIndex: number = -1;

    if (auction.bids) {
      previousBidIndex = auction.bids.findIndex(
        (bid) => bid.bidder?.toString() == user._id.toString()
      );
    } 
 
    // Check if there's a previous bid
    if (previousBidIndex !== -1) {
      // Get the amount of the previous bid
      const previousBidAmount = auction.bids[previousBidIndex]?.money ||0 ;
      // Return the money from the previous bid to the user's available balance
      user.availableBalance += previousBidAmount ;
      // Remove the previous bid
      auction.bids.splice(previousBidIndex, 1);
    }
    // Deduct the bid amount from the user's available balance
    if (user.availableBalance < money) {
      return res.status(400).json({
        error: 'Insufficient balance to join the auction',
      });
    }

    // Create a new Bid instance
    const newBid = new Bid(user._id, money, new Date());


    auction.bids.push(newBid);

    // Deduct the bid amount from the user's available balance
    user.availableBalance -= money;

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


