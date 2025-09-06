import React from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  // Using native anchor links for better accessibility and keyboard support
  const links = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 z-20 w-full border-b border-slate-200/70 bg-white/70 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-900/70"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="text-lg font-extrabold tracking-tight">
          <a href="#introduction" className="focus:outline-none">
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              Terry's Portfolio
            </span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-slate-300 dark:hover:text-indigo-400"
              >
                {link.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
