import React, { useState } from 'react';
import './styles.css'; // Import the CSS file


interface RegisterProps {
  onRegister: (email: string, name: string, password: string, passwordConfirm: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
   
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate input fields here
    if(password === passwordConfirm ){
      onRegister(email,name, password,passwordConfirm);
    } else {

      window.alert('Password and Confirm Password do not match');
    }
    
  };

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">Register Now</button>
      </form>
    </div>
  );
};

export default Register;