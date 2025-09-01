import React from "react";
import { portfolioData } from "../data/portfolioData";

const Introduction: React.FC = () => {
  return (
    <section
      id="introduction"
      className="relative isolate overflow-hidden py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(50%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-x-0 top-[-10rem] flex justify-center blur-3xl">
          <div className="h-[28rem] w-[72rem] bg-gradient-to-r from-indigo-400 to-fuchsia-400 opacity-30"></div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h1 className="animate-slide-up text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Building robust, scalable apps with .NET and modern web tech
        </h1>
        <p className="animate-slide-up mt-6 text-lg leading-8 text-slate-600">
          {portfolioData.introduction[0]}
        </p>
        <p className="animate-slide-up mt-3 text-lg leading-8 text-slate-600">
          {portfolioData.introduction[1]}
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110"
          >
            View Projects
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
          >
            Experience
          </a>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
