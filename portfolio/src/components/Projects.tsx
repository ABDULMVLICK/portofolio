import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, ProjectType } from '../types/Project';
import { projectService } from '../services/projectService';

const projectTypeLabels: Record<ProjectType, string> = {
  web: 'Web',
  mobile: 'Mobile',
  desktop: 'Desktop'
};

const projectTypeColors: Record<ProjectType, string> = {
  web: 'bg-blue-100 text-blue-800',
  mobile: 'bg-green-100 text-green-800',
  desktop: 'bg-purple-100 text-purple-800'
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedType, setSelectedType] = useState<ProjectType | 'all'>('all');
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

  const filteredProjects = selectedType === 'all'
    ? projects
    : projects.filter(project => project.type === selectedType);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mes Projets</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez mes réalisations en développement web, mobile et desktop.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedType('all')}
            className={
              selectedType === 'all'
                ? 'px-4 py-2 rounded-lg font-medium transition-colors bg-lavender text-white'
                : 'px-4 py-2 rounded-lg font-medium transition-colors bg-white text-gray-600 hover:bg-gray-50'
            }
          >
            Tous
          </button>
          {Object.entries(projectTypeLabels).map(([type, label]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as ProjectType)}
              className={
                selectedType === type
                  ? 'px-4 py-2 rounded-lg font-medium transition-colors bg-lavender text-white'
                  : 'px-4 py-2 rounded-lg font-medium transition-colors bg-white text-gray-600 hover:bg-gray-50'
              }
            >
              {label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender mx-auto"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun projet trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${projectTypeColors[project.type]}`}>
                        {projectTypeLabels[project.type]}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{project.date}</span>
                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-lavender transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lavender hover:text-opacity-80 transition-colors"
                          >
                            Démo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
} 