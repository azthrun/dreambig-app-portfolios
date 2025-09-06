import React from 'react';
import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="scroll-smooth">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        onClick={(e) => {
          const el = document.getElementById('main-content');
          if (el) {
            e.preventDefault();
            (el as HTMLElement).focus();
          }
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="pt-16" tabIndex={-1}>
        <Introduction />
        <Experience />
        <Education />
        <Projects />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default App;
