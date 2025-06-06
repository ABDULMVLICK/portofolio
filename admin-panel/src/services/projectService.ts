import { supabase } from '../config/supabase';
import type { Project } from '../types/Project';

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Map the database column names to our interface names
    return (data || []).map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      technologies: item.technologies,
      date: item.date,
      type: item.type,
      githubUrl: item.github_url,
      demoUrl: item.demo_url,
      imageUrl: item.image_url,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
  },

  async addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        date: project.date,
        type: project.type,
        github_url: project.githubUrl,
        demo_url: project.demoUrl,
        image_url: project.imageUrl
      }])
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      technologies: data.technologies,
      date: data.date,
      type: data.type,
      githubUrl: data.github_url,
      demoUrl: data.demo_url,
      imageUrl: data.image_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  async updateProject(project: Project): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        date: project.date,
        type: project.type,
        github_url: project.githubUrl,
        demo_url: project.demoUrl,
        image_url: project.imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', project.id)
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      technologies: data.technologies,
      date: data.date,
      type: data.type,
      githubUrl: data.github_url,
      demoUrl: data.demo_url,
      imageUrl: data.image_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 