export type ImpactMetric = {
  value: string;
  label: string;
  context: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type CommunityEntry = {
  organization: string;
  role: string;
  period: string;
  detail?: string;
};

export type Profile = {
  name: string;
  headline: string;
  tagline: string;
  targetRoles: string[];
  availability: string;
  email: string;
  location: string;
  graduation: string;
  linkedin: string;
  github: string;
  researchInterests: string[];
  impactMetrics: ImpactMetric[];
  skills: SkillGroup[];
  education: {
    institution: string;
    degree: string;
    period: string;
    gpa: string;
    capstone: string;
  };
  publication: {
    title: string;
    published: string;
    detail: string;
  };
  community: CommunityEntry[];
  resumeRequestHref: string;
};

const resumeSubject = 'Resume request - Omer Ahat';

export const profile = {
  name: 'Ömer Ahat',
  headline: 'AI Engineer & Explainable ML Researcher',
  tagline: 'I build trustworthy AI that makes complex systems useful.',
  targetRoles: ['ML Engineer', 'AI Engineer', 'Applied Scientist', 'Data Scientist'],
  availability: 'Remote preferred; hybrid acceptable in Türkiye and Europe.',
  email: 'omerahatcs@gmail.com',
  location: 'Ankara, Türkiye',
  graduation: 'June 2026',
  linkedin: 'https://www.linkedin.com/in/omerahat',
  github: 'https://github.com/omerahat',
  researchInterests: ['XAI', 'Federated learning', 'Computer vision', 'Data systems'],
  impactMetrics: [
    {
      value: '97%',
      label: 'classification accuracy',
      context: 'product classification at Superhood',
    },
    {
      value: '2B+',
      label: 'records processed',
      context: 'large-scale data pipeline at Artifica.io',
    },
    {
      value: '3.3x',
      label: 'faster LLM document processing',
      context: 'enterprise document parsing API',
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'SQL', 'Java', 'C', 'MATLAB'],
    },
    {
      category: 'Machine learning',
      items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Flower'],
    },
    {
      category: 'Data and cloud',
      items: ['Pandas', 'NumPy', 'Polars', 'Scrapy', 'BeautifulSoup', 'GCP', 'Vertex AI'],
    },
    {
      category: 'LLM and automation',
      items: ['vLLM', 'LiteLLM', 'MCP', 'Apache Airflow', 'ELK'],
    },
    {
      category: 'Backend and frontend',
      items: ['FastAPI', 'React', 'Vite', 'Tailwind CSS'],
    },
    {
      category: 'Databases and tools',
      items: ['SQLite', 'MySQL', 'Docker', 'Git', 'Playwright'],
    },
    {
      category: 'Research',
      items: ['Explainable AI', 'Federated learning', 'Computer vision', 'MLOps'],
    },
  ],
  education: {
    institution: 'Ankara University',
    degree: 'Bachelor of Science in Computer Engineering',
    period: 'June 2026',
    gpa: '3.75/4.00',
    capstone: 'XPRS — Explainable Product Recommendation System',
  },
  publication: {
    title: 'Efficient Surface Crack Detection in Ceramic Tiles Using MATLAB Image Processing',
    published: 'July 2024',
    detail: '97.5% accuracy and 0.8 seconds per unit',
  },
  community: [
    {
      organization: 'Kodluyoruz.org',
      role: 'Technical Assistant & Network Representative',
      period: 'March 2023 - May 2025',
      detail: 'Contributed to a 300k+ developer community.',
    },
    {
      organization: 'ACM Ankara',
      role: 'Founder & President',
      period: 'September 2023 - November 2024',
      detail: 'Built a community of 250+ members across 40+ universities.',
    },
    {
      organization: 'Huawei Student Community',
      role: 'VP & Tech Team Lead',
      period: '2022 - 2023',
    },
    {
      organization: 'ASELSAN Future Talents',
      role: 'Participant (top performer)',
      period: 'Spring 2024',
      detail: 'Selected as the top-performing student from Ankara University among 101 participants.',
    },
    {
      organization: 'YetGen Young Talents',
      role: 'First-place participant',
      period: 'Spring 2023',
      detail: 'Won first place in a 24-hour startup competition; presented the winning idea to a live audience of 4,000+ people.',
    },
    {
      organization: 'Harvard Aspire Leaders Program',
      role: 'Participant',
      period: 'Summer 2022',
    },
  ],
  resumeRequestHref: `mailto:omerahatcs@gmail.com?subject=${encodeURIComponent(resumeSubject)}`,
} satisfies Profile;
