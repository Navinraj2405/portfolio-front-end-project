 import React, { useState, useEffect } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/Firebase";

function Home() {
  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);

  const BACKEND_URL = "https://portfolio-back-end-project-1.onrender.com";
  const ADMIN_UID = "JVo2DR6keLQlWwLWGPCidwcIFaC3"; // 🔐 Replace with your Firebase UID

  // ✅ Fetch latest resume from backend
  const fetchResume = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/resume`);
      setResume(res.data);
    } catch (err) {
      console.error("❌ Error fetching resume:", err);
    }
  };

  // ✅ Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    fetchResume();
    return () => unsubscribe();
  }, []);

  // ✅ Handle resume upload (admin only)
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select a PDF file to upload.");
    if (user?.uid !== ADMIN_UID) return alert("❌ Only admin can upload resumes.");

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", selectedFile);

      await axios.post(`${BACKEND_URL}/api/resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Resume uploaded successfully!");
      setSelectedFile(null);
      fetchResume();
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("❌ Failed to upload resume.");
    } finally {
      setUploading(false);
    }
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
            who loves building modern, scalable, and interactive web
            applications.
          </p>
          <p className="text-gray-400">
            With strong skills in{" "}
            <span className="font-medium text-indigo-300">
              React.js, Node.js, Express.js, MongoDB
            </span>
            , and a foundation in teamwork & creativity, I deliver both
            performance and beauty in code.
          </p>

          {/* Resume Buttons */}
          <div className="flex flex-wrap gap-4 mt-6 items-center">
            {resume ? (
              <a
                href={`${BACKEND_URL}${resume.filePath}`}
                download={resume.fileName}
                className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                📄 Download Resume
              </a>
            ) : (
              <button
                disabled
                className="bg-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                No Resume Found
              </button>
            )}

            {/* Admin Upload */}
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

      {/* Auto-moving Technology Logos */}
      <section className="overflow-hidden py-10 relative">
        <div className="flex gap-16 animate-scroll">
          <img src="db.png" alt="MongoDB" className="h-20 w-auto rounded-full" />
          <img src="express.jpg" alt="Express" className="h-20 w-auto rounded-full" />
          <img src="html.png" alt="HTML" className="h-20 w-auto rounded-full" />
          <img src="mern.jpg" alt="MERN" className="h-20 w-auto rounded-full" />
          <img src="node.png" alt="Node.js" className="h-20 w-auto rounded-full" />
          <img src="react.png" alt="React" className="h-20 w-auto rounded-full" />
          <img src="tailwind.png" alt="Tailwind CSS" className="h-20 w-auto rounded-full" />

          {/* Duplicate for smooth infinite scroll */}
          <img src="db.png" alt="MongoDB" className="h-20 w-auto rounded-full" />
          <img src="express.jpg" alt="Express" className="h-20 w-auto rounded-full" />
          <img src="html.png" alt="HTML" className="h-20 w-auto rounded-full" />
          <img src="mern.jpg" alt="MERN" className="h-20 w-auto rounded-full" />
          <img src="node.png" alt="Node.js" className="h-20 w-auto rounded-full" />
          <img src="react.png" alt="React" className="h-20 w-auto rounded-full" />
          <img src="tailwind.png" alt="Tailwind CSS" className="h-20 w-auto rounded-full" />
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
    </div>
  );
}

export default Home;
