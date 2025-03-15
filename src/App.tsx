import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-white shadow-md dark:bg-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.h1 
                className="text-xl font-semibold text-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                DreamBig Portfolio
              </motion.h1>
              <div className="hidden md:flex items-center space-x-8">
                <Link 
                  to="/" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  Home
                </Link>
                <Link 
                  to="/experience" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  Experience
                </Link>
                <Link 
                  to="/projects" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  Projects
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-white dark:bg-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p>© {new Date().getFullYear()} DreamBig Portfolio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
