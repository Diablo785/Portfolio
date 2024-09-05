import React, { useState, useEffect, useRef } from 'react';
import '../styles/settingsPopUp.css';
import { useNavigate } from 'react-router-dom';

function SettingsPopUp({ onClose }) {
  const navigate = useNavigate();
  const settingsPopUpRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost/Portfolio-php/getUserData.php', {
        credentials: 'include',
      });
      const data = await response.json();
      console.log('Fetch User Data Response:', data);
      if (data.success) {
        setUserData(data.data);
        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(data.data));
      } else {
        setUserData(null);
        console.error('Failed to fetch user data:', data.message);
      }
    } catch (error) {
      setUserData(null);
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log('Local Storage Username:', username);
    if (username) {
      // If username is found in local storage, fetch user data
      fetchUserData();
    } else {
      setUserData(null);
    }

    const handleOutsideClick = (event) => {
      if (settingsPopUpRef.current && !settingsPopUpRef.current.contains(event.target)) {
        handleClose();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleLogout = async () => {
    console.log('Logging out...');
    // Remove user data from local storage on logout
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('userData');
    try {
      const response = await fetch('http://localhost/Portfolio-php/logout.php');
      if (response.ok) {
        console.log('Logout successful');
        setUserData(null);  // Reset userData state
        handleClose();
        navigate('/homePage');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (settingsPopUpRef.current) {
        settingsPopUpRef.current.classList.add('slide-in');
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className='Overlay'>
      <div className={`SettingsPopUp ${isClosing ? 'slide-out' : 'slide-in'}`} ref={settingsPopUpRef}>
        <div className="user-profile-settings">
          {userData ? (
            <div>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Join Date:</strong> {userData.joinDate}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <p>No user data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPopUp;
