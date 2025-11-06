 import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/Firebase";

function Project() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
  });
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const ADMIN_UID = "JVo2DR6keLQlWwLWGPCidwcIFaC3";
  const API_BASE = "https://portfolio-back-end-project-1.onrender.com"; // ✅ use this

  // Dropzone setup
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setImage(acceptedFiles[0]),
  });

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    fetchProjects();
    return () => unsub();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to upload a project.");
    if (user.uid !== ADMIN_UID)
      return alert("❌ Only admin can upload projects.");

    const formDataWithImage = new FormData();
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("githubLink", formData.githubLink);
    formDataWithImage.append("liveLink", formData.liveLink);
    formDataWithImage.append("image", image);

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/api/projects`, formDataWithImage);
      alert("✅ Project added successfully!");
      setFormData({ title: "", description: "", githubLink: "", liveLink: "" });
      setImage(null);
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
      alert("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen text-white py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-indigo-400 drop-shadow-lg">
        💻 My Projects
      </h1>

      {/* ✅ Admin Upload Form (only visible to admin) */}
      {user?.uid === ADMIN_UID && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/70 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 space-y-6 mb-16 max-w-3xl mx-auto"
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
            />
            <input
              type="text"
              name="description"
              placeholder="Short Description"
              value={formData.description}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
          <div
            {...getRootProps()}
            className="p-6 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:bg-gray-700/40 transition"
          >
            <input {...getInputProps()} />
            {image ? (
              <p className="text-indigo-300 font-medium">📁 {image.name}</p>
            ) : (
              <p className="text-gray-400">
                Drag & Drop or Click to Upload Project Image
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            }`}
          >
            {loading ? "Uploading..." : "Add Project"}
          </button>
        </form>
      )}

      {/* ✅ Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-indigo-700/30 hover:scale-105 transform transition duration-300"
          >
            <img
              src={`${API_BASE}${project.image}`}
              alt={project.title}
              className="w-full h-52 object-cover rounded-lg mb-5 border border-gray-700"
            />
            <h3 className="text-2xl font-semibold text-indigo-300 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex gap-4">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-200 font-medium"
              >
                GitHub
              </a>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-200 font-medium"
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
