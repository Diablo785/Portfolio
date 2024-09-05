import React from 'react';
import MemoryGameImage from '../images/MemoryGameImage.png';
import EventImage from '../images/EventImage.png';
import ToDoImage from '../images/To-DoImage.png';
import '../styles/projectsPage.css';

function ProjectsPage() {
  const projects = [
    {
      title: "Event Website (unfinished)",
      description: "A website made to purchase tickets for events",
      imageUrl: EventImage,
      githubLink: "https://github.com/Diablo785/Bilesu-shit"
    },
    {
      title: "Memory Game",
      description: "A website game to test your memory",
      imageUrl: MemoryGameImage,
      githubLink: "https://github.com/Diablo785/MemoryGame"
    },
    {
      title: "To-Do Website",
      description: "A website to schedule your time",
      imageUrl: ToDoImage,
      githubLink: "https://github.com/regucis1v9/jira_grupa"
    }
  ];

  const handleProjectClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="ProjectsPage">
      <header className="projectsPageHeader">
        <h1>My Projects</h1>
      </header>
      <div className="projectsPageList">
        {projects.map((project, index) => (
          <div className="projectsPageCard" key={index}>
            <div className="cardOverlay"></div>
            <img src={project.imageUrl} alt={project.title} className="projectsPageImage" />
            <div className="projectsPageInfo">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <button onClick={() => handleProjectClick(project.githubLink)} className="githubLinkButton">
                Open GitHub
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
