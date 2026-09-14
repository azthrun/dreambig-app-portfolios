// The single source for who Terry is. Home and the résumé page both render from here, so they
// never disagree. Only the first three highlights per role appear on Home; order them by impact.
// No invented metrics: every claim must be one Terry can back up.

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Profile {
  name: string;
  headline: string;
  intro: string[];
  email: string;
  linkedIn: string;
  experience: Experience[];
  education: Education[];
}

export const profile: Profile = {
  name: 'Terry Chen',
  headline: 'Senior software engineer',
  intro: [
    "I'm a senior software engineer with more than ten years of building .NET, cloud-native and modern web applications. I keep public-facing sites that serve millions of college students running reliably, lead the move of legacy systems onto Azure and containers, and help teams ship better code through architecture, mentoring and review.",
    'Outside work I build open-source and home projects, keep up with where the industry is heading, and spend time with my family, usually with a good cup of coffee.',
  ],
  email: 'sterryc1986@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/azthrunzalao0o/',
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'UnitedHealth Group',
      location: 'Texas',
      period: '2022 – present',
      highlights: [
        'Apply AI coding agents to legacy modernization work, speeding up code analysis, refactoring and test coverage while keeping every change under human review.',
        'Use Codex, Claude Code and GitHub Copilot throughout the AI-driven development lifecycle (AIDLC), from requirements and design through implementation, testing and code review.',
        'Lead modernization of legacy systems, migrating applications onto Azure and containerized environments.',
        'Keep public-facing websites serving millions of college students running reliably, along with the REST APIs, message queues and scheduled jobs behind them.',
        'Design scalable Angular and .NET architecture for new applications.',
        'Mentor junior developers to raise team velocity and code quality.',
        'Conduct thorough code reviews to uphold high development standards before deployment.',
        'Collaborate with business analysts and QA teams to deliver robust, production-ready solutions.',
      ],
    },
    {
      role: 'Software Analyst',
      company: 'Calpine Corporation',
      location: 'Texas',
      period: '2013 – 2022',
      highlights: [
        "Led the migration of the team's applications to Azure cloud infrastructure.",
        'Built cross-platform mobile apps that power plant operators relied on for meter readings and inventory management.',
        'Gave senior management the reporting they needed through SQL reports in SSRS and Power BI.',
      ],
    },
  ],
  education: [
    {
      degree: 'M.S. in Software Engineering',
      institution: 'University of Houston–Clear Lake',
      period: '2011 – 2013',
      details: [
        'Specialized in the software development life cycle and software design patterns.',
        'Graduate teaching assistant and research assistant for robotic design and application development.',
        'STEM scholarship recipient throughout the program.',
      ],
    },
    {
      degree: 'B.S. in Computer Science',
      institution: 'University of Houston–Clear Lake',
      period: '2008 – 2011',
      details: [
        'Scholarship recipient from 2009 to 2011.',
        'Designed and developed an e-commerce website as a capstone project.',
      ],
    },
  ],
};
