import React, { useState, useEffect } from "react";
import "./About.css";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  const [aboutContent, setAboutContent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch("http://localhost:5000/about"); 
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setAboutContent(data);
      } catch (error) {
        console.error("Error fetching About data:", error.message);
        setError("Failed to fetch data from the backend.");
      }
    };

    fetchAboutContent();
  }, []);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="about-container text-light p-4">
      <div className="terminal-window">
        <div className="terminal-header d-flex justify-content-between align-items-center">
          <div className="buttons">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>
          <div>Terminal</div>
        </div>
        
        <div className="terminal-body mt-3 p-3">
          {aboutContent.map((entry, index) => (
            <p 
              key={index} 
              className={entry.type === "input" ? "text-primary" : "text-success"}
            >
              {entry.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
