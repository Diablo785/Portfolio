import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../styles/mailPage.css';

function MailPage() {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost/Portfolio-php/getUserData.php', {
          method: 'GET',
          credentials: 'include'
        });

        const data = await response.json();
        if (data.success) {
          setUserEmail(data.data.email);
          setUsername(data.data.username);
        } else {
          console.error('Failed to fetch user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const serviceID = 'service_3eitdrh';
    const templateID = 'template_42w1qpw';
    const userID = 'HAjYlBFbglzGpe2GI';
  
    const templateParams = {
      subject: formData.subject,
      message: formData.message,
      user_email: userEmail,
      from_name: username,
      to_name: 'Imants Kaluga' // Adjust as needed
    };
  
    console.log('Sending email with params:', templateParams);
  
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('SUCCESS');
        setErrors({}); // Clear errors on successful submission
      }, (error) => {
        console.log('FAILED...', error);
        setStatus('FAILED');
      });
  };

  return (
    <div className="mailPage">
      <h2>Contact Me!</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder='Your Subject For The Message Goes Here!'
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <p className="error-message">{errors.subject}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder='Your Message Goes Here!'
            value={formData.message}
            onChange={handleChange}
            maxLength="1000"
          ></textarea>
          {status === 'SUCCESS' && <p className="success-message">Message sent successfully!</p>}
          {status === 'FAILED' && <p className="error-message">Failed to send message. Please try again.</p>}
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
  );
}

export default MailPage;
