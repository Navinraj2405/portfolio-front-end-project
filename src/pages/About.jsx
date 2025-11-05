 import React from "react";

function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-24 px-6 lg:px-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <img
              src="Navin-img.png"
              alt="Navinraj Profile"
              className="relative rounded-2xl shadow-2xl w-72 h-72 object-cover transform group-hover:scale-105 transition duration-500 border border-gray-700"
            />
          </div>
        </div>

        {/* About Content */}
        <div className="bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-indigo-700/30 transition duration-500">
          <h2 className="text-4xl font-bold text-indigo-400 mb-6 border-l-4 border-indigo-500 pl-3">
            About Me
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            👋 Hi, I'm{" "}
            <span className="font-semibold text-white">Navinraj</span>, a
            passionate{" "}
            <span className="text-indigo-400 font-medium">
              MERN Stack Web Developer
            </span>{" "}
            who loves turning ideas into interactive, user-friendly web
            experiences.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            I specialize in{" "}
            <span className="text-white font-semibold">
              React.js, Node.js, Express.js, MongoDB, and Firebase
            </span>
            — crafting scalable applications with a strong focus on UI/UX and
            performance.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            With a foundation in social work and project coordination, I bring
            excellent teamwork, communication, and problem-solving skills to
            every project I build.
          </p>

          <p className="text-gray-300 leading-relaxed mb-8">
            🚀 Always eager to learn, I’m currently exploring advanced React
            features and cloud deployment tools to build even better web apps.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/navinraj24"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/40 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Navinraj2405"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-indigo-500 text-indigo-400 px-6 py-2 rounded-lg hover:bg-indigo-600 hover:text-white shadow-md transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
