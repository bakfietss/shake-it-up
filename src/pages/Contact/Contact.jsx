import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import "./Contact.css";

const Contact = ({ onAuthClick }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted");
  };

  return (
    <>
      <Navbar onAuthClick={onAuthClick} />
      <div className="contact-container">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <p>Have a question or suggestion? We'd love to hear from you!</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your message..."
                className="form-input"
              />
            </div>

            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
