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
      className="fixed bottom-4 left-4 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-indigo-400/40 text-white shadow-xl shadow-indigo-400/30 backdrop-blur-sm transition hover:scale-105 hover:bg-indigo-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-400 md:hidden dark:border-white/20 dark:bg-indigo-300/35 dark:shadow-indigo-900/50 dark:hover:bg-indigo-300/50"
    >
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        focusable="false"
      >
        <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      </svg>
    </button>
  );
};

export default BackToTop;
