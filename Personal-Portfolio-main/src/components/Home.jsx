import React from "react";
import { Github, Linkedin, Mail, Instagram, ChevronDown } from "lucide-react";

function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 gradient-animate bg-gradient-to-br from-[#121212] via-purple-900/20 to-[#121212]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between">
        {/* Text content */}
        <div className="animate-float text-center lg:text-left">
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 text-white">
            Hi, I'm{" "}
            <span className="text-purple-500 text-glow">
              Aditya Chaudhary
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-300">
            Front-End Developer & AIML Enthusiast
          </p>

          <div className="flex justify-center lg:justify-start space-x-4 mb-12">
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
                className="p-3 rounded-full bg-[#1a1a1a] hover:bg-purple-500 hover:text-white hover-glow transition-all transform hover:scale-110"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Photo area */}
        <div className="mb-10 lg:mb-0">
          <img
            src="/myphoto.jpg"
            alt=""
            className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-purple-500 shadow-lg hover:scale-105 transition-transform"
          />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-purple-500" />
      </div>
    </section>
  );
}

export default Home;