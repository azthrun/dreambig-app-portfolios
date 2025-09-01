import React from 'react';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full z-10 top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">My Portfolio</div>
        <div className="hidden md:flex space-x-4">
          <button onClick={() => scrollToSection('introduction')} className="hover:text-gray-400">Introduction</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-gray-400">Experience</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-gray-400">Projects</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;