 import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Logo and Contact */}
        <div
          className="text-center md:text-left cursor-pointer"
          onClick={() =>
            (window.location.href = "mailto:navinrajathisayaraj@gmail.com")
          }
        >
          <h1 className="text-3xl font-bold text-white hover:text-indigo-400 transition duration-300">
            Navinraj
          </h1>
          <p className="text-sm mt-2 text-gray-400">
            MERN Stack Developer • React | Node | MongoDB | Express
          </p>

          <div className="flex justify-center md:justify-start items-center gap-5 mt-4">
            <a
              href="mailto:navinrajathisayaraj@gmail.com"
              className="flex items-center gap-2 hover:text-indigo-400 transition duration-300"
              target="_blank" // Make sure the link is clickable
              rel="noopener noreferrer"
            >
              <FaEnvelope size={18} />
              <span className="text-sm hidden sm:inline">
                navinrajathisayaraj@gmail.com
              </span>
            </a>

            <a
              href="tel:7530035083"
              className="flex items-center gap-2 hover:text-indigo-400 transition duration-300"
            >
              <FaPhoneAlt size={16} />
              <span className="text-sm hidden sm:inline">+91 7530035083</span>
            </a>
          </div>
        </div>

        {/* Right: Social Links */}
        <div className="flex gap-6 text-2xl">
          <a
            href="https://linkedin.com/in/navinraj24"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Navinraj2405"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Navinraj. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
