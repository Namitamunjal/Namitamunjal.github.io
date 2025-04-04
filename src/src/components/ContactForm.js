import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Your Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Your Email</label>
          </div>

          <div className="input-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <label>Your Message</label>
          </div>

          <button type="submit" className="send-btn">Send Message</button>
          <div className="social-icons">
          <a href="https://www.linkedin.com/in/namita-munjal/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
          </a>
          <a href="https://github.com/Namitamunjal/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
          </a>
          <a href="mailto:namitamunjal27@gmail.com">
            <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" />
          </a>
        </div>
         
        </form>

        {submittedData && (
          <div className="submitted-data">
            <h3>Submitted Data</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Message:</strong> {submittedData.message}</p>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default ContactForm;
