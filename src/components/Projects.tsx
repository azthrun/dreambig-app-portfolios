import React from "react";
import { portfolioData } from "../data/portfolioData";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-70"></div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                {project.title}
              </h3>
              <p className="mb-4 text-slate-700">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition group-hover:border-indigo-200 group-hover:text-indigo-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-indigo-600 transition hover:gap-2.5"
              >
                View Project
                <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
