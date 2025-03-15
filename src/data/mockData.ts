import { PersonalInfo } from '../types/PersonalInfo';
import { Project } from '../types/Project';
import { Experience } from '../types/Experience';

export const mockPersonalInfo: PersonalInfo = {
  name: "Terry Chen",
  title: "Senior Software Engineer",
  email: "zhiyic0808@gmail.com",
  twitter: "https://x.com/azthrunzalao0o",
  github: "https://github.com/azthrun",
  linkedin: "https://linkedin.com/in/azthrunzalao0o",
  bio: "I am a passionate senior software engineer, focusing on creating elegant and user-friendly web applications as well as secure and scalable backend systems. With over 11 years of development experience, I am proficient in .NET, Javascript, Typescript, Node.js, and cloud service technologies."
};

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "Blockchain Calendar",
    description: "A calendar application that allows users to view and manage their events on the blockchain (based on a test Ethereum chain for learning purposes).",
    image: "https://picsum.photos/seed/project1/600/400",
    technologies: ["React", "Solidity","Hardhat","JavaScript"],
    link: "https://github.com/azthrun/learning-web3"
  },
  {
    id: 2,
    title: "Portfolio",
    description: "A portfolio website for introducing the site owner. It can be used as a template for other developers to create their own portfolio websites.",
    image: "https://picsum.photos/seed/project2/600/400",
    technologies: ["React", "Typescript", "TailwindCSS"],
    link: "https://github.com/azthrun/dreambig-app-portfolios"
  },
  {
    id: 3,
    title: "Weishijia（为食家）",
    description: "A e-commerce website originally built for restaurant and food business to sell their products online, but it can be used by various types of e-commerce.",
    image: "https://picsum.photos/seed/project3/600/400",
    technologies: ["Angular", "Typescript"],
    link: "https://github.com/azthrun/dreambig-weishijia"
  }
];

export const mockExperiences: Experience[] = [
  {
    id: 1,
    company: "Optum",
    position: "Senior Software Engineer",
    period: "2022 - Present",
    description: [
      "Responsible for the architecture design and development of the company's core products",
      "Led small teams to complete the development and delivery of multiple important projects",
      "Optimized front-end and back-end performance, reducing page load time over 50%",
      "Introduced new technologies to improve team development efficiency",
      "Tutored junior developers and provided code reviews",
    ]
  },
  {
    id: 2,
    company: "Calpine",
    position: "Software Engineer",
    period: "2013 - 2022",
    description: [
      "Developed and maintained the company's first mobile application and corresponding backend system",
      "Implemented responsive design to improve mobile user experience",
      "Developed reusable component libraries to increase development efficiency",
      "Designed and implemented useful tools to improve team's productivity"
    ]
  }
]; 