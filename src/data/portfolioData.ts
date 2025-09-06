export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  details?: string[];
}

export interface PortfolioData {
  linkedInProfileSite: string;
  introduction: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  linkedInProfileSite: 'https://www.linkedin.com/in/azthrunzalao0o/',
  introduction: [
    "Hello! I'm a passionate software engineer with over ten years of experiences in .NET and JavaScript-based technologies, covering full-stack and mobile developments. Seeking to join a forward-thinking organization to contribute to cutting-edge product development through expertise in cloud-native applications, performance optimization, and clean code principles.",
    "When I'm not coding, you can find me exploring the latest tech trends, spending time on open-source or home projects, enjoying a good cup of coffee, or simply relaxing with my family.",
  ],
  experiences: [
    {
      role: 'Senior Software Engineer',
      company: 'United Health Group; TX',
      duration: '2022 - NOW',
      description: [
        'Manage and enhance multiple public-facing websites serving millions of college students, along with supporting backend services including RESTful API, message queues and schedule jobs.',
        'Design scalable software architecture for new applications using Angular and .NET.',
        'Lead modernization efforts by migrating legacy systems to contemporary tech stacks.',
        'Lead application migrations onto Azure Cloud and/or containerized environments.',
        'Mentor junior developers to improve team velocity and code quality.',
        'Conduct thorough code reviews to uphold high development standards before deployment.',
        'Collaborate with Business Analysts and QA teams to ensure robust, production-ready solutions.',
      ],
    },
    {
      role: 'Software Analyst',
      company: 'Calpine Corporation; TX',
      duration: '2013 - 2022',
      description: [
        'Developed cross-platform mobile applications used by power plant operators for meter readings and inventory management.',
        'Produced SQL reports using SSRS and Power BI for senior management.',
        'Led the migration of applications to Azure Cloud infrastructure.',
      ],
    },
  ],
  education: [
    {
      degree: 'M.S. in Software Engineering',
      institution: 'University of Houston - Clear Lake',
      duration: '2011 - 2013',
      details: [
        'Specialized in Software Development Life Cycle and Software Design Patterns.',
        'Graduate teaching assistant and research assistant for robotic design and application development.',
        'STEM scholarship recipient throughout the program.',
      ],
    },
    {
      degree: 'B.S. in Computer Science',
      institution: 'University of Houston - Clear Lake',
      duration: '2008 - 2011',
      details: [
        'Scholarship recipient from 2009 to 2011.',
        'Designed and developed a e-commerce website as a capstone project.',
      ],
    },
  ],
  projects: [
    {
      title: 'Project Portfolio',
      description: 'A personal portfolio website showcasing projects and skills.',
      technologies: ['React', 'TypeScript', '.NET Core'],
      link: 'https://github.com/azthrun/dreambig-app-portfolios',
    },
    {
      title: 'Repository Generator',
      description: 'A .NET library that generates repository classes for your models.',
      technologies: ['C#', '.NET', 'CosmosDB'],
      link: 'https://github.com/azthrun/dreambig-repository-codegen',
    },
    {
      title: 'Web3.0 Calendar',
      description: 'A Web3 calendar application for scheduling events.',
      technologies: ['React', 'Solidity', 'Web3.js'],
      link: 'https://github.com/azthrun/learning-web3',
    },
    {
      title: 'Project Faist',
      description: 'A native iOS application for tasks management using SwiftUI.',
      technologies: ['Swift', 'SwiftUI', 'SwiftData'],
      link: 'https://github.com/azthrun/dreambig-app-faist',
    },
  ],
};
