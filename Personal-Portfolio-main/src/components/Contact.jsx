import React from 'react';
import { Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "c5683c98-7591-42b2-87d4-25f6277d43fe");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Message sent successfully!");
      event.target.reset();
    } else {
      console.error("Error:", data);
      toast.error(data.message || "Something went wrong!");
      setResult("");
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <Mail className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold">Get in Touch</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <form onSubmit={onSubmit} className="space-y-6">
            <input type="hidden" name="access_key" value="c5683c98-7591-42b2-87d4-25f6277d43fe" />
            
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="Name"
                id="name"
                required
                placeholder="Your Name"
                className="block w-full rounded-lg transition-all duration-300 
                  bg-[#1a1a1a] border-[#232323] text-white
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="Email"
                id="email"
                required
                placeholder="Your Email"
                className="block w-full rounded-lg transition-all duration-300 
                  bg-[#1a1a1a] border-[#232323] text-white
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                Message
              </label>
              <textarea
                name="Message"
                id="message"
                rows={4}
                required
                placeholder="Your Message"
                className="block w-full rounded-lg transition-all duration-300 
                  bg-[#1a1a1a] border-[#232323] text-white
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 
                transform hover:scale-105 transition-all duration-300 hover-glow"
            >
              {result ? result : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
