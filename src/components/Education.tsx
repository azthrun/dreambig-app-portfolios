import React from 'react';
import { portfolioData } from '../data/portfolioData';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Education
        </h2>
        <div className="relative mx-auto max-w-4xl">
          <div
            className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-indigo-200 via-slate-200 to-transparent sm:left-6 dark:from-indigo-900/50 dark:via-slate-800/50"
            aria-hidden="true"
          ></div>
          <div className="space-y-8">
            {portfolioData.education.map((edu, idx) => (
              <div
                key={idx}
                className="group relative ml-10 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md sm:ml-12 dark:border-slate-800 dark:bg-slate-800/80"
              >
                <div className="absolute top-6 left-0 h-3 w-3 rounded-full border border-white bg-indigo-500 shadow sm:left-1 dark:border-slate-700"></div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {edu.institution} • {edu.duration}
                </p>
                {edu.details && edu.details.length > 0 && (
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-300">
                    {edu.details.map((d, i) => (
                      <li key={i} className="animate-fade-in">
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
