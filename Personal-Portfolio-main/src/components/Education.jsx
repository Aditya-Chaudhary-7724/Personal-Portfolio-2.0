import React from "react";
import { GraduationCap, Calendar } from "lucide-react";

function Education() {
  const educations = [
    {
      degree: "B.Tech in Computer Science and Engineering ",
      school: "SRM Institute of Science and Technology",
      period: "2024 - 2027",
      description:
        "I am currently pursuing a B.Tech degree at SRMIST. I achieved a 9.09 GPA in my first semester, followed by a 9.04 GPA in the second semester, followed by a 9.83 GPA in third semester ,resulting in an impressive cumulative CGPA of 9.33.",
    },
    {
      degree: "12th Class (HSC)",
      school: "Kendriya Vidayalaya, Mumbai",
      period: "2022 - 2023",
      description:
        "",
    },
  ];

  return (
    <section id="education" className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <GraduationCap className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold">Education</h2>
        </div>
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <div key={index} className="relative pl-8 pb-8 group">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-purple-500/30 group-hover:bg-purple-500 transition-colors"></div>
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-purple-500 -translate-x-1/2"></div>
              <div className="bg-[#232323] p-6 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                <h3 className="text-xl font-semibold text-purple-400">
                  {edu.degree}
                </h3>
                <div className="flex items-center space-x-2 mb-2 text-gray-400">
                  <span>{edu.school}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {edu.period}
                  </span>
                </div>
                <p className="text-gray-300">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;