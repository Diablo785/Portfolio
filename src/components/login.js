import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: '583476623990-d768nlii3i2hslvj7qlqpe6n6p71a8bi.apps.googleusercontent.com',
        callback: handleGoogleLogin,
      });

      google.accounts.id.renderButton(
        document.getElementById('google-login-button'),
        { theme: 'outline', size: 'large' }
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = async (response) => {
    try {
        const userObject = jwtDecode(response.credential);
        const { email, name } = userObject;

        console.log('Google Token:', response.credential);
        console.log('Sending token to server:', response.credential);

        const serverResponse = await fetch('http://localhost/Portfolio-php/googleLogin.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.credential }),
        });

        const responseText = await serverResponse.text();
        console.log('Server Response:', responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (error) {
            console.error('Error parsing JSON:', error, responseText);
            throw new Error('Server response is not valid JSON');
        }

        if (data.success) {
            localStorage.setItem('username', email);
            localStorage.setItem('id', data.id);
            setSuccessMessage(data.message);
            setError('');
            setTimeout(() => {
                navigate('/mailPage');
            }, 2000);
        } else {
            setError(data.message);
            setSuccessMessage('');
        }
    } catch (error) {
        console.error('Error during Google login:', error);
        setError('Google login failed');
        setSuccessMessage('');
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username && !password) {
      setError('Username and Password are required.');
      setSuccessMessage('');
      return;
    }

    if (!username) {
      setError('Username is required.');
      setSuccessMessage('');
      return;
    }

    if (!password) {
      setError('Password is required.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost/Portfolio-php/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username and password as JSON
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setError('');
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data.id);
        setTimeout(() => {
          navigate('/mailPage');
        }, 2000);
      } else {
        setError(data.message);
        setSuccessMessage('');
      }

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="loginFormGroup">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="loginFormGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="messageCont">
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="signup-text">
        Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span>!
      </p>
      <div id="google-login-button"></div>
    </div>
  );
}

export default Login;