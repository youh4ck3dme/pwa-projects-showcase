export interface ProjectCCT {
  id: number;
  api_id: number;
  project_title: string;
  project_tagline: string;
  project_desc: string;
  project_content: string;
  project_type: string;
  project_category: string;
  project_client: string;
  project_date: string;
  project_link: string;
  project_img_id: number;
  project_gal_id: string;
  featured_image_url?: string;
  title?: {
    rendered: string;
  };
  ai_recommendations?: string[];
  popularity_score?: number;
  similar_projects?: ProjectCCT[];
  ai_tech_stack?: string[];
  ai_architecture?: string;
  ai_arch_analysis?: string;
  ai_market_intel?: string;
  ai_security_audit?: string;
  suggested_budget?: string;
  suggested_timeline?: string;
  neuralMetadata?: {
    contextWeights?: Record<string, number>;
    lastCalibration?: string;
  };
  neural_meta?: {
    tech_stack?: string[];
    architecture?: string;
    arch_analysis?: string;
    market_intel?: string;
    security_audit?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  year: string;
  client?: string;
  status: 'live' | 'development' | 'concept';
  features: string[];
  languages?: {
    sk?: string;
    en?: string;
    de?: string;
    fr?: string;
    es?: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  documentation?: {
    sk?: string;
    en?: string;
    de?: string;
    fr?: string;
    es?: string;
  };
  screenshots?: string[];
  metrics?: {
    users?: number;
    performance?: string;
    security?: string;
  };
  neuralMetadata?: {
    contextWeights?: Record<string, number>;
    lastCalibration?: string;
  };
}

export interface ProjectTypeCCT {
  id: number;
  name: string;
  slug: string;
}

export interface ProjectCategoryCCT {
  id: number;
  name: string;
  slug: string;
}
