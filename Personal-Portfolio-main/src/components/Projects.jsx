import React, { useState } from "react";
import { Briefcase, ExternalLink } from "lucide-react";

function Projects() {
  const [activeProjectFilter, setActiveProjectFilter] = useState("all");

  const projects = {
    fullstack: [
      {
        title: "Movie Nest",
        description:
          "This is a Movie App which allows you to search for movies and also add them to your liked movie list",
        image: "movie-nest.jpg",
        tags: ["React.js"],
      },
      {
        title: "Weather-App",
        description: "A sleek weather app that displays real-time weather updates and forecasts based on your location.",
        image: "/weather-app.jpg",
        tags: ["React", "Socket.io", "PostgreSQL"],
      },
      {
        title: "Food Bridge ",
        description: "An efficient system for recording and managing surplus food donations from restaurants using a MySQL database for easy tracking and updates.",
        image: "food-bridge.jpg",
        tags: ["Java", "MySql", "Spring Boot"],
      },
      {
        title: "Personal Portfolio",
        description: "A personal portfolio website showcasing my projects and skills, built with React and Tailwind CSS.",
        image: "portfolio.jpg",
        tags: ["React", "Tailwind CSS"],
      },
    ],
    aiml: [
      
      {
        title: "Sentiment Analysis Tool",
        description: "NLP-based sentiment analysis for social media",
        image: "/images/sentiment-tool.jpg",
        tags: ["NLP", "PyTorch", "APIs"],
      },
    ],
    dsa: [
      {
        title: "Algorithm Visualizer",
        description: "Interactive visualization of common algorithms",
        image: "/images/algo-vis.jpg",
        tags: ["JavaScript", "D3.js", "Algorithms"],
      },
      {
        title: "Data Structure Library",
        description: "Custom implementation of advanced data structures",
        image: "/images/data-struct-lib.jpg",
        tags: ["C++", "Data Structures", "Templates"],
      },
    ],
  };
  

  const filteredProjects =
    activeProjectFilter === "all"
      ? [...projects.fullstack, ...projects.aiml, ...projects.dsa]
      : projects[activeProjectFilter];

  return (
    <section id="projects" className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <Briefcase className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold">Projects</h2>
        </div>

        {/* Project Filters */}
        <div className="flex justify-center space-x-4 mb-12">
          {[
            { id: "all", label: "All Projects" },
            { id: "fullstack", label: "Full Stack" },
            { id: "aiml", label: "AI/ML" },
            { id: "dsa", label: "DSA" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveProjectFilter(id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeProjectFilter === id
                  ? "bg-purple-500 text-white"
                  : "bg-[#232323] text-gray-400 hover:bg-purple-500/20"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-lg card-hover bg-[#232323]"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="mb-4 text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View Project <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;