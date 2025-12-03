 // Project.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/Firebase";

const API_BASE = "https://portfolio-back-end-project-1.onrender.com"; // change if needed
const ADMIN_UID = "JVo2DR6keLQlWwLWGPCidwcIFaC3";

function Project() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Listen for Firebase auth changes and fetch projects once
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    fetchProjects();
    return () => unsub();
  }, []);

  // Handle simple form input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit new project (admin only). No image upload here.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to upload a project.");
    if (user.uid !== ADMIN_UID) return alert("❌ Only admin can upload projects.");

    try {
      setLoading(true);
      // Backend expects JSON with imageUrl optional. We're not sending any image now.
      const payload = {
        title: formData.title,
        description: formData.description,
        githubLink: formData.githubLink,
        liveLink: formData.liveLink,
      };

      await axios.post(`${API_BASE}/api/projects`, payload, {
        headers: { "x-admin-uid": user.uid },
      });

      alert("✅ Project added successfully!");
      setFormData({ title: "", description: "", githubLink: "", liveLink: "" });
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
      alert("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  // Delete project (admin only)
  const deleteProject = async (id) => {
    if (!user || user.uid !== ADMIN_UID) return alert("Not authorized");
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`${API_BASE}/api/projects/${id}`, {
        headers: { "x-admin-uid": user.uid },
      });
      fetchProjects();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header: title + project count */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">
            My Projects
          </h1>
          <div className="text-gray-300 text-lg">
            Total projects:{" "}
            <span className="font-semibold text-indigo-300">
              {projects.length}
            </span>
          </div>
        </div>

        {/* Admin Upload Form (visible only to admin) */}
        {user?.uid === ADMIN_UID && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/70 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 space-y-6 mb-16"
          >
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
              Add New Project 🚀
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Short Description"
                value={formData.description}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <input
                type="text"
                name="githubLink"
                placeholder="GitHub Repository Link"
                value={formData.githubLink}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="text"
                name="liveLink"
                placeholder="Live Demo Link"
                value={formData.liveLink}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Removed image upload UI by request */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
              }`}
            >
              {loading ? "Uploading..." : "Add Project"}
            </button>
          </form>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-indigo-700/30 hover:scale-105 transform transition duration-300"
            >
              

              <h3 className="text-2xl font-semibold text-indigo-300 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="flex gap-4 items-center">
                {project.githubLink ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-200 font-medium"
                  >
                    GitHub
                  </a>
                ) : null}

                {project.liveLink ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-200 font-medium"
                  >
                    Live Demo
                  </a>
                ) : null}

                {/* Admin-only delete */}
                {user?.uid === ADMIN_UID && (
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="ml-auto bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
