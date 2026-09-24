/**
 * Shared Mock Database for InternSphere Portal
 * Verified internships, categories, and applicant pipeline
 */

export const INITIAL_JOBS = [
  {
    id: 'wso2-se',
    company: 'WSO2 LLC',
    logoText: 'W',
    logoBg: 'deep-orange',
    title: 'Associate Software Engineer Intern',
    location: 'Colombo 03 • Hybrid',
    category: 'software',
    stipend: 'LKR 80,000 / mo',
    stipendVal: 80000,
    duration: '6 Months',
    mode: 'Hybrid',
    deadline: 'Closes in 4 days',
    isBookmarked: false,
    skills: ['Java', 'React', 'Docker', 'Ballerina', 'Microservices'],
    description: 'Join the API Management and Choreo Cloud platform teams. Work on distributed microservices, Ballerina runtime optimizations, and high-performance cloud endpoints.',
    requirements: [
      'Undergraduate in Computer Science, Software Engineering, or related computing field.',
      'Strong fundamentals in Java, OOP principles, and data structures.',
      'Hands-on experience with REST APIs and containerization (Docker).',
      'Familiarity with React or Kubernetes is an advantage.',
      'Eager to contribute to active open-source repositories.'
    ],
    benefits: ['Mentorship by Principal Architects', 'Flexible Work Setup', 'Pre-Placement Offer (PPO) Eligibility', 'Medical Insurance Cover']
  },
  {
    id: 'ifs-ai',
    company: 'IFS World',
    logoText: 'IFS',
    logoBg: 'purple',
    title: 'AI & Machine Learning Intern',
    location: 'Colombo 01 • On-Site',
    category: 'data',
    stipend: 'LKR 85,000 / mo',
    stipendVal: 85000,
    duration: '6 Months',
    mode: 'On-Site',
    deadline: 'Closes in 6 days',
    isBookmarked: false,
    skills: ['Python', 'PyTorch', 'FastAPI', 'Pandas', 'Transformers'],
    description: 'Collaborate with the industrial AI research group to implement predictive maintenance models, LLM agents, and generative search pipelines for enterprise ERP customers.',
    requirements: [
      'Undergraduate in AI, Data Science, Computer Science, or Mathematics.',
      'Solid command of Python and deep learning frameworks (PyTorch or TensorFlow).',
      'Knowledge of prompt engineering, vector databases, or statistical modeling.',
      'Strong communication skills for presenting research findings.'
    ],
    benefits: ['Access to High-Performance GPU Clusters', 'Research Paper Publishing Support', 'Hybrid Flexibility after onboarding', 'Daily Subsidized Meals']
  },
  {
    id: 'sysco-ux',
    company: 'Sysco LABS',
    logoText: 'SL',
    logoBg: 'green-8',
    title: 'UI/UX Product Design Intern',
    location: 'Colombo 03 • Hybrid',
    category: 'design',
    stipend: 'LKR 75,000 / mo',
    stipendVal: 75000,
    duration: '6 Months',
    mode: 'Hybrid',
    deadline: 'Closes in 8 days',
    isBookmarked: false,
    skills: ['Figma', 'Wireframing', 'Design Systems', 'User Research'],
    description: 'Design intuitive enterprise supply chain workflows. Create prototypes in Figma, conduct usability tests, and refine component libraries in our global design system.',
    requirements: [
      'Degree in Design, HCI, Multimedia, or software-related discipline.',
      'Strong portfolio showcasing user journey mapping and UX problem-solving.',
      'Proficiency in Figma auto-layout, design tokens, and components.',
      'Basic understanding of web technologies (HTML/CSS) is an advantage.'
    ],
    benefits: ['Work on applications used by Fortune 50 clients', 'Design System Training', 'MacBook Pro provided', 'Wellness & Gym reimbursement']
  },
  {
    id: 'virtusa-devops',
    company: 'Virtusa',
    logoText: 'V',
    logoBg: 'blue-9',
    title: 'DevOps & Cloud Engineering Intern',
    location: 'Colombo 07 • Hybrid',
    category: 'software',
    stipend: 'LKR 75,000 / mo',
    stipendVal: 75000,
    duration: '6 Months',
    mode: 'Hybrid',
    deadline: 'Closes in 5 days',
    isBookmarked: false,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform'],
    description: 'Support CI/CD automated deployment pipelines, Kubernetes cluster maintenance, and infrastructure-as-code scripting on AWS and Microsoft Azure.',
    requirements: [
      'Undergraduate in Computer Networks, Systems Engineering, or CS.',
      'Understanding of Linux OS environments and Bash scripting.',
      'Familiarity with GitHub Actions or Jenkins CI/CD.',
      'AWS / Cloud certifications are an added advantage.'
    ],
    benefits: ['Cloud Certification Sponsorship', 'Global Project Exposure', 'Flexible Hours', 'Career Mentorship']
  },
  {
    id: 'lseg-ba',
    company: 'London Stock Exchange Group',
    logoText: 'LSEG',
    logoBg: 'blue-10',
    title: 'Trainee Business Analyst',
    location: 'Colombo 02 • Hybrid',
    category: 'business',
    stipend: 'LKR 90,000 / mo',
    stipendVal: 90000,
    duration: '1 Year Trainee',
    mode: 'Hybrid',
    deadline: 'Closes in 7 days',
    isBookmarked: false,
    skills: ['Agile', 'JIRA', 'SQL', 'BPMN', 'User Stories'],
    description: 'Gather business specifications, write Agile user stories, and evaluate high-volume capital market financial trading and market data feeds.',
    requirements: [
      'Final year student or graduate in Business Information Systems, CS, or Finance.',
      'Superb documentation and client-facing communication skills.',
      'Understanding of Software Development Life Cycle (SDLC) & Scrum.',
      'Proficiency in querying relational databases using SQL.'
    ],
    benefits: ['Global Capital Markets Training', 'Competitive Trainee Allowance', 'Direct Corporate Networking', 'Hybrid 3 days work-from-home']
  },
  {
    id: 'nova-fe',
    company: 'Nova Global Labs',
    logoText: 'N',
    logoBg: 'teal-8',
    title: 'Frontend React & Next.js Intern',
    location: 'Remote • Global Team',
    category: 'software',
    stipend: '$350 USD / mo',
    stipendVal: 110000,
    duration: '6 Months',
    mode: '100% Remote',
    deadline: 'Closes in 3 days',
    isBookmarked: false,
    skills: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Redux'],
    description: 'Build responsive, lightning-fast web applications using Next.js 14, Tailwind CSS, TypeScript, and state management in an international async team setup.',
    requirements: [
      'Proficiency in modern JavaScript (ES6+), TypeScript, and React hooks.',
      'Hands-on portfolio or GitHub repositories showcasing web applications.',
      'Familiarity with Tailwind CSS and responsive design principles.',
      'Strong discipline for independent remote work.'
    ],
    benefits: ['USD Stipend', '100% Remote flexibility', 'International team experience', 'Flexible working hours']
  },
  {
    id: 'dialog-cyber',
    company: 'Dialog Axiata PLC',
    logoText: 'D',
    logoBg: 'red-9',
    title: 'Cybersecurity Operations Intern',
    location: 'Colombo 02 • On-Site',
    category: 'software',
    stipend: 'LKR 70,000 / mo',
    stipendVal: 70000,
    duration: '6 Months',
    mode: 'On-Site',
    deadline: 'Closes in 9 days',
    isBookmarked: false,
    skills: ['SOC', 'Wireshark', 'SIEM', 'Network Security', 'Python'],
    description: 'Work in the Security Operations Center (SOC). Monitor telemetry logs, analyze network vulnerabilities, and assist in incident response procedures.',
    requirements: [
      'Undergraduate in Information Security, Networking, or Computer Science.',
      'Foundational understanding of TCP/IP networking protocols and firewalls.',
      'Basic knowledge of SIEM tools and vulnerability assessment tools (Nmap/Wireshark).'
    ],
    benefits: ['Telecom Infrastructure Exposure', 'Enterprise SOC Training', 'Pre-placement consideration', 'Transportation allowance']
  },
  {
    id: 'octave-data',
    company: 'Octave (John Keells)',
    logoText: 'JK',
    logoBg: 'indigo-9',
    title: 'Data Analytics & BI Intern',
    location: 'Colombo 02 • Hybrid',
    category: 'data',
    stipend: 'LKR 80,000 / mo',
    stipendVal: 80000,
    duration: '6 Months',
    mode: 'Hybrid',
    deadline: 'Closes in 10 days',
    isBookmarked: false,
    skills: ['Power BI', 'SQL', 'Python', 'Excel', 'Data Modeling'],
    description: 'Build executive decision dashboards, analyze customer retail data across supermarket chains, and optimize pricing and logistics KPIs.',
    requirements: [
      'Degree in Statistics, Computer Science, Data Analytics, or Business Intelligence.',
      'Proficiency in writing complex SQL queries and building Power BI dashboards.',
      'Analytical curiosity and ability to synthesize trends into executive reports.'
    ],
    benefits: ['Largest conglomerate in Sri Lanka', 'Exposure to high-scale enterprise retail data', 'Hybrid work schedule']
  }
]

