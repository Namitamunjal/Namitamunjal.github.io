import React, { useState, useEffect } from "react";
import "./Research.css";

const Research = () => {
  const [researchArticles, setResearchArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResearchArticles = async () => {
      try {
        const response = await fetch("http://localhost:5000/research");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setResearchArticles(data);
      } catch (error) {
        console.error("Error fetching research articles:", error.message);
        setError("Failed to fetch research articles from the backend.");
      }
    };

    fetchResearchArticles();
  }, []);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="research-container">
      <div className="research-terminal-window">
        <div className="research-terminal-header">
          <div className="research-buttons">
            <span className="research-red"></span>
            <span className="research-yellow"></span>
            <span className="research-green"></span>
          </div>
          <div>🚀 Research Terminal</div>
        </div>

        <div className="research-terminal-body">
          {researchArticles.map((article) => (
            <div key={article.id} className="research-entry">
              <p className="research-title">📄 {article.title} ({article.publicationDate})</p>
              <p className="research-description">{article.description}</p>
              {article.link && (
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="research-link"
                >
                  🔗 View Research Paper
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

export default Research;
