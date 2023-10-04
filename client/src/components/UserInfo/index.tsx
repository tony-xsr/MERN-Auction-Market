import './styles.css'; // Import the CSS file 
import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';

const UserInfo = () => {
  const apiUrl = process.env.REACT_APP_SERVER_API;
  const { user , setUserInfo} = useUser();
  const [amount, setAmount] = useState(0);
  const handleDeposit = async () => {
    try {
      // Make a POST request to deposit money
      const response : any = await axios.post(`${apiUrl}/auction/addmoney`, {
        userId: user?._id,
        amount
      });

      if (response.status === 200) { 
         console.log('response data',response.data);
         const {  user } = response.data;
         setUserInfo(user);
      } else {
        // Handle error here, show a message or perform other actions
        console.error('Money deposit failed');
      }
    } catch (error) {
      console.error('Money deposit error:', error);
    }
  };
  return user ? (
    <div className={'user-container'}>
      <h2>User Information</h2>
      <p>Name : {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Available Balance : {parseFloat(user.availableBalance.toString()).toFixed(2)}</p>
      <p>Locked Balance : { parseFloat(user.lockedBalance.toString()).toFixed(2)}</p>
        {/* Input field for the deposit amount */}
      <TextField
          style={{height:20, marginTop:40, padding:5}}
          type="text"
          placeholder="Deposit Amount"
          value={amount || 1.0}
          onChange={(e) => {
          const input = e.target.value;
           // Use a regular expression to allow only numbers and a decimal point
          const regex = /^(\d+)?(\.\d{0,2})?$/; // Allows up to two decimal places
          if (regex.test(input)) {
                  // Input is valid, update the state 
             setAmount(Number(input));
           }
                // Otherwise, do nothing (input remains unchanged)
           }}
              // onChange={(e) => setBidAmount(Number(e.target.value))}
            />
      {/* Button to trigger the deposit */}
      <button style={{marginTop:30}} onClick={handleDeposit}>Deposit</button>
    </div>
  ): <></>;
};

export default UserInfo;
