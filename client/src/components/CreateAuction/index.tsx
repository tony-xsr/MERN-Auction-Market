import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateAuction = () => {

  const navigate = useNavigate(); // Get the navigate function for navigation
  const { accessToken } = useAuth(); // Get authentication status from context
  const apiUrl = process.env.REACT_APP_SERVER_API;
  const [auctionDetails, setAuctionDetails] = useState({
    itemName: '',
    description: '',
    image: '',
    startingBid: 0,
    status: 'draft', // Default status is draft
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAuctionDetails({ ...auctionDetails, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
        if(auctionDetails.itemName.length<3 || auctionDetails.description.length < 2 || auctionDetails.image.length <10 ){
         window.alert('Fill all information before create auction');
         return;
        }
        // Make an API request to create the auction with the current state
        const response = await axios.post(`${apiUrl}/auction/create`, {
            ...auctionDetails,
            accessToken 
        });
        console.log(response.data);
        if(response.data && response.data.auction && response.data.auction._id) {
            
          navigate('/home'); // Redirect to the home page
          window.alert('Create Success');
        }
      // window.alert('Could not sign in. Please check your email and password.');
      // Reset the form or redirect to another page
      // You can add your logic here based on the API response
    } catch (error) {
      window.alert('Error creating auction');
    }
  };

  return (
    <div className="create-auction-container">
    <h2>Create Auction</h2>
    <div className="create-auction-form">
        <form onSubmit={handleSubmit}>
            <label>
            Item Name:
            <input
                type="text"
                name="itemName"
                value={auctionDetails.itemName}
                onChange={handleChange}
            />
            </label>
            <label>
            Description:
            <input
                type="text"
                name="description"
                value={auctionDetails.description}
                onChange={handleChange}
            />
            </label>
            <label>
            Image URL:
            <input
                type="text"
                name="image"
                value={auctionDetails.image}
                onChange={handleChange}
            />
            </label>
            <label>
            Starting Bid:
            <input
                type="number"
                name="startingBid"
                value={auctionDetails.startingBid}
                onChange={handleChange}
            />
            </label>
            <div>
            <button type="submit" onClick={() => setAuctionDetails({ ...auctionDetails, status: 'draft' })}>
                Draft
            </button>
            <button type="submit" onClick={() => setAuctionDetails({ ...auctionDetails, status: 'published' })}>
                Publish
            </button>
            </div>
        </form>
        </div></div>
  );
};

export default CreateAuction;
