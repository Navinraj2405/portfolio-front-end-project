import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/Footer';
import Project from './pages/Project';
import Login from './pages/Login';
import Signup from './pages/Signup';  

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