export const SPECIALIZATIONS = [
  {
    id: 'software',
    title: 'Software & Cloud Engineering',
    rolesCount: '480+ Roles',
    avgStipend: 'LKR 75,000 - 110,000 / mo',
    demand: 'Very High',
    demandColor: 'positive',
    icon: 'code',
    bg: 'blue-1',
    color: 'primary',
    desc: 'Full-stack development, Java, Node.js, React, Microservices architectures, and Cloud engineering.',
    skills: ['Java', 'React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'Spring Boot']
  },
  {
    id: 'data',
    title: 'AI & Data Science',
    rolesCount: '195+ Roles',
    avgStipend: 'LKR 80,000 - 120,000 / mo',
    demand: 'Trending High',
    demandColor: 'positive',
    icon: 'psychology',
    bg: 'green-1',
    color: 'positive',
    desc: 'Machine Learning, Deep Learning, Natural Language Processing, Big Data pipelines, and BI.',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Pandas', 'SQL', 'Power BI', 'FastAPI']
  },
  {
    id: 'design',
    title: 'UI/UX & Product Design',
    rolesCount: '140+ Roles',
    avgStipend: 'LKR 70,000 - 95,000 / mo',
    demand: 'High',
    demandColor: 'primary',
    icon: 'palette',
    bg: 'purple-1',
    color: 'purple',
    desc: 'User experience research, Figma wireframing, interactive prototyping, and design systems.',
    skills: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Accessibility']
  },
  {
    id: 'business',
    title: 'Business Analysis & Strategy',
    rolesCount: '220+ Roles',
    avgStipend: 'LKR 75,000 - 100,000 / mo',
    demand: 'High',
    demandColor: 'primary',
    icon: 'trending_up',
    bg: 'amber-1',
    color: 'warning',
    desc: 'Business requirements gathering, Agile product owner assistance, BPMN modeling, and KPIs.',
    skills: ['Agile / Scrum', 'JIRA', 'SQL', 'BPMN', 'User Stories', 'Financial Modeling']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & QA Testing',
    rolesCount: '110+ Roles',
    avgStipend: 'LKR 65,000 - 90,000 / mo',
    demand: 'Growing Fast',
    demandColor: 'info',
    icon: 'security',
    bg: 'red-1',
    color: 'negative',
    desc: 'Information security analysis, vulnerability assessments, Selenium automation, and CI test pipelines.',
    skills: ['Wireshark', 'SOC', 'Selenium', 'Cypress', 'Pen-testing', 'Linux']
  },
  {
    id: 'fintech',
    title: 'Fintech & Investment Banking',
    rolesCount: '85+ Roles',
    avgStipend: 'LKR 80,000 - 110,000 / mo',
    demand: 'High',
    demandColor: 'primary',
    icon: 'account_balance',
    bg: 'teal-1',
    color: 'teal-9',
    desc: 'Capital markets data, equity research support, algorithmic trading systems, and corporate finance.',
    skills: ['Financial Analysis', 'Excel VBA', 'Python', 'Trading Systems', 'Risk Analysis']
  }
]

export const MOCK_APPLICATIONS = [
  {
    id: 'app-1',
    company: 'WSO2 LLC',
    role: 'Associate Software Engineer Intern',
    stipend: 'LKR 80,000 / mo',
    appliedDate: 'Sep 20, 2026',
    stage: 'applied',
    stageName: 'Applied',
    notes: 'Resume submitted directly to Colombo Engineering Team.',
    nextAction: 'Under initial screening'
  },
  {
    id: 'app-2',
    company: 'Virtusa',
    role: 'DevOps & Cloud Engineering Intern',
    stipend: 'LKR 75,000 / mo',
    appliedDate: 'Sep 18, 2026',
    stage: 'applied',
    stageName: 'Applied',
    notes: 'Application forwarded to Cloud Innovation Lead.',
    nextAction: 'Review expected within 48h'
  },
  {
    id: 'app-3',
    company: 'Sysco LABS',
    role: 'UI/UX Product Design Intern',
    stipend: 'LKR 75,000 / mo',
    appliedDate: 'Sep 15, 2026',
    stage: 'in_review',
    stageName: 'Shortlisted / In Review',
    notes: 'Figma portfolio passed preliminary screening. Assigned to Senior Design Manager.',
    nextAction: 'Interview invitation pending'
  },
  {
    id: 'app-4',
    company: 'London Stock Exchange Group',
    role: 'Trainee Business Analyst',
    stipend: 'LKR 90,000 / mo',
    appliedDate: 'Sep 12, 2026',
    stage: 'interview',
    stageName: 'Technical Interview',
    notes: 'Technical discussion & scenario questions scheduled.',
    nextAction: 'Interview on Sep 26, 10:30 AM via Teams'
  },
  {
    id: 'app-5',
    company: 'IFS World',
    role: 'AI & Machine Learning Intern',
    stipend: 'LKR 85,000 / mo',
    appliedDate: 'Sep 05, 2026',
    stage: 'offered',
    stageName: 'Offer Received 🎉',
    notes: 'Offer letter generated! 6-month placement starting Nov 2026.',
    nextAction: 'Digital offer letter signed & accepted'
  }
]
