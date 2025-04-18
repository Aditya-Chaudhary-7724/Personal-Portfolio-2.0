import React from "react";
import { Code2 } from "lucide-react";
import {
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiFirebase,
  SiMysql,
  SiJavascript,
} from "react-icons/si";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";

function Skills() {
  const technologies = [
    {
      name: "HTML5",
      icon: <FaHtml5 size={40} className="text-orange-500" />,
    },
    {
      name: "CSS3",
      icon: <FaCss3Alt size={40} className="text-blue-400" />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript size={40} className="text-yellow-500" />,
    },
    {
      name: "React.js",
      icon: <SiReact size={40} className="text-[#61DBFB]" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss size={40} className="text-[#38BDF8]" />,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb size={40} className="text-green-500" />,
    },
    {
      name: "Firebase",
      icon: <SiFirebase size={40} className="text-yellow-500" />,
    },
    {
      name: "MySQL",
      icon: <SiMysql size={40} className="text-blue-500" />,
    },
  ];

  return (
    <section id="skills" className="py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <Code2 className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold text-white">Technologies</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-white">
          {technologies.map(({ name, icon }) => (
            <div
              key={name}
              className="bg-[#1a1a1a] p-6 rounded-xl skill-card flex flex-col items-center justify-center hover-glow transition-all duration-300"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full blur-sm opacity-30 bg-purple-500 group-hover:opacity-60 transition" />
                <div className="relative z-10">{icon}</div>
              </div>
              <h3 className="text-lg font-semibold mt-3">{name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;