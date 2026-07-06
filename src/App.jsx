import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import BackgroundBlobs from './components/BackgroundBlobs.jsx';
import PageTransition from './components/PageTransition.jsx';
import Home from './pages/Home.jsx';
import Education from './pages/Education.jsx';
import Projects from './pages/Projects.jsx';
import WorkExperience from './pages/WorkExperience.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <BackgroundBlobs />
      <Navbar />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><WorkExperience /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            {/* Qualsiasi altro percorso (digitato a mano, link rotto, tentativo di
                path/URL injection) viene reindirizzato alla Home. Solo le 5 rotte
                sopra sono davvero raggiungibili. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
