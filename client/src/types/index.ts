export interface Team {
  id: string;
  teamName: string;
  projectName: string;
  projectDescription: string;
  members: TeamMember[];
  primaryTechnology: string;
  status: 'ideation' | 'prototyping' | 'testing' | 'submitted';
  progress: number;
  createdAt: string;
}

export interface TeamMember {
  name: string;
  email: string;
  role?: string;
}

export interface Submission {
  id: string;
  teamId: string;
  projectTitle: string;
  projectSummary: string;
  pitchDeckUrl: string;
  demoVideoUrl: string;
  mvpDemoUrl: string;
  businessImpact: string;
  keyLearnings: string;
  nextSteps: string;
  techStack: string;
  sourceCodeUrl: string;
  submittedAt: string;
}

export interface Evaluation {
  id: string;
  submissionId: string;
  teamId: string;
  innovation: number;
  feasibility: number;
  impact: number;
  innovationNotes: string;
  feasibilityNotes: string;
  impactNotes: string;
  finalComments: string;
  overallScore: number;
  evaluatedAt: string;
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
