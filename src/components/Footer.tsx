import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
      <p>&copy; {new Date().getFullYear()} DreamBig Portfolio. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
