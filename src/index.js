import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import reportWebVitals from './reportWebVitals';
import HomePage from './components/homePage';
import InfoPage from './components/infoPage';
import ProjectsPage from './components/projectsPage';
import MailPage from './components/mailPage';
import Login from './components/login';
import Register from './components/register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/infoPage" element={<InfoPage />} />
        <Route path="/projectsPage" element={<ProjectsPage />} />
        <Route path="/mailPage" element={<MailPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
