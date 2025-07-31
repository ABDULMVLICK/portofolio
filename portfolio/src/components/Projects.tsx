// src/components/Projects.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, ProjectType } from '../types/Project';
import { projectService } from '../services/projectService';
import GifModal from './GifModal';

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
  const [selectedGif, setSelectedGif] = useState<{ url: string; title: string } | null>(null);

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
    <section id="projects" className="py-20 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-4">Mes Projets</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez mes réalisations en développement web, mobile et desktop.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedType('all')}
            className={
              selectedType === 'all'
                ? 'px-4 py-2 rounded-lg font-medium transition-colors bg-lavender text-white'
                : 'px-4 py-2 rounded-lg font-medium transition-colors bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
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
                  : 'px-4 py-2 rounded-lg font-medium transition-colors bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Affichage d'une erreur éventuelle */}
        {error && (
          <div className="text-center py-4">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender mx-auto"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Aucun projet trouvé</p>
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
                  className="bg-white dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden"
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
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${projectTypeColors[project.type]}`}>
                        {projectTypeLabels[project.type]}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    
                    {project.gifUrl && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Démonstration :
                        </h4>
                        <button
                          onClick={() => setSelectedGif({ url: project.gifUrl!, title: project.title })}
                          className="relative group rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 hover:border-lavender transition-all duration-300 cursor-pointer"
                        >
                          <img
                            src={project.gifUrl}
                            alt={`Démonstration de ${project.title}`}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/90 dark:bg-black/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <svg className="w-6 h-6 text-lavender" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7l3 3-3 3" />
                              </svg>
                            </div>
                          </div>
                        </button>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                          Cliquez pour voir en grand
                        </p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm text-gray-600 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{project.date}</span>
                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-300 hover:text-lavender transition-colors"
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

      <GifModal
        isOpen={!!selectedGif}
        gifUrl={selectedGif?.url || ''}
        title={selectedGif?.title || ''}
        onClose={() => setSelectedGif(null)}
      />
    </section>
  );
}
