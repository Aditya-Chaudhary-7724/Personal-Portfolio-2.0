import React, { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "education", label: "Education" }, // Moved education before experience
    { to: "experience", label: "Experience" },
    { to: "skills", label: "Skills" },
    { to: "projects", label: "Projects" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? "bg-[#121212]/80" : "bg-white/80"} backdrop-blur-sm shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-80}
                activeClass="text-purple-500"
                className={`cursor-pointer text-sm font-medium transition-colors ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } hover:text-purple-500`}
              >
                {item.label}
              </ScrollLink>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-purple-500/20 transition-colors text-purple-500"
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-purple-500/20 transition-colors text-purple-500"
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-purple-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`mt-4 md:hidden flex flex-col space-y-3 px-2 pb-4 rounded-lg ${darkMode ? "bg-[#1a1a1a]" : "bg-white shadow"}`}>
            {navItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                onClick={() => setMenuOpen(false)}
                activeClass="text-purple-500"
                className={`cursor-pointer block text-sm font-medium transition-colors ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } hover:text-purple-500`}
              >
                {item.label}
              </ScrollLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
