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
      role: 'Senior .NET Developer',
      company: 'Tech Solutions Inc.',
      duration: '2020 - Present',
      description: [
        'Led the development of a high-performance, microservices-based e-commerce platform using .NET Core, C#, and Azure.',
        'Designed and implemented RESTful APIs, resulting in a 30% increase in application performance.',
        'Mentored junior developers and conducted code reviews to ensure code quality and adherence to best practices.',
      ],
    },
    {
      role: '.NET Developer',
      company: 'Innovatech Ltd.',
      duration: '2017 - 2020',
      description: [
        'Developed and maintained web applications using ASP.NET MVC, Entity Framework, and SQL Server.',
        'Collaborated with cross-functional teams to deliver new features and enhancements.',
        'Participated in the full software development lifecycle, from requirements gathering to deployment.',
      ],
    },
  ],
  projects: [
    {
      title: 'Project Alpha',
      description:
        'A real-time chat application built with SignalR and React, allowing users to communicate seamlessly.',
      technologies: ['SignalR', 'React', 'TypeScript', '.NET Core'],
      link: '#',
    },
    {
      title: 'Project Beta',
      description:
        'A task management tool designed to help teams organize and track their work effectively.',
      technologies: ['ASP.NET Core', 'Angular', 'SQL Server'],
      link: '#',
    },
    {
      title: 'Project Gamma',
      description:
        'An e-learning platform offering interactive courses and quizzes on various subjects.',
      technologies: ['Blazor', '.NET 5', 'Azure'],
      link: '#',
    },
  ],
};
