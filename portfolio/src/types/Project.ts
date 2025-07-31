export type ProjectType = 'web' | 'mobile' | 'desktop';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  date: string;
  type: ProjectType;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  gifUrl?: string;
  createdAt: string;
  updatedAt: string;
} 