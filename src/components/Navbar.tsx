import React from "react";

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 z-20 w-full border-b border-slate-200/70 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="text-lg font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            Terry's Portfolio
          </span>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scrollToSection("introduction")}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600"
          >
            Introduction
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600"
          >
            Projects
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
