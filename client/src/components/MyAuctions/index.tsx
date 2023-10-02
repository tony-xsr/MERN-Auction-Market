import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AuctionItem from "../AuctionItem";
import './styles.css'; // Import the CSS file

const MyAuctions = () => {
    const apiUrl = process.env.REACT_APP_SERVER_API;
    const { accessToken } = useAuth(); // Get authentication status from context
    const [auctions, setAuctions] = useState([]);
     // Define a function to fetch the user's auctions
    const fetchAuctions = async () => {
            try {
              const response = await axios.post(`${apiUrl}/auction/myauctions`, {
                accessToken,
              });
              console.log('setAuctions', JSON.stringify(response))
              setAuctions(response.data.auctions);
            } catch (error) {
              console.error('Error fetching auctions:', error);
            }
          };
    useEffect(() => {
  
      // Call the fetchAuctions function when the component mounts
      fetchAuctions();
    }, [accessToken]);
    const updateAuctionStatus = async (auctionId: string, newStatus : string, auctionName: string) => {
        try {
          // Prepare the request data
          const requestData = {
            auctionId,
            status: newStatus,
            accessToken
          };
          
          // Send a PUT request to update the auction status
          const response: any = await fetch(`${apiUrl}/auction/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
          console.log('response',JSON.stringify(response))
          if (response && !response.message) {

            window.alert(`Updated ${auctionName} to ${newStatus} success`);
            fetchAuctions()
          } else {
            // Handle errors (e.g., show an error message)
            console.error('Failed to update auction status');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    return (
      <div  className="auction-container">
        <h2>My Auctions</h2>  
        <div className="my-auctions">
            { auctions && auctions.length>0 ? <div  className="auction-list">
                { [...auctions].reverse().map((auction: any) => (
                  <AuctionItem key={auction._id} auction={auction} updateAuctionStatus={updateAuctionStatus}/> 
                ))}
            </div> : <div>No Auction Found</div>
         }
        </div>
      </div>
    );
  };
  
  export default MyAuctions;