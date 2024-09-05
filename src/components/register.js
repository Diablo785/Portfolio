import React, { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password || !verifyPassword) {
      setError('All fields are required.');
      setSuccessMessage('');
      return;
    }
  
    if (username.length < 6) {
      setError('Username must be at least 6 characters long.');
      setSuccessMessage('');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address.');
      setSuccessMessage('');
      return;
    }
  
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccessMessage('');
      return;
    }
  
    if (password !== verifyPassword) {
      setError('Password and Verify Password must match.');
      setSuccessMessage('');
      return;
    }
  
    try {
      const response = await fetch('http://localhost/Portfolio-php/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password, email }),
      });
  
      const textResponse = await response.text();
  
      try {
        const data = JSON.parse(textResponse);
        if (data.success) {
          setSuccessMessage('Registration successful, redirecting you back!');
          setError('');
  
          const loginResponse = await fetch('http://localhost/Portfolio-php/login.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
          });
  
          const loginData = await loginResponse.json();
  
          if (loginData.success) {
            localStorage.setItem('username', loginData.username);
            localStorage.setItem('id', loginData.id);
            setTimeout(() => {
                navigate('/mailPage');
              }, 2000);
          } else {
            setError(loginData.message);
            setSuccessMessage('');
          }
        } else {
          setError(data.message);
          setSuccessMessage('');
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="registerContainer">
      <h2>Register</h2>
      <form className="registerForm" onSubmit={handleRegistration}>
        <div className="registerFormGroup">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="registerFormGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="registerFormGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="registerFormGroup">
          <label htmlFor="verifyPassword">Verify Password:</label>
          <input
            type="password"
            id="verifyPassword"
            name="verifyPassword"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </div>
        <div className="messageCont">
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      <p className="signin-text">Already have an account? <span onClick={() => navigate('/login')}>Sign In</span>!</p>
    </div>
  );
}

export default Register;
