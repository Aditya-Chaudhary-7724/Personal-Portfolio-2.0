import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

function Navbar({ activeSection, darkMode, setDarkMode }) {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/experience", label: "Experience" },
    { path: "/education", label: "Education" },
    { path: "/skills", label: "Skills" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-[#121212]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  activeSection === item.path.substring(1) || 
                  (activeSection === "home" && item.path === "/")
                    ? "text-purple-500"
                    : "text-gray-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-purple-500/20 transition-colors text-purple-400"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;