import React, { useEffect, useState } from 'react';
import { Button, Dialog, TextField, Grid } from '@mui/material'; // Import Material-UI components

import './styles.css'; // Import the CSS file
import { blue } from '@mui/material/colors';
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
  const highestBid = auction.bids?.reduce(
    (maxBid, bid) => (bid.money > maxBid ? bid.money : maxBid),
    0
  );
  return (
    <Grid item xs={2} sm={2} md={6} key={auction._id}>
       <div className={"on-auction-item"} >
        <div>{auction.itemName}</div>
          <div className={"on-auction-item"} >
            <p>Description: {auction.description}</p>
            <p>Status: {auction.status}</p>
            <p>Time Remaining: {countdown}</p>
            <p>Number of Bids: {auction.bids.length}</p>
            <p>Highest Price: {highestBid}</p>
           
          </div>
          <div>
            <Button style={{background:'blue', color:'white'}} onClick={handleJoinClick} color="primary">
              Join
            </Button>
          </div>
          <div>
              <img style={{height:95, width:190, marginTop:10}} src={auction.image} alt={auction.itemName} />
            </div>  
       </div>
      <Dialog 
        open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div style={{width:400,height:350, flexDirection:'column'}}>
          <h3>Enter Bid Amount</h3>
          <TextField
              style={{height:40}}
              type="text"
              label="Bid Amount"
              value={bidAmount || 1.0}
              onChange={(e) => {
                const input = e.target.value;
                // Use a regular expression to allow only numbers and a decimal point
                const regex = /^(\d+)?(\.\d{0,2})?$/; // Allows up to two decimal places
                if (regex.test(input)) {
                  // Input is valid, update the state 
                  setBidAmount(Number(input));
                }
                // Otherwise, do nothing (input remains unchanged)
              }}
              // onChange={(e) => setBidAmount(Number(e.target.value))}
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
