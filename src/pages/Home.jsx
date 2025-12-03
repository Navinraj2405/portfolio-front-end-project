 import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/Firebase";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);

  const ADMIN_UID = "JVo2DR6keLQlWwLWGPCidwcIFaC3"; // your UID

  // Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle resume upload (admin only → saves locally for manual replace)
  const handleResumeUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) return alert("Please select a PDF file.");
    if (user?.uid !== ADMIN_UID)
      return alert("❌ Only admin can upload resumes.");

    alert(
      "⚠️ Frontend-only mode enabled.\n\nTo update your resume:\n1. Replace the file manually in /public/Navinraj_CV.pdf\n2. Vercel/Netlify will auto-update your site."
    );
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white min-h-screen mt-16 py-10">
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-10">
        
        {/* Left Content */}
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-bold leading-snug">
            Hello, I'm <span className="text-indigo-400">Navinraj</span> 👋
          </h1>

          <p className="text-gray-300 text-lg">
            I'm a passionate{" "}
            <span className="font-semibold text-indigo-300">
              MERN Stack Developer
            </span>{" "}
            who loves building modern and interactive web applications.
          </p>

          {/* Resume Buttons */}
          <div className="flex flex-wrap gap-4 mt-6 items-center">
            
            {/* Public Resume Download */}
            <a
              href="/Navinraj_CV.pdf"
              download="Navinraj_Resume.pdf"
              className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              📄 Download Resume
            </a>

            {/* Admin Upload – replaces file manually */}
            {user?.uid === ADMIN_UID && (
              <form
                onSubmit={handleResumeUpload}
                className="flex flex-wrap gap-3 items-center"
              >
                <label className="bg-gray-700 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-600 transition">
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                  📤 Choose File
                </label>

                <button
                  type="submit"
                  disabled={uploading}
                  className={`px-5 py-3 rounded-lg font-semibold transition ${
                    uploading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Profile Image */}
        <div className="mt-10 md:mt-0">
          <img
            src="Navin-img.png"
            alt="Navinraj Profile"
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-indigo-500 shadow-xl object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Auto-moving Logos */}
      <section className="overflow-hidden py-10 relative">
        <div className="flex gap-16 animate-scroll">
          <img src="db.png" className="h-20 w-auto rounded-full" />
          <img src="express.jpg" className="h-20 w-auto rounded-full" />
          <img src="html.png" className="h-20 w-auto rounded-full" />
          <img src="mern.jpg" className="h-20 w-auto rounded-full" />
          <img src="node.png" className="h-20 w-auto rounded-full" />
          <img src="react.png" className="h-20 w-auto rounded-full" />
          <img src="tailwind.png" className="h-20 w-auto rounded-full" />
        </div>
      </section>

      {/* Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 25s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* ⭐ Skills Section ⭐ */}
      <section className="py-16 px-8 md:px-16">
        <h2 className="text-4xl font-bold text-center text-indigo-400 mb-10">
          My Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Frontend */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-indigo-300 mb-4">
              Frontend
            </h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>HTML</li>
              <li>CSS</li>
              <li>TailwindCSS</li>
              <li>JavaScript</li>
              <li>React.js</li>
            </ul>
          </div>

          {/* Backend */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-indigo-300 mb-4">
              Backend & Database
            </h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
