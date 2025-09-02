import React from 'react';
import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <main className="pt-16">
        <Introduction />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default App;
