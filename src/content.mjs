// Personal facts transcribed from Mongaya_Resume.pdf. Keep claims and links
// grounded in a supplied resume or other explicit information from Dwayne.
// Senior high school details and both school logos were supplied separately.
export const profile = {
  name: 'Dwayne Carmelo M. Mongaya',
  firstLine: 'Dwayne Carmelo',
  secondLine: 'M. Mongaya',
  initials: 'dm',
  role: 'Graduating Computer Science student',
  homeIntroduction: 'I’m a graduating Computer Science student specializing in Data Science at FEU Institute of Technology, with academic and project experience in data analysis, machine learning, and web development.',
  specialization: 'Data Science',
  location: 'Manila, Philippines',
  email: 'dwayne.mongaya24@gmail.com',
  phone: '09279208107',
  introduction: 'I’m a graduating BS Computer Science student specializing in Data Science at FEU Institute of Technology, with academic and project-based experience in data analysis, machine learning, and web development.',
  goal: 'I’m seeking an internship where I can apply my foundational knowledge, contribute to real-world projects, and continue developing my technical and professional skills.',
  resume: '/assets/Mongaya_Resume.pdf',
  // Add profile URLs only when supplied. Empty values do not produce links.
  github: '',
  linkedin: 'https://www.linkedin.com/in/dwayne-mongaya-514000330',
};

export const skills = [
  { title: 'Programming', icon: 'code', items: ['Python', 'Java', 'SQL', 'HTML / CSS'] },
  { title: 'Data Science', icon: 'data', items: ['Jupyter Notebook', 'Google Colab', 'NumPy', 'Pandas'] },
  { title: 'Development tools', icon: 'tools', items: ['Visual Studio Code', 'Git', 'GitHub', 'Vercel'] },
  { title: 'AI tools', icon: 'spark', items: ['ChatGPT', 'Claude AI', 'Gemini', 'Codex'] },
];

