import { useEffect, useState } from "react";
import axios from "axios";
import './styles.css'; 
import OngoingAuctionItem from "../OngoingAuctionItem";
import { useUser } from "../../context/UserContext";
import Grid from '@mui/material/Grid';
import { useAuth } from "../../context/AuthContext";


const AuctionFeed = () => {
    const apiUrl = process.env.REACT_APP_SERVER_API;
    const { accessToken } = useAuth();
    const {user} = useUser();
    const [auctions, setAuctions] = useState([]);
     // Define a function to fetch the user's auctions
    const fetchOnGoingAuctions = async () => {
            try {
              const response = await axios.get(`${apiUrl}/auction/getAllAuction`);
              console.log('setAuctions', JSON.stringify(response))
              if(response && response.data && response.data.auctions){
                const filteredAuctions = response.data.auctions.filter((auction: any) => auction !== user?._id);
                setAuctions(filteredAuctions);
              }
            } catch (error) {
              console.error('Error fetching auctions:', error);
            }
          };
    useEffect(() => {
      // Call the fetchAuctions function when the component mounts
      fetchOnGoingAuctions();
    }, [apiUrl]);

    const joinAuction = async (auctionId: string, bidAmount : number) => {
      try {
        const response = await axios.post(
          `${apiUrl}/auction/joinAuction`,
          {
            accessToken,
            money: bidAmount,
            auctionId,
          }
        );
    
        if (response.status === 200) {
          window.alert("Joined the auction successfully"); 
          // You can perform any further actions here upon successful join
        } else {
          window.alert(response.data.error); 
        }
      } catch (error: any) {
        window.alert(error.response?.data?.error);
        // Handle the error appropriately
      }
      };
    return (
      <div  className="auction-container">
        <h2>Ongoing Auctions</h2>  
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        { auctions && auctions.length>0 ?   
               [...auctions].reverse().map((auction: any, index) => ( 
                     <OngoingAuctionItem auction={auction} key={auction._id} joinAuction={joinAuction}/> 
                ) ) : <div>No Auction Found</div>
         }
       
        </Grid>
 
      </div>
    );
  };
  
  export default AuctionFeed;