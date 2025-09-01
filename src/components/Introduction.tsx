import React from 'react';
import { portfolioData } from '../data/portfolioData';

const Introduction: React.FC = () => {
  return (
    <section id="introduction" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Introduction</h2>
        <div className="max-w-3xl mx-auto text-center">
          {portfolioData.introduction.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-700 mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;