export const projects = [{
  id: 'jobpath',
  name: 'JobPath',
  category: 'Web application · Team project',
  purpose: 'Helping students and recent graduates discover their career path.',
  summary: 'Career recommendations for students and recent graduates.',
  imageLabel: 'Original JobPath poster',
  description: 'A web-based career recommendation platform for students and recent graduates, developed and deployed with a four-member team.',
  teamOutcome: 'Our four-member team, Gray Men, developed and deployed the JobPath platform.',
  contributions: [
    'Contributed to interface design, feature implementation, and application workflows.',
    'Supported testing, debugging, research, and technical documentation.',
    'Used Codex to generate, review, and troubleshoot code, then tested and refined the implementation.',
  ],
  // Stack verified against the repository supplied by Dwayne on Nov 18, 2026.
  technologies: ['React', 'TypeScript', 'Python', 'MongoDB'],
  stack: [
    { label: 'Frontend', tools: 'React, TypeScript, Tailwind CSS, Vite' },
    { label: 'Backend', tools: 'Node.js, Express, TypeScript' },
    { label: 'Database', tools: 'MongoDB' },
    { label: 'ML service', tools: 'Python, FastAPI, scikit-learn, NumPy' },
  ],
  stackSources: [
    'https://github.com/Neater17/jobpath/blob/main/frontend/package.json',
    'https://github.com/Neater17/jobpath/blob/main/backend/package.json',
    'https://github.com/Neater17/jobpath/blob/main/Python/requirements.txt',
  ],
  url: 'https://jobpath-graymen.vercel.app/',
  github: 'https://github.com/Neater17/jobpath',
  image: '/assets/jobpath-poster.png',
  imageWidth: 1044,
  imageHeight: 1218,
  imageAlt: 'Original JobPath poster: Discover Your Career Path, showing skill assessment, career exploration, gap identification, and career mapping.',
  // Award photo, caption, and connection to JobPath supplied by Dwayne.
  awards: [{
    image: '/assets/best-thesis-award.jpeg',
    imageAlt: 'Best Thesis certificate for the JobPath system by Gray Men in Behavioral, Human, and Social Analytics at FEU Institute of Technology, 2026.',
    imageWidth: 1144,
    imageHeight: 1124,
    caption: 'Best Thesis Award - Behavioral, Human, and Social Analytics | FEU Institute of Technology | 2026',
  }],
}, {
  id: 'expense',
  name: 'Expense',
  category: 'Web application · Personal finance',
  purpose: 'A clearer view of everyday spending and monthly budgets.',
  summary: 'Expense tracking, budgets, and spending insights in one dashboard.',
  description: 'A personal expense analyzer for recording expenses, setting monthly budgets, and reviewing spending over time. The dashboard brings together daily spending, category breakdowns, recent expenses, and monthly comparisons.',
  // Verified against the existing Personal_Expense_Analyzer project files.
  technologies: ['React', 'Python', 'FastAPI', 'Supabase'],
  stack: [
    { label: 'Frontend', tools: 'React, JavaScript, Vite' },
    { label: 'Backend', tools: 'Python, FastAPI' },
    { label: 'Data & authentication', tools: 'Supabase Auth, PostgreSQL' },
  ],
  url: 'https://personal-expense-analyzer-ashen.vercel.app/',
  image: '/assets/expense-dashboard.png',
  imageLayout: 'landscape',
  imageWidth: 2798,
  imageHeight: 1612,
  imageLabel: 'Expense dashboard screenshot',
  imageAlt: 'Expense personal analyzer dashboard with monthly totals, budget cards, daily spending, and spending by category.',
}, {
  id: 'rowcheck',
  name: 'RowCheck',
  category: 'Web application · Data quality',
  purpose: 'Check CSV data quality before taking the next step.',
  summary: 'CSV validation, configurable rules, and clear issue reports.',
  description: 'A CSV data quality analyzer for previewing original values, configuring validation rules, and reviewing records that need attention. It checks required values, number and date formats, ranges, and duplicates, with filters for reviewing issues and a downloadable CSV report.',
  // Verified against the existing RowCheck project files.
  technologies: ['React', 'TypeScript', 'Python', 'pandas'],
  stack: [
    { label: 'Frontend', tools: 'React, TypeScript, Vite' },
    { label: 'Backend', tools: 'Python, FastAPI' },
    { label: 'Data validation', tools: 'pandas, configurable validation rules' },
  ],
  url: 'https://rowcheck.vercel.app/',
  image: '/assets/rowcheck-dashboard.png',
  imageLayout: 'landscape',
  imageWidth: 2872,
  imageHeight: 1530,
  imageLabel: 'RowCheck CSV analyzer screenshot',
  imageAlt: 'RowCheck CSV analyzer with upload, configure rules, and review results steps above a preview of uploaded data.',
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

// Displayed from oldest to newest issue/exam date.
export const certifications = [
  {
    id: 'linux', name: 'Linux Essentials', category: 'Operating systems',
    year: '2025', date: 'March 23, 2025', issuer: 'Cisco Networking Academy · NDG', kind: 'Statement of achievement',
    description: 'Statement of achievement for completing Linux Essentials through Cisco Networking Academy in collaboration with NDG.',
    metadata: [{ label: 'Document', value: 'Statement of achievement' }],
    image: '/assets/certificates/linux.jpg', pdf: '/assets/certificates/linux.pdf', width: 1500, height: 1159,
  },
  {
    id: 'python', name: 'Information Technology Specialist — Python', category: 'Programming',
    year: '2025', date: 'July 16, 2025', issuer: 'Certiport · Pearson VUE', kind: 'Specialist certification',
    description: 'Credential in Python programming, awarded after meeting the Information Technology Specialist certification requirements.',
    metadata: [{ label: 'Validity on document', value: 'Five years from the issue date' }, { label: 'Verification code', value: 'wqW8Q-2FvW' }],
    verificationUrl: 'https://verify.certiport.com/', verificationLabel: 'Certiport verification',
    image: '/assets/certificates/python.jpg', pdf: '/assets/certificates/python.pdf', width: 1500, height: 1159,
  },
  {
    id: 'ccna', name: 'CCNA: Introduction to Networks', category: 'Networking',
    year: '2025', date: 'August 2, 2025', issuer: 'Cisco Networking Academy', kind: 'Certificate of course completion',
    description: 'Certificate of course completion for CCNA: Introduction to Networks through Cisco Networking Academy.',
    metadata: [{ label: 'Document', value: 'Certificate of course completion' }],
    image: '/assets/certificates/ccna.jpg', pdf: '/assets/certificates/ccna.pdf', width: 1500, height: 1159,
  },
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
}];
