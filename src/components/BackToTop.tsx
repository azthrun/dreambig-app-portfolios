import React from 'react';

const BackToTop: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-4 left-4 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-indigo-400/40 text-white shadow-xl shadow-indigo-400/30 backdrop-blur-sm transition hover:scale-105 hover:bg-indigo-400/60 focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-400 focus:outline-none md:hidden dark:border-white/20 dark:bg-indigo-300/35 dark:shadow-indigo-900/50 dark:hover:bg-indigo-300/50"
    >
      <span className="material-symbols-outlined text-[24px] leading-none">keyboard_arrow_up</span>
    </button>
  );
};

export default BackToTop;
