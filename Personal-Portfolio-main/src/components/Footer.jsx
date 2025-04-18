import React from "react";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="py-8 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400">
            © 2025 Aditya Chaudhary. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {[
              {
                icon: Github,
                href: "https://github.com/Aditya-Chaudhary-7724",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/aditya-chaudhary7724/",
              },
              {
                icon: Instagram,
                href: "https://www.instagram.com/_aditya_chaudhary_____/?hl=en",
              },
              { icon: Mail, href: "mailto:adityachaudhary7724@gmail.com" },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                className="p-2 rounded-full hover:bg-[#232323] hover:text-purple-400 transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;