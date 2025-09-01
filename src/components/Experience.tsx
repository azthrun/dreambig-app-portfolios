import React from 'react';
import { portfolioData } from '../data/portfolioData';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
        <div className="max-w-4xl mx-auto">
          {portfolioData.experiences.map((experience, index) => (
            <div key={index} className="mb-8 p-6 border rounded-lg shadow-lg bg-white">
              <h3 className="text-2xl font-bold">{experience.role}</h3>
              <p className="text-xl text-gray-600">{experience.company} | {experience.duration}</p>
              <ul className="mt-4 list-disc list-inside">
                {experience.description.map((item, i) => (
                  <li key={i} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;