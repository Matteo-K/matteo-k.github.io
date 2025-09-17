import { useState, useEffect } from 'react';
import dataManager from '../orm/dataManager';

export function useData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const loadedSession = await dataManager.loadData();
        setSession(loadedSession);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
      
    loadData();
  }, []);
  
  return { 
    isLoading, 
    error, 
    session,
    // Méthodes helper
    getAllProjects: () => dataManager.getAllProjects(),
    getProjectById: (id) => dataManager.getProjectById(id),
    getProjectsByStatus: (status) => dataManager.getProjectsByStatus(status),
    getAllCollaborators: () => dataManager.getAllCollaborators(),
    getCollaboratorProjects: (id) => dataManager.getCollaboratorProjects(id),
    getSocietyProjects: (id) => dataManager.getSocietyProjects(id),
    getProjectTechnologies: (id) => dataManager.getProjectTechnologies(id),
  };
}

// Hook spécialisé pour un projet
export function useProject(projectId) {
  const { isLoading, error } = useData();
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    if (!isLoading && !error && projectId) {
      try {
        const foundProject = dataManager.getProjectById(projectId);
        setProject(foundProject);
      } catch (err) {
        console.error('Erreur récupération projet:', err);
      }
    }
  }, [isLoading, error, projectId]);
  
  return { project, isLoading, error };
}