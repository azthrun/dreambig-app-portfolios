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
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-800"
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
                className="inline-flex items-center gap-2 text-indigo-600 transition hover:gap-2.5 dark:text-indigo-400"
              >
                View Project
                <span className="material-symbols-outlined text-[20px] leading-none">
                  arrow_forward
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
