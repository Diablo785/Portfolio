import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import '../styles/infoPage.css';
import Modal from './modal';

function InfoPage() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const createChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      const isMobile = window.innerWidth <= 600;

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['React Native', 'React', 'Google Oauth, Google Maps API', 'Stripe Payment', 'phpMyAdmin', 'css', 'php'],
          datasets: [{
            label: 'Experience',
            data: [4, 5, 4, 4, 5, 4, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Technology Experience',
              color: '#bb86fc',
              font: {
                size: 20
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#e0e0e0'
              }
            },
            x: {
              ticks: {
                color: '#e0e0e0',
                maxRotation: isMobile ? 0 : 0, // Vertical on mobile, diagonal on desktop
                minRotation: isMobile ? 0 : 0,
                callback: function(value) {
                  // Ensure value is always a string
                  value = value.toString();
                  const maxLength = 12; // Maximum characters per line
                  const words = value.split(' ');
                  let result = [];
                  let line = '';
                  words.forEach((word) => {
                    if (line.length + word.length + 1 > maxLength) {
                      result.push(line);
                      line = '';
                    }
                    line += (line.length ? ' ' : '') + word;
                  });
                  result.push(line);
                  return result.join('\n');
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    };

    createChart();
    window.addEventListener('resize', createChart);

    return () => {
      window.removeEventListener('resize', createChart);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const workExperiences = [
    { 
      title: 'Software Developer', 
      description: 'Developed and maintained scalable web applications using React.js and Node.js. Designed and implemented user interfaces, databases, and RESTful APIs. Collaborated with cross-functional teams to analyze requirements and deliver high-quality software solutions within project timelines.', 
    },
    { 
      title: 'Frontend Engineer', 
      description: 'Designed and developed responsive user interfaces for various web applications. Implemented modern frontend frameworks and libraries to enhance user experience. Worked closely with designers and backend developers to integrate UI elements with backend services.', 
    },
    { 
      title: 'Full Stack Developer', 
      description: 'Responsible for end-to-end development of web applications, from frontend UI design to backend database management. Utilized a combination of frontend and backend technologies to create robust and efficient software solutions. Conducted code reviews and performance optimization to ensure high code quality and performance.', 
    },
  ];

  const reviews = [
    { 
      title: 'Excellent Service', 
      description: 'Imants provided excellent service and delivered exactly what I needed. Highly recommend!'
    },
    { 
      title: 'Great Developer', 
      description: 'Imants is a great developer to work with. Very knowledgeable and professional.'
    },
    { 
      title: 'Responsive and Efficient', 
      description: 'Imants was responsive and efficient in completing the project. Would work with him again.'
    },
  ];

  const handleWorkExperienceClick = (workExperience) => {
    setSelectedWorkExperience(workExperience);
    setIsModalOpen(true);
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkExperience(null);
    setSelectedReview(null);
  };

  return (
    <div className="InfoPage">
      <header className="infoPageHeader">
        <h1>Imants Kaluga</h1>
        <p>Hello, I'm an 18-year-old programmer studying at Vidzemes Technology and Design Vocational School</p>
      </header>
      <section className="infoPageAbout">
        <h2>About Me</h2>
        <p>Currently studying in Vidzemes Technology and Design Vocational School, graduated from Strautiņu Elementary School and currently living in Latvia, Alūksne</p>
      </section>
      <section className="infoPageContact">
        <h2>Contact Information</h2>
        <ul>
          <li>Email: ipa21.i.kaluga@vtdt.edu.lv</li>
          <li>Phone: (+371) 26569956</li>
          <li>GitHub: <a href="https://github.com/Diablo785" target="_blank" rel="noopener noreferrer">https://github.com/Diablo785</a></li>
        </ul>
      </section>
      <section className="infoPageExperience">
        <h2>Experience in:</h2>
        <canvas ref={chartContainer} style={{ width: '100%', maxHeight: '300px' }}></canvas>
      </section>
      <section className="infoPageProjects">
        <h2>Projects</h2>
        <p>These are some of the projects that I have worked on in a group or by myself</p>
        <ul>
          <li>Project 1 - <a href="https://github.com/Diablo785/speeliite" target="_blank" rel="noopener noreferrer">React Native Game</a></li>
          <li>Project 2 - <a href="https://github.com/Diablo785/Bilesu-shit" target="_blank" rel="noopener noreferrer">Event Website (unfinished)</a></li>
          <li>Project 3 - <a href="https://github.com/Diablo785/MemoryGame" target="_blank" rel="noopener noreferrer">Memory Game</a></li>
          <li>Project 4 - <a href="https://github.com/KeucaLV/noliktava" target="_blank" rel="noopener noreferrer">Storage Unit Website</a></li>
          <li>Project 5 - <a href="https://github.com/regucis1v9/library" target="_blank" rel="noopener noreferrer">Library Website</a></li>
          <li>Project 6 - <a href="https://github.com/regucis1v9/jira_grupa" target="_blank" rel="noopener noreferrer">To-Do Website</a></li>
        </ul>
      </section>
      <section className="workExperience">
        <div className="workExperienceContent">
          <h2>Work Experience:</h2>
          {workExperiences.map((workExperience, index) => (
            <div
              className="workExperienceItem"
              key={index}
              onClick={() => handleWorkExperienceClick(workExperience)}
            >
              <h3>{workExperience.title}</h3>
              <p>{workExperience.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="reviews">
        <div className="reviewsContent">
          <h2>Reviews:</h2>
          {reviews.map((review, index) => (
            <div 
              className="reviewItem" 
              key={index} 
              onClick={() => handleReviewClick(review)}
            >
              <h3>{review.title}</h3>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={(selectedWorkExperience && selectedWorkExperience.title) || (selectedReview && selectedReview.title) || ''}
        description={(selectedWorkExperience && selectedWorkExperience.description) || (selectedReview && selectedReview.description) || ''}
      />
    </div>
  );
}

export default InfoPage;
