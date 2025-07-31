import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import type { Project, ProjectType } from '../types/Project';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}

const MONTHS_FR = {
  'janvier': 1, 'février': 2, 'mars': 3, 'avril': 4, 'mai': 5, 'juin': 6,
  'juillet': 7, 'août': 8, 'septembre': 9, 'octobre': 10, 'novembre': 11, 'décembre': 12,
  // Versions sans accents
  'fevrier': 2, 'aout': 8, 'decembre': 12
};

const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

const formatDateForDB = (displayDate: string): string => {
  try {
    const [month, year] = displayDate.toLowerCase().split(' ');
    const monthNum = MONTHS_FR[month];
    
    if (!monthNum || !year) {
      throw new Error('Format de date invalide');
    }

    return `${year}-${monthNum.toString().padStart(2, '0')}-01`;
  } catch (error) {
    console.error('Error converting date:', error);
    throw new Error('Le format de la date doit être "Mois Année" (ex: Janvier 2024)');
  }
};

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    description: '',
    technologies: [],
    date: '',
    displayDate: '',
    type: 'web',
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    gifUrl: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [demoFile, setDemoFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        date: project.date,
        displayDate: formatDateForDisplay(project.date),
        type: project.type,
        githubUrl: project.githubUrl || '',
        demoUrl: project.demoUrl || '',
        imageUrl: project.imageUrl || '',
        gifUrl: project.gifUrl || '',
      });
      setFilePreview(project.gifUrl || project.imageUrl || null);
      setDemoFile(null);
    } else {
      // Clear form for new project entry
      setFormData({
        title: '',
        description: '',
        technologies: [],
        date: '',
        displayDate: '',
        type: 'web',
        githubUrl: '',
        demoUrl: '',
        imageUrl: '',
        gifUrl: '',
      });
      setFilePreview(null);
      setDemoFile(null);
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUploading(true);

    try {
      const finalFormData = { ...formData };

      if (demoFile) {
        const fileExt = demoFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('project-demos')
          .upload(filePath, demoFile);

        if (uploadError) {
          throw new Error(`Erreur d'upload : ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('project-demos')
          .getPublicUrl(filePath);
        
        const uploadedFileUrl = publicUrlData.publicUrl;

        if (demoFile.type.startsWith('image/gif') || demoFile.type.startsWith('video/')) {
          finalFormData.gifUrl = uploadedFileUrl;
          finalFormData.imageUrl = ''; 
        } else if (demoFile.type.startsWith('image/')) {
          finalFormData.imageUrl = uploadedFileUrl;
          finalFormData.gifUrl = '';
        }
      }

      const now = new Date().toISOString();
      const projectData: Project = {
        id: project?.id || crypto.randomUUID(),
        ...finalFormData,
        date: formatDateForDB(finalFormData.displayDate),
        createdAt: project?.createdAt || now,
        updatedAt: now,
      };
      onSubmit(projectData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDemoFile(file);

    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }

    if (file) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.endsWith(',')) {
      setFormData(prev => ({
        ...prev,
        technologies: [...value.slice(0, -1).split(',').map(tech => tech.trim()).filter(Boolean), '']
      }));
    } else {
      const technologies = value.split(',').map(tech => tech.trim()).filter(Boolean);
      setFormData(prev => ({ ...prev, technologies }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erreur</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre
        </label>
        <input
          type="text"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
          Technologies (séparées par des virgules)
        </label>
        <input
          type="text"
          id="technologies"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.technologies.join(', ')}
          onChange={handleTechnologiesChange}
          placeholder="ex: React, TypeScript, Tailwind"
        />
        <p className="mt-1 text-sm text-gray-500">
          Tapez une virgule après chaque technologie pour en ajouter une nouvelle
        </p>
      </div>

      <div>
        <label htmlFor="displayDate" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="text"
          id="displayDate"
          required
          placeholder="ex: Janvier 2024"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.displayDate}
          onChange={(e) => {
            setError(null);
            setFormData(prev => ({ ...prev, displayDate: e.target.value }));
          }}
        />
        <p className="mt-1 text-sm text-gray-500">
          Format : Mois Année (ex: Janvier 2024, Août 2023)
        </p>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ProjectType }))}
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
          URL GitHub (optionnel)
        </label>
        <input
          type="url"
          id="githubUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.githubUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="demoFile" className="block text-sm font-medium text-gray-700">
          Image ou Vidéo de Démo (Upload)
        </label>
        <input
          type="file"
          id="demoFile"
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lavender-light file:text-lavender hover:file:bg-lavender-dark"
        />
        <p className="mt-1 text-sm text-gray-500">
          Uploader un fichier remplacera les URLs manuelles d'image et de GIF.
        </p>
        {filePreview && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Aperçu</h4>
            {(demoFile?.type.startsWith('video/') || (!demoFile && (filePreview.includes('.mp4') || filePreview.includes('.webm')))) ? (
              <video src={filePreview} controls className="max-w-xs rounded-lg shadow-md" />
            ) : (
              <img src={filePreview} alt="Aperçu" className="max-w-xs rounded-lg shadow-md" />
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700">
          URL Démo (optionnel)
        </label>
        <input
          type="url"
          id="demoUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.demoUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          URL Image (optionnel)
        </label>
        <input
          type="url"
          id="imageUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.imageUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="gifUrl" className="block text-sm font-medium text-gray-700">
          URL GIF Démonstratif (optionnel)
        </label>
        <input
          type="url"
          id="gifUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lavender focus:ring-lavender sm:text-sm"
          value={formData.gifUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, gifUrl: e.target.value }))}
          placeholder="https://exemple.com/demo.gif"
        />
        <p className="mt-1 text-sm text-gray-500">
          Ajoutez un GIF pour montrer votre projet en action. Il sera cliquable pour s'ouvrir en modal.
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isUploading}
          className="inline-flex justify-center rounded-md border border-transparent bg-lavender py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender disabled:opacity-50"
        >
          {isUploading ? 'Envoi en cours...' : (project ? 'Mettre à jour' : 'Créer le projet')}
        </button>
      </div>
    </form>
  );
} 