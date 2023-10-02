import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import Register from '../components/Register'; // Import the Login component
import { useUser } from '../context/UserContext'; // Import the useUser hook
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const apiUrl = process.env.REACT_APP_SERVER_API;
  const navigate = useNavigate(); // Get the navigate function for navigation
  const { setUserAndToken } = useUser(); // Get setUserAndToken function from context
  
  const { login } = useAuth();
  // Define the handleLogin function
  const handleRegister = async (email: string, name: string, password: string, passwordConfirm: string) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        email,
        password,
        passwordConfirm,
        name
      });
      console.log('response.data',response.data);
      const { token, user } = response.data;
      if(token && user) {
         
        // Save tokens (access and refresh) in localStorage or a state management solution like Redux
        login({ accessToken: token.accessToken, refreshToken: token.refreshToken })
        // Save user and token data to context
        setUserAndToken(user, token);
        // Redirect to the home page or wherever you want
        // You can use React Router for navigation
        navigate('/home'); // Redirect to the home page

      } else {
        
        window.alert('Could not sign up. Please check your email and password.');
      }
     
    } catch (error: any) {
       // Handle errors here
        if (error.response && error.response.status === 401) {
            console.error('Could not sign up');
            // Display an alert message to the user
            window.alert('Could not sign up. Please check your email and password.');
        } else {
            // console.error('An error occurred:', error);
            window.alert(error.response.data.error);
        }
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <h1>Welcome to the Register Page</h1>
      {/* Render the Login component and pass the handleLogin function as a prop */}
      <Register onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
