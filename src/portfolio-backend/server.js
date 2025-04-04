const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

// Use Helmet to set security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
    },
  },
}));

// Serve static files from React's build folder
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), { 
  extensions: ['js', 'html'], // Ensures correct file types
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript'); 
    }
  }
}));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const projects = [
  { id: 1, title: "Certifi-Chain", description: "A decentralized NFT-based certification system where achievements are issued as Soulbound NFTs, making them tamper-proof and instantly verifiable.A blockchain-based digital certification system that enables instant, tamper-proof credential verification, eliminating fraud and manual checks.",link:"https://github.com/Namitamunjal/certify-chain",year:"2025" },
  { id: 2, title: "My Portfolio Website", description: "Developed a personal portfolio website using React and Tailwind CSS, showcasing my projects, certifications, and research work. Integrated a backend API for dynamic content management and real-time data retrieval.",link:"https://namitamunjal.github.io/",year:"2025" },
  { id: 3, title: "Study Buddies", description: "StudyBuddies is a web application designed to make studying more effective and collaborative. This lets users create study cards, organize them into decks, and share them publicly or privately. ",link:"https://github.com/Namitamunjal/Studybuddies_Infosys_Internship_Oct2024",year:"2024" },
  { id: 4, title: "Green Gauge: Energy Credit & Carbon Offset Tracker", description: "GreenGauge is a robust web application designed to empower individuals and organizations to monitor and manage their energy consumption efficiently. With real-time alerts, tracking dashboards, and tailored recommendations, GreenGauge helps reduce carbon footprints by promoting sustainability. This application is aimed at providing both individuals and corporations insights into their energy consumption and offset efforts to achieve a greener planet.",link:"https://github.com/Namitamunjal/AlgoProject",year:"2024" },
  
];

app.get('/projects', (req, res) => {
  res.json(projects);
});

const certificates = [
  {
    id: 1,
    name: "Angular",
    issuedBy: "Infosys",
    issuedDate: "June 2024",
    skills: ["Angular"],
  },
  {
    id: 2,
    name: "Cybersecurity Essentials",
    issuedBy: "Cisco Networking Academy",
    issuedDate: "June 2024",
    skills: ["Cybersecurity"],
  },
  {
    id: 3,
    name: "Introduction to Cybersecurity",
    issuedBy: "Cisco Networking Academy",
    issuedDate: "June 2024",
    skills: ["Cybersecurity"],
  },
  {
    id: 4,
    name: "Introduction to Packet Tracer",
    issuedBy: "Cisco Networking Academy",
    issuedDate: "June 2024",
    skills: ["Packet Tracer"],
  },
  {
    id: 5,
    name: "Virtual Flutter Workshop",
    issuedBy: "GeeksforGeeks Student Chapter - Chandigarh University",
    issuedDate: "April 2024",
  },
  {
    id: 6,
    name: "Certificate of Participation in Round 1: EY Techathon 4.0",
    issuedBy: "Unstop",
    issuedDate: "November 2023",
    skills: ["React","Frontend","Node"],
  },
  {
    id: 7,
    name: "Microsoft Learn Student Ambassador - Backend Web Development using JavaScript, Node.js & Express",
    issuedBy: "Microsoft",
    issuedDate: "July 2023",
    skills:["JavaScript", "Node","Express"],
  },
  {
    id: 8,
    name: "Python and Artificial Intelligence",
    issuedBy: "Amazon Web Services (AWS)",
    issuedDate: "July 2023",
    skills:["Python"],
  },
  {
    id: 9,
    name: "Web Development",
    issuedBy: "Coding Blocks Junior",
    issuedDate: "March 2021",
    skills:["JavaScript", "Node","React"],
  },
];
app.get('/certificates', (req, res) => {
  res.json(certificates);
});

const researchArticles = [
  {
    id: 1,
    title: "Embracing Decentralization: A Blockchain Database Model for Enhanced Data Operations",
    description: "We have proposed a decentralized blockchain based database (DBDS) system in which all the data will be stored in the form of immutable ledger on Blockchain Network.",
    publicationDate: "Nov 2024",
    link: "https://ieeexplore.ieee.org/document/10752319",
  },
  {
    id: 2,
    title: "Unlocking Borderless Identity: B-Passport and the Blockchain Revolution",
    description: "We are proposing to integrate it into the current Passport System. Unlike the centralized government-operated system, the B-Passport system will be decentralized, transparent, and governed by a consensus mechanism. It will eliminate the need for physical passports, relying on smart contracts to handle processes securely and efficiently, addressing issues like lost passports, fraud, revocation, and expiration.",
    publicationDate: "April 2024",
    link: "https://ieeexplore.ieee.org/document/10503329",
  },
  {
    id: 3,
    title: "Industrial Automation using VR and AI",
    description: "The aim of this review paper is to explore the latest research and developments in automation, virtual reality, and artificial intelligence, with a particular focus on their applications in various industries and their implications for society as a whole.",
    publicationDate: "Oct 2023",
    link: "https://ieeexplore.ieee.org/document/10235059",
  }
];

// Endpoint to fetch research articles
app.get('/research', (req, res) => {
  res.json(researchArticles);
});

const about = [
  { type: "input", text: ">>> guest@portfolio:~$ whoami" },
  {type: "output", text: "Namita Munjal\n" },
  { type: "input", text: ">>> guest@portfolio:~$ cat bio.txt" },
  { type: "output", text: "Passionate Web Developer and Blockchain Enthusiast, currently diving deep into decentralized systems and cryptography.\n" },
  { type: "input", text: '>>> guest@portfolio:~$ echo "Skills & Interests"' },
  { type: "output", text: "-Full Stack Development (React, Node.js)\n-React/Node\n-Java\n-Blockchain Development (Solidity, Web3.js)\n- Smart Contracts & Decentralized Applications\n-Computer Networks\n-Cybersecurity & Network Security" },
  { type: "input", text: ">>> guest@portfolio:~$ sudo apt-get install creativity --yes" },
  { type: "output", text: "Processing... ✅ Successfully installed!\n" },
];
app.get('/about', (req, res) => {
  res.json(about);
});

const experiences = [
  {
    id: 1,
    company: "Infosys Spring Board Internship",
    role: "Full Stack Developer",
    duration: "Oct 2024 - Dec 2024",
    project: "Study Buddies - A collaborative study platform",
    logo: "https://www.infosys.com/content/dam/infosys-web/en/about/springboard/images/infosys-springboard.png",
  },
  {
    id: 2,
    company: "Cisco Virtual Internship-AICTE",
    role: "Intern [Student Coordinator]",
    duration: "June 2024 - July 2024",
    logo: "https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo.png",
  },
];

app.get('/experience', (req, res) => {
  res.json(experiences);
});


app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the API!",
    endpoints: {
      projects: "/projects",
      certificates: "/certificates"
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
