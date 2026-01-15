
export type Page = 'home' | 'services' | 'courses' | 'portfolio-catalog';

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
  time?: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  video: string;
  alt: string;
}

export interface DetailedPortfolioProject {
  title: string;
  url: string;
  tagline: string;
  description: string;
  techFocus: {
    layout: string;
    effects: string;
    performance: string;
  };
  image: string;
  video?: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  highlight: string;
  image: string;
  rating: number;
  date?: string;
}

// Added ChatMessage interface to support ChatBot component
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
