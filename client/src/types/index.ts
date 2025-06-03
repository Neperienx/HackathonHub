export interface Project {
  id: string;
  userId: string;
  title: string;
  pitch: string;
  mvpInfo: string;
  resourcesNecessary: string;
  market: string;
  status: 'private' | 'public';
  image?: string; // Base64 encoded image
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectUpvote {
  id: string;
  projectId: string;
  userId: string;
  createdAt: string;
}

export interface Config {
  landing: {
    title: string;
    description: string;
    timeline: TimelineItem[];
  };
  rules: {
    teamSize: string;
    deliverables: string[];
    evaluationCriteria: string[];
  };
  resources: {
    technologies: Technology[];
  };
}

export interface TimelineItem {
  label: string;
  date: string;
}

export interface Technology {
  name: string;
  description: string;
}
