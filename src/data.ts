
export const profile = {
  name: 'LAMYA M.N.',
  initials: 'Lamya M.N.',
  role: 'Aspiring Software Engineer',
  tags: ['B.Sc. (Hons) IT & Management', 'Full-Stack Development', 'Java', 'React', 'Sri Lanka'],
  intro: 'Information Technology undergraduate interested in building practical, user-focused software solutions through full-stack development and problem-solving.',
  photo: 'photo.jpg',
  cv: 'cv.pdf',
  about: [
    "I'm pursuing a B.Sc. (Hons) in Information Technology and Management at the University of Moratuwa, Faculty of Information Technology. I enjoy developing software applications and exploring how frontend and backend technologies work together to solve real-world problems.",
    "Through individual and team projects, I've gained experience working with technologies such as React, TypeScript, Java, Spring Boot, Angular and Node.js. My project experience includes developing a full-stack accommodation platform, contributing to a courier management system, and implementing features for an air-conditioning sales and service management system. I'm currently looking for an opportunity to grow as a Software Engineering Intern and contribute to a development team."
  ],
  email: 'lamyalmnijardeen3@gmail.com',
  location: 'Sri Lanka',
  formEndpoint: 'https://formspree.io/f/moedkeel',
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/lamya-nijardeen' },
    { label: 'GitHub', url: 'https://github.com/LamyaNijardeen' },
  ],
}

export const skillGroups = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Angular', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'Express.js'] },
  { title: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { title: 'DevOps and Tools', items: ['Git', 'GitHub', 'VS Code'] },
  { title: 'Teamwork', items: ['Agile Collaboration', 'Team Development', 'Pull Requests', 'Code Review', 'Testing', 'Documentation'] },
]

export interface Project { title: string; description: string; tags: string[]; image: string; live: string; github: string }
export const projects: Project[] = [
  {
    title: 'StayBy',
    description: 'An individual full-stack accommodation platform designed to help people find affordable, verified places to stay near their destinations. Developed with a React and TypeScript frontend, Spring Boot backend and PostgreSQL database.',
    tags: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL'],
    image: 'projects/project2.jpg',
    live: '#', github: 'https://github.com/LamyaNijardeen/StayBy',
  },
  {
    title: 'AirLux – AC sales and Service Management System',
    description: 'A team-based sales and service management system for an air-conditioning business. Contributed to finance and inspection features, including payment review, invoice handling, inspection scheduling and related notifications.',
    tags: ['Angular', 'Node.js', 'Express.js', 'MongoDB'],
    image: 'projects/project3.jpg',
    live: '#', github: 'https://github.com/trivon-21',
  },
    {
    title: 'ForumX',
    description: 'A web-based blogging platform that allows users to create, publish, manage, and view blog posts through an interactive platform.',
    tags: ['HTML', 'CSS', 'PHP', 'MySQL'],
    image: 'projects/project4.jpg',
    live: '#', github: 'https://github.com/LamyaNijardeen/forumx',
  },
  {
    title: 'Ember',
    description: ' Automated Embroidery Machine (Team Project).Contributed to G-code creation using Python and developed the safety mechanism and display interface.',
    tags: ['Python', 'Arduino'],
    image: 'projects/project5.jpg',
    live: '', github: '',
  },

]

export const stats = [
  { value: projects.length, label: 'Featured Projects' },
  { value: 5, label: 'Team Members in AirLux' },
  { value: skillGroups.reduce((n, g) => n + g.items.length, 0), label: 'Technologies and Skills' },
]

export const journeyTitle = 'My Development Journey'
export const journey = [
  { when: '2024', title: 'Starting My IT Journey', detail: 'Began my undergraduate studies in Information Technology and Management at the University of Moratuwa.' },
  { when: '2026', title: 'Building with Teams', detail: 'Contributed to collaborative software projects, including SwiftDrop and the Trivon AirLux management system.' },
  { when: '2026', title: 'Exploring Individual Development', detail: 'Developing StayBy as an individual full-stack project while strengthening my software development skills.' },
  { when: 'Now', title: 'Looking Ahead', detail: 'Seeking a Software Engineering Internship to apply my knowledge, learn from experienced developers and contribute to real-world projects.' },
]
