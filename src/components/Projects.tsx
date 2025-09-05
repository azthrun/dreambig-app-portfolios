import React from 'react';
import { portfolioData } from '../data/portfolioData';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-800"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-70"></div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                {project.title}
              </h3>
              <p className="mb-4 text-slate-700 dark:text-slate-300">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition group-hover:border-indigo-200 group-hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:group-hover:border-indigo-500 dark:group-hover:text-indigo-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="mt-auto inline-flex items-center gap-2 self-end text-indigo-600 transition hover:gap-2.5 dark:text-indigo-400"
              >
                View on
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  focusable="false"
                >
                  <path d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6 0-.3 0-1.1 0-2.1-3.3.7-4-.8-4-.8-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.6.3-1.1.6-1.3-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2 1-.3 2.1-.5 3.2-.5s2.2.2 3.2.5C19 5.4 20 5.7 20 5.7c.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.3.7.9.7 1.8 0 1.3 0 2.4 0 2.8 0 .3.2.7.8.6C20.6 22.1 24 17.6 24 12.3c0-6.6-5.4-12-12-12z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
