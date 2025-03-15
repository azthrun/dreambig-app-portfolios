import { motion } from 'framer-motion';
import { EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PersonalInfo } from '../types/PersonalInfo';
import { PortfolioService } from '../services/api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PortfolioService.getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !personalInfo) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {personalInfo.name}
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {personalInfo.title}
        </motion.p>
      </div>

      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{personalInfo.bio}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <EnvelopeIcon className="h-6 w-6 text-accent" />
            <a href={`mailto:${personalInfo.email}`} className="hover:text-accent">
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <XMarkIcon className="h-6 w-6 text-accent" />
            <a href={personalInfo.twitter} className="hover:text-accent">
              {personalInfo.twitter}
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">GitHub</h3>
          <p className="text-gray-600 dark:text-gray-400">View my Open Source Projects</p>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
          <p className="text-gray-600 dark:text-gray-400">Learn about my professional journey</p>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Home; 