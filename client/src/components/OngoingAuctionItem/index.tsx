import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material'; // Import Material-UI components

import './styles.css'; // Import the CSS file
// Specify the type of the 'auction' prop
interface AuctionItemProps {
  auction: {
    _id: string;
    itemName: string;
    description: string;
    seller: string;
    image: string;
    status: string;
    bidEnd: string; // The bidEnd timestamp as a string
    bids: any[]; // You can specify the type for bids as needed
  };
  joinAuction: (auctionId: string, bidAmount: number) => void; // Function to update auction status
}

const OngoingAuctionItem: React.FC<AuctionItemProps> = ({ auction, joinAuction }) => {
  // Calculate the time remaining until the auction ends
  const bidEndTimestamp = new Date(auction.bidEnd).getTime();
  const currentTime = new Date().getTime();
  const timeRemaining = bidEndTimestamp - currentTime;

  // Convert the time remaining to hours or minutes
  const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutesRemaining = Math.floor(
    (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
  );

  // State to update the countdown timer
  const [countdown, setCountdown] = useState(`${hoursRemaining}h ${minutesRemaining}m`);

  // State to manage the bid amount input
  const [bidAmount, setBidAmount] = useState<number | undefined>(0);

  // State to manage the dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to handle the "Join" button click
  const handleJoinClick = () => {
    setIsDialogOpen(true);
  };

  // Function to handle the bid submission
  const handleBidSubmit = () => {
    if (bidAmount !== undefined && bidAmount >= 0) {
      joinAuction(auction._id, bidAmount);
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    // Update the countdown timer every second
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        // Recalculate the time remaining
        const updatedTimeRemaining = bidEndTimestamp - new Date().getTime();
        const updatedHoursRemaining = Math.floor(
          updatedTimeRemaining / (60 * 60 * 1000)
        );
        const updatedMinutesRemaining = Math.floor(
          (updatedTimeRemaining % (60 * 60 * 1000)) / (60 * 1000)
        );

        // Update the countdown timer
        setCountdown(`${updatedHoursRemaining}h ${updatedMinutesRemaining}m`);
      } else {
        // Auction has ended, you can handle this case as needed
        setCountdown('Auction ended');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [bidEndTimestamp]);

  return (
    <Grid item xs={2} sm={4} md={4} key={auction._id}>
       <div className={"on-auction-item"} >
        <div>{auction.itemName}</div>
          <div className={"on-auction-item"} >
            <p>Description: {auction.description}</p>
            <p>Status: {auction.status}</p>
            <p>Time Remaining: {countdown}</p>
            <p>Number of Bids: {auction.bids.length}</p>
          </div>
          <div>
            <Button onClick={handleJoinClick} color="primary">
              Join
            </Button>
          </div>
       </div>
      <Dialog 
        open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div style={{width:400,height:350, flexDirection:'column'}}>
          <h3>Enter Bid Amount</h3>
          <TextField
              style={{height:40}}
              type="number"
              label="Bid Amount"
              value={bidAmount || 0}
              onChange={(e) => setBidAmount(Number(e.target.value))}
            />
          <div>
            <Button onClick={handleBidSubmit} color="primary">
              Submit Bid
            </Button>
            <Button onClick={() => setIsDialogOpen(false)} color="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </Grid>
  );
};

export default OngoingAuctionItem;
