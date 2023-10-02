
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import { useUser } from './context/UserContext';
import './App.css';


 
 
function App() {
  const { user } = useUser(); // Get authentication status from context

  return (
    <Router>
    <Routes>
      {/* Define your routes */}
      <Route path="/" element={user? <Home/> : <LoginPage />} />
      <Route path="/login" element={<LoginPage/>} />

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
