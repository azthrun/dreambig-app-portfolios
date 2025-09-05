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

export interface PortfolioData {
  introduction: string[];
  experiences: Experience[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
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
  projects: [
    {
      title: 'Project Portfolio',
      description: 'A personal portfolio website showcasing my skills, projects, and experiences.',
      technologies: ['React', 'TypeScript', '.NET Core'],
      link: 'https://github.com/azthrun/dreambig-app-portfolios',
    },
  ],
};
