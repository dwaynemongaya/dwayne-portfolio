// Personal facts transcribed from Mongaya_Resume.pdf. Keep claims and links
// grounded in a supplied resume or other explicit information from Dwayne.
// Senior high school details and both school logos were supplied separately.
export const profile = {
  name: 'Dwayne Carmelo M. Mongaya',
  firstLine: 'Dwayne Carmelo',
  secondLine: 'M. Mongaya',
  initials: 'dm',
  role: 'Graduating Computer Science student',
  specialization: 'Data Science',
  location: 'Manila, Philippines',
  email: 'dwayne.mongaya24@gmail.com',
  phone: '09279208107',
  introduction: 'I’m a graduating BS Computer Science student specializing in Data Science at FEU Institute of Technology, with academic and project-based experience in data analysis, machine learning, and web development.',
  goal: 'I’m seeking an internship where I can apply my foundational knowledge, contribute to real-world projects, and continue developing my technical and professional skills.',
  // Add profile URLs only when supplied. Empty values do not produce links.
  github: '',
  linkedin: '',
};

export const skills = [
  { title: 'Programming', icon: 'code', items: ['Python', 'Java', 'SQL', 'HTML / CSS'] },
  { title: 'Data Science', icon: 'data', items: ['Jupyter Notebook', 'Google Colab', 'NumPy', 'Pandas'] },
  { title: 'Development tools', icon: 'tools', items: ['Visual Studio Code', 'Git', 'GitHub', 'Vercel'] },
  { title: 'AI tools', icon: 'spark', items: ['ChatGPT', 'Claude AI', 'Gemini', 'Codex'] },
];

export const projects = [{
  name: 'JobPath',
  category: 'Web application · Team project',
  purpose: 'Helping students and recent graduates discover their career path.',
  description: 'A web-based career recommendation platform for students and recent graduates, developed and deployed with a four-member team.',
  teamOutcome: 'Together, our four-member team developed and deployed the JobPath platform.',
  contributions: [
    'Contributed to interface design, feature implementation, and application workflows.',
    'Supported testing, debugging, research, and technical documentation.',
    'Used Codex to generate, review, and troubleshoot code, then tested and refined the implementation.',
  ],
  // The resume identifies Codex, but does not specify a framework or full stack.
  // The supplied project's vercel.app URL confirms its deployment platform.
  technologies: ['Codex · AI-assisted development', 'Vercel · Deployment'],
  url: 'https://jobpath-graymen.vercel.app/',
  github: '',
  image: '/assets/jobpath-poster.png',
  imageWidth: 1044,
  imageHeight: 1218,
  imageAlt: 'Original JobPath poster: Discover Your Career Path, showing skill assessment, career exploration, gap identification, and career mapping.',
}];

export const experience = [
  {
    role: 'Machine Learning Engineering Intern',
    organization: 'FlyRank AI',
    location: 'Remote',
    date: 'July 2026 – August 2026',
    points: [
      'Practiced basic machine learning and data preparation using messy datasets.',
      'Studied joins, aggregation, embeddings, clustering, and intent modeling to analyze search queries.',
    ],
  },
  {
    role: 'Work Immersion Trainee',
    organization: 'Office of the Senior Citizens Affairs (OSCA)',
    location: 'City Government of Meycauayan',
    date: 'May 2023',
    points: [
      'Encoded, organized, and verified senior citizen records in Microsoft Excel while maintaining data accuracy.',
      'Created Excel drop-down lists and data-validation rules to standardize entries, reduce input errors, and improve data-entry efficiency.',
    ],
  },
];

export const certifications = [
  { name: 'PMI Project Management Ready', year: '2026', url: '' },
  { name: 'IT Specialist - Python', year: '2025', url: '' },
  { name: 'CCNA: Introduction to Networks', year: '2025', url: '' },
  { name: 'Linux Essentials', year: '2025', url: '' },
];

export const education = [{
  school: 'Far Eastern University Institute of Technology',
  degree: 'Bachelor of Science in Computer Science',
  specialization: 'Specialization in Data Science',
  date: '2023 – Present',
  logo: '/assets/feutechlogo.png',
  logoAlt: 'FEU Institute of Technology logo',
  logoWidth: 200,
  logoHeight: 200,
}, {
  school: 'Meycauayan College, Inc.',
  degree: 'Senior High School',
  specialization: 'Science, Technology, Engineering, and Mathematics (STEM)',
  date: '2021–2023',
  logo: '/assets/mclogo.png',
  logoAlt: 'Meycauayan College, Inc. logo',
  logoWidth: 239,
  logoHeight: 239,
}];
