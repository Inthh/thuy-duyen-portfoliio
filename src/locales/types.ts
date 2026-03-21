export interface NavLink {
  href: string;
  label: string;
}

export interface HeroRecommendation {
  name: string;
  text: string;
}

export interface Hero {
  badges: string[];
  name: string;
  bio: string;
  ctaText: string;
  recommendation: HeroRecommendation;
}

export interface Journey {
  title: string;
  image: string;
  content: string;
}

export interface WorkHistoryItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
  icon: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  icon: string;
  image: string;
}

export interface Skills {
  product: string[];
  uxDesign: string[];
}

export interface ToolItem {
  name: string;
  icon: string;
}

export interface Toolbox {
  title: string;
  subtitle: string;
  tools: ToolItem[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export interface Portfolio {
  title: string;
  subtitle: string;
  viewMoreText: string;
  projects: PortfolioProject[];
}

export interface Footer {
  title: string;
  description: string;
  ctaText: string;
  copyright: string;
}

export interface Sections {
  workHistory: string;
  education: string;
  skillsTools: string;
  skills: string;
  tools: string;
  product: string;
  uxDesign: string;
}

export interface Common {
  switchToEnglish: string;
  switchToVietnamese: string;
  getInTouch: string;
  sections: Sections;
}

export interface PortfolioTranslations {
  siteName: string;
  navLinks: NavLink[];
  hero: Hero;
  journey: Journey;
  workHistory: WorkHistoryItem[];
  educationHeaderImages: string[];
  education: EducationItem[];
  skills: Skills;
  toolbox: Toolbox;
  portfolio: Portfolio;
  footer: Footer;
  common: Common;
}
