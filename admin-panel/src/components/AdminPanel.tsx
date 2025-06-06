import { useState, useEffect } from 'react';
import type { Project } from '../types/Project';
import { projectService } from '../services/projectService';
import ProjectForm from './ProjectForm';

export default function AdminPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des projets');
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    window.location.reload();
  };

  const handleAddProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await projectService.addProject(project);
      await loadProjects();
      setIsFormOpen(false);
    } catch (err) {
      setError('Erreur lors de l\'ajout du projet');
      console.error('Error adding project:', err);
    }
  };

  const handleUpdateProject = async (project: Project) => {
    try {
      await projectService.updateProject(project);
      await loadProjects();
      setSelectedProject(null);
      setIsFormOpen(false);
    } catch (err) {
      setError('Erreur lors de la mise à jour du projet');
      console.error('Error updating project:', err);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await projectService.deleteProject(projectId);
        await loadProjects();
      } catch (err) {
        setError('Erreur lors de la suppression du projet');
        console.error('Error deleting project:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des projets
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isFormOpen ? (
          <div className="bg-white shadow sm:rounded-lg p-6">
            <ProjectForm
              project={selectedProject || undefined}
              onSubmit={selectedProject ? handleUpdateProject : handleAddProject}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedProject(null);
              }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lavender hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender"
              >
                Ajouter un projet
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <li key={project.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {project.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setIsFormOpen(true);
                            }}
                            className="text-lavender hover:text-opacity-80"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {projects.length === 0 && (
                  <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                    Aucun projet pour le moment
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 