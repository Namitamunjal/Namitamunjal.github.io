import React, { useState, useEffect } from "react";
import "./Certificate.css";

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("http://localhost:5000/certificates");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setCertificates(data);
        setFilteredCertificates(data);

        const uniqueSkills = [
          "All",
          ...new Set(
            data.flatMap((certificate) => certificate.skills || [])
          ),
        ];
        setSkills(uniqueSkills);
      } catch (error) {
        console.error("Error fetching certificates:", error.message);
        setError("Failed to fetch certificates from the backend.");
      }
    };

    fetchCertificates();
  }, []);

  const handleSkillChange = (event) => {
    const skill = event.target.value;
    setSelectedSkill(skill);
    if (skill === "All") {
      setFilteredCertificates(certificates);
    } else {
      setFilteredCertificates(
        certificates.filter((cert) =>
          cert.skills?.includes(skill)
        )
      );
    }
  };

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="certificate-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="buttons">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>
          <div>Certificates Terminal</div>
        </div>

        <div className="filter-container">
          <label>Filter by Skill: </label>
          <select value={selectedSkill} onChange={handleSkillChange} className="skill-filter">
            {skills.map((skill, index) => (
              <option key={index} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <div className="terminal-body">
          {filteredCertificates.map((certificate) => (
            <div key={certificate.id} className="certificate-entry">
              <p className="certificate-title">📜 {certificate.name}</p>
              <p>📝 Issued By: {certificate.issuedBy}</p>
              <p>📅 Issued Date: {certificate.issuedDate}</p>
              {certificate.skills && (
                <p>💡 Skills: {certificate.skills.join(", ")}</p>
              )}
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
