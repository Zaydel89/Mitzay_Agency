
export type Page = 'home' | 'services' | 'courses';

export interface NavLink {
  label: string;
  page: Page;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: string;
  features: string[];
}

export interface DetailedService {
  title: string;
  objective: string;
  deliverables: string[];
  time: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  image: string;
  alt: string;
  kpis: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  highlight: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
