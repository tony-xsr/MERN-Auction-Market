import React, { useEffect, useState } from 'react';
import './styles.css'; // Import the CSS file

// Specify the type of the 'auction' prop
interface AuctionItemProps {
    auction: {
      _id: string;
      itemName: string;
      description: string;
      status: string;
      bidEnd: string; // The bidEnd timestamp as a string
      bids: any[]; // You can specify the type for bids as needed
    };
    updateAuctionStatus: (auctionId: string, newStatus: string, auctionName: string) => void; // Function to update auction status
  }
  
  const AuctionItem: React.FC<AuctionItemProps> = ({ auction, updateAuctionStatus }) => {
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
      <div className="auction-item">
        <h3>{auction.itemName}</h3>
        <p>Description: {auction.description}</p>
        <p>Status: {auction.status}</p>
        <p>Time Remaining: {countdown}</p>
        <p>Number of Bids: {auction.bids.length}</p>
        {auction.status === 'draft' ? (
            <button
            onClick={() => updateAuctionStatus(auction._id, 'published', auction.itemName)}
            className="status-button"
            >
            Publish Now
            </button>
        ) : (
            <button
            onClick={() => updateAuctionStatus(auction._id, 'draft', auction.itemName)}
            className="status-button"
            >
            Draft
            </button>
        )}
      </div>
    );
  };
  
  export default AuctionItem;