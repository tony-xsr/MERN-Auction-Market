
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';
import { useAuth } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import CreateAuctionPage from './pages/CreateAuctionPage';


 
 
function App() {
  const { accessToken } = useAuth(); // Get authentication status from context

  return (
    <Router>
      <Header /> {/* Render the Header component */}
       <Routes>
        {/* Define your routes */}
        <Route path="/" element={accessToken ? <Navigate to="/home" /> : <LoginPage />} />
        <Route
          path="/home"
          element={accessToken ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-auction"
          element={accessToken ? <CreateAuctionPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!accessToken ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/register"
          element={!accessToken ? <RegisterPage /> : <Navigate to="/home" />}
        />
        {/* Add more routes as needed */}
        {/* <PrivateRoute
            path="/user"
            element={<UserPage />} // Replace with your UserPage component
            isAuthenticated={isAuthenticated}
            redirectTo="/login" // Redirect to the login page if not authenticated
          /> */}
        {/* Add more routes as needed */} 
      </Routes>
  </Router>
  );
}

export default App;
