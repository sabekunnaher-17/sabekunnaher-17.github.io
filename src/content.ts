export const person = {
  name: 'Sabekunnaher Antora',
  role: 'Full-Stack Developer',
  email: 'antorasabekunnaher@gmail.com',
  github: 'https://github.com/sabekunnaher-17',
  linkedin: 'https://www.linkedin.com/in/sabekunnaher-antora17',
  cv: '/assets/Sabekunnaher_Antora_CV.pdf',
  portrait: '/assets/sabekunnaher-antora-portrait.webp',
  university: 'American International University-Bangladesh',
}

export const destinations = [
  { slug: '', label: 'Home', title: 'Sabekunnaher Antora — Full-Stack Developer', description: 'Sabekunnaher Antora: full-stack development, secure .NET applications, software testing, and academic research.' },
  { slug: 'about', label: 'About', title: 'About — Sabekunnaher Antora', description: 'Meet Antora, a Computer Science and Engineering student at AIUB building thoughtful, well-tested software.' },
  { slug: 'skills', label: 'Skills', title: 'Skills — Sabekunnaher Antora', description: 'A toolkit spanning C#, .NET, Java, React, databases, desktop applications, automated testing, and GitHub Actions.' },
  { slug: 'projects', label: 'Projects', title: 'Selected Work — Sabekunnaher Antora', description: 'ProjectFlow, Q-Billiard Shop, Hospital Appointment System, and Solar System Simulation: selected academic and software projects.' },
  { slug: 'research', label: 'Research', title: 'Research — Sabekunnaher Antora', description: 'A study of source-label recall, trust, and de-influencing content, with verified analysis and manuscript links.' },
  { slug: 'leadership', label: 'Leadership', title: 'Academic Leadership — Sabekunnaher Antora', description: 'Thesis and academic project leadership: study planning, task coordination, progress tracking, and integration.' },
  { slug: 'education', label: 'Education & Certifications', title: 'Education — Sabekunnaher Antora', description: 'Computer Science and Engineering at AIUB, relevant coursework, and the Ostad AI Engineering Bootcamp.' },
  { slug: 'contact', label: 'Contact', title: 'Contact — Sabekunnaher Antora', description: 'Connect with Sabekunnaher Antora about full-stack development, .NET, software testing, and research.' },
] as const

export const routePath = (slug: string) => slug ? `/${slug}/` : '/'

export const expertise = [
  ['Languages', 'C#', 'Java', 'C++', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'SQL', 'HTML', 'CSS'],
  ['Backend', 'ASP.NET Core', 'MVC', 'Web API', 'EF Core', 'ASP.NET Core Identity', '.NET Framework', 'Node.js', 'NestJS', 'REST APIs'],
  ['Frontend', 'React.js', 'Next.js', 'Razor', 'Tailwind CSS', 'Bootstrap 5'],
  ['Desktop', 'Java Swing'],
  ['Databases', 'SQL Server', 'SSMS', 'MySQL', 'PostgreSQL', 'SQLite'],
  ['Testing & QA', 'Unit Testing', 'Integration Testing', 'Playwright', 'pytest', 'Vitest'],
  ['Version Control & CI', 'Git', 'GitHub', 'GitHub Actions'],
]

export const work = [
  {
    key: 'projectflow', name: 'ProjectFlow', subtitle: 'A workspace for work that moves.', category: 'FULL-STACK / .NET',
    repo: 'https://github.com/sabekunnaher-17/ProjectFlow',
    role: 'Full-stack implementation',
    problem: 'Keeping organizations, people, projects, and deadlines connected calls for more than a task list.',
    solution: 'A layered project workspace brings MVC pages and a REST API onto shared services, with Kanban and table views for everyday planning.',
    highlights: ['Three Identity roles, account lockout, IP limits, and secure sessions', 'Dashboards, reminders, notifications, task comments, and CSV reports', 'Unit, integration, and Playwright coverage in SQL Server CI'],
    stack: ['C#', 'ASP.NET Core MVC', 'Web API', 'EF Core', 'SQL Server'],
  },
  {
    key: 'billiard', name: 'Q-Billiard Shop', subtitle: 'A desktop shop, built around choice.', category: 'DESKTOP / JAVA',
    repo: 'https://github.com/sabekunnaher-17/Q-Billiard-Shop',
    role: 'Academic desktop application',
    problem: 'A billiard-equipment catalog needs different workflows for customers and administrators.',
    solution: 'Java Swing interfaces connect separate user/admin logins, product browsing, a custom cue builder, and local file storage.',
    highlights: ['Product catalog and custom cue configuration', 'bKash, Nagad, and card payment screens', 'File-based user, admin, and order records'],
    note: 'Payment screens are academic UI demonstrations, not verified payment-gateway integrations. Desktop project; no live web demo.',
    stack: ['Java', 'Java Swing', 'File I/O'],
  },
  {
    key: 'hospital', name: 'Hospital Appointment System', subtitle: 'Making the next appointment clearer.', category: 'TEAM PROJECT / WEB',
    repo: 'https://github.com/hospital-appointment-team/hospital-appointment-system',
    role: 'Appointment booking & dashboard workflows',
    problem: 'Patients and staff need authorized views of the same doctors, schedules, and appointments.',
    solution: 'The team’s PHP MVC application connects registration, doctor/specialization selection, booking, and status dashboards. My contribution covers patient booking and appointment dashboard/status management; my teammate handled authentication and doctor administration.',
    highlights: ['Patient booking by doctor and specialization', 'Appointment dashboards, ownership, and status workflows', 'MVC with shared services and environment-based configuration'],
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    key: 'solar', name: 'Solar System Simulation', subtitle: 'An exercise in motion and perspective.', category: 'ACADEMIC / GRAPHICS',
    repo: 'https://github.com/sabekunnaher-17/Solar-System-Simulation',
    role: 'Academic computer graphics project',
    problem: 'Planetary relationships become easier to explore when motion and perspective are visible.',
    solution: 'A C++/OpenGL project visualizes planetary orbits, rotation, and lighting with keyboard camera controls, moons, and rings.',
    highlights: ['Interactive orbital motion and camera views', 'OpenGL lighting and visual effects'],
    stack: ['C++', 'OpenGL', 'GLUT'],
  },
] as const

export const study = {
  title: 'Unnoticed Disclosure: Readers Do Not Register AI Source Labels on De-Influencing Content',
  repo: 'https://github.com/sabekunnaher-17/Unnoticed-Disclosure-Readers-Do-Not-Register-AI',
  paper: 'https://github.com/sabekunnaher-17/Unnoticed-Disclosure-Readers-Do-Not-Register-AI/blob/main/paper/Unnoticed%20Disclosure%20Readers%20Do%20Not%20Register%20AI.pdf',
  findings: [
    { value: '183', label: 'Valid participants', detail: 'Retained after response-quality and consent exclusions.' },
    { value: '50.8%', label: 'Correct source recall', detail: 'Across both source-label conditions; no better than chance.' },
    { value: '0.578', label: 'Trust prediction · R²', detail: 'Cross-validated ridge regression.' },
    { value: '0.879', label: 'Anti-consumption · AUC', detail: 'Cross-validated logistic regression.' },
  ],
}

export const coursework = ['Algorithms', 'Databases', 'Object-Oriented Programming', 'Software Engineering', 'Computer Networks', 'Advanced Programming with .NET', 'Advanced Programming in Web Technologies', 'SQAT']
