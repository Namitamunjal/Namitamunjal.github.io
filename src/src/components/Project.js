import React, { useState, useEffect } from "react";
import "./Project.css";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://namitamunjal-github-io.onrender.com/projects");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);

        const uniqueYears = ["All", ...new Set(data.map((project) => project.year))];
        setYears(uniqueYears);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
        setError("Failed to fetch projects from the backend.");
      }
    };

    fetchProjects();
  }, []);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    if (year === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.year === year));
    }
  };

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="project-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="buttons">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>
          <div>Projects Terminal</div>
        </div>
        
        <div className="filter-container">
          <label>Filter by Year: </label>
          <select value={selectedYear} onChange={handleYearChange} className="year-filter">
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="terminal-body">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-entry">
              <p className="project-title">📁 {project.title} ({project.year})</p>
              <p className="project-description">{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  🔗 View Project
                </a>
              )}
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
