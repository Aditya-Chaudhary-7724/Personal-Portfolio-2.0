import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from "./components/Skills";
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// ScrollToTop component to ensure page starts at top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Progress bar component
function ProgressBar({ scrollProgress }) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="relative w-full h-full bg-[#232323]">
        <div
          className="absolute h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-r from-transparent to-purple-400/20 blur-sm"></div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  
  useEffect(() => {
    // Set active section based on current route
    const path = location.pathname.substring(1) || "home";
    setActiveSection(path);
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return (
    <div className={`min-h-screen custom-scrollbar bg-[#121212] text-gray-100`}>
      <ProgressBar scrollProgress={scrollProgress} />
      <Navbar activeSection={activeSection} darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </Router>
  );
}

export default App;
