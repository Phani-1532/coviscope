import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    const result = await signup(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="title">Enter the Future</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="futuristic-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="futuristic-input"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="futuristic-button">Sign Up</button>
        </form>
        <div className="social-login">
          <button className="social-button google" onClick={() => googleLogin().then(() => navigate('/dashboard'))}>
            <FcGoogle style={{ marginRight: '8px' }} /> Continue with Google
          </button>
          
        </div>
        <p className="link-text">
          Already synced? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
