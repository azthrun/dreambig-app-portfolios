import { motion } from 'framer-motion';
import type { Experience as ExperienceType } from '../types/Experience';
import { PortfolioService } from '../services/api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PortfolioService.getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Work Experience</h1>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-accent">{exp.company}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{exp.position}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
            </div>
            
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience; 