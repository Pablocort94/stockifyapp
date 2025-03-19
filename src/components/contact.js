import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // For feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!email || !subject || !body) {
      alert('Please fill out all fields before sending.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_email: email,
          subject,
          message: body,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage('Your message has been sent successfully!');
      } else {
        setStatusMessage(result.message || 'Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatusMessage('An error occurred while sending your message.');
    }

    // Clear the form
    setEmail('');
    setSubject('');
    setBody('');
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-header">Contact Us</h1>
        <p className="contact-message">
          Have questions or feedback? We’d love to hear from you. Drop us a message below!
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="contact-button">
            Send Message
          </button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;
