import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import AboutIcon from '../images/About-White.png';
import HomeIcon from '../images/Home-White.png';
import SettingsIcon from '../images/Settings-White.png';
import MailIcon from '../images/Mail-White.png';
import ProjectsIcon from '../images/Projects-White.png';
import SettingsPopUp from './settingsPopUp';


function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const handleMailClick = () => {
    const username = localStorage.getItem('username');
    if (username) {
      setActive('/mailPage');
      navigate('/mailPage');
    } else {
      setActive('/login');
      navigate('/login');
    }
  };

  return (
    <div className="HeaderCont">
      <div className="Header">
        <NavLink to="/infoPage" onClick={() => setActive('/infoPage')}>
          <div className="IconWrapper">
            <img src={AboutIcon} alt="About" className={`Icon ${active === '/infoPage' ? 'active' : ''}`} />
            <div className={`underline ${active === '/infoPage' ? 'active' : ''}`}></div>
          </div>
        </NavLink>
        <NavLink to="/projectsPage" onClick={() => setActive('/projectsPage')}>
          <div className="IconWrapper">
            <img src={ProjectsIcon} alt="Projects" className={`Icon ${active === '/projectsPage' ? 'active' : ''}`} />
            <div className={`underline ${active === '/projectsPage' ? 'active' : ''}`}></div>
          </div>
        </NavLink>
        <NavLink to="/homePage" onClick={() => setActive('/homePage')}>
          <div className="IconWrapper">
            <img src={HomeIcon} alt="Home" className={`Icon ${active === '/homePage' ? 'active' : ''}`} />
            <div className={`underline ${active === '/homePage' ? 'active' : ''}`}></div>
          </div>
        </NavLink>
        <div className="IconWrapper" onClick={handleMailClick}>
          <img src={MailIcon} alt="MailPage" className={`Icon ${active === '/mailPage' ? 'active' : ''}`} />
          <div className={`underline ${active === '/mailPage' ? 'active' : ''}`}></div>
        </div>
        <div className="IconWrapper" onClick={() => setShowSettings(true)}>
          <img src={SettingsIcon} alt="Settings" className={`Icon ${showSettings ? 'active' : ''}`} />
          <div className={`underline ${showSettings ? 'active' : ''}`}></div>
        </div>
      </div>
      {showSettings && <SettingsPopUp onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default Header;
