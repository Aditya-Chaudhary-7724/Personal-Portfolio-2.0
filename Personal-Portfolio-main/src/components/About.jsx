import React from "react";
import { User } from "lucide-react";

function About() {
  return (
    <section id="about" className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          <User className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold">About Me</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
              alt="Working on laptop"
              className="rounded-lg shadow-xl transition-all duration-500 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </div>
          <div>
            <p className="text-lg mb-6 text-gray-300">
              I'm a passionate Front Stack Developer focused on building fast,
              modern, and scalable web applications. I specialize in React.js
              and Tailwind CSS for crafting responsive frontends, and I am
              also learning and working with MySQL, MongoDB, and Firebase on
              the backend to bring powerful ideas to life. Whether it's
              designing smooth UI or managing real-time data, I love solving
              problems through code. When I'm not building, you'll catch me
              exploring new tech or contributing to cool projects.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Experience", value: "0 Years" },
                { label: "Projects", value: "4 Completed" },
                { label: "Clients", value: "None" },
                { label: "Countries", value: "None Served" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[#232323] p-4 rounded-lg hover:bg-purple-500/20 transition-colors card-hover"
                >
                  <h3 className="font-semibold">{label}</h3>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;