 import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../config/Firebase";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  // Helper for active link highlighting
  const isActive = (path) =>
    location.pathname === path ? "text-indigo-400 font-semibold" : "text-gray-300";

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            Navinraj
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center text-lg">
            <Link
              to="/projects"
              className={`${isActive("/projects")} hover:text-indigo-400 transition duration-300`}
            >
              Projects
            </Link>
            <Link
              to="/about"
              className={`${isActive("/about")} hover:text-indigo-400 transition duration-300`}
            >
              About Me
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-indigo-400 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              // Close Icon (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu Icon (☰)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-xl transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-40`}
      >
        <div className="flex flex-col h-full p-6 space-y-6 text-lg">
          <h2
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
          >
            Navinraj
          </h2>

          <hr className="border-gray-700" />

          <Link
            to="/projects"
            onClick={() => setMenuOpen(false)}
            className={`${isActive("/projects")} hover:text-indigo-400 transition`}
          >
            Projects
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={`${isActive("/about")} hover:text-indigo-400 transition`}
          >
            About Me
          </Link>

          <div className="mt-auto">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;
