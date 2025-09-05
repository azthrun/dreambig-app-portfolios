import React from 'react';
import { portfolioData } from '../data/portfolioData';

const Introduction: React.FC = () => {
  return (
    <section id="introduction" className="relative isolate overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(50%_50%_at_50%_0%,black,transparent)] opacity-30 dark:opacity-50">
        <div className="absolute inset-x-0 top-[-10rem] flex justify-center blur-3xl">
          <div className="h-[28rem] w-[72rem] bg-gradient-to-r from-indigo-400 to-fuchsia-400 opacity-30 dark:from-indigo-900/70 dark:to-fuchsia-900/70"></div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto md:flex md:items-center md:gap-10">
          {/* Profile picture placeholder */}
          <div className="mx-auto text-center md:text-left">
            {/* Row: Profile picture next to H1 */}
            <div className="flex items-center justify-center gap-6 md:justify-start">
              <div className="flex-shrink-0">
                <div
                  aria-label="Profile picture placeholder"
                  className="animate-slide-up h-28 w-28 rounded-full bg-slate-300 ring-4 ring-white sm:h-36 sm:w-36 md:h-44 md:w-44 dark:bg-slate-700 dark:ring-slate-900"
                />
              </div>
              <h1 className="animate-slide-up text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-slate-100">
                Building robust, scalable apps with .NET and modern web tech
              </h1>
            </div>

            {/* Paragraphs below picture + H1 */}
            {portfolioData.introduction.map((text, idx) => (
              <p
                key={idx}
                className={`animate-slide-up ${idx === 0 ? 'mt-6' : 'mt-3'} text-base leading-8 font-normal text-slate-600 sm:text-lg dark:text-slate-400`}
              >
                {text}
              </p>
            ))}

            {/* Actions */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110"
              >
                View Projects
                <span className="material-symbols-outlined text-[20px] leading-none transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
              >
                Experience
              </a>
              <a
                href="#education"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
              >
                Education
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
