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
  email: string;
  location: string;
  graduation: string;
  linkedin: string;
  github: string;
  medium: string;
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
  email: 'omerahatcs@gmail.com',
  location: 'Ankara, Türkiye',
  graduation: 'July 2026',
  linkedin: 'https://www.linkedin.com/in/omerahat',
  github: 'https://github.com/omerahat',
  medium: 'https://omerahat.medium.com',
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
      value: '2x',
      label: 'Erasmus+ internships',
      context: 'research and ML work in Helsinki and Padova',
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'SQL', 'Java', 'C', 'MATLAB', 'C#', 'TypeScript', 'JavaScript'],
    },
    {
      category: 'Machine learning',
      items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'LightGBM', 'XGBoost', 'Flower'],
    },
    {
      category: 'Data and cloud',
      items: ['Pandas', 'NumPy', 'Polars', 'Jupyter', 'Parquet', 'GCP', 'Vertex AI'],
    },
    {
      category: 'Backend and frontend',
      items: ['FastAPI', 'Flask', 'ASP.NET Core', 'React', 'Vite', 'Tailwind CSS'],
    },
    {
      category: 'Databases and tools',
      items: ['PostgreSQL', 'Supabase', 'SQLite', 'MySQL', 'Docker', 'Git', 'Playwright'],
    },
    {
      category: 'Research',
      items: ['SHAP', 'Explainable AI', 'Federated learning', 'Computer vision', 'MLOps'],
    },
  ],
  education: {
    institution: 'Ankara University',
    degree: 'Bachelor of Science in Computer Engineering',
    period: 'September 2021 - July 2026',
    gpa: '3.73/4.00',
    capstone: 'XPRS — Explainable Product Recommendation System',
  },
  publication: {
    title: 'Efficient Surface Crack Detection In Ceramic Tiles Using Matlab Image Processing',
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
      detail: 'Selected among 101 students from 101 universities.',
    },
    {
      organization: 'YetGen Young Talents',
      role: 'First-place participant',
      period: 'Spring 2023',
      detail: 'Selected among 300+ teams and 4,000+ participants.',
    },
    {
      organization: 'Harvard Aspire Leaders Program',
      role: 'Participant',
      period: 'Summer 2022',
    },
  ],
  resumeRequestHref: `mailto:omerahatcs@gmail.com?subject=${encodeURIComponent(resumeSubject)}`,
} satisfies Profile;
