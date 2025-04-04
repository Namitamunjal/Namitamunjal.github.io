import React, { useState, useEffect } from "react";
import "./Experience.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("https://namitamunjal-github-io.onrender.com/experience");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error.message);
        setError("Failed to fetch experiences from the backend.");
      }
    };

    fetchExperiences();
  }, []);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="experience-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="buttons">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>
          <div>Experience Terminal</div>
        </div>
        
        <div className="terminal-body">
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-card">
              <div className="experience-logo">
                <img src={experience.logo} alt={experience.company} />
              </div>
              <div className="experience-details">
                <h2>💼 {experience.company}</h2>
                <p><strong>Role:</strong> {experience.role}</p>
                <p><strong>Duration:</strong> {experience.duration}</p>
                {experience.project && <p><strong>Project:</strong> {experience.project}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
