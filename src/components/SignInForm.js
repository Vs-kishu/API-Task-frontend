import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Implement the API call to your backend here
    // Use 'email' and 'password' state variables in the API request
    try {
      const response = await fetch('https://api-task-backend.vercel.app/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle the response from the server
      const data = await response.json();
      console.log(data)
      if(data.success) {
        localStorage.setItem('user',data.data._id)
        navigate('table')
      }

    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignInForm;
