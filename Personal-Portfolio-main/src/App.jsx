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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ScrollToTop component
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen scroll-smooth ${darkMode ? "bg-[#121212] text-gray-100" : "bg-white text-black"}`}>
      <ProgressBar scrollProgress={scrollProgress} />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 👇 Sections instead of Routes */}
      <Home />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer />
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
