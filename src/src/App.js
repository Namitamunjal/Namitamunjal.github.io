import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; 
import photo from "./assets/me.jpg";
import About from "./components/About"; 
import Project from "./components/Project"; 
import Certificate from "./components/Certificate";
import Research from "./components/Research";
import Experience from "./components/Experience";
import ContactForm from "./components/ContactForm";

const Sidebar = ({ toggleSidebar, isOpen, setCurrentPage }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      
      <ul>
        <li onClick={() => {setCurrentPage("home"); toggleSidebar();}}>Home</li>
        <li onClick={() => {setCurrentPage("about"); toggleSidebar();}}>About</li>
        <li onClick={() => {setCurrentPage("project");toggleSidebar();}}>Projects</li>
        <li onClick={() => {setCurrentPage("certificates"); toggleSidebar();}}>Certificates</li>
        <li onClick={() => {setCurrentPage("research"); toggleSidebar();}}>Researches</li>
        <li onClick={() => {setCurrentPage("experience");toggleSidebar();}}>Experiences</li>
        <li onClick={() => {setCurrentPage("contact");toggleSidebar();}}>Contact</li>
      </ul>
    </div>
  );
};

const App = () => {
  const [visibleText, setVisibleText] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const skills = [
    "Web Developer", 
    "Programmer", 
    "Blockchain Enthusiast", 
    "UI/UX Designer", 
    "Full Stack Developer", 
    "Cybersecurity Researcher", 
    "Metaverse Explorer", 
    "AR/VR Developer", 
    "Solidity Developer", 
    "React Specialist"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setVisibleText((prev) => {
        if (i < skills.length) {
          return [...prev.slice(-2), skills[i++]];
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div>
      <div className="matrix-bg"></div>
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} setCurrentPage={setCurrentPage} />

      {currentPage === "home" && (
        <div className="content">
          <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-green text-monospace">
            <h2 className="text-secondary">&lt; Hello World /&gt; I am</h2>
            <h1 className="neon-text display-4">Namita Munjal</h1>
            <img src={photo} alt="Namita Munjal" className="profile-pic" />
            <div className="terminal-box mt-4 p-3">
              {visibleText.map((skill, index) => (
                <div key={index} className="d-flex align-items-center">
                  <span className="text-success me-2">$</span>
                  <span className="fw-bold typing-effect">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="live-clock">{new Date().toLocaleTimeString()}</div>
          <div className="social-icons">
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:youremail@example.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      )}

      {currentPage === "about" && <About />}
      {currentPage === "project" && <Project />}
      {currentPage === "certificates" && <Certificate />}
      {currentPage === "research" && <Research />}
      {currentPage === "experience" && <Experience />}
      {currentPage === "contact" && <ContactForm />}


    </div>
  );
};

export default App;
