import React from "react";
import { Building } from "lucide-react";

function Experience() {
  const experiences = [
    {
      role: "Samsung Intern",
      company: "Samsung R&D Institute",
      period: "March 2025 - present",
      description:
        "Developing a Guardrail System for AI/ML and AI Agentic Solutions to Safeguard from Security Related Risks",
      achievements: [
        "",
      ],
    },
    {
      role: "Technical Member",
      company: "SQAC Club SRMIST",
      period: "April 2025 - present",
      description:
        "",
      achievements: [
        ""
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <Building className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold">Experience</h2>
        </div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-6 rounded-lg hover:bg-[#232323] transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-purple-400">
                    {exp.role}
                  </h3>
                  <p className="text-gray-400">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-300 mb-4">{exp.description}</p>
              <ul className="list-disc list-inside space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-400">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;