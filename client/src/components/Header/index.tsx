import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the CSS file
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { accessToken, logout } = useAuth(); // Get authentication status from context
  
  return accessToken ? (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-auction">Create Auction</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  ): <></>;
};

export default Header;
