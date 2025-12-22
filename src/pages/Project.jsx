 // Project.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/Firebase";

const API_BASE = "https://portfolio-back-end-project-1.onrender.com";
const ADMIN_UID = "JVo2DR6keLQlWwLWGPCidwcIFaC3";

function Project() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch projects
  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      const res = await axios.get(`${API_BASE}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setProjectsLoading(false);
    }
  };

  // 🔹 Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    fetchProjects();
    return () => unsub();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔹 Add project (admin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in.");
    if (user.uid !== ADMIN_UID) return alert("Only admin allowed.");

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}/api/projects`,
        {
          title: formData.title,
          description: formData.description,
          githubLink: formData.githubLink,
          liveLink: formData.liveLink,
        },
        {
          headers: { "x-admin-uid": user.uid },
        }
      );

      alert("✅ Project added!");
      setFormData({
        title: "",
        description: "",
        githubLink: "",
        liveLink: "",
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete project
  const deleteProject = async (id) => {
    if (!user || user.uid !== ADMIN_UID) return;
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(`${API_BASE}/api/projects/${id}`, {
        headers: { "x-admin-uid": user.uid },
      });
      fetchProjects();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // 🔹 Skeleton card
  const ProjectSkeleton = () => (
    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-gray-700 rounded-lg w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded-lg w-5/6 mb-6"></div>
      <div className="flex gap-4">
        <div className="h-4 w-16 bg-gray-700 rounded-lg"></div>
        <div className="h-4 w-20 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">
            My Projects
          </h1>
          <div className="text-gray-300 text-lg">
            Total projects:{" "}
            <span className="text-indigo-300 font-semibold">
              {projects.length}
            </span>
          </div>
        </div>

        {/* Admin form */}
        {user?.uid === ADMIN_UID && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/70 border border-gray-700 rounded-2xl p-8 space-y-6 mb-16"
          >
            <h2 className="text-2xl text-indigo-300 font-semibold">
              Add New Project 🚀
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 border border-gray-700"
                required
              />
              <input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 border border-gray-700"
                required
              />
              <input
                name="githubLink"
                placeholder="GitHub Link"
                value={formData.githubLink}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 border border-gray-700"
              />
              <input
                name="liveLink"
                placeholder="Live Demo Link"
                value={formData.liveLink}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-900 border border-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold ${
                loading
                  ? "bg-gray-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Uploading..." : "Add Project"}
            </button>
          </form>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))
            : projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 hover:scale-105 transition"
                >
                  <h3 className="text-2xl text-indigo-300 font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>

                  <div className="flex gap-4 items-center">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-200"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-200"
                      >
                        Live Demo
                      </a>
                    )}
                    {user?.uid === ADMIN_UID && (
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="ml-auto bg-red-600 px-3 py-1 rounded"
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
