import React from "react";
import { Mail } from "lucide-react";

function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <Mail className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold">Get in Touch</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6">
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "message", label: "Message", type: "textarea" },
            ].map(({ id, label, type }) => (
              <div key={id} className="group">
                <label
                  htmlFor={id}
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    rows={4}
                    className="block w-full rounded-lg transition-all duration-300 
                      bg-[#1a1a1a] border-[#232323] focus:border-purple-500
                      focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  />
                ) : (
                  <input
                    type={type}
                    id={id}
                    className="block w-full rounded-lg transition-all duration-300 
                      bg-[#1a1a1a] border-[#232323] focus:border-purple-500
                      focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 
                transform hover:scale-105 transition-all duration-300 hover-glow"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;