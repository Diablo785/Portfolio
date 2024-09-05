import React from 'react';
import InfoPage from './infoPage';
import ProjectsPage from './projectsPage';
import '../styles/homePage.css';

function HomePage() {
  return (
    <div className="HomePage">
      <InfoPage />
      <ProjectsPage />
    </div>
  );
}

export default HomePage;